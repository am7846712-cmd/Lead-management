import { X, Search, Filter, Eye, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import { useState } from 'react';
import { Estimate, Order } from '../App';

interface EstimatesListModalProps {
  show: boolean;
  onClose: () => void;
  estimates: Estimate[];
  onViewDetails: (estimate: Estimate) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

interface OrdersListModalProps {
  show: boolean;
  onClose: () => void;
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onUpdateStatus?: (id: string, status: Order['status']) => void;
}

export function EstimatesListModal({
  show,
  onClose,
  estimates,
  onViewDetails,
  onApprove,
  onReject,
}: EstimatesListModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Estimate['status']>('all');

  if (!show) return null;

  const filteredEstimates = estimates.filter((est) => {
    const matchesSearch =
      est.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || est.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Estimate['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'converted':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const statusCounts = {
    all: estimates.length,
    pending: estimates.filter((e) => e.status === 'pending').length,
    approved: estimates.filter((e) => e.status === 'approved').length,
    rejected: estimates.filter((e) => e.status === 'rejected').length,
    converted: estimates.filter((e) => e.status === 'converted').length,
    draft: estimates.filter((e) => e.status === 'draft').length,
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[105] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-gray-900">All Estimates</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredEstimates.length} of {estimates.length} estimates
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, customer, or salesperson..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="all">All Status ({statusCounts.all})</option>
                <option value="pending">Pending ({statusCounts.pending})</option>
                <option value="approved">Approved ({statusCounts.approved})</option>
                <option value="rejected">Rejected ({statusCounts.rejected})</option>
                <option value="converted">Converted ({statusCounts.converted})</option>
                <option value="draft">Draft ({statusCounts.draft})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredEstimates.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No estimates found matching your criteria</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Estimate ID</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Customer</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Created By</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Total Amount</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Status</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Date</th>
                    <th className="text-center text-xs text-gray-700 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEstimates.map((estimate) => (
                    <tr
                      key={estimate.id}
                      className="border-b border-gray-100 hover:bg-blue-50 transition"
                    >
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900 font-mono">{estimate.id}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{estimate.customer}</p>
                        <p className="text-xs text-gray-500">{estimate.contactName}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-700">{estimate.createdBy}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="text-sm text-green-700 font-mono">
                          ${estimate.total.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            estimate.status
                          )}`}
                        >
                          {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-700">{estimate.createdDate}</p>
                        <p className="text-xs text-gray-500">{estimate.createdTime}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              onViewDetails(estimate);
                              onClose();
                            }}
                            className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {estimate.status === 'pending' && onApprove && onReject && (
                            <>
                              <button
                                onClick={() => onApprove(estimate.id)}
                                className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onReject(estimate.id)}
                                className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Total Value: <span className="font-mono text-gray-900">${filteredEstimates.reduce((sum, est) => sum + est.total, 0).toLocaleString()}</span>
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrdersListModal({
  show,
  onClose,
  orders,
  onViewDetails,
  onUpdateStatus,
}: OrdersListModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');

  if (!show) return null;

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.poNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[105] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-gray-900">All Orders</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredOrders.length} of {orders.length} orders
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, customer, PO number, or salesperson..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="all">All Status ({statusCounts.all})</option>
                <option value="pending">Pending ({statusCounts.pending})</option>
                <option value="processing">Processing ({statusCounts.processing})</option>
                <option value="shipped">Shipped ({statusCounts.shipped})</option>
                <option value="delivered">Delivered ({statusCounts.delivered})</option>
                <option value="cancelled">Cancelled ({statusCounts.cancelled})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No orders found matching your criteria</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Order ID</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">PO Number</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Customer</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Created By</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Total Amount</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Status</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Date</th>
                    <th className="text-center text-xs text-gray-700 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-green-50 transition"
                    >
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900 font-mono">{order.id}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-700 font-mono">{order.poNumber}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.contactName}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-700">{order.createdBy}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="text-sm text-green-700 font-mono">
                          ${order.total.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-700">{order.createdDate}</p>
                        <p className="text-xs text-gray-500">{order.createdTime}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              onViewDetails(order);
                              onClose();
                            }}
                            className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Total Value: <span className="font-mono text-gray-900">${filteredOrders.reduce((sum, ord) => sum + ord.total, 0).toLocaleString()}</span>
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
