import { useState } from 'react';
import { X, Send, Check, CheckCheck, Clock, Bell, MessageSquare, FileText, ShoppingCart, Package, AlertCircle, TrendingUp, User } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  role: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  isRead: boolean;
}

interface Notification {
  id: number;
  type: 'order' | 'estimate' | 'system' | 'alert' | 'message' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

interface ChatPanelProps {
  show: boolean;
  onClose: () => void;
  onMessageSent: () => void;
}

interface NotificationPanelProps {
  show: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'Maria Garcia',
    role: 'Sales Manager',
    avatar: 'MG',
    content: 'Great work on closing the Acme Labs deal! The team is really impressed with your numbers this quarter.',
    timestamp: '2 hours ago',
    isOwn: false,
    isRead: true,
  },
  {
    id: 2,
    sender: 'You',
    role: 'Sales Person',
    avatar: 'JS',
    content: 'Thanks Maria! The client was really excited about our Q4 bundle promotion.',
    timestamp: '1 hour ago',
    isOwn: true,
    isRead: true,
  },
  {
    id: 3,
    sender: 'David Chen',
    role: 'Sales Rep',
    avatar: 'DC',
    content: 'Hey team, anyone have experience with BlueSky Foods? They just reached out and I want to make sure we handle them right.',
    timestamp: '45 min ago',
    isOwn: false,
    isRead: true,
  },
  {
    id: 4,
    sender: 'You',
    role: 'Sales Person',
    avatar: 'JS',
    content: "I've worked with them for 2 years. They prefer bulk orders with net-30 terms. I can share my notes if helpful!",
    timestamp: '30 min ago',
    isOwn: true,
    isRead: true,
  },
  {
    id: 5,
    sender: 'Maria Garcia',
    role: 'Sales Manager',
    avatar: 'MG',
    content: 'Quick heads up - we have a pricing update meeting tomorrow at 10am. Please review the new catalog before then.',
    timestamp: '10 min ago',
    isOwn: false,
    isRead: false,
  },
];

export function ChatPanel({ show, onClose, onMessageSent }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversation, setActiveConversation] = useState('team');

  const conversations = [
    { id: 'team', name: 'Sales Team', unread: 1, online: 3 },
    { id: 'manager', name: 'Maria Garcia', unread: 0, online: 1 },
    { id: 'support', name: 'IT Support', unread: 0, online: 2 },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'You',
        role: 'Sales Person',
        avatar: 'JS',
        content: newMessage,
        timestamp: 'Just now',
        isOwn: true,
        isRead: false,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      onMessageSent();

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response
        const response: Message = {
          id: messages.length + 2,
          sender: 'Maria Garcia',
          role: 'Sales Manager',
          avatar: 'MG',
          content: 'Thanks for the update! Keep up the great work.',
          timestamp: 'Just now',
          isOwn: false,
          isRead: false,
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-[100] flex items-end justify-end">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">Team Chat</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Tabs */}
          <div className="flex gap-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm transition ${
                  activeConversation === conv.id
                    ? 'bg-white text-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{conv.name}</span>
                  {conv.unread > 0 && (
                    <span className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>{conv.online} online</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
            >
              {!message.isOwn && (
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  {message.avatar}
                </div>
              )}
              <div className={`flex-1 ${message.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                {!message.isOwn && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-900">{message.sender}</span>
                    <span className="text-xs text-gray-500">• {message.role}</span>
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-lg max-w-sm ${
                    message.isOwn
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                  {message.isOwn && (
                    <span className="text-xs">
                      {message.isRead ? (
                        <CheckCheck className="w-3 h-3 text-blue-500" />
                      ) : (
                        <Check className="w-3 h-3 text-gray-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>
              {message.isOwn && (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  {message.avatar}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                MG
              </div>
              <div className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

export function NotificationPanel({
  show,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-green-600" />;
      case 'estimate':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'achievement':
        return <TrendingUp className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-white';
    
    switch (type) {
      case 'order':
        return 'bg-green-50 border-green-200';
      case 'estimate':
        return 'bg-blue-50 border-blue-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      case 'message':
        return 'bg-purple-50 border-purple-200';
      case 'achievement':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-[100] flex items-end justify-end">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-white" />
              <h2 className="text-xl text-white">Notifications</h2>
              {unreadCount > 0 && (
                <span className="px-2.5 py-1 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition ${
                filter === 'all'
                  ? 'bg-white text-purple-700'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition ${
                filter === 'unread'
                  ? 'bg-white text-purple-700'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Actions */}
          {notifications.length > 0 && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={onMarkAllAsRead}
                className="flex-1 px-3 py-1.5 bg-white/20 text-white text-xs rounded-lg hover:bg-white/30 transition"
              >
                Mark all as read
              </button>
              <button
                onClick={onClearAll}
                className="flex-1 px-3 py-1.5 bg-white/20 text-white text-xs rounded-lg hover:bg-white/30 transition"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500 text-sm">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition cursor-pointer hover:shadow-md ${
                    getNotificationBg(notification.type, notification.isRead)
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm text-gray-900 font-medium">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {notification.timestamp}
                        </span>
                      </div>
                      {notification.actionUrl && (
                        <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                          View Details →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-white">
          <p className="text-xs text-gray-500 text-center">
            Notifications are updated in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
