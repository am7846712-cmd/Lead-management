import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Plus, Phone, Mail, Calendar, Package } from 'lucide-react';
import { useState } from 'react';

const customerData = {
  id: '1',
  name: 'ABC Manufacturing Corp',
  city: 'Chicago',
  state: 'IL',
  zip: '60601',
  address: '123 Industrial Pkwy',
};

const kpiData = [
  { label: 'Sales WTD', value: '$4,250', change: 8.5, changeType: 'up' },
  { label: 'Sales MTD', value: '$18,450', change: 12.3, changeType: 'up' },
  { label: 'Sales YTD', value: '$142,560', change: -3.2, changeType: 'down' },
  { label: 'Sales LTD', value: '$485,920', change: 15.7, changeType: 'up' },
];

const topProducts = [
  { name: 'Industrial Bearings #B-2345', quantity: 245, value: '$12,450' },
  { name: 'Steel Fasteners Kit #SF-8901', quantity: 189, value: '$9,870' },
  { name: 'Hydraulic Pump #HP-5467', quantity: 56, value: '$8,540' },
  { name: 'Electric Motor 5HP #EM-3421', quantity: 34, value: '$7,890' },
  { name: 'Safety Gear Bundle #SG-7821', quantity: 123, value: '$6,750' },
];

const notPurchasedProducts = [
  { name: 'Premium Lubricant #PL-9876', lastPurchase: '2025-08-15', category: 'Maintenance' },
  { name: 'Cutting Tools Set #CT-4532', lastPurchase: '2025-07-22', category: 'Tools' },
  { name: 'Welding Supplies #WS-2341', lastPurchase: '2025-09-01', category: 'Supplies' },
  { name: 'Conveyor Belt Parts #CB-8765', lastPurchase: '2025-08-28', category: 'Parts' },
];

const notes = [
  {
    id: 1,
    text: 'Customer interested in bulk pricing for bearings. Follow up next week.',
    author: 'John Doe',
    date: '2025-12-08 10:30 AM',
  },
  {
    id: 2,
    text: 'Discussed new product line for Q1 2026. Will send catalog.',
    author: 'John Doe',
    date: '2025-12-05 2:15 PM',
  },
  {
    id: 3,
    text: 'Payment terms extended to Net 45 as per agreement.',
    author: 'Sarah Johnson',
    date: '2025-11-28 9:45 AM',
  },
];

const contacts = [
  { name: 'Michael Chen', role: 'Purchasing Manager', phone: '(312) 555-0123', email: 'mchen@abcmfg.com' },
  { name: 'Lisa Rodriguez', role: 'Operations Director', phone: '(312) 555-0124', email: 'lrodriguez@abcmfg.com' },
  { name: 'David Kim', role: 'Maintenance Supervisor', phone: '(312) 555-0125', email: 'dkim@abcmfg.com' },
];

const orders = [
  { id: 'ORD-2456', date: '2025-12-08', amount: '$12,450', status: 'Delivered' },
  { id: 'ORD-2389', date: '2025-12-01', amount: '$8,750', status: 'Delivered' },
  { id: 'ORD-2301', date: '2025-11-22', amount: '$15,230', status: 'Delivered' },
  { id: 'ORD-2245', date: '2025-11-15', amount: '$9,870', status: 'Delivered' },
];

export default function CustomerDashboard() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'notes' | 'not-purchased' | 'contacts'>('overview');
  const [newNote, setNewNote] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'notes', label: 'Notes' },
    { id: 'not-purchased', label: 'Products Not Purchased' },
    { id: 'contacts', label: 'Contacts' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link to="/customers" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900">{customerData.name}</h1>
            <p className="text-gray-600 mt-1">
              {customerData.address}, {customerData.city}, {customerData.state} {customerData.zip}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/estimates/create"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Create Estimate
            </Link>
            <Link
              to="/orders/create"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Order
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-gray-900 text-3xl">{kpi.value}</p>
              <div className={`flex items-center gap-1 ${kpi.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.changeType === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{Math.abs(kpi.change)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Top 10 Ordered Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-700 text-sm">Product Name</th>
                        <th className="px-4 py-3 text-left text-gray-700 text-sm">Quantity</th>
                        <th className="px-4 py-3 text-left text-gray-700 text-sm">Total Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {topProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900 text-sm">{product.name}</td>
                          <td className="px-4 py-3 text-gray-700 text-sm">{product.quantity}</td>
                          <td className="px-4 py-3 text-gray-900 text-sm">{product.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-4">Products Not Purchased (Last 12 Weeks)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notPurchasedProducts.map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-900 text-sm">{product.name}</p>
                        </div>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs">Last purchase: {product.lastPurchase}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-gray-900 mb-4">Order History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700 text-sm">Order ID</th>
                      <th className="px-4 py-3 text-left text-gray-700 text-sm">Date</th>
                      <th className="px-4 py-3 text-left text-gray-700 text-sm">Amount</th>
                      <th className="px-4 py-3 text-left text-gray-700 text-sm">Status</th>
                      <th className="px-4 py-3 text-left text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900 text-sm">{order.id}</td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{order.date}</td>
                        <td className="px-4 py-3 text-gray-900 text-sm">{order.amount}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link to={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-700 text-sm">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-4">Add Note</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter your note..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Plus className="w-4 h-4" />
                    Add Note
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-4">Note Timeline</h3>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                      <p className="text-gray-900 mb-2">{note.text}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{note.author}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {note.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Not Purchased Tab */}
          {activeTab === 'not-purchased' && (
            <div>
              <h3 className="text-gray-900 mb-4">Products Not Purchased in Last 12 Weeks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notPurchasedProducts.map((product, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <Package className="w-8 h-8 text-gray-400" />
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-900 text-sm mb-2">{product.name}</p>
                    <p className="text-gray-500 text-xs mb-3">Last purchase: {product.lastPurchase}</p>
                    <button className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm">
                      Add to Estimate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Contact List</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Plus className="w-4 h-4" />
                  Add Contact
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 mb-1">{contact.name}</p>
                    <p className="text-gray-600 text-sm mb-3">{contact.role}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
