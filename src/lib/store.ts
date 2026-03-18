import { supabase, getServiceClient } from './supabase';
import { Experience, BusinessSettings, Booking } from './types';

// ─── Experiences ─────────────────────────────────────────

function mapExperienceRow(row: Record<string, unknown>): Experience {
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    duration: row.duration as number,
    price: row.price as number,
    maxGuests: row.max_guests as number,
    minGuests: row.min_guests as number,
    image: row.image as string,
    features: row.features as string[],
    active: row.active as boolean,
  };
}

export async function getExperiences(): Promise<readonly Experience[]> {
  const { data, error } = await supabase
    .from('vineyard_experiences')
    .select('*')
    .order('sort_order');

  if (error) throw new Error(`Failed to fetch experiences: ${error.message}`);
  return (data || []).map(mapExperienceRow);
}

export async function getActiveExperiences(): Promise<readonly Experience[]> {
  const { data, error } = await supabase
    .from('vineyard_experiences')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  if (error) throw new Error(`Failed to fetch active experiences: ${error.message}`);
  return (data || []).map(mapExperienceRow);
}

export async function getExperienceById(id: string): Promise<Experience | undefined> {
  const { data, error } = await supabase
    .from('vineyard_experiences')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return mapExperienceRow(data);
}

export async function updateExperiences(experiences: readonly Experience[]): Promise<readonly Experience[]> {
  const client = getServiceClient();

  for (const exp of experiences) {
    const { error } = await client
      .from('vineyard_experiences')
      .upsert({
        id: exp.id,
        name: exp.name,
        description: exp.description,
        duration: exp.duration,
        price: exp.price,
        max_guests: exp.maxGuests,
        min_guests: exp.minGuests,
        image: exp.image,
        features: exp.features,
        active: exp.active,
        updated_at: new Date().toISOString(),
      });

    if (error) throw new Error(`Failed to update experience ${exp.id}: ${error.message}`);
  }

  return experiences;
}

// ─── Settings ────────────────────────────────────────────

function mapSettingsRow(row: Record<string, unknown>): BusinessSettings {
  return {
    schedule: row.schedule as BusinessSettings['schedule'],
    blockedDates: row.blocked_dates as BusinessSettings['blockedDates'],
    blockedTimeSlots: row.blocked_time_slots as BusinessSettings['blockedTimeSlots'],
    bufferMinutes: row.buffer_minutes as number,
    advanceBookingDays: row.advance_booking_days as number,
    timezone: row.timezone as string,
  };
}

export async function getSettings(): Promise<BusinessSettings> {
  const { data, error } = await supabase
    .from('vineyard_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) throw new Error(`Failed to fetch settings: ${error?.message}`);
  return mapSettingsRow(data);
}

export async function updateSettings(settings: BusinessSettings): Promise<BusinessSettings> {
  const client = getServiceClient();

  const { error } = await client
    .from('vineyard_settings')
    .upsert({
      id: 1,
      schedule: settings.schedule,
      blocked_dates: settings.blockedDates,
      blocked_time_slots: settings.blockedTimeSlots,
      buffer_minutes: settings.bufferMinutes,
      advance_booking_days: settings.advanceBookingDays,
      timezone: settings.timezone,
      updated_at: new Date().toISOString(),
    });

  if (error) throw new Error(`Failed to update settings: ${error.message}`);
  return settings;
}

// ─── Bookings ────────────────────────────────────────────

function mapBookingRow(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    experienceId: row.experience_id as string,
    experienceName: row.experience_name as string,
    date: row.date as string,
    timeSlot: row.time_slot as string,
    guests: row.guests as number,
    totalPrice: row.total_price as number,
    customerName: row.customer_name as string,
    customerEmail: row.customer_email as string,
    customerPhone: row.customer_phone as string,
    specialRequests: row.special_requests as string,
    stripeSessionId: row.stripe_session_id as string,
    stripePaymentIntentId: row.stripe_payment_intent_id as string,
    status: row.status as Booking['status'],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getBookings(): Promise<readonly Booking[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('vineyard_bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch bookings: ${error.message}`);
  return (data || []).map(mapBookingRow);
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('vineyard_bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return mapBookingRow(data);
}

export async function getBookingByStripeSession(sessionId: string): Promise<Booking | undefined> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('vineyard_bookings')
    .select('*')
    .eq('stripe_session_id', sessionId)
    .single();

  if (error || !data) return undefined;
  return mapBookingRow(data);
}

export async function addBooking(booking: Booking): Promise<Booking> {
  const client = getServiceClient();

  const { error } = await client
    .from('vineyard_bookings')
    .insert({
      id: booking.id,
      experience_id: booking.experienceId,
      experience_name: booking.experienceName,
      date: booking.date,
      time_slot: booking.timeSlot,
      guests: booking.guests,
      total_price: booking.totalPrice,
      customer_name: booking.customerName,
      customer_email: booking.customerEmail,
      customer_phone: booking.customerPhone,
      special_requests: booking.specialRequests,
      stripe_session_id: booking.stripeSessionId,
      stripe_payment_intent_id: booking.stripePaymentIntentId,
      status: booking.status,
    });

  if (error) throw new Error(`Failed to add booking: ${error.message}`);
  return booking;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
  const client = getServiceClient();

  const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.stripePaymentIntentId !== undefined) dbUpdates.stripe_payment_intent_id = updates.stripePaymentIntentId;

  const { data, error } = await client
    .from('vineyard_bookings')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return undefined;
  return mapBookingRow(data);
}

export async function getBookingsForDate(date: string): Promise<readonly Booking[]> {
  const client = getServiceClient();
  const { data, error } = await client
    .from('vineyard_bookings')
    .select('*')
    .eq('date', date)
    .in('status', ['confirmed', 'pending']);

  if (error) throw new Error(`Failed to fetch bookings for date: ${error.message}`);
  return (data || []).map(mapBookingRow);
}
