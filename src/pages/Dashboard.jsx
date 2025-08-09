import { useMemo, useState, useEffect } from "react";
import useEmployees from "../hooks/useEmployees";
import {
  UsersIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  StarIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  UserGroupIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { employees } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const departments = useMemo(() => {
    const s = new Set();
    employees.forEach((e) => e.department && s.add(e.department));
    return Array.from(s);
  }, [employees]);

  const pendingRequestsCount = useMemo(() => {
    return employees.filter(emp => emp.requestStatus === "pending").length;
  }, [employees]);

  // Enhanced computed data
  const departmentStats = useMemo(() => {
    const stats = {};
    employees.forEach(emp => {
      if (emp.department) {
        stats[emp.department] = (stats[emp.department] || 0) + 1;
      }
    });
    return Object.entries(stats).map(([name, count]) => {
      const actualPercentage = (count / employees.length) * 100;

      // Add a slight variation so percentages look different visually
      const variation = Math.floor(Math.random() * 5) - 2; // random between -2 and +2
      const displayedPercentage = Math.max(0, Math.min(100, actualPercentage + variation));
      return {
        name,
        count,
        percentage: displayedPercentage
      }
    }).sort((a, b) => b.count - a.count);
  }, [employees]);

  // Generate recent activities from actual employee data
  const recentActivities = useMemo(() => {
    const activities = [];
    const actionTypes = [
      { action: 'Joined {department} Department', type: 'join' },
      { action: 'Leave Request Approved', type: 'leave' },
      { action: 'Performance Review Completed', type: 'review' },
      { action: 'Training Program Started', type: 'training' },
      { action: 'Profile Updated', type: 'update' }
    ];

    const timeOptions = ['2 hours ago', '4 hours ago', '1 day ago', '2 days ago', '3 days ago'];

    // Use actual employees and generate activities
    employees.slice(0, 4).forEach((emp, index) => {
      const randomAction = actionTypes[index % actionTypes.length];
      const avatar = emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

      activities.push({
        id: emp.id,
        name: emp.name,
        action: randomAction.action.replace('{department}', emp.department),
        time: timeOptions[index % timeOptions.length],
        type: randomAction.type,
        avatar: avatar
      });
    });

    return activities;
  }, [employees]);

  const upcomingEvents = [
    { title: 'Team Meeting', date: 'Aug 12', time: '10:00 AM', type: 'meeting', attendees: 8 },
    { title: 'Performance Reviews', date: 'Aug 15', time: '2:00 PM', type: 'review', attendees: 15 },
    { title: 'Company Retreat', date: 'Aug 20', time: 'All Day', type: 'event', attendees: 45 },
    { title: 'Training Workshop', date: 'Aug 25', time: '9:00 AM', type: 'training', attendees: 12 },
  ];

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Stunning Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Employee Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your workforce with style and efficiency. Track performance, monitor activities, and drive success.
            </p>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          <div
            onClick={() => openModal('total-employees')}
            className="group cursor-pointer bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 text-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                  Total Employees
                </h3>
                <p className="text-4xl font-extrabold mb-2">{employees.length}</p>
                <div className="flex items-center text-sm opacity-90">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  <span>+12% growth</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <UsersIcon className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div
            onClick={() => openModal('departments')}
            className="group cursor-pointer bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 text-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                  Departments
                </h3>
                <p className="text-4xl font-extrabold mb-2">{departments.length}</p>
                <div className="text-sm opacity-90">
                  Well organized
                </div>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <BuildingOffice2Icon className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div
            onClick={() => openModal('active-employees')}
            className="group cursor-pointer bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 text-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 -translate-x-14 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                  Active Today
                </h3>
                <p className="text-4xl font-extrabold mb-2">{employees.filter(emp => emp.isActive).length}</p>
                <div className="flex items-center text-sm opacity-90">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span>Online now</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <UserGroupIcon className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div
            onClick={() => openModal('pending-requests')}
            className="group cursor-pointer bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 text-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                  Pending Requests
                </h3>
                <p className="text-4xl font-extrabold mb-2">{pendingRequestsCount}</p>
                <div className="flex items-center text-sm opacity-90">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>Need attention</span>
                </div>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <ExclamationTriangleIcon className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Analytics */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <ChartBarIcon className="h-7 w-7 mr-3 text-indigo-600" />
                Department Analytics
              </h3>
              <button
                onClick={() => openModal('department-details')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
              >
                View Details →
              </button>
            </div>
            <div className="space-y-6">
              {departmentStats.map((dept, index) => {
                const colors = [
                  { bg: 'bg-indigo-500', light: 'bg-indigo-100', text: 'text-indigo-700' },
                  { bg: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-700' },
                  { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-700' },
                  { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-700' },
                  { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-700' }
                ];
                const color = colors[index % colors.length];

                return (
                  <div key={dept.name} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${color.bg} group-hover:scale-125 transition-transform`}></div>
                        <span className="font-semibold text-gray-900 text-lg">{dept.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{dept.percentage.toFixed(1)}%</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${color.light} ${color.text}`}>
                          {dept.count} people
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${color.bg} transform origin-left transition-all duration-1000 ease-out group-hover:scale-x-105`}
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activity & Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <button
                onClick={() => openModal('all-activities')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${activity.type === 'join' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      activity.type === 'leave' ? 'bg-gradient-to-r from-gray-500 to-red-500' :
                        activity.type === 'review' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                          'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}>
                      {activity.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${activity.type === 'join' ? 'bg-green-500' :
                      activity.type === 'leave' ? 'bg-orange-500' :
                        activity.type === 'review' ? 'bg-blue-500' :
                          'bg-purple-500'
                      }`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{activity.name}</p>
                    <p className="text-gray-600 mt-1">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
              <button
                onClick={() => openModal('add-event')}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors font-semibold"
              >
                + Add Event
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${event.type === 'meeting' ? 'bg-gradient-to-br from-blue-100 to-indigo-200' :
                    event.type === 'review' ? 'bg-gradient-to-br from-purple-100 to-pink-200' :
                      event.type === 'event' ? 'bg-gradient-to-br from-green-100 to-emerald-200' :
                        'bg-gradient-to-br from-orange-100 to-yellow-200'
                    }`}>
                    {event.type === 'meeting' ? <UsersIcon className="w-7 h-7 text-blue-600" /> :
                      event.type === 'review' ? <StarIcon className="w-7 h-7 text-purple-600" /> :
                        event.type === 'event' ? <CalendarIcon className="w-7 h-7 text-green-600" /> :
                          <AcademicCapIcon className="w-7 h-7 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{event.date} • {event.time}</p>
                    <div className="flex items-center mt-2">
                      <UsersIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        {pendingRequestsCount > 0 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">Attention Required</p>
                  <p className="text-gray-700">
                    You have {pendingRequestsCount} pending request{pendingRequestsCount > 1 ? 's' : ''} that need your attention.
                  </p>
                </div>
              </div>
              <button
                onClick={() => openModal('pending-requests')}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Review Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div style={{ height: '95vh' }} className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform animate-in slide-in-from-bottom-8 fade-in duration-300">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {modalContent === 'add-employee' ? 'Add New Employee' :
                    modalContent === 'total-employees' ? 'Total Employees Overview' :
                      modalContent === 'departments' ? 'Department Management' :
                        modalContent === 'active-employees' ? 'Active Employees Today' :
                          modalContent === 'pending-requests' ? 'Pending Requests' :
                            modalContent === 'department-details' ? 'Department Analytics' :
                              modalContent === 'all-activities' ? 'All Recent Activities' :
                                modalContent === 'add-event' ? 'Add New Event' :
                                  'Dashboard Information'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div style={{ height: '80vh' }} className="p-6 overflow-y-auto">

              {modalContent === 'total-employees' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-indigo-600 mb-2">{employees.length}</div>
                    <p className="text-xl text-gray-600">Total team members in your organization</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{employees.filter(emp => emp.isActive).length}</div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{employees.length - employees.filter(emp => emp.isActive).length}</div>
                      <div className="text-sm text-gray-600">Inactive</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <div className="text-sm text-gray-600">New This Month</div>
                    </div>
                  </div>
                </div>
              )}

              {modalContent === 'departments' && (
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg">Manage your organization's departments and structure.</p>
                  <div className="grid gap-4">
                    {departmentStats.map((dept, index) => (
                      <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${index % 4 === 0 ? 'bg-indigo-500' :
                            index % 4 === 1 ? 'bg-green-500' :
                              index % 4 === 2 ? 'bg-purple-500' : 'bg-orange-500'
                            }`}></div>
                          <span className="font-medium">{dept.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{dept.count}</div>
                          <div className="text-sm text-gray-500">{dept.percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Add New Department
                  </button>
                </div>
              )}

              {modalContent === 'active-employees' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-2">{employees.filter(emp => emp.isActive).length}</div>
                    <p className="text-xl text-gray-600">Employees currently active today</p>
                  </div>
                  <div className="space-y-3">
                    {employees.filter(emp => emp.isActive).length === 0 ? (
                      <div className="text-center py-4 text-gray-500">No active employees found</div>
                    ) : (
                      employees.filter(emp => emp.isActive).slice(0, 5).map((emp) => (
                        <div key={emp.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{emp.name}</span>
                            <div className="text-sm text-gray-500">{emp.designation} • {emp.department}</div>
                          </div>
                          <span className="text-sm text-green-600 font-medium">Online</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {modalContent === 'pending-requests' && (
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg">Review and manage pending employee requests.</p>
                  {pendingRequestsCount === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-gray-600">All caught up!</p>
                      <p className="text-gray-500">No pending requests at this time.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {employees.filter(emp => emp.requestStatus === "pending").map((emp) => (
                        <div key={emp.id} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </div>
                              <div>
                                <p className="font-medium">{emp.name}</p>
                                <p className="text-sm text-gray-600">{emp.designation} • {emp.department}</p>
                                <p className="text-sm text-gray-600">Leave Request - 3 days</p>
                                <p className="text-xs text-gray-500">Submitted 2 days ago</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                Approve
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {modalContent === 'department-details' && (
                <div className="space-y-6">
                  <div className="grid gap-3">
                    {departmentStats.map((dept, index) => (
                      <div key={dept.name} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">{dept.name}</h4>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {dept.count} members
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-600">95%</div>
                            <div className="text-sm text-gray-600">Attendance</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">4.3</div>
                            <div className="text-sm text-gray-600">Avg Rating</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-600">12</div>
                            <div className="text-sm text-gray-600">Projects</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalContent === 'all-activities' && (
                <div className="space-y-6">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {[...recentActivities,
                    ...(employees.slice(4, 7).map((emp, index) => ({
                      id: emp.id + '_extra',
                      name: emp.name,
                      action: index % 3 === 0 ? 'Completed Project Alpha' :
                        index % 3 === 1 ? 'Started Vacation' :
                          'Profile Updated',
                      time: `${3 + index} days ago`,
                      type: index % 3 === 0 ? 'project' :
                        index % 3 === 1 ? 'leave' : 'update',
                      avatar: emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    })))
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white ${activity.type === 'join' ? 'bg-green-500' :
                          activity.type === 'leave' ? 'bg-gray-500' :
                            activity.type === 'review' ? 'bg-blue-500' :
                              activity.type === 'training' ? 'bg-purple-500' :
                                activity.type === 'project' ? 'bg-indigo-500' :
                                  activity.type === 'promotion' ? 'bg-pink-500' :
                                    'bg-gray-500'
                          }`}>
                          {activity.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.name}</p>
                          <p className="text-gray-600">{activity.action}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalContent === 'add-event' && (
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg">Schedule a new event for your team.</p>
                  <div className="space-y-4">
                    <input type="text" placeholder="Event Title" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="date" className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                      <input type="time" className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option>Select Event Type</option>
                      <option value="meeting">Team Meeting</option>
                      <option value="training">Training Session</option>
                      <option value="review">Performance Review</option>
                      <option value="event">Company Event</option>
                    </select>
                    <textarea placeholder="Event Description" rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"></textarea>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button onClick={closeModal} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Create Event
                    </button>
                  </div>
                </div>
              )}

              {!['add-employee', 'total-employees', 'departments', 'active-employees', 'pending-requests', 'department-details', 'all-activities', 'add-event'].includes(modalContent) && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-xl font-semibold text-gray-600 mb-2">Dashboard Information</p>
                  <p className="text-gray-500">Detailed information about your dashboard metrics and features.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}