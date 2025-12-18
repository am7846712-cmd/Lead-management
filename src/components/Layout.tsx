import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  FileText, 
  ShoppingCart, 
  Package, 
  Tag, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  User,
  CheckSquare,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  Tablet
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  userRole: 'salesperson' | 'manager' | 'admin';
  onLogout: () => void;
}

export default function Layout({ userRole, onLogout }: LayoutProps) {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/leads', icon: UserPlus, label: 'Leads' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/estimates', icon: FileText, label: 'Estimates' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/catalog', icon: Package, label: 'Catalog' },
    { path: '/promotions', icon: Tag, label: 'Promotions' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
  ];

  if (userRole === 'manager' || userRole === 'admin') {
    navItems.splice(2, 0, { path: '/approvals', icon: CheckSquare, label: 'Approvals' });
    navItems.splice(6, 0, { path: '/scheduling', icon: CalendarClock, label: 'Scheduling' });
  }

  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'New order received',
      message: 'Order #ORD-3456 from ABC Manufacturing Corp',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'estimate',
      title: 'Estimate accepted',
      message: 'Customer accepted EST-2454 - $15,230',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'lead',
      title: 'New lead assigned',
      message: 'You have been assigned lead: TechStart Solutions',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '4',
      type: 'approval',
      title: 'Lead approved',
      message: 'Your lead "Smart Logistics Co" has been approved',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'message',
      title: 'New message from Manager',
      message: 'Great work on the ABC Manufacturing deal!',
      time: '5 hours ago',
      read: true,
    },
    {
      id: '6',
      type: 'order',
      title: 'Order delivered',
      message: 'Order #ORD-3454 has been delivered',
      time: '1 day ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-4 h-4" />;
      case 'estimate':
        return <FileText className="w-4 h-4" />;
      case 'lead':
        return <UserPlus className="w-4 h-4" />;
      case 'approval':
        return <CheckSquare className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <h2 className="text-gray-900">MT-RSR</h2>
              <p className="text-gray-500 text-sm mt-1">Sales Portal</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-2 hover:bg-gray-100 rounded-lg transition ${
              sidebarCollapsed ? 'mx-auto' : ''
            }`}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive('/settings')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            } ${sidebarCollapsed ? 'justify-center' : ''}`}
            title={sidebarCollapsed ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers, products, orders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-6">
              <Link
                to="/unified-dashboard"
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-sm"
                title="Unified Tablet View"
              >
                <Tablet className="w-4 h-4" />
                <span className="text-sm">Unified View</span>
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <p className="text-gray-500 text-xs mt-0.5">
                            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              notification.type === 'order' ? 'bg-purple-100 text-purple-600' :
                              notification.type === 'estimate' ? 'bg-blue-100 text-blue-600' :
                              notification.type === 'lead' ? 'bg-green-100 text-green-600' :
                              notification.type === 'approval' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-gray-900 text-sm">{notification.title}</p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                                )}
                              </div>
                              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 border-t border-gray-200 text-center">
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative pl-4 border-l border-gray-200">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 text-sm">John Doe</p>
                    <p className="text-gray-500 text-xs capitalize">{userRole}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-gray-900 text-sm">John Doe</p>
                      <p className="text-gray-500 text-xs">john.doe@mtrsr.com</p>
                      <p className="text-blue-600 text-xs mt-1 capitalize">Role: {userRole}</p>
                    </div>
                    
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}