'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Wine, Calendar, Settings, LogOut, Users, Clock,
  Save, Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronUp,
  CheckCircle, XCircle, AlertCircle, DollarSign
} from 'lucide-react';

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
  active: boolean;
}

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
  breaks: TimeSlot[];
}

interface BlockedDate {
  date: string;
  reason: string;
}

interface BlockedTimeSlot {
  date: string;
  start: string;
  end: string;
  reason: string;
}

interface BusinessSettings {
  schedule: { [key: string]: DaySchedule };
  blockedDates: BlockedDate[];
  blockedTimeSlots: BlockedTimeSlot[];
  bufferMinutes: number;
  advanceBookingDays: number;
  timezone: string;
}

interface Booking {
  id: string;
  experienceId: string;
  experienceName: string;
  date: string;
  timeSlot: string;
  guests: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests: string;
  status: string;
  createdAt: string;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'experiences' | 'availability'>('bookings');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const authHeaders = useCallback(() => ({
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  }), [authToken]);

  const fetchData = useCallback(async () => {
    if (!authToken) return;
    const headers = { 'Authorization': `Bearer ${authToken}` };

    try {
      const [expRes, settRes, bookRes] = await Promise.all([
        fetch('/api/admin/experiences', { headers }),
        fetch('/api/admin/settings', { headers }),
        fetch('/api/admin/bookings', { headers }),
      ]);

      if (expRes.ok) setExperiences(await expRes.json());
      if (settRes.ok) setSettings(await settRes.json());
      if (bookRes.ok) setBookings(await bookRes.json());
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  }, [authToken]);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setAuthToken(data.token);
        setIsAuthenticated(true);
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Login failed');
    }
  };

  const saveExperiences = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/experiences', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(experiences),
      });
      setSaveMessage(res.ok ? 'Experiences saved!' : 'Failed to save');
    } catch {
      setSaveMessage('Error saving');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(settings),
      });
      setSaveMessage(res.ok ? 'Settings saved!' : 'Failed to save');
    } catch {
      setSaveMessage('Error saving');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (err) {
      console.error('Failed to update booking:', err);
    }
  };

  const updateExperience = (index: number, field: string, value: unknown) => {
    setExperiences(experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  const addBlockedDate = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      blockedDates: [...settings.blockedDates, { date: '', reason: '' }],
    });
  };

  const removeBlockedDate = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      blockedDates: settings.blockedDates.filter((_, i) => i !== index),
    });
  };

  const updateBlockedDate = (index: number, field: string, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      blockedDates: settings.blockedDates.map((bd, i) =>
        i === index ? { ...bd, [field]: value } : bd
      ),
    });
  };

  const updateDaySchedule = (day: string, field: string, value: unknown) => {
    if (!settings) return;
    setSettings({
      ...settings,
      schedule: {
        ...settings.schedule,
        [day]: { ...settings.schedule[day], [field]: value },
      },
    });
  };

  const updateDaySlot = (day: string, slotIndex: number, field: string, value: string) => {
    if (!settings) return;
    const daySchedule = settings.schedule[day];
    const updatedSlots = daySchedule.slots.map((slot, i) =>
      i === slotIndex ? { ...slot, [field]: value } : slot
    );
    updateDaySchedule(day, 'slots', updatedSlots);
  };

  const updateDayBreak = (day: string, breakIndex: number, field: string, value: string) => {
    if (!settings) return;
    const daySchedule = settings.schedule[day];
    const updatedBreaks = daySchedule.breaks.map((b, i) =>
      i === breakIndex ? { ...b, [field]: value } : b
    );
    updateDaySchedule(day, 'breaks', updatedBreaks);
  };

  const addBreak = (day: string) => {
    if (!settings) return;
    const daySchedule = settings.schedule[day];
    updateDaySchedule(day, 'breaks', [...daySchedule.breaks, { start: '12:00', end: '13:00' }]);
  };

  const removeBreak = (day: string, breakIndex: number) => {
    if (!settings) return;
    const daySchedule = settings.schedule[day];
    updateDaySchedule(day, 'breaks', daySchedule.breaks.filter((_, i) => i !== breakIndex));
  };

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(2)}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-evergreen-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-evergreen-800 mb-2">Admin Dashboard</h1>
            <p className="text-cream-600 font-inter">Lasmari Vineyard Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-evergreen-800 font-inter font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-cream-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 font-inter outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {authError && (
              <p className="text-red-500 text-sm font-inter">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-evergreen-800 text-cream-50 py-3 rounded-xl font-inter font-semibold hover:bg-evergreen-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  // Dashboard
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Top Bar */}
      <div className="bg-evergreen-800 text-cream-50 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="font-playfair text-xl font-bold">Lasmari Admin</h1>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-inter text-pink-400"
            >
              {saveMessage}
            </motion.span>
          )}
          <button
            onClick={() => { setIsAuthenticated(false); setAuthToken(''); }}
            className="flex items-center gap-2 text-cream-200 hover:text-cream-50 font-inter text-sm transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-cream-200 min-h-[calc(100vh-56px)] p-4 hidden md:block">
          <nav className="space-y-2">
            {[
              { id: 'bookings' as const, icon: Calendar, label: 'Bookings' },
              { id: 'experiences' as const, icon: Wine, label: 'Experiences' },
              { id: 'availability' as const, icon: Clock, label: 'Availability' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-evergreen-800 text-cream-50'
                    : 'text-evergreen-800 hover:bg-cream-100'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream-200 flex z-50">
          {[
            { id: 'bookings' as const, icon: Calendar, label: 'Bookings' },
            { id: 'experiences' as const, icon: Wine, label: 'Experiences' },
            { id: 'availability' as const, icon: Clock, label: 'Availability' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-inter transition-colors ${
                activeTab === item.id ? 'text-evergreen-800' : 'text-cream-400'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 pb-24 md:pb-8">
          {/* BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div>
              <h2 className="font-playfair text-2xl font-bold text-evergreen-800 mb-6">Bookings</h2>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <Calendar size={48} className="text-cream-300 mx-auto mb-4" />
                  <p className="text-cream-500 font-inter">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...bookings].reverse().map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-playfair font-bold text-evergreen-800">{booking.experienceName}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-inter font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-inter text-cream-600">
                            <span>{booking.date} at {booking.timeSlot}</span>
                            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                            <span>{booking.customerName}</span>
                            <span className="font-semibold text-evergreen-800">{formatPrice(booking.totalPrice)}</span>
                          </div>
                          {booking.customerEmail && (
                            <p className="text-xs text-cream-400 font-inter mt-1">{booking.customerEmail}</p>
                          )}
                          {booking.specialRequests && (
                            <p className="text-xs text-cream-500 font-inter mt-1 italic">Note: {booking.specialRequests}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-inter font-medium hover:bg-green-200 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-inter font-medium hover:bg-red-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-inter font-medium hover:bg-blue-200 transition-colors"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === 'experiences' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-evergreen-800">Experiences</h2>
                <button
                  onClick={saveExperiences}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-evergreen-800 text-cream-50 rounded-xl font-inter text-sm font-semibold hover:bg-evergreen-700 transition-colors disabled:opacity-50"
                >
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-playfair text-lg font-bold text-evergreen-800">{exp.name}</h3>
                        <button
                          onClick={() => updateExperience(index, 'active', !exp.active)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-inter ${
                            exp.active ? 'bg-green-100 text-green-700' : 'bg-cream-200 text-cream-500'
                          }`}
                        >
                          {exp.active ? <Eye size={12} /> : <EyeOff size={12} />}
                          {exp.active ? 'Active' : 'Hidden'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs text-cream-500 font-inter mb-1">Name</label>
                        <input
                          type="text"
                          value={exp.name}
                          onChange={(e) => updateExperience(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-cream-500 font-inter mb-1">Duration (minutes)</label>
                        <input
                          type="number"
                          value={exp.duration}
                          onChange={(e) => updateExperience(index, 'duration', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-cream-500 font-inter mb-1">Price (EUR cents)</label>
                        <input
                          type="number"
                          value={exp.price}
                          onChange={(e) => updateExperience(index, 'price', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                        />
                        <span className="text-xs text-cream-400 font-inter">{formatPrice(exp.price)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-cream-500 font-inter mb-1">Min Guests</label>
                          <input
                            type="number"
                            value={exp.minGuests}
                            onChange={(e) => updateExperience(index, 'minGuests', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-cream-500 font-inter mb-1">Max Guests</label>
                          <input
                            type="number"
                            value={exp.maxGuests}
                            onChange={(e) => updateExperience(index, 'maxGuests', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs text-cream-500 font-inter mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AVAILABILITY TAB */}
          {activeTab === 'availability' && settings && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-evergreen-800">Availability</h2>
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-evergreen-800 text-cream-50 rounded-xl font-inter text-sm font-semibold hover:bg-evergreen-700 transition-colors disabled:opacity-50"
                >
                  <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {/* General Settings */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="font-playfair text-lg font-bold text-evergreen-800 mb-4">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-cream-500 font-inter mb-1">Buffer Between Bookings (min)</label>
                    <input
                      type="number"
                      value={settings.bufferMinutes}
                      onChange={(e) => setSettings({ ...settings, bufferMinutes: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-cream-500 font-inter mb-1">Advance Booking (days)</label>
                    <input
                      type="number"
                      value={settings.advanceBookingDays}
                      onChange={(e) => setSettings({ ...settings, advanceBookingDays: parseInt(e.target.value) || 30 })}
                      className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-cream-500 font-inter mb-1">Timezone</label>
                    <input
                      type="text"
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                    />
                  </div>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="font-playfair text-lg font-bold text-evergreen-800 mb-4">Weekly Schedule</h3>
                <div className="space-y-4">
                  {DAY_NAMES.map((dayName, dayIndex) => {
                    const day = dayIndex.toString();
                    const schedule = settings.schedule[day];
                    if (!schedule) return null;

                    return (
                      <div key={day} className="border border-cream-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateDaySchedule(day, 'enabled', !schedule.enabled)}
                              className={`w-10 h-6 rounded-full transition-colors relative ${
                                schedule.enabled ? 'bg-green-500' : 'bg-cream-300'
                              }`}
                            >
                              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                schedule.enabled ? 'translate-x-4' : 'translate-x-0.5'
                              }`} />
                            </button>
                            <span className="font-inter font-semibold text-evergreen-800">{dayName}</span>
                          </div>
                        </div>

                        {schedule.enabled && (
                          <div className="ml-13 space-y-3">
                            {/* Working Hours */}
                            <div>
                              <label className="text-xs text-cream-500 font-inter block mb-2">Working Hours</label>
                              {schedule.slots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="flex items-center gap-2 mb-2">
                                  <input
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => updateDaySlot(day, slotIndex, 'start', e.target.value)}
                                    className="px-2 py-1.5 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                                  />
                                  <span className="text-cream-400">to</span>
                                  <input
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => updateDaySlot(day, slotIndex, 'end', e.target.value)}
                                    className="px-2 py-1.5 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Breaks */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-xs text-cream-500 font-inter">Breaks</label>
                                <button
                                  onClick={() => addBreak(day)}
                                  className="text-xs text-pink-400 hover:text-pink-500 font-inter flex items-center gap-1"
                                >
                                  <Plus size={12} /> Add Break
                                </button>
                              </div>
                              {schedule.breaks.map((brk, brkIndex) => (
                                <div key={brkIndex} className="flex items-center gap-2 mb-2">
                                  <input
                                    type="time"
                                    value={brk.start}
                                    onChange={(e) => updateDayBreak(day, brkIndex, 'start', e.target.value)}
                                    className="px-2 py-1.5 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                                  />
                                  <span className="text-cream-400">to</span>
                                  <input
                                    type="time"
                                    value={brk.end}
                                    onChange={(e) => updateDayBreak(day, brkIndex, 'end', e.target.value)}
                                    className="px-2 py-1.5 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                                  />
                                  <button
                                    onClick={() => removeBreak(day, brkIndex)}
                                    className="text-red-400 hover:text-red-500"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Blocked Dates */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-playfair text-lg font-bold text-evergreen-800">Blocked Dates</h3>
                  <button
                    onClick={addBlockedDate}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cream-100 text-evergreen-800 rounded-lg text-xs font-inter font-medium hover:bg-cream-200 transition-colors"
                  >
                    <Plus size={14} /> Block Date
                  </button>
                </div>

                {settings.blockedDates.length === 0 ? (
                  <p className="text-cream-400 font-inter text-sm">No blocked dates</p>
                ) : (
                  <div className="space-y-2">
                    {settings.blockedDates.map((bd, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="date"
                          value={bd.date}
                          onChange={(e) => updateBlockedDate(index, 'date', e.target.value)}
                          className="px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                        />
                        <input
                          type="text"
                          value={bd.reason}
                          onChange={(e) => updateBlockedDate(index, 'reason', e.target.value)}
                          placeholder="Reason (e.g., Holiday)"
                          className="flex-1 px-3 py-2 border border-cream-200 rounded-lg text-sm font-inter outline-none focus:ring-1 focus:ring-pink-400"
                        />
                        <button
                          onClick={() => removeBlockedDate(index)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
