import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  FileText,
  Tag,
  Wrench,
  UserPlus,
  ChevronRight,
  Activity,
  BarChart3,
  Zap,
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesTrendData = [
  { day: 'Mon', sales: 18500 },
  { day: 'Tue', sales: 21200 },
  { day: 'Wed', sales: 19800 },
  { day: 'Thu', sales: 24500 },
  { day: 'Fri', sales: 23100 },
  { day: 'Sat', sales: 12300 },
  { day: 'Sun', sales: 9800 },
];

const topProductsData = [
  { name: 'FB-001', value: 18500, qty: 420 },
  { name: 'FB-031', value: 16200, qty: 310 },
  { name: 'FB-044', value: 14800, qty: 185 },
  { name: 'FB-099', value: 8500, qty: 140 },
  { name: 'FB-055', value: 6200, qty: 95 },
];

const recentLeads = [
  { id: 'L-456', company: 'Tech Solutions Inc', status: 'hot', value: '$45,000', contact: 'Sarah Miller' },
  { id: 'L-455', company: 'Global Manufacturing', status: 'warm', value: '$28,500', contact: 'Mike Johnson' },
  { id: 'L-454', company: 'Industrial Systems', status: 'cold', value: '$15,200', contact: 'Emily Davis' },
];

const upcomingSchedule = [
  { machine: 'Machine 1', job: 'Shaft Machining', time: 'Morning', status: 'in-progress' },
  { machine: 'Machine 2', job: 'Flange Assembly', time: 'Morning', status: 'scheduled' },
  { machine: 'Machine 4', job: 'Bracket Cutting', time: 'Afternoon', status: 'delayed' },
];

const recentOrders = [
  { id: 'ORD-3456', customer: 'ABC Manufacturing', amount: '$12,450', status: 'submitted' },
  { id: 'ORD-3455', customer: 'XYZ Industries', amount: '$8,750', status: 'pending' },
  { id: 'ORD-3454', customer: 'Global Tech', amount: '$15,230', status: 'delivered' },
];

const inventoryAlerts = [
  { sku: 'OVR-010', item: 'Legacy Sensor V2', onHand: 56, status: 'overstock', offer: '$129' },
  { sku: 'OVR-022', item: 'Bracket Gen1', onHand: 280, status: 'overstock', offer: '$12' },
  { sku: 'LOW-015', item: 'Hydraulic Valve', onHand: 8, status: 'low', offer: '-' },
];

const activePromotions = [
  { title: 'Q4 Bundle - Save 15%', status: 'active' },
  { title: 'Overstock - Up to 40% Off', status: 'active' },
  { title: 'Free Shipping > $1,000', status: 'inactive' },
];

const salesByRegion = [
  { zip: '10001-10299', sales: '$145,320', change: '+12%' },
  { zip: '20001-20599', sales: '$98,750', change: '+8%' },
  { zip: '30001-30399', sales: '$76,430', change: '-3%' },
];

export default function UnifiedDashboard() {
  const [viewMode, setViewMode] = useState<'salesperson' | 'manager'>('salesperson');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white">SO</span>
              </div>
              <div>
                <h1 className="text-gray-900">MT-RSR Sales Ordering System</h1>
                <p className="text-gray-500 text-sm">Tablet - Desktop - Mobile (Unified View)</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded">
                  <Zap className="w-3 h-3" />
                  <span>Fishbowl API</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded">
                  <Package className="w-3 h-3" />
                  <span>Shopify Catalog</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  <Phone className="w-3 h-3" />
                  <span>VoIP (optional)</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('salesperson')}
                  className={`px-3 py-1.5 rounded text-sm transition ${
                    viewMode === 'salesperson'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  S Salesperson View
                </button>
                <button
                  onClick={() => setViewMode('manager')}
                  className={`px-3 py-1.5 rounded text-sm transition ${
                    viewMode === 'manager'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  M Manager View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* My Sales KPIs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h2 className="text-gray-900">My Sales KPIs</h2>
                <p className="text-gray-500 text-sm mt-1">WTD - MTD - YTD - LTD with % change</p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600 text-xs mb-1">WTD</p>
                  <p className="text-gray-900 text-2xl">$18,250</p>
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.3%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">MTD</p>
                  <p className="text-gray-900 text-2xl">$98,420</p>
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8.9%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">YTD</p>
                  <p className="text-gray-900 text-2xl">$1,184,020</p>
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +15.4%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">LTD</p>
                  <p className="text-gray-900 text-2xl">$2,744,050</p>
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +3.2%
                  </p>
                </div>
              </div>
            </div>

            {/* Weekly Sales Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Weekly Sales Trend</h3>
                <Link to="/dashboard" className="text-blue-600 text-sm hover:text-blue-700">
                  View Details →
                </Link>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={salesTrendData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Items by $ and Qty */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Top Items (by $)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topProductsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Top Items (by Qty)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topProductsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6B7280" style={{ fontSize: '11px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="qty" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-gray-700" />
                  <h3 className="text-gray-900">Recent Leads</h3>
                </div>
                <Link to="/leads" className="text-blue-600 text-sm hover:text-blue-700">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          lead.status === 'hot'
                            ? 'bg-red-500'
                            : lead.status === 'warm'
                            ? 'bg-orange-500'
                            : 'bg-blue-500'
                        }`}
                      />
                      <div>
                        <p className="text-gray-900 text-sm">{lead.company}</p>
                        <p className="text-gray-500 text-xs">{lead.contact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 text-sm">{lead.value}</p>
                      <p className="text-gray-500 text-xs">{lead.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  <h3 className="text-gray-900">Recent Orders</h3>
                </div>
                <Link to="/orders" className="text-blue-600 text-sm hover:text-blue-700">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="text-gray-900 text-sm">{order.customer}</p>
                      <p className="text-gray-500 text-xs">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 text-sm">{order.amount}</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'submitted'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales by ZIP (Summary) */}
            {viewMode === 'manager' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-700" />
                    <h3 className="text-gray-900">Sales by ZIP (Summary)</h3>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left text-gray-700 text-sm py-2">ZIP Range</th>
                        <th className="text-right text-gray-700 text-sm py-2">Sales</th>
                        <th className="text-right text-gray-700 text-sm py-2">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesByRegion.map((region, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-3 text-gray-900 text-sm">{region.zip}</td>
                          <td className="py-3 text-right text-gray-900 text-sm">{region.sales}</td>
                          <td
                            className={`py-3 text-right text-sm ${
                              region.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {region.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - 4 columns */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/leads/create"
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <UserPlus className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-900 text-xs text-center">New Lead</span>
                </Link>
                <Link
                  to="/estimates/create"
                  className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                >
                  <FileText className="w-6 h-6 text-purple-600" />
                  <span className="text-purple-900 text-xs text-center">New Estimate</span>
                </Link>
                <Link
                  to="/orders/create"
                  className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  <span className="text-green-900 text-xs text-center">New Order</span>
                </Link>
                <Link
                  to="/catalog"
                  className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
                >
                  <Package className="w-6 h-6 text-orange-600" />
                  <span className="text-orange-900 text-xs text-center">Catalog</span>
                </Link>
              </div>
            </div>

            {/* Promotions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-700" />
                  <h3 className="text-gray-900">Promotions</h3>
                </div>
                <Link to="/promotions" className="text-blue-600 text-sm hover:text-blue-700">
                  Manage →
                </Link>
              </div>
              <p className="text-gray-500 text-xs mb-3">Current campaigns</p>
              <div className="space-y-3">
                {activePromotions.map((promo, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <p className="text-gray-900 text-sm">{promo.title}</p>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        promo.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {promo.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Surplus / Overstock */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Surplus / Overstock</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left text-gray-700 text-xs py-2">SKU</th>
                      <th className="text-left text-gray-700 text-xs py-2">Item</th>
                      <th className="text-right text-gray-700 text-xs py-2">On Hand</th>
                      <th className="text-right text-gray-700 text-xs py-2">Offer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryAlerts.map((item) => (
                      <tr key={item.sku} className="border-b border-gray-100">
                        <td className="py-2 text-gray-900 text-xs">{item.sku}</td>
                        <td className="py-2 text-gray-900 text-xs">{item.item}</td>
                        <td className="py-2 text-right text-gray-900 text-xs">
                          <span
                            className={`px-2 py-0.5 rounded ${
                              item.status === 'overstock'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.onHand}
                          </span>
                        </td>
                        <td className="py-2 text-right text-gray-900 text-xs">{item.offer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Production Schedule (Manager View) */}
            {viewMode === 'manager' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-gray-700" />
                    <h3 className="text-gray-900">Today's Schedule</h3>
                  </div>
                  <Link to="/scheduling" className="text-blue-600 text-sm hover:text-blue-700">
                    Full View →
                  </Link>
                </div>
                <div className="space-y-3">
                  {upcomingSchedule.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900 text-sm">{item.machine}</p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            item.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : item.status === 'delayed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs">{item.job}</p>
                      <p className="text-gray-500 text-xs mt-1">{item.time} Shift</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-gray-700" />
                <h3 className="text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                  <div>
                    <p className="text-gray-900 text-sm">Order ORD-3456 submitted</p>
                    <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                  <div>
                    <p className="text-gray-900 text-sm">New lead from Tech Solutions</p>
                    <p className="text-gray-500 text-xs mt-1">4 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5" />
                  <div>
                    <p className="text-gray-900 text-sm">Estimate EST-2456 accepted</p>
                    <p className="text-gray-500 text-xs mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
