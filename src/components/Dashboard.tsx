import { TrendingUp, TrendingDown, Plus, FileText, ShoppingCart, Package, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const kpiData = [
  { label: 'Sales WTD', value: '$28,450', change: 12.5, changeType: 'up' },
  { label: 'Sales MTD', value: '$142,850', change: 8.3, changeType: 'up' },
  { label: 'Sales YTD', value: '$1,245,680', change: -2.1, changeType: 'down' },
  { label: 'Sales LTD', value: '$3,847,920', change: 15.7, changeType: 'up' },
];

const topItemsData = [
  { name: 'Product A', value: 12450 },
  { name: 'Product B', value: 10230 },
  { name: 'Product C', value: 9870 },
  { name: 'Product D', value: 8540 },
  { name: 'Product E', value: 7890 },
  { name: 'Product F', value: 6750 },
  { name: 'Product G', value: 5430 },
  { name: 'Product H', value: 4320 },
  { name: 'Product I', value: 3210 },
  { name: 'Product J', value: 2890 },
];

const topCustomers = [
  { name: 'ABC Manufacturing', sales: '$45,230', lastOrder: '2025-12-08' },
  { name: 'XYZ Industries', sales: '$38,450', lastOrder: '2025-12-09' },
  { name: 'Global Tech Co', sales: '$32,890', lastOrder: '2025-12-10' },
  { name: 'Premier Solutions', sales: '$28,650', lastOrder: '2025-12-07' },
  { name: 'Innovative Systems', sales: '$24,320', lastOrder: '2025-12-11' },
];

const promotions = [
  { id: 1, title: '20% Off Industrial Parts', discount: '20%', validUntil: '2025-12-31' },
  { id: 2, title: 'Buy 2 Get 1 Free - Fasteners', discount: 'BOGO', validUntil: '2025-12-25' },
  { id: 3, title: 'Clearance Sale - Tools', discount: '35%', validUntil: '2025-12-20' },
  { id: 4, title: 'Winter Special - Lubricants', discount: '15%', validUntil: '2026-01-15' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your performance overview.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/leads/create"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <Plus className="w-4 h-4" />
            Create Lead
          </Link>
          <Link
            to="/estimates/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <FileText className="w-4 h-4" />
            Create Estimate
          </Link>
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
            <p className="text-gray-500 text-xs mt-2">vs previous period</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Items Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Top 10 Items by Sales Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topItemsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Top 10 Customers by Sales</h3>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm">{customer.name}</p>
                    <p className="text-gray-500 text-xs">Last order: {customer.lastOrder}</p>
                  </div>
                </div>
                <p className="text-gray-900">{customer.sales}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Sales Heat Map by ZIP Code</h3>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg h-80 flex items-center justify-center border border-gray-200">
          <div className="text-center">
            <Package className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive ZIP code heat map</p>
            <p className="text-gray-500 text-sm mt-2">Sales intensity visualization by region</p>
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Active Promotions & Surplus Items</h3>
          <Link to="/promotions" className="text-blue-600 hover:text-blue-700 text-sm">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-sm">{promo.discount}</span>
                </div>
              </div>
              <h4 className="text-gray-900 text-sm mb-2">{promo.title}</h4>
              <p className="text-gray-500 text-xs">Valid until {promo.validUntil}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/leads/create"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-xl transition group"
        >
          <Users className="w-8 h-8 mb-3 opacity-90" />
          <h4 className="mb-1">Create Lead</h4>
          <p className="text-blue-100 text-sm">Add new sales opportunity</p>
        </Link>

        <Link
          to="/estimates/create"
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 hover:shadow-xl transition group"
        >
          <FileText className="w-8 h-8 mb-3 opacity-90" />
          <h4 className="mb-1">Create Estimate</h4>
          <p className="text-indigo-100 text-sm">Generate price quote</p>
        </Link>

        <Link
          to="/orders/create"
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-xl transition group"
        >
          <ShoppingCart className="w-8 h-8 mb-3 opacity-90" />
          <h4 className="mb-1">Create Order</h4>
          <p className="text-purple-100 text-sm">Submit new order</p>
        </Link>

        <Link
          to="/catalog"
          className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 hover:shadow-xl transition group"
        >
          <Package className="w-8 h-8 mb-3 opacity-90" />
          <h4 className="mb-1">View Catalog</h4>
          <p className="text-teal-100 text-sm">Browse products</p>
        </Link>
      </div>
    </div>
  );
}
