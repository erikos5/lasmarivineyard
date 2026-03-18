import { NextRequest, NextResponse } from 'next/server';
import { getExperienceById, getSettings, getBookingsForDate } from '@/lib/store';
import { getAvailableSlots } from '@/lib/availability';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const experienceId = searchParams.get('experienceId');

    if (!date || !experienceId) {
      return NextResponse.json(
        { error: 'date and experienceId are required' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    const experience = await getExperienceById(experienceId);
    if (!experience || !experience.active) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const settings = await getSettings();
    const existingBookings = await getBookingsForDate(date);
    const slots = getAvailableSlots(date, experience, settings, existingBookings);

    return NextResponse.json({ slots, experience });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
