import { useState } from 'react';
import { Search, Filter, Plus, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Industrial Bearings #B-2345',
    partNumber: 'B-2345',
    description: 'High-performance industrial bearings for heavy-duty applications',
    price: 45.50,
    stock: 245,
    category: 'Bearings',
    image: 'https://images.unsplash.com/photo-1758873263527-ca53b938fbd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwYmVhcmluZ3MlMjBjb21wb25lbnRzfGVufDF8fHx8MTc2NTQ0MDYxOXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '2',
    name: 'Steel Fasteners Kit #SF-8901',
    partNumber: 'SF-8901',
    description: 'Complete fasteners kit with various sizes and types',
    price: 32.25,
    stock: 189,
    category: 'Fasteners',
    image: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFydHMlMjB0b29sc3xlbnwxfHx8fDE3NjU0NDA2MTh8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '3',
    name: 'Hydraulic Pump #HP-5467',
    partNumber: 'HP-5467',
    description: 'Reliable hydraulic pump for industrial machinery',
    price: 285.00,
    stock: 56,
    category: 'Hydraulics',
    image: 'https://images.unsplash.com/photo-1740344953537-3115e46da591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwbW90b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDQwNjE5fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '4',
    name: 'Electric Motor 5HP #EM-3421',
    partNumber: 'EM-3421',
    description: '5 horsepower electric motor for various industrial applications',
    price: 425.75,
    stock: 34,
    category: 'Motors',
    image: 'https://images.unsplash.com/photo-1740344953537-3115e46da591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwbW90b3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDQwNjE5fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '5',
    name: 'Premium Lubricant #PL-9876',
    partNumber: 'PL-9876',
    description: 'High-quality industrial lubricant for machinery maintenance',
    price: 18.50,
    stock: 312,
    category: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1758873263528-6dbd0422cf84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFydHMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1NDQwMzgwfDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '6',
    name: 'Cutting Tools Set #CT-4532',
    partNumber: 'CT-4532',
    description: 'Professional grade cutting tools for precision work',
    price: 156.00,
    stock: 78,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFydHMlMjB0b29sc3xlbnwxfHx8fDE3NjU0NDA2MTh8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '7',
    name: 'Safety Gear Bundle #SG-7821',
    partNumber: 'SG-7821',
    description: 'Complete safety equipment bundle for workers',
    price: 89.99,
    stock: 156,
    category: 'Safety',
    image: 'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnZlbnRvcnl8ZW58MXx8fHwxNzY1NDIyMjI2fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '8',
    name: 'Conveyor Belt Parts #CB-8765',
    partNumber: 'CB-8765',
    description: 'Replacement parts for industrial conveyor systems',
    price: 234.50,
    stock: 42,
    category: 'Parts',
    image: 'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwbWFjaGluZXJ5fGVufDF8fHx8MTc2NTQ0MDM4MHww&ixlib=rb-4.1.0&q=80&w=400',
  },
];

const categories = ['All', 'Bearings', 'Fasteners', 'Hydraulics', 'Motors', 'Maintenance', 'Tools', 'Safety', 'Parts'];

export default function CatalogSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under50') matchesPrice = product.price < 50;
    else if (priceRange === '50to200') matchesPrice = product.price >= 50 && product.price <= 200;
    else if (priceRange === 'over200') matchesPrice = product.price > 200;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Product Catalog</h1>
        <p className="text-gray-600 mt-1">Browse and search our complete product inventory</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, part number, or description..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 text-sm mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 text-sm mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to200">$50 - $200</option>
              <option value="over200">Over $200</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 text-sm mb-2">Availability</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="all">All Products</option>
              <option value="instock">In Stock</option>
              <option value="lowstock">Low Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="text-gray-900">{filteredProducts.length}</span> products
        </p>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
          <option value="relevance">Sort by: Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.stock > 100 ? 'bg-green-100 text-green-700' : 
                  product.stock > 50 ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>

            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mb-2">
                {product.category}
              </span>
              <h4 className="text-gray-900 mb-1 group-hover:text-blue-600 transition">{product.name}</h4>
              <p className="text-gray-600 text-xs mb-2">Part #: {product.partNumber}</p>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-900 text-xl">${product.price.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm flex items-center justify-center gap-1">
                  <Plus className="w-4 h-4" />
                  Estimate
                </button>
                <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm flex items-center justify-center gap-1">
                  <ShoppingCart className="w-4 h-4" />
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
