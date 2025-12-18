import { Search, Filter, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const customers = [
  {
    id: '1',
    name: 'ABC Manufacturing Corp',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    salesYTD: '$142,560',
    lastOrder: '2025-12-08',
    status: 'active',
  },
  {
    id: '2',
    name: 'XYZ Industries Inc',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    salesYTD: '$98,430',
    lastOrder: '2025-12-10',
    status: 'active',
  },
  {
    id: '3',
    name: 'Global Tech Solutions',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    salesYTD: '$215,890',
    lastOrder: '2025-12-11',
    status: 'active',
  },
  {
    id: '4',
    name: 'Premier Manufacturing',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    salesYTD: '$87,650',
    lastOrder: '2025-11-28',
    status: 'active',
  },
  {
    id: '5',
    name: 'Innovative Systems LLC',
    city: 'Boston',
    state: 'MA',
    zip: '02101',
    salesYTD: '$156,320',
    lastOrder: '2025-12-09',
    status: 'active',
  },
  {
    id: '6',
    name: 'Midwest Industrial Supply',
    city: 'Detroit',
    state: 'MI',
    zip: '48201',
    salesYTD: '$124,780',
    lastOrder: '2025-12-07',
    status: 'active',
  },
  {
    id: '7',
    name: 'Pacific Coast Equipment',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    salesYTD: '$198,540',
    lastOrder: '2025-12-11',
    status: 'active',
  },
  {
    id: '8',
    name: 'Southern Manufacturing Co',
    city: 'Atlanta',
    state: 'GA',
    zip: '30301',
    salesYTD: '$76,430',
    lastOrder: '2025-12-05',
    status: 'active',
  },
];

export default function CustomersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedOnly, setAssignedOnly] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.zip.includes(searchQuery);
    return matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage and view your customer accounts</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, or ZIP code..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={assignedOnly}
                onChange={(e) => setAssignedOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">Assigned to me only</span>
            </label>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Total Customers</p>
          <p className="text-gray-900 text-2xl">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Total Sales YTD</p>
          <p className="text-gray-900 text-2xl">$1,100,600</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Sales per Customer</p>
          <p className="text-gray-900 text-2xl">$137,575</p>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Customer Name</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Location</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Sales YTD</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Last Order</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <Link to={`/customers/${customer.id}`} className="text-blue-600 hover:text-blue-700">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {customer.city}, {customer.state} {customer.zip}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>{customer.salesYTD}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{customer.lastOrder}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/customers/${customer.id}`}
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
    </div>
  );
}
