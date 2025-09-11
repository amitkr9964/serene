'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AnimatedIcon from '../../components/AnimatedIcon';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/auth/signin'); // Not logged in
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-green-600">🌱</div>
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">Serene Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">
                Welcome, {session.user.name}
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded">
                {session.user.userType}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Welcome Card */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-3xl">👋</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Welcome back!
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {session.user.name}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* User Type Card */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-3xl">
                      {session.user.userType === 'student' && '🎓'}
                      {session.user.userType === 'counselor' && '👨‍⚕️'}
                      {session.user.userType === 'admin' && '👑'}
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Account Type
                      </dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                        {session.user.userType}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-3xl">📧</div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Email
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {session.user.email}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Features based on user type */}
          <div className="mt-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Available Features
            </h3>
            
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                
                {session.user.userType === 'student' && (
                  <>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🤖</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">AI Chatbot</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Talk to our AI assistant</p>
                          </div>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                          Try Now
                        </button>
                      </div>
                    </li>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AnimatedIcon type="calendar" size={24} className="mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Book Session</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Schedule with counselors</p>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                          Book Now
                        </button>
                      </div>
                    </li>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AnimatedIcon type="book" size={24} className="mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Resources</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Browse wellness content</p>
                          </div>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm">
                          Explore
                        </button>
                      </div>
                    </li>
                  </>
                )}

                {session.user.userType === 'counselor' && (
                  <>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AnimatedIcon type="calendar" size={24} className="mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">My Schedule</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">View and manage appointments</p>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                          View Schedule
                        </button>
                      </div>
                    </li>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">👥</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Student Sessions</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage counseling sessions</p>
                          </div>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                          Join Session
                        </button>
                      </div>
                    </li>
                  </>
                )}

                {session.user.userType === 'admin' && (
                  <>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">📊</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Analytics Dashboard</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">View platform analytics</p>
                          </div>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">
                          View Analytics
                        </button>
                      </div>
                    </li>
                    <li className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">⚙️</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Content</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update resources and settings</p>
                          </div>
                        </div>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                          Manage
                        </button>
                      </div>
                    </li>
                  </>
                )}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
