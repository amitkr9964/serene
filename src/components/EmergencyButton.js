'use client';

import { useState, useEffect } from 'react';
import AnimatedIcon from './AnimatedIcon';

export default function EmergencyButton() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // connecting, connected, failed

  const handleEmergencyClick = () => {
    setIsEmergencyActive(true);
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 3000);
  };

  const handleCloseEmergency = () => {
    setIsEmergencyActive(false);
    setConnectionStatus('connecting');
  };

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isEmergencyActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEmergencyActive]);

  return (
    <>
      {/* Emergency Button - Fixed Position */}
      <button
        onClick={handleEmergencyClick}
        className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 animate-pulse"
        style={{
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
        }}
        aria-label="Emergency SOS"
      >
        <AnimatedIcon 
          type="alert" 
          size={24} 
          color="white" 
          animate={true}
        />
      </button>

      {/* Emergency Modal */}
      {isEmergencyActive && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />

          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              
              {/* Close Button */}
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={handleCloseEmergency}
                  className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Emergency Support
                  </h3>
                  
                  {connectionStatus === 'connecting' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center mb-4">
                        {/* Calling Animation */}
                        <div className="relative">
                          <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-red-400 opacity-75"></div>
                          <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-red-400 opacity-75 animation-delay-1000"></div>
                          <div className="relative inline-flex rounded-full h-16 w-16 bg-red-500 items-center justify-center">
                            <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium text-red-600 dark:text-red-400">Please hold on</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          We are connecting you to someone who can help you right away...
                        </p>
                        
                        {/* Loading dots */}
                        <div className="flex justify-center mt-4 space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {connectionStatus === 'connected' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative inline-flex rounded-full h-16 w-16 bg-green-500 items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                          Connected Successfully!
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          A crisis counselor is now available to help you. Please stay on the line.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      <strong>Emergency Helplines:</strong><br />
                      KIRAN Mental Health: 1800-599-0019<br />
                      Vandrevala Foundation: 9999 666 555<br />
                      iCALL: 9152987821
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {connectionStatus === 'connecting' && (
                  <button
                    onClick={handleCloseEmergency}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:w-auto transition-colors"
                  >
                    Cancel
                  </button>
                )}
                {connectionStatus === 'connected' && (
                  <>
                    <button
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors"
                    >
                      End Call
                    </button>
                    <button
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:w-auto transition-colors"
                    >
                      Mute
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animation delays */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}
