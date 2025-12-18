import { TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const kpiData = [
  { label: 'Team Sales WTD', value: '$85,450', change: 15.2, changeType: 'up' },
  { label: 'Team Sales MTD', value: '$428,950', change: 10.8, changeType: 'up' },
  { label: 'Team Sales YTD', value: '$3,724,680', change: 8.5, changeType: 'up' },
  { label: 'Avg Gross Margin', value: '32.4%', change: 2.3, changeType: 'up' },
];

const topItemsData = [
  { name: 'Product A', value: 45230 },
  { name: 'Product B', value: 38450 },
  { name: 'Product C', value: 32890 },
  { name: 'Product D', value: 28650 },
  { name: 'Product E', value: 24320 },
  { name: 'Product F', value: 19870 },
  { name: 'Product G', value: 15430 },
  { name: 'Product H', value: 12340 },
  { name: 'Product I', value: 9210 },
  { name: 'Product J', value: 7890 },
];

const topCustomers = [
  { name: 'ABC Manufacturing', sales: '$142,560', lastOrder: '2025-12-08', margin: '34%' },
  { name: 'XYZ Industries', sales: '$98,430', lastOrder: '2025-12-09', margin: '31%' },
  { name: 'Global Tech Co', sales: '$215,890', lastOrder: '2025-12-10', margin: '29%' },
  { name: 'Premier Solutions', sales: '$87,650', lastOrder: '2025-12-07', margin: '36%' },
  { name: 'Innovative Systems', sales: '$156,320', lastOrder: '2025-12-11', margin: '33%' },
];

const salesByPerson = [
  { name: 'John Doe', sales: '$184,560', orders: 45, margin: '32%' },
  { name: 'Jane Smith', sales: '$156,320', orders: 38, margin: '34%' },
  { name: 'Mike Johnson', sales: '$98,450', orders: 28, margin: '30%' },
  { name: 'Sarah Williams', sales: '$124,780', orders: 35, margin: '31%' },
];

const salesByPersonChart = salesByPerson.map(sp => ({
  name: sp.name.split(' ')[0],
  value: parseFloat(sp.sales.replace('$', '').replace(',', ''))
}));

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function ManagerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">Team performance and analytics overview</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/approvals"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-100 transition"
          >
            <span className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
            3 Pending Approvals
          </Link>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            Download Report
          </button>
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

      {/* Charts Row 1 */}
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

        {/* Sales by Sales Person */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Sales by Sales Person</h3>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={salesByPersonChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesByPersonChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {salesByPerson.map((person, index) => (
              <div key={person.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-gray-700">{person.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Top Customers by Sales & Margin</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Rank</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Customer Name</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Total Sales</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Last Order</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Gross Margin</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topCustomers.map((customer, index) => (
                <tr key={customer.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{customer.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-900">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>{customer.sales}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{customer.lastOrder}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-700">{customer.margin}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to="/customers/1" className="text-blue-600 hover:text-blue-700 text-sm">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Sales Person</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Total Sales</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Orders</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Avg Order Value</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Gross Margin</th>
                <th className="px-4 py-3 text-left text-gray-700 text-sm">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesByPerson.map((person) => {
                const avgOrderValue = parseFloat(person.sales.replace('$', '').replace(',', '')) / person.orders;
                return (
                  <tr key={person.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-gray-900">{person.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-900">{person.sales}</td>
                    <td className="px-4 py-3 text-gray-700">{person.orders}</td>
                    <td className="px-4 py-3 text-gray-700">${avgOrderValue.toFixed(2)}</td>
                    <td className="px-4 py-3 text-green-700">{person.margin}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(person.orders / 50) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{Math.round((person.orders / 50) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Sales Heat Map by ZIP Code</h3>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg h-80 flex items-center justify-center border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">Global sales distribution heat map</p>
            <p className="text-gray-500 text-sm mt-2">Interactive visualization by geographic region</p>
          </div>
        </div>
      </div>
    </div>
  );
}
