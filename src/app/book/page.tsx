'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isBefore, startOfDay, isToday, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Users, Wine, Calendar, CreditCard, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Experience {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  maxGuests: number;
  minGuests: number;
  image: string;
  features: string[];
}

interface AvailableSlot {
  time: string;
  available: boolean;
}

const steps = ['Experience', 'Date & Time', 'Details', 'Payment'];

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/experiences')
      .then(res => res.json())
      .then(setExperiences)
      .catch(() => setError('Failed to load experiences'));
  }, []);

  const fetchAvailability = useCallback(async (date: Date, experienceId: string) => {
    setLoadingSlots(true);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const res = await fetch(`/api/booking/availability?date=${dateStr}&experienceId=${experienceId}`);
      const data = await res.json();
      setAvailableSlots(data.slots || []);
    } catch {
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate && selectedExperience) {
      fetchAvailability(selectedDate, selectedExperience.id);
      setSelectedTime(null);
    }
  }, [selectedDate, selectedExperience, fetchAvailability]);

  const handleBooking = async () => {
    if (!selectedExperience || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceId: selectedExperience.id,
          date: format(selectedDate, 'yyyy-MM-dd'),
          timeSlot: selectedTime,
          guests,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create booking');
        return;
      }

      // Redirect to Stripe Checkout via session URL
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDow = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const isDateSelectable = (date: Date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, addDays(today, 1)); // Must book at least 1 day ahead
  };

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(0)}`;

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selectedExperience;
      case 1: return !!selectedDate && !!selectedTime;
      case 2: return formData.name.trim() !== '' && formData.email.trim() !== '' && formData.email.includes('@');
      default: return true;
    }
  };

  return (
    <main className="min-h-screen bg-cream-50">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 mt-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-inter font-semibold transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-pink-400 text-evergreen-800'
                      : index === currentStep
                      ? 'bg-evergreen-800 text-cream-50'
                      : 'bg-cream-200 text-cream-500'
                  }`}
                >
                  {index < currentStep ? <Check size={18} /> : index + 1}
                </div>
                <span className={`text-xs font-inter mt-2 hidden md:block ${
                  index <= currentStep ? 'text-evergreen-800' : 'text-cream-400'
                }`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 md:w-24 h-0.5 mx-2 transition-all duration-300 ${
                  index < currentStep ? 'bg-pink-400' : 'bg-cream-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Choose Experience */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-evergreen-800 text-center mb-2">
                Choose Your Experience
              </h2>
              <p className="text-cream-600 font-inter text-center mb-10">
                Select the experience that speaks to you
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                      selectedExperience?.id === exp.id
                        ? 'ring-3 ring-pink-400 shadow-xl scale-[1.02]'
                        : 'hover:shadow-lg hover:scale-[1.01]'
                    }`}
                    onClick={() => setSelectedExperience(exp)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-evergreen-800/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-playfair text-xl font-bold text-cream-50">{exp.name}</h3>
                      </div>
                      {selectedExperience?.id === exp.id && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-evergreen-800" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 bg-white">
                      <p className="text-cream-600 font-inter text-sm mb-4 line-clamp-2">{exp.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-cream-500 font-inter">
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {exp.duration}min
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} /> {exp.minGuests}-{exp.maxGuests}
                          </span>
                        </div>
                        <span className="font-playfair text-xl font-bold text-pink-400">
                          {formatPrice(exp.price)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-evergreen-800 text-center mb-2">
                Pick Your Date & Time
              </h2>
              <p className="text-cream-600 font-inter text-center mb-10">
                {selectedExperience?.name} - {selectedExperience?.duration} minutes
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
                      className="p-2 hover:bg-cream-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={20} className="text-evergreen-800" />
                    </button>
                    <h3 className="font-playfair text-xl font-semibold text-evergreen-800">
                      {format(calendarMonth, 'MMMM yyyy')}
                    </h3>
                    <button
                      onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
                      className="p-2 hover:bg-cream-100 rounded-lg transition-colors"
                    >
                      <ChevronRight size={20} className="text-evergreen-800" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-inter font-medium text-cream-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(calendarMonth).map((day, i) => {
                      if (!day) return <div key={`empty-${i}`} />;
                      const selectable = isDateSelectable(day);
                      const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => selectable && setSelectedDate(day)}
                          disabled={!selectable}
                          className={`p-2 text-sm font-inter rounded-lg transition-all duration-200 ${
                            isSelected
                              ? 'bg-evergreen-800 text-cream-50 font-semibold'
                              : selectable
                              ? 'hover:bg-cream-100 text-evergreen-800'
                              : 'text-cream-300 cursor-not-allowed'
                          } ${isToday(day) ? 'ring-1 ring-pink-400' : ''}`}
                        >
                          {format(day, 'd')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-playfair text-xl font-semibold text-evergreen-800 mb-6">
                    {selectedDate
                      ? `Available Times - ${format(selectedDate, 'EEEE, MMMM d')}`
                      : 'Select a date first'}
                  </h3>

                  {loadingSlots ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-evergreen-600" />
                    </div>
                  ) : selectedDate ? (
                    availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-xl text-sm font-inter font-medium transition-all duration-200 ${
                              selectedTime === slot.time
                                ? 'bg-evergreen-800 text-cream-50'
                                : slot.available
                                ? 'bg-cream-50 hover:bg-cream-100 text-evergreen-800 border border-cream-200'
                                : 'bg-cream-100 text-cream-300 cursor-not-allowed line-through'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-cream-500 font-inter text-center py-12">
                        No available slots for this date. Please try another date.
                      </p>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-cream-400">
                      <Calendar size={48} className="mb-4" />
                      <p className="font-inter">Choose a date to see available times</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Guest Details */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-evergreen-800 text-center mb-2">
                Your Details
              </h2>
              <p className="text-cream-600 font-inter text-center mb-10">
                Tell us a bit about yourself so we can prepare your visit
              </p>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                {/* Guest count */}
                <div>
                  <label className="block text-evergreen-800 font-inter font-medium mb-3">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setGuests(Math.max(selectedExperience?.minGuests || 1, guests - 1))}
                      className="w-10 h-10 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center font-inter font-bold text-evergreen-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-playfair font-bold text-evergreen-800 w-12 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(selectedExperience?.maxGuests || 8, guests + 1))}
                      className="w-10 h-10 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center font-inter font-bold text-evergreen-800 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-cream-500 font-inter">
                      ({selectedExperience?.minGuests}-{selectedExperience?.maxGuests} guests)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-evergreen-800 font-inter font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 font-inter transition-all outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-evergreen-800 font-inter font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 font-inter transition-all outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-evergreen-800 font-inter font-medium mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 font-inter transition-all outline-none"
                    placeholder="+30 123 456 7890"
                  />
                </div>

                <div>
                  <label className="block text-evergreen-800 font-inter font-medium mb-2">Special Requests</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 font-inter transition-all outline-none resize-none"
                    placeholder="Allergies, accessibility needs, celebrations..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Pay */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-evergreen-800 text-center mb-2">
                Review & Pay
              </h2>
              <p className="text-cream-600 font-inter text-center mb-10">
                Confirm your booking details before payment
              </p>

              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                {/* Booking Summary */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-cream-50 rounded-xl">
                    <Wine size={24} className="text-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-playfair font-bold text-evergreen-800">{selectedExperience?.name}</h4>
                      <p className="text-sm text-cream-600 font-inter">{selectedExperience?.duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-cream-50 rounded-xl">
                    <Calendar size={24} className="text-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-playfair font-bold text-evergreen-800">
                        {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                      </h4>
                      <p className="text-sm text-cream-600 font-inter">at {selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-cream-50 rounded-xl">
                    <Users size={24} className="text-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-playfair font-bold text-evergreen-800">{guests} Guest{guests > 1 ? 's' : ''}</h4>
                      <p className="text-sm text-cream-600 font-inter">{formData.name} ({formData.email})</p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-cream-200 pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-inter text-cream-600">
                      {formatPrice(selectedExperience?.price || 0)} x {guests} guest{guests > 1 ? 's' : ''}
                    </span>
                    <span className="font-inter text-evergreen-800">
                      {formatPrice((selectedExperience?.price || 0) * guests)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-cream-200">
                    <span className="font-playfair text-xl font-bold text-evergreen-800">Total</span>
                    <span className="font-playfair text-2xl font-bold text-pink-400">
                      {formatPrice((selectedExperience?.price || 0) * guests)}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 font-inter text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={isSubmitting}
                  className="w-full bg-pink-400 hover:bg-pink-500 text-evergreen-800 font-inter font-semibold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-evergreen-800" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Proceed to Payment
                    </>
                  )}
                </button>

                <p className="text-xs text-cream-400 font-inter text-center">
                  You will be redirected to Stripe for secure payment processing
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          <button
            onClick={() => {
              setCurrentStep(Math.max(0, currentStep - 1));
              setError('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-6 py-3 rounded-xl font-inter font-medium transition-all ${
              currentStep === 0
                ? 'invisible'
                : 'bg-cream-100 hover:bg-cream-200 text-evergreen-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <ChevronLeft size={18} /> Back
            </span>
          </button>

          {currentStep < 3 && (
            <button
              onClick={() => { if (canProceed()) { setCurrentStep(currentStep + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
              disabled={!canProceed()}
              className="px-8 py-3 rounded-xl font-inter font-semibold bg-evergreen-800 text-cream-50 hover:bg-evergreen-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
