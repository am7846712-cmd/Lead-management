import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Truck, CheckCircle, Clock, Package } from 'lucide-react';

const orderData = {
  id: 'ORD-3456',
  customer: 'ABC Manufacturing Corp',
  customerEmail: 'contact@abcmfg.com',
  customerAddress: '123 Industrial Pkwy, Chicago, IL 60601',
  status: 'in-transit',
  orderDate: '2025-12-08',
  expectedDelivery: '2025-12-15',
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

const statusSteps = [
  { name: 'Created', status: 'completed', icon: CheckCircle },
  { name: 'Submitted', status: 'completed', icon: CheckCircle },
  { name: 'In Transit', status: 'active', icon: Truck },
  { name: 'Delivered', status: 'pending', icon: Package },
];

const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const tax = subtotal * 0.08;
const total = subtotal + tax;

export default function OrderDetail() {
  const { id } = useParams();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link to="/orders" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900">Order {orderData.id}</h1>
            <p className="text-gray-600 mt-1">Placed on {orderData.orderDate}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Order Status</h3>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
            <div className="h-full bg-blue-600" style={{ width: '66.66%' }}></div>
          </div>
          {statusSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.name} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : step.status === 'active'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`text-sm ${
                    step.status === 'completed' || step.status === 'active'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Order Information</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                {orderData.status.replace('-', ' ')}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Customer</p>
                <p className="text-gray-900">{orderData.customer}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-gray-900">{orderData.customerEmail}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Order Date</p>
                <p className="text-gray-900">{orderData.orderDate}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Expected Delivery</p>
                <p className="text-gray-900">{orderData.expectedDelivery}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Sales Person</p>
                <p className="text-gray-900">{orderData.salesPerson}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Shipping Address</p>
                <p className="text-gray-900 text-sm">{orderData.customerAddress}</p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderData.items.map((item) => (
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
            <h3 className="text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-gray-900 text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Tracking Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="text-gray-900">In Transit</h4>
                <p className="text-gray-600 text-sm">Expected: {orderData.expectedDelivery}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Your order is currently being shipped and should arrive by the expected delivery date.
            </p>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Track Shipment
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Contact Customer
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Reorder Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
