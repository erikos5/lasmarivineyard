import { format, parse, addMinutes, isAfter, isBefore, isEqual } from 'date-fns';
import { BusinessSettings, Experience, AvailableSlot, Booking } from './types';

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function isTimeInRange(time: string, start: string, end: string): boolean {
  const t = timeToMinutes(time);
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);
  return t >= s && t < e;
}

function doesSlotOverlap(
  slotStart: string,
  slotDuration: number,
  rangeStart: string,
  rangeEnd: string
): boolean {
  const ss = timeToMinutes(slotStart);
  const se = ss + slotDuration;
  const rs = timeToMinutes(rangeStart);
  const re = timeToMinutes(rangeEnd);
  return ss < re && se > rs;
}

export function getAvailableSlots(
  date: string,
  experience: Experience,
  settings: BusinessSettings,
  existingBookings: readonly Booking[]
): readonly AvailableSlot[] {
  const dayOfWeek = new Date(date + 'T12:00:00').getDay().toString();
  const daySchedule = settings.schedule[dayOfWeek];

  if (!daySchedule || !daySchedule.enabled) {
    return [];
  }

  // Check if date is blocked
  const isDateBlocked = settings.blockedDates.some(bd => bd.date === date);
  if (isDateBlocked) {
    return [];
  }

  const slots: AvailableSlot[] = [];
  const totalDuration = experience.duration + settings.bufferMinutes;

  for (const timeSlot of daySchedule.slots) {
    const slotStartMinutes = timeToMinutes(timeSlot.start);
    const slotEndMinutes = timeToMinutes(timeSlot.end);

    // Generate possible start times every 30 minutes within this slot window
    let currentMinutes = slotStartMinutes;
    while (currentMinutes + experience.duration <= slotEndMinutes) {
      const timeStr = minutesToTime(currentMinutes);

      // Check if this time falls in a break
      const isInBreak = daySchedule.breaks.some(b =>
        doesSlotOverlap(timeStr, experience.duration, b.start, b.end)
      );

      // Check if this time is in a blocked time slot for this date
      const isBlocked = settings.blockedTimeSlots.some(
        bts => bts.date === date && doesSlotOverlap(timeStr, experience.duration, bts.start, bts.end)
      );

      // Check if this time conflicts with existing bookings (considering buffer)
      const isBooked = existingBookings.some(booking => {
        const bookingStart = timeToMinutes(booking.timeSlot);
        const bookingEnd = bookingStart + totalDuration;
        const proposedStart = currentMinutes;
        const proposedEnd = proposedStart + totalDuration;
        return proposedStart < bookingEnd && proposedEnd > bookingStart;
      });

      slots.push({
        time: timeStr,
        available: !isInBreak && !isBlocked && !isBooked,
      });

      currentMinutes += 30; // 30-minute intervals
    }
  }

  return slots;
}
