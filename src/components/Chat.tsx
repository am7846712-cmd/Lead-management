import { useState } from 'react';
import { Send, Search, User, MoreVertical } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: 'Manager - Sales Team',
    lastMessage: 'Great work on the ABC Manufacturing deal!',
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Can you help with the XYZ estimate?',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the product catalog',
    time: 'Monday',
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: '1',
    sender: 'Manager',
    text: 'Hey team, great job on closing the ABC Manufacturing deal! The margin was excellent.',
    time: '10:15 AM',
    isOwn: false,
  },
  {
    id: '2',
    sender: 'You',
    text: 'Thank you! I appreciate the feedback. The customer was very happy with the pricing.',
    time: '10:20 AM',
    isOwn: true,
  },
  {
    id: '3',
    sender: 'Manager',
    text: "Let's discuss the Q1 strategy in our next meeting. Can you prepare a summary of your top accounts?",
    time: '10:25 AM',
    isOwn: false,
  },
  {
    id: '4',
    sender: 'You',
    text: 'Absolutely! I\'ll have it ready by tomorrow. Should I include the pipeline analysis as well?',
    time: '10:28 AM',
    isOwn: true,
  },
  {
    id: '5',
    sender: 'Manager',
    text: 'Great work on the ABC Manufacturing deal!',
    time: '10:30 AM',
    isOwn: false,
  },
];

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput('');
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-120px)]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-900 mb-3">Messages</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition text-left ${
                  selectedChat === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-gray-900 text-sm truncate">{conv.name}</p>
                      <span className="text-gray-500 text-xs">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600 text-sm truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <p className="text-gray-900">Manager - Sales Team</p>
                <p className="text-gray-500 text-xs">Active now</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                  {!message.isOwn && (
                    <p className="text-gray-600 text-xs mb-1 ml-1">{message.sender}</p>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-gray-500 text-xs mt-1 ${message.isOwn ? 'text-right mr-1' : 'ml-1'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
