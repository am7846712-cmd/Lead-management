import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Send, Edit, ShoppingCart } from 'lucide-react';

const estimateData = {
  id: 'EST-2456',
  customer: 'ABC Manufacturing Corp',
  customerEmail: 'contact@abcmfg.com',
  status: 'sent',
  date: '2025-12-08',
  validUntil: '2026-01-08',
  salesPerson: 'John Doe',
  items: [
    {
      id: '1',
      name: 'Industrial Bearings #B-2345',
      partNumber: 'B-2345',
      quantity: 50,
      price: 45.50,
      image: 'https://images.unsplash.com/photo-1758873263527-ca53b938fbd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwYmVhcmluZ3MlMjBjb21wb25lbnRzfGVufDF8fHx8MTc2NTQ0MDYxOXww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: '2',
      name: 'Steel Fasteners Kit #SF-8901',
      partNumber: 'SF-8901',
      quantity: 100,
      price: 32.25,
      image: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFydHMlMjB0b29sc3xlbnwxfHx8fDE3NjU0NDA2MTh8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: '3',
      name: 'Hydraulic Pump #HP-5467',
      partNumber: 'HP-5467',
      quantity: 10,
      price: 285.00,
      image: 'https://images.unsplash.com/photo-1740344953537-3115e46da591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwbW90b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDQwNjE5fDA&ixlib=rb-4.1.0&q=80&w=400',
    },
  ],
};

const subtotal = estimateData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const tax = subtotal * 0.08;
const total = subtotal + tax;

export default function EstimateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const convertToOrder = () => {
    navigate('/orders/create');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link to="/estimates" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Estimates
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900">Estimate {estimateData.id}</h1>
            <p className="text-gray-600 mt-1">Created on {estimateData.date}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Send className="w-4 h-4" />
              Send to Customer
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estimate Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Estimate Information</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {estimateData.status}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Customer</p>
                <p className="text-gray-900">{estimateData.customer}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-gray-900">{estimateData.customerEmail}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Created Date</p>
                <p className="text-gray-900">{estimateData.date}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Valid Until</p>
                <p className="text-gray-900">{estimateData.validUntil}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Sales Person</p>
                <p className="text-gray-900">{estimateData.salesPerson}</p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Line Items</h3>
            <div className="space-y-4">
              {estimateData.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">Part #: {item.partNumber}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-700">Qty: {item.quantity}</span>
                      <span className="text-gray-700">Price: ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-gray-900 text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={convertToOrder}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Convert to Order
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Duplicate Estimate
              </button>
              <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
                Delete Estimate
              </button>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h4 className="text-gray-900 mb-2">Status</h4>
            <p className="text-gray-700 text-sm mb-3">
              This estimate was sent to the customer on {estimateData.date}.
            </p>
            <p className="text-gray-600 text-xs">
              Valid until: {estimateData.validUntil}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
