import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, DollarSign, LayoutGrid, List } from 'lucide-react';
import OrdersKanban from './OrdersKanban';

const orders = [
  {
    id: 'ORD-3456',
    customer: 'ABC Manufacturing Corp',
    amount: '$12,450',
    status: 'submitted',
    date: '2025-12-08',
    salesPerson: 'John Doe',
  },
  {
    id: 'ORD-3455',
    customer: 'XYZ Industries Inc',
    amount: '$8,750',
    status: 'pending',
    date: '2025-12-10',
    salesPerson: 'John Doe',
  },
  {
    id: 'ORD-3454',
    customer: 'Global Tech Solutions',
    amount: '$15,230',
    status: 'delivered',
    date: '2025-12-05',
    salesPerson: 'John Doe',
  },
  {
    id: 'ORD-3453',
    customer: 'Premier Manufacturing',
    amount: '$9,870',
    status: 'in-transit',
    date: '2025-12-07',
    salesPerson: 'Jane Smith',
  },
  {
    id: 'ORD-3452',
    customer: 'Innovative Systems LLC',
    amount: '$22,340',
    status: 'delivered',
    date: '2025-12-03',
    salesPerson: 'John Doe',
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  submitted: 'bg-blue-100 text-blue-700',
  'in-transit': 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your sales orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm">List</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                viewMode === 'kanban'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm">Kanban</span>
            </button>
          </div>
          <Link
            to="/orders/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Create Order
          </Link>
        </div>
      </div>

      {/* Stats */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Total Orders</p>
            <p className="text-gray-900 text-2xl">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Pending</p>
            <p className="text-gray-900 text-2xl">
              {orders.filter((o) => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Delivered</p>
            <p className="text-gray-900 text-2xl">
              {orders.filter((o) => o.status === 'delivered').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Total Value</p>
            <p className="text-gray-900 text-2xl">$68,640</p>
          </div>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' ? (
        <OrdersKanban />
      ) : (
        <>
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order number or customer..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Order #</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Customer</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Amount</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Date</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Sales Person</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <Link to={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-700">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span>{order.amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                          {order.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{order.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{order.salesPerson}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}