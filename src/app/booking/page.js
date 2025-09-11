'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AnimatedIcon from '../../components/AnimatedIcon';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [preferredCounselor, setPreferredCounselor] = useState('auto');
  const [bookingReason, setBookingReason] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('normal');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - would come from backend
  const counselors = [
    { id: 'auto', name: 'Auto-assign (Recommended)', availability: 'Best match' },
    { id: '1', name: 'Dr. Sarah Wilson', specialty: 'Anxiety & Depression', availability: 'Available today' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Academic Stress', availability: 'Available tomorrow' },
    { id: '3', name: 'Dr. Priya Sharma', specialty: 'Relationship Issues', availability: 'Available in 2 days' },
    { id: '4', name: 'Dr. James Rodriguez', specialty: 'Sleep & Wellness', availability: 'Available today' }
  ];

  const timeSlots = [
    '4:00 PM', '4:30 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:30 PM', '8:00 PM', '8:30 PM', '9:30 PM', '10:00 PM', '10:30 PM'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', desc: 'General wellness check', color: 'green' },
    { value: 'normal', label: 'Normal Priority', desc: 'Regular counseling session', color: 'blue' },
    { value: 'high', label: 'High Priority', desc: 'Urgent support needed', color: 'orange' },
    { value: 'critical', label: 'Critical Priority', desc: 'Immediate assistance required', color: 'red' }
  ];

  // Generate available dates (next 14 days excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    while (dates.length < 10) {
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push({
          value: currentDate.toISOString().split('T')[0],
          display: currentDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          available: Math.random() > 0.2 // 80% chance of availability
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleBooking = async () => {
    setIsLoading(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const booking = {
      id: 'BOOK-' + Date.now(),
      date: selectedDate,
      time: selectedTime,
      counselor: counselors.find(c => c.id === preferredCounselor),
      reason: bookingReason,
      urgency: urgencyLevel,
      anonymousId: 'ANON-' + Math.random().toString(36).substr(2, 6).toUpperCase()
    };
    
    setBookingDetails(booking);
    setShowConfirmation(true);
    setIsLoading(false);
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setPreferredCounselor('auto');
    setBookingReason('');
    setUrgencyLevel('normal');
    setShowConfirmation(false);
    setBookingDetails(null);
  };

  return (
    <div style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showConfirmation ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3" style={{ color: "var(--color-text-primary)" }}>
                <AnimatedIcon type="calendar" size={32} />
                Book Confidential Session
              </h1>
              <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
                Schedule a private appointment with our professional counselors. Your identity remains completely anonymous.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Urgency Level */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-lg font-semibold mb-4">Priority Level</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {urgencyLevels.map((level) => (
                      <label 
                        key={level.value}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                          urgencyLevel === level.value ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{ 
                          backgroundColor: urgencyLevel === level.value 
                            ? "var(--color-surface-alt)" 
                            : "transparent",
                          border: "1px solid var(--color-border)"
                        }}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={level.value}
                          checked={urgencyLevel === level.value}
                          onChange={(e) => setUrgencyLevel(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                            {level.label}
                          </div>
                          <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                            {level.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Counselor Preference */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-lg font-semibold mb-4">Counselor Preference</h3>
                  <div className="space-y-3">
                    {counselors.map((counselor) => (
                      <label 
                        key={counselor.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                          preferredCounselor === counselor.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{ 
                          backgroundColor: preferredCounselor === counselor.id 
                            ? "var(--color-surface-alt)" 
                            : "transparent",
                          border: "1px solid var(--color-border)"
                        }}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="counselor"
                            value={counselor.id}
                            checked={preferredCounselor === counselor.id}
                            onChange={(e) => setPreferredCounselor(e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                              {counselor.name}
                            </div>
                            {counselor.specialty && (
                              <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                                Specializes in: {counselor.specialty}
                              </div>
                            )}
                          </div>
                        </div>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: "var(--color-success)",
                            color: "white"
                          }}
                        >
                          {counselor.availability}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date.value}
                        onClick={() => setSelectedDate(date.value)}
                        disabled={!date.available}
                        className={`p-3 rounded-lg text-center transition-all ${
                          selectedDate === date.value 
                            ? 'ring-2 ring-blue-500' 
                            : date.available 
                            ? 'hover:bg-gray-100 dark:hover:bg-gray-700' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        style={{ 
                          backgroundColor: selectedDate === date.value 
                            ? "var(--color-primary)" 
                            : date.available 
                            ? "var(--color-surface-alt)" 
                            : "var(--color-border)",
                          color: selectedDate === date.value 
                            ? "white" 
                            : "var(--color-text-primary)",
                          border: "1px solid var(--color-border)"
                        }}
                      >
                        <div className="font-medium text-sm">{date.display}</div>
                        {!date.available && (
                          <div className="text-xs mt-1">Unavailable</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div 
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <h3 className="text-lg font-semibold mb-4">Select Time</h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            selectedTime === time ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          style={{ 
                            backgroundColor: selectedTime === time 
                              ? "var(--color-primary)" 
                              : "var(--color-surface-alt)",
                            color: selectedTime === time 
                              ? "white" 
                              : "var(--color-text-primary)",
                            border: "1px solid var(--color-border)"
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reason (Optional) */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h3 className="text-lg font-semibold mb-4">Session Focus (Optional)</h3>
                  <textarea
                    value={bookingReason}
                    onChange={(e) => setBookingReason(e.target.value)}
                    placeholder="Briefly describe what you'd like to discuss (this helps us assign the best counselor)..."
                    className="w-full p-3 rounded-lg resize-none"
                    style={{
                      backgroundColor: "var(--color-surface-alt)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)"
                    }}
                    rows={4}
                    maxLength={300}
                  />
                  <p className="text-xs mt-2" style={{ color: "var(--color-text-secondary)" }}>
                    {bookingReason.length}/300 characters. This information is confidential and helps us provide better support.
                  </p>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime || isLoading}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                    (!selectedDate || !selectedTime || isLoading) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white"
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking Session...
                    </span>
                  ) : (
                    'Book Confidential Session'
                  )}
                </button>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Privacy Info */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AnimatedIcon type="lock" size={20} className="mr-2" />
                    Complete Privacy
                  </h4>
                  <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• Your identity remains anonymous</li>
                    <li>• Counselors only see session details</li>
                    <li>• End-to-end encrypted sessions</li>
                    <li>• No personal information shared</li>
                  </ul>
                </div>

                {/* Session Info */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AnimatedIcon type="clock" size={20} className="mr-2" />
                    Session Details
                  </h4>
                  <ul className="space-y-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <li>• 30-minute sessions</li>
                    <li>• Video/audio optional</li>
                    <li>• Professional counselors</li>
                    <li>• Available Mon-Fri 4PM-12AM</li>
                  </ul>
                </div>

                {/* Emergency Contact */}
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
                >
                  <h4 className="font-semibold mb-3 flex items-center" style={{ color: "var(--color-error)" }}>
                    <AnimatedIcon type="alert" size={20} className="mr-2" color="var(--color-error)" />
                    Crisis Support
                  </h4>
                  <p className="text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
                    If you need immediate help:
                  </p>
                  <div className="text-xs space-y-1">
                    <p><strong>KIRAN:</strong> 1800-599-0019</p>
                    <p><strong>Vandrevala:</strong> 9999 666 555</p>
                    <p><strong>iCALL:</strong> 9152987821</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Confirmation Page */
          <div className="max-w-2xl mx-auto text-center">
            <div 
              className="p-8 rounded-lg"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <div className="mb-4">
                <AnimatedIcon type="check" size={64} color="var(--color-success)" />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>
                Session Booked Successfully!
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-surface-alt)" }}>
                  <p className="font-semibold mb-2">Your Booking Details:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span style={{ color: "var(--color-text-secondary)" }}>Date:</span>
                      <p className="font-medium">{new Date(bookingDetails?.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span style={{ color: "var(--color-text-secondary)" }}>Time:</span>
                      <p className="font-medium">{bookingDetails?.time}</p>
                    </div>
                    <div>
                      <span style={{ color: "var(--color-text-secondary)" }}>Counselor:</span>
                      <p className="font-medium">{bookingDetails?.counselor?.name}</p>
                    </div>
                    <div>
                      <span style={{ color: "var(--color-text-secondary)" }}>Session ID:</span>
                      <p className="font-medium">{bookingDetails?.anonymousId}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  You'll receive a reminder 15 minutes before your session. 
                  The session link will be available in your dashboard.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/dashboard">
                    <button 
                      className="px-6 py-3 rounded-lg font-medium text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      Go to Dashboard
                    </button>
                  </Link>
                  <button 
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg font-medium"
                    style={{ 
                      backgroundColor: "var(--color-surface-alt)",
                      color: "var(--color-text-primary)",
                      border: "1px solid var(--color-border)"
                    }}
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
