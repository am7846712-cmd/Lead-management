import { useState } from 'react';
import { ArrowLeft, Search, Plus, Minus, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const products = [
  {
    id: '1',
    name: 'Industrial Bearings #B-2345',
    partNumber: 'B-2345',
    price: 45.50,
    stock: 245,
    image: 'https://images.unsplash.com/photo-1758873263527-ca53b938fbd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwYmVhcmluZ3MlMjBjb21wb25lbnRzfGVufDF8fHx8MTc2NTQ0MDYxOXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '2',
    name: 'Steel Fasteners Kit #SF-8901',
    partNumber: 'SF-8901',
    price: 32.25,
    stock: 189,
    image: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFydHMlMjB0b29sc3xlbnwxfHx8fDE3NjU0NDA2MTh8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '3',
    name: 'Hydraulic Pump #HP-5467',
    partNumber: 'HP-5467',
    price: 285.00,
    stock: 56,
    image: 'https://images.unsplash.com/photo-1740344953537-3115e46da591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwbW90b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDQwNjE5fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '4',
    name: 'Electric Motor 5HP #EM-3421',
    partNumber: 'EM-3421',
    price: 425.75,
    stock: 34,
    image: 'https://images.unsplash.com/photo-1740344953537-3115e46da591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwbW90b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDQwNjE5fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

export default function CreateOrder() {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<{ product: typeof products[0]; quantity: number }>>([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItem = (product: typeof products[0]) => {
    const existing = selectedItems.find((item) => item.product.id === product.id);
    if (existing) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setSelectedItems([...selectedItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedItems(selectedItems.filter((item) => item.product.id !== productId));
    } else {
      setSelectedItems(
        selectedItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = () => {
    navigate('/orders');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link to="/orders" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <h1 className="text-gray-900">Create Order</h1>
        <p className="text-gray-600 mt-1">Build a new order for your customer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Customer</h3>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Select Customer</option>
              <option value="1">ABC Manufacturing Corp</option>
              <option value="2">XYZ Industries Inc</option>
              <option value="3">Global Tech Solutions</option>
              <option value="4">Premier Manufacturing</option>
            </select>
          </div>

          {/* Product Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Add Products</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or part number..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => addItem(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-gray-900 text-sm mb-1">{product.name}</h4>
                  <p className="text-gray-600 text-xs mb-2">Part #: {product.partNumber}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Items & Summary */}
        <div className="space-y-6">
          {/* Selected Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Selected Items ({selectedItems.length})</h3>
            {selectedItems.length > 0 ? (
              <div className="space-y-4">
                {selectedItems.map((item) => (
                  <div key={item.product.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex gap-3 mb-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm truncate">{item.product.name}</p>
                        <p className="text-gray-600 text-xs">{item.product.partNumber}</p>
                        <p className="text-gray-900 text-sm mt-1">${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No items selected</p>
                <p className="text-xs mt-1">Search and add products above</p>
              </div>
            )}
          </div>

          {/* Summary */}
          {selectedItems.length > 0 && (
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
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900 text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
              >
                <Send className="w-4 h-4" />
                Submit Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
