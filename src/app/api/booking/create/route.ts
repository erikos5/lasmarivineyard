import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getExperienceById, getSettings, getBookingsForDate, addBooking } from '@/lib/store';
import { getAvailableSlots } from '@/lib/availability';
import { Booking } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      experienceId,
      date,
      timeSlot,
      guests,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
    } = body;

    if (!experienceId || !date || !timeSlot || !guests || !customerName || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const experience = await getExperienceById(experienceId);
    if (!experience || !experience.active) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    if (guests < experience.minGuests || guests > experience.maxGuests) {
      return NextResponse.json(
        { error: `Guest count must be between ${experience.minGuests} and ${experience.maxGuests}` },
        { status: 400 }
      );
    }

    const settings = await getSettings();
    const existingBookings = await getBookingsForDate(date);
    const availableSlots = getAvailableSlots(date, experience, settings, existingBookings);
    const requestedSlot = availableSlots.find(s => s.time === timeSlot);

    if (!requestedSlot || !requestedSlot.available) {
      return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 409 });
    }

    const totalPrice = experience.price * guests;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: experience.name,
              description: `${date} at ${timeSlot} - ${guests} guest${guests > 1 ? 's' : ''}`,
              images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://lasmari.wine'}${experience.image}`],
            },
            unit_amount: experience.price,
          },
          quantity: guests,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://lasmari.wine'}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://lasmari.wine'}/book/cancel`,
      customer_email: customerEmail,
      metadata: {
        experienceId,
        date,
        timeSlot,
        guests: guests.toString(),
        customerName,
        customerPhone: customerPhone || '',
        specialRequests: specialRequests || '',
      },
    });

    const booking: Booking = {
      id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      experienceId,
      experienceName: experience.name,
      date,
      timeSlot,
      guests,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      specialRequests: specialRequests || '',
      stripeSessionId: session.id,
      stripePaymentIntentId: '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addBooking(booking);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
