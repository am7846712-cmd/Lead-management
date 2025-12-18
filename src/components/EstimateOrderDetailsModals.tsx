import { X, CheckCircle, XCircle, Calendar, User, Mail, Phone, Package, FileText, DollarSign, Clock } from 'lucide-react';
import { Estimate, Order } from '../App';

interface EstimateDetailsModalProps {
  show: boolean;
  onClose: () => void;
  estimate: Estimate;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onConvert?: (id: string) => void;
  isManager?: boolean;
}

interface OrderDetailsModalProps {
  show: boolean;
  onClose: () => void;
  order: Order;
  onUpdateStatus?: (id: string, status: Order['status']) => void;
  isManager?: boolean;
}

export function EstimateDetailsModal({
  show,
  onClose,
  estimate,
  onApprove,
  onReject,
  onConvert,
  isManager = false,
}: EstimateDetailsModalProps) {
  if (!show) return null;

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

  return (
    <div className="fixed inset-0 bg-black/40 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-xl text-gray-900">Estimate Details</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {estimate.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status and Info Bar */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">Status</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full inline-block ${getStatusColor(estimate.status)}`}>
                {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">Created</p>
              </div>
              <p className="text-sm text-gray-900">{estimate.createdDate}</p>
              <p className="text-xs text-gray-500">{estimate.createdTime}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
            <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Company Name</p>
                <p className="text-sm text-gray-900">{estimate.customer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Contact Person</p>
                <p className="text-sm text-gray-900">{estimate.contactName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </p>
                <p className="text-sm text-blue-600">{estimate.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </p>
                <p className="text-sm text-gray-900">{estimate.phone}</p>
              </div>
            </div>
          </div>

          {/* Created By */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-700" />
              <p className="text-sm text-purple-900">
                <span className="text-purple-700">Created by:</span> {estimate.createdBy}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Line Items
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">SKU</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Description</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Qty</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Unit Price</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900 font-mono">{item.sku}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right">{item.qty}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right font-mono">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right font-mono">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                  <tr>
                    <td colSpan={4} className="py-3 px-4 text-right text-sm text-gray-700">
                      <strong>Total Amount:</strong>
                    </td>
                    <td className="py-3 px-4 text-right text-lg text-blue-900 font-mono">
                      <strong>${estimate.total.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          {estimate.notes && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </h3>
              <p className="text-sm text-gray-900">{estimate.notes}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {isManager && estimate.status === 'pending' && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
            <button
              onClick={() => {
                if (onReject) onReject(estimate.id);
                onClose();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={() => {
                if (onApprove) onApprove(estimate.id);
                onClose();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function OrderDetailsModal({
  show,
  onClose,
  order,
  onUpdateStatus,
  isManager = false,
}: OrderDetailsModalProps) {
  if (!show) return null;

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

  return (
    <div className="fixed inset-0 bg-black/40 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50">
          <div>
            <h2 className="text-xl text-gray-900">Order Details</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status and Info Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">Status</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full inline-block ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">Created</p>
              </div>
              <p className="text-sm text-gray-900">{order.createdDate}</p>
              <p className="text-xs text-gray-500">{order.createdTime}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600">PO Number</p>
              </div>
              <p className="text-sm text-gray-900 font-mono">{order.poNumber}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
            <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Company Name</p>
                <p className="text-sm text-gray-900">{order.customer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Contact Person</p>
                <p className="text-sm text-gray-900">{order.contactName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </p>
                <p className="text-sm text-green-600">{order.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </p>
                <p className="text-sm text-gray-900">{order.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping and Created By */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-blue-700" />
                <p className="text-sm text-blue-900">
                  <span className="text-blue-700">Shipping Method:</span> {order.shippingMethod}
                </p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-700" />
                <p className="text-sm text-purple-900">
                  <span className="text-purple-700">Created by:</span> {order.createdBy}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Line Items
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">SKU</th>
                    <th className="text-left text-xs text-gray-700 py-3 px-4">Description</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Qty</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Unit Price</th>
                    <th className="text-right text-xs text-gray-700 py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900 font-mono">{item.sku}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right">{item.qty}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right font-mono">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right font-mono">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-green-50 border-t-2 border-green-200">
                  <tr>
                    <td colSpan={4} className="py-3 px-4 text-right text-sm text-gray-700">
                      <strong>Total Amount:</strong>
                    </td>
                    <td className="py-3 px-4 text-right text-lg text-green-900 font-mono">
                      <strong>${order.total.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h3 className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </h3>
              <p className="text-sm text-gray-900">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {isManager && order.status === 'pending' && onUpdateStatus && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
            <button
              onClick={() => {
                onUpdateStatus(order.id, 'cancelled');
                onClose();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Cancel Order
            </button>
            <button
              onClick={() => {
                onUpdateStatus(order.id, 'processing');
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Process Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
