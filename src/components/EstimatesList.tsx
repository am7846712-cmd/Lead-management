import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, DollarSign, LayoutGrid, List } from 'lucide-react';
import EstimatesKanban from './EstimatesKanban';

const estimates = [
  {
    id: 'EST-2456',
    customer: 'ABC Manufacturing Corp',
    amount: '$12,450',
    status: 'sent',
    date: '2025-12-08',
    salesPerson: 'John Doe',
  },
  {
    id: 'EST-2455',
    customer: 'XYZ Industries Inc',
    amount: '$8,750',
    status: 'draft',
    date: '2025-12-10',
    salesPerson: 'John Doe',
  },
  {
    id: 'EST-2454',
    customer: 'Global Tech Solutions',
    amount: '$15,230',
    status: 'accepted',
    date: '2025-12-05',
    salesPerson: 'John Doe',
  },
  {
    id: 'EST-2453',
    customer: 'Premier Manufacturing',
    amount: '$9,870',
    status: 'sent',
    date: '2025-12-07',
    salesPerson: 'Jane Smith',
  },
  {
    id: 'EST-2452',
    customer: 'Innovative Systems LLC',
    amount: '$22,340',
    status: 'accepted',
    date: '2025-12-03',
    salesPerson: 'John Doe',
  },
  {
    id: 'EST-2451',
    customer: 'Midwest Industrial Supply',
    amount: '$6,580',
    status: 'rejected',
    date: '2025-12-01',
    salesPerson: 'Jane Smith',
  },
];

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function EstimatesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estimate.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || estimate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Estimates</h1>
          <p className="text-gray-600 mt-1">Manage and track your sales estimates</p>
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
            to="/estimates/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Create Estimate
          </Link>
        </div>
      </div>

      {/* Stats */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Total Estimates</p>
            <p className="text-gray-900 text-2xl">{estimates.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Draft</p>
            <p className="text-gray-900 text-2xl">
              {estimates.filter((e) => e.status === 'draft').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Accepted</p>
            <p className="text-gray-900 text-2xl">
              {estimates.filter((e) => e.status === 'accepted').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-gray-600 text-sm mb-1">Total Value</p>
            <p className="text-gray-900 text-2xl">$75,220</p>
          </div>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === 'kanban' ? (
        <EstimatesKanban />
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
                  placeholder="Search by estimate number or customer..."
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
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Estimates Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Estimate #</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Customer</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Amount</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Date</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Sales Person</th>
                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEstimates.map((estimate) => (
                    <tr key={estimate.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <Link to={`/estimates/${estimate.id}`} className="text-blue-600 hover:text-blue-700">
                          {estimate.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{estimate.customer}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span>{estimate.amount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[estimate.status]}`}>
                          {estimate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{estimate.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{estimate.salesPerson}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/estimates/${estimate.id}`}
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