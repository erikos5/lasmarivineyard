export interface Experience {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly duration: number; // minutes
  readonly price: number; // EUR cents
  readonly maxGuests: number;
  readonly minGuests: number;
  readonly image: string;
  readonly features: readonly string[];
  readonly active: boolean;
}

export interface TimeSlot {
  readonly start: string; // "HH:mm"
  readonly end: string; // "HH:mm"
}

export interface DaySchedule {
  readonly enabled: boolean;
  readonly slots: readonly TimeSlot[];
  readonly breaks: readonly TimeSlot[];
}

export interface BlockedDate {
  readonly date: string; // "YYYY-MM-DD" (start date, or single date if no endDate)
  readonly endDate?: string; // "YYYY-MM-DD" (optional, for date ranges)
  readonly reason: string;
}

export interface BlockedTimeSlot {
  readonly date: string; // "YYYY-MM-DD"
  readonly start: string; // "HH:mm"
  readonly end: string; // "HH:mm"
  readonly reason: string;
}

export interface BusinessSettings {
  readonly schedule: {
    readonly [dayOfWeek: string]: DaySchedule; // "0" (Sunday) through "6" (Saturday)
  };
  readonly blockedDates: readonly BlockedDate[];
  readonly blockedTimeSlots: readonly BlockedTimeSlot[];
  readonly bufferMinutes: number; // buffer between bookings
  readonly advanceBookingDays: number; // how far ahead guests can book
  readonly timezone: string;
}

export interface Booking {
  readonly id: string;
  readonly experienceId: string;
  readonly experienceName: string;
  readonly date: string; // "YYYY-MM-DD"
  readonly timeSlot: string; // "HH:mm"
  readonly guests: number;
  readonly totalPrice: number; // EUR cents
  readonly customerName: string;
  readonly customerEmail: string;
  readonly customerPhone: string;
  readonly specialRequests: string;
  readonly stripeSessionId: string;
  readonly stripePaymentIntentId: string;
  readonly status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface AvailableSlot {
  readonly time: string; // "HH:mm"
  readonly available: boolean;
}
