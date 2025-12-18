import { useState } from 'react';
import { Search, Bell, MessageSquare, ChevronDown, LogOut, BarChart3, TrendingUp, Phone, Mail } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { ManagePromotionsModal, ManageSurplusModal } from './PromotionSurplusModals';
import { CustomerDetailsModal, AddEditCustomerModal, ManageCustomersModal } from './CustomerModals';
import { ChatPanel, NotificationPanel } from './ChatNotificationPanels';
import { EstimateDetailsModal, OrderDetailsModal } from './EstimateOrderDetailsModals';
import { EstimatesListModal, OrdersListModal } from './EstimateOrderListModals';
import { ManagerLeadsListModal } from './ManagerLeadsListModal';
import { ManagerLeadDetailsModal } from './ManagerLeadDetailsModal';
import { EstimatesKanbanView } from './EstimatesKanbanView';
import { OrdersKanbanView } from './OrdersKanbanView';
import { Estimate, Order, Lead } from '../App';

interface ManagerPortalProps {
  userName: string;
  onLogout: () => void;
  estimates: Estimate[];
  setEstimates: (estimates: Estimate[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
}

// Sample data for charts
const weeklySalesData = [
  { day: 'Mon', sales: 68800, margin: 20500, marginPct: 30 },
  { day: 'Tue', sales: 71200, margin: 21800, marginPct: 31 },
  { day: 'Wed', sales: 65400, margin: 19100, marginPct: 29 },
  { day: 'Thu', sales: 82100, margin: 25200, marginPct: 31 },
  { day: 'Fri', sales: 59800, margin: 16800, marginPct: 28 },
  { day: 'Sat', sales: 48600, margin: 13400, marginPct: 28 },
];

const topItems = [
  { name: 'FR-D017', sales: 28500 },
  { name: 'FR-D244', sales: 24800 },
  { name: 'FR-D044', sales: 18200 },
  { name: 'FR-D189', sales: 15600 },
  { name: 'FR-D925', sales: 12400 },
];

const marginBySalesPerson = [
  { name: 'John S.', sales: 142000, margin: 35 },
  { name: 'Maria L.', sales: 128500, margin: 38 },
  { name: 'James K.', sales: 96200, margin: 32 },
];

const topCustomersBySales = [
  { name: 'Acme Labs', sales: 142000, margin: 36 },
  { name: 'BlueSky Foods', sales: 128500, margin: 33 },
  { name: 'Cortex Health', sales: 96200, margin: 38 },
  { name: 'Delta Foods', sales: 84300, margin: 31 },
  { name: 'Nova Health', sales: 72800, margin: 35 },
];

export default function ManagerPortal({ userName, onLogout, estimates, setEstimates, orders, setOrders, leads, setLeads }: ManagerPortalProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Modal states for viewing estimate and order details
  const [showEstimateDetails, setShowEstimateDetails] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // List modal states
  const [showEstimatesList, setShowEstimatesList] = useState(false);
  const [showOrdersList, setShowOrdersList] = useState(false);

  // Lead modal states
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showLeadsList, setShowLeadsList] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Kanban view states
  const [showEstimatesKanban, setShowEstimatesKanban] = useState(false);
  const [showOrdersKanban, setShowOrdersKanban] = useState(false);

  // Promotions data
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: 'Q4 Bundle – Save 15%',
      description: 'Buy 3 or more widgets and save 15% on your entire order',
      discount: '15%',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      status: 'active' as const,
      appliesTo: 'Widgets',
    },
    {
      id: 2,
      title: 'Overstock - Up to 40% Off',
      description: 'Clearance pricing on select overstock items while supplies last',
      discount: 'Up to 40%',
      startDate: '2025-12-10',
      endDate: '2026-01-15',
      status: 'active' as const,
      appliesTo: 'Select Items',
    },
    {
      id: 3,
      title: 'Free Shipping > $1,000',
      description: 'Free standard shipping on all orders over $1,000',
      discount: 'Free Shipping',
      startDate: '2025-11-01',
      endDate: '2026-03-31',
      status: 'inactive' as const,
      appliesTo: 'All Products',
    },
  ]);

  // Surplus data
  const [surplusInventory, setSurplusInventory] = useState([
    { sku: 'OVR-010', item: 'Legacy Sensor V2', onHand: 96, cost: '$215', offer: '$129', category: 'Sensors', reason: 'discontinued' as const },
    { sku: 'OVR-022', item: 'Bracket Gen1', onHand: 280, cost: '$19.99', offer: '$12', category: 'Hardware', reason: 'overstock' as const },
    { sku: 'LOW-015', item: 'Hydraulic Valve', onHand: 8, cost: '$185', offer: '$110', category: 'Valves', reason: 'low-demand' as const },
    { sku: 'OVR-033', item: 'Cable Assembly V3', onHand: 142, cost: '$45', offer: '$27', category: 'Hardware', reason: 'overstock' as const },
  ]);

  // All Customers data - full structure matching UnifiedSalesPortal
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Acme Labs',
      zip: '77002',
      sales: '$142,000',
      contactName: 'Sarah Johnson',
      email: 'sarah.johnson@acmelabs.com',
      phone: '(555) 123-4567',
      address: '123 Innovation Drive',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$150,000',
      ytdSales: 142000,
      lastOrderDate: '2025-12-08',
      status: 'active' as const,
      notes: 'Preferred customer. Volumes increasing quarterly. Requires NET-30 terms.',
      salesPerson: 'John S.',
    },
    {
      id: 2,
      name: 'BlueSky Foods',
      zip: '77019',
      sales: '$128,500',
      contactName: 'Michael Chen',
      email: 'm.chen@blueskyfoods.com',
      phone: '(555) 234-5678',
      address: '456 Commerce Blvd',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$100,000',
      ytdSales: 128500,
      lastOrderDate: '2025-12-10',
      status: 'active' as const,
      notes: 'Food processing equipment buyer. Seasonal spikes in Q2 and Q4.',
      salesPerson: 'Maria L.',
    },
    {
      id: 3,
      name: 'Cortex Health',
      zip: '77021',
      sales: '$96,200',
      contactName: 'Dr. Emily Rodriguez',
      email: 'e.rodriguez@cortexhealth.com',
      phone: '(555) 345-6789',
      address: '789 Medical Center Dr',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$75,000',
      ytdSales: 96200,
      lastOrderDate: '2025-12-05',
      status: 'active' as const,
      notes: 'Healthcare facility. Requires FDA compliant products only.',
      salesPerson: 'James K.',
    },
    {
      id: 4,
      name: 'Delta Foods',
      zip: '77005',
      sales: '$84,300',
      contactName: 'Robert Taylor',
      email: 'r.taylor@deltafoods.com',
      phone: '(555) 456-7890',
      address: '321 Food Processing Way',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$90,000',
      ytdSales: 84300,
      lastOrderDate: '2025-12-11',
      status: 'active' as const,
      notes: 'Large distributor. Negotiated volume pricing.',
      salesPerson: 'John S.',
    },
    {
      id: 5,
      name: 'Nova Health',
      zip: '77019',
      sales: '$72,800',
      contactName: 'Dr. Lisa Martinez',
      email: 'l.martinez@novahealth.com',
      phone: '(555) 567-8901',
      address: '654 Healthcare Plaza',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$80,000',
      ytdSales: 72800,
      lastOrderDate: '2025-12-09',
      status: 'active' as const,
      notes: 'Medical clinic chain. Monthly recurring orders.',
      salesPerson: 'Maria L.',
    },
  ]);

  // Customer modal states
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showAddEditCustomer, setShowAddEditCustomer] = useState(false);
  const [showManageCustomers, setShowManageCustomers] = useState(false);
  const [selectedCustomerForDetails, setSelectedCustomerForDetails] = useState<any>(null);
  const [customerToEdit, setCustomerToEdit] = useState<any>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  // Handler functions for leads
  const handleApproveLead = (id: string) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: 'approved' as const } : lead));
  };

  const handleRejectLead = (id: string) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: 'rejected' as const } : lead));
  };

  const handleAssignLead = (id: string, salesPerson: string) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, assignedTo: salesPerson } : lead));
  };

  // Sales by ZIP/Teams
  const salesByZip = [
    { zip: '77002', sales: '$210,000' },
    { zip: '77019', sales: '$187,000' },
    { zip: '77021', sales: '$142,000' },
    { zip: '77031', sales: '$75,500' },
    { zip: '77019', sales: '$68,800' },
  ];

  // Modal states
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);
  const [showSurplusModal, setShowSurplusModal] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">MT-RSR Manager Portal</h1>
                <p className="text-xs text-gray-500">Team Performance & Oversight</p>
              </div>
            </div>
          </div>

          {/* Right Side - Search, Notifications, Profile */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Chat */}
            <button
              onClick={() => setShowChatPanel(!showChatPanel)}
              className="p-2 hover:bg-gray-100 rounded-lg transition relative"
            >
              <MessageSquare className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                  {userName.charAt(0)}
                </div>
                <span className="text-gray-900 text-sm">{userName}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-20 pb-6 px-6 max-w-[1600px] mx-auto">
        <div className="space-y-6">
          {/* TEAM SALES KPIS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 text-xl">Team Sales KPIs</h2>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                Export
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">WTD - MTD - YTD - LTD (week vs last period)</p>

            <div className="grid grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
                <p className="text-blue-700 text-sm mb-1">WTD</p>
                <p className="text-blue-900 text-2xl font-mono mb-1">$68,800</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+8.2%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
                <p className="text-purple-700 text-sm mb-1">MTD</p>
                <p className="text-purple-900 text-2xl font-mono mb-1">$301,240</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.1%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
                <p className="text-green-700 text-sm mb-1">YTD</p>
                <p className="text-green-900 text-2xl font-mono mb-1">$3,918,440</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.1%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-5 border border-orange-200">
                <p className="text-orange-700 text-sm mb-1">LTD</p>
                <p className="text-orange-900 text-2xl font-mono mb-1">$11,204,880</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-2 gap-6">
            {/* Team Weekly Sales & Margin */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Team Weekly Sales & Margin</h3>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={weeklySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales ($)" />
                  <Bar yAxisId="left" dataKey="margin" fill="#10b981" name="Margin ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="marginPct" stroke="#f59e0b" strokeWidth={3} name="Margin %" dot={{ fill: '#f59e0b', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Top 10 Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Top 10 Items (by $)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topItems} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="name" type="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHARTS ROW 2 */}
          <div className="grid grid-cols-2 gap-6">
            {/* Margin by Sales Person */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Margin by Sales Person</h3>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={marginBySalesPerson}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={3} name="Gross Margin %" dot={{ fill: '#10b981', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Top Customers by Sales */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Top Customers by Sales</h3>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={topCustomersBySales} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={60} />
                  <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#ec4899" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" fill="#10b981" name="Sales ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#ec4899" strokeWidth={3} name="Margin %" dot={{ fill: '#ec4899', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ALL CUSTOMERS & LEADS DASHBOARD */}
          <div className="grid grid-cols-2 gap-6">
            {/* All Customers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">All Customers</h3>
                <button 
                  onClick={() => setShowManageCustomers(true)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Manage All Customers
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">CUSTOMER</th>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">SALES PERSON</th>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">ZIP</th>
                      <th className="text-right text-gray-700 text-sm py-2 px-2">YTD SALES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr 
                        key={customer.id} 
                        className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition"
                        onClick={() => {
                          setSelectedCustomerForDetails(customer);
                          setShowCustomerDetails(true);
                        }}
                      >
                        <td className="py-3 px-2 text-gray-900 text-sm">{customer.name}</td>
                        <td className="py-3 px-2 text-gray-700 text-sm">{customer.salesPerson}</td>
                        <td className="py-3 px-2 text-gray-700 text-sm font-mono">{customer.zip}</td>
                        <td className="py-3 px-2 text-right text-gray-900 text-sm font-mono">{customer.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Leads Dashboard */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">Leads Dashboard ({leads.length})</h3>
                <button 
                  onClick={() => setShowLeadsList(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">LEAD</th>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">SALES PERSON</th>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">STATUS</th>
                      <th className="text-left text-gray-700 text-sm py-2 px-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500 text-sm">
                          No leads in the system
                        </td>
                      </tr>
                    ) : (
                      leads.slice(0, 5).map((lead) => (
                        <tr 
                          key={lead.id} 
                          className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowLeadDetails(true);
                          }}
                        >
                          <td className="py-3 px-2 text-gray-900 text-sm">{lead.companyName}</td>
                          <td className="py-3 px-2 text-gray-700 text-sm">{lead.createdBy}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              lead.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              lead.status === 'approved' ? 'bg-green-100 text-green-700' :
                              lead.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              lead.status === 'converted' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                            {lead.status === 'pending' && (
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleApproveLead(lead.id)}
                                  className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleRejectLead(lead.id)}
                                  className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                            {lead.status === 'draft' && (
                              <span className="text-gray-400 text-xs">Needs completion</span>
                            )}
                            {lead.status === 'approved' && (
                              <span className="text-green-600 text-xs">✓ Approved</span>
                            )}
                            {lead.status === 'rejected' && (
                              <span className="text-red-600 text-xs">✗ Rejected</span>
                            )}
                            {lead.status === 'converted' && (
                              <span className="text-blue-600 text-xs">→ Converted</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-blue-900 text-xs">
                  <strong>Note:</strong> Approve and assign leads. Approvals allow sales person to convert to customer and special pricing to apply.
                </p>
              </div>
            </div>
          </div>

          {/* PROMOTIONS, SURPLUS, SALES BY ZIP, PIPELINE */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column: Promotions, Surplus, Sales by ZIP */}
            <div className="space-y-6">
              {/* Manage Promotions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 text-lg">Manage Promotions</h3>
                  <button
                    onClick={() => setShowPromotionsModal(true)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Manage All Promotions
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left text-gray-700 text-sm py-2 px-2">PROMO</th>
                        <th className="text-left text-gray-700 text-sm py-2 px-2">STATUS</th>
                        <th className="text-right text-gray-700 text-sm py-2 px-2">DISCOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promotions.slice(0, 3).map((promo) => (
                        <tr key={promo.id} className="border-b border-gray-100">
                          <td className="py-3 px-2 text-gray-900 text-sm">{promo.title}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              promo.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {promo.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right text-gray-900 text-sm">{promo.discount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Manage Surplus/Overstock */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 text-lg">Manage Surplus / Overstock</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left text-gray-700 text-sm py-2 px-2">SKU</th>
                        <th className="text-left text-gray-700 text-sm py-2 px-2">ITEM</th>
                        <th className="text-right text-gray-700 text-sm py-2 px-2">ON HAND</th>
                        <th className="text-right text-gray-700 text-sm py-2 px-2">COST</th>
                        <th className="text-right text-gray-700 text-sm py-2 px-2">OFFER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surplusInventory.slice(0, 3).map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-3 px-2 text-gray-900 text-sm font-mono">{item.sku}</td>
                          <td className="py-3 px-2 text-gray-900 text-sm">{item.item}</td>
                          <td className="py-3 px-2 text-right">
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                              {item.onHand}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right text-gray-700 text-sm font-mono">{item.cost}</td>
                          <td className="py-3 px-2 text-right text-green-700 text-sm font-mono">{item.offer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={() => setShowSurplusModal(true)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Manage All Surplus Items
                </button>
              </div>

              {/* Sales by ZIP/Teams */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 text-lg mb-4">Sales by ZIP/Teams</h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left text-gray-700 text-sm py-2 px-2">ZIP</th>
                        <th className="text-right text-gray-700 text-sm py-2 px-2">SALES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesByZip.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-3 px-2 text-gray-900 text-sm font-mono">{item.zip}</td>
                          <td className="py-3 px-2 text-right text-gray-900 text-sm font-mono">{item.sales}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Estimates & Orders Pipeline */}
            <div className="space-y-6">
              {/* Estimates & Orders (Pipeline) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 text-lg">Estimates & Orders (Pipeline)</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEstimatesKanban(true)}
                      className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition flex items-center gap-1"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Estimates
                    </button>
                    <button
                      onClick={() => setShowOrdersKanban(true)}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Orders
                    </button>
                  </div>
                </div>

                {/* Estimates Section */}
                <div className="mb-6">
                  <h4 className="text-gray-700 text-sm mb-3">📄 Estimates ({estimates.length})</h4>
                  <div className="space-y-3">
                    {estimates.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">No estimates in pipeline</p>
                    ) : (
                      estimates.map((est) => (
                        <div 
                          key={est.id} 
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 cursor-pointer transition"
                          onClick={() => {
                            setSelectedEstimate(est);
                            setShowEstimateDetails(true);
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-gray-900 text-sm font-mono mb-1">{est.id}</p>
                              <p className="text-gray-600 text-xs">{est.customer}</p>
                              <p className="text-gray-500 text-xs mt-1">By: {est.createdBy}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${
                              est.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              est.status === 'approved' ? 'bg-green-100 text-green-700' :
                              est.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              est.status === 'converted' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {est.status.charAt(0).toUpperCase() + est.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-green-700 font-mono text-sm">${est.total.toLocaleString()}</p>
                            <p className="text-gray-500 text-xs">{est.createdTime}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Orders Section */}
                <div>
                  <h4 className="text-gray-700 text-sm mb-3">🛒 Orders ({orders.length})</h4>
                  <div className="space-y-3">
                    {orders.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">No orders in pipeline</p>
                    ) : (
                      orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-green-300 cursor-pointer transition"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-gray-900 text-sm font-mono mb-1">{order.id}</p>
                              <p className="text-gray-600 text-xs">{order.customer}</p>
                              <p className="text-gray-500 text-xs mt-1">By: {order.createdBy}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${
                              order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-green-700 font-mono text-sm">${order.total.toLocaleString()}</p>
                            <p className="text-gray-500 text-xs">{order.createdTime}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Communication Center */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 text-lg mb-4">Communication Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Chat with salespersons and supervisors. Use for coaching approvals, or escalations.
                </p>
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Open Team Chat
                </button>
              </div>

              {/* Quick Contacts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-900 text-lg mb-4">Quick Contacts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-gray-900 text-sm">John S.</p>
                      <p className="text-gray-500 text-xs">Salesperson</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-gray-900 text-sm">Maria L.</p>
                      <p className="text-gray-500 text-xs">Salesperson</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 text-sm">James K.</p>
                      <p className="text-gray-500 text-xs">Salesperson</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Promotions Modal */}
      {showPromotionsModal && (
        <ManagePromotionsModal
          show={showPromotionsModal}
          onClose={() => setShowPromotionsModal(false)}
          promotions={promotions}
          onUpdatePromotions={setPromotions}
        />
      )}

      {/* Surplus Modal */}
      {showSurplusModal && (
        <ManageSurplusModal
          show={showSurplusModal}
          onClose={() => setShowSurplusModal(false)}
          surplusItems={surplusInventory}
          onAddToCart={(item) => {
            // Manager view - just show alert
            alert(`Surplus item "${item.item}" marked for team attention`);
          }}
        />
      )}

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomerForDetails && (
        <CustomerDetailsModal
          customer={selectedCustomerForDetails}
          show={showCustomerDetails}
          onClose={() => {
            setShowCustomerDetails(false);
            setSelectedCustomerForDetails(null);
          }}
          onEdit={(customer) => {
            setCustomerToEdit(customer);
            setShowCustomerDetails(false);
            setShowAddEditCustomer(true);
          }}
          onDelete={(customerId) => {
            setCustomers(customers.filter(c => c.id !== customerId));
            setShowCustomerDetails(false);
            setSelectedCustomerForDetails(null);
          }}
          onCreateEstimate={(customer) => {
            // Manager view - show alert
            alert(`Create estimate for ${customer.name} - this would open estimate creation`);
            setShowCustomerDetails(false);
          }}
          onCreateOrder={(customer) => {
            // Manager view - show alert
            alert(`Create order for ${customer.name} - this would open order creation`);
            setShowCustomerDetails(false);
          }}
        />
      )}

      {/* Add/Edit Customer Modal */}
      {showAddEditCustomer && (
        <AddEditCustomerModal
          show={showAddEditCustomer}
          onClose={() => {
            setShowAddEditCustomer(false);
            setCustomerToEdit(null);
          }}
          onSave={(customerData) => {
            if (customerToEdit) {
              // Edit existing
              setCustomers(customers.map(c => c.id === customerToEdit.id ? { ...c, ...customerData } : c));
            } else {
              // Add new
              const newCustomer = { id: customers.length + 1, ...customerData, ytdSales: 0, lastOrderDate: new Date().toISOString().split('T')[0], salesPerson: userName };
              setCustomers([...customers, newCustomer]);
            }
            setShowAddEditCustomer(false);
            setCustomerToEdit(null);
          }}
          customerData={customerToEdit}
        />
      )}

      {/* Manage Customers Modal */}
      {showManageCustomers && (
        <ManageCustomersModal
          show={showManageCustomers}
          onClose={() => setShowManageCustomers(false)}
          customers={customers}
          onUpdateCustomers={setCustomers}
          onViewDetails={(customer) => {
            setSelectedCustomerForDetails(customer);
            setShowManageCustomers(false);
            setShowCustomerDetails(true);
          }}
          onEdit={(customer) => {
            setCustomerToEdit(customer);
            setShowManageCustomers(false);
            setShowAddEditCustomer(true);
          }}
          onDelete={(customerId) => {
            setCustomers(customers.filter(c => c.id !== customerId));
          }}
          onAddNew={() => {
            setShowManageCustomers(false);
            setShowAddEditCustomer(true);
          }}
          searchQuery={customerSearchQuery}
          onSearchChange={setCustomerSearchQuery}
          onCreateEstimate={(customerName) => {
            // Manager view - show alert
            alert(`Create estimate for ${customerName} - this would open estimate creation`);
          }}
          onCreateOrder={(customerName) => {
            // Manager view - show alert
            alert(`Create order for ${customerName} - this would open order creation`);
          }}
        />
      )}

      {/* Chat Panel */}
      {showChatPanel && (
        <ChatPanel
          show={showChatPanel}
          onClose={() => setShowChatPanel(false)}
        />
      )}

      {/* Notification Panel */}
      {showNotificationPanel && (
        <NotificationPanel
          show={showNotificationPanel}
          onClose={() => setShowNotificationPanel(false)}
          notifications={[]}
          onMarkAsRead={() => {}}
          onMarkAllAsRead={() => {}}
          onDeleteNotification={() => {}}
        />
      )}

      {/* Estimate Details Modal */}
      {showEstimateDetails && selectedEstimate && (
        <EstimateDetailsModal
          show={showEstimateDetails}
          onClose={() => {
            setShowEstimateDetails(false);
            setSelectedEstimate(null);
          }}
          estimate={selectedEstimate}
          isManager={true}
          onApprove={(id) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status: 'approved' as const } : est));
          }}
          onReject={(id) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status: 'rejected' as const } : est));
          }}
        />
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <OrderDetailsModal
          show={showOrderDetails}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          isManager={true}
          onUpdateStatus={(id, status) => {
            setOrders(orders.map(ord => ord.id === id ? { ...ord, status } : ord));
          }}
        />
      )}

      {/* Estimates List Modal */}
      {showEstimatesList && (
        <EstimatesListModal
          show={showEstimatesList}
          onClose={() => setShowEstimatesList(false)}
          estimates={estimates}
          onViewDetails={(estimate) => {
            setSelectedEstimate(estimate);
            setShowEstimateDetails(true);
          }}
          onApprove={(id) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status: 'approved' as const } : est));
          }}
          onReject={(id) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status: 'rejected' as const } : est));
          }}
        />
      )}

      {/* Orders List Modal */}
      {showOrdersList && (
        <OrdersListModal
          show={showOrdersList}
          onClose={() => setShowOrdersList(false)}
          orders={orders}
          onViewDetails={(order) => {
            setSelectedOrder(order);
            setShowOrderDetails(true);
          }}
          onUpdateStatus={(id, status) => {
            setOrders(orders.map(ord => ord.id === id ? { ...ord, status } : ord));
          }}
        />
      )}

      {/* Leads List Modal */}
      {showLeadsList && (
        <ManagerLeadsListModal
          show={showLeadsList}
          onClose={() => setShowLeadsList(false)}
          leads={leads}
          onApproveLead={handleApproveLead}
          onRejectLead={handleRejectLead}
          onAssignLead={handleAssignLead}
          onViewDetails={(lead) => {
            setSelectedLead(lead);
            setShowLeadsList(false);
            setShowLeadDetails(true);
          }}
        />
      )}

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLead && (
        <ManagerLeadDetailsModal
          show={showLeadDetails}
          onClose={() => {
            setShowLeadDetails(false);
            setSelectedLead(null);
          }}
          lead={selectedLead}
          onApproveLead={handleApproveLead}
          onRejectLead={handleRejectLead}
          onAssignLead={handleAssignLead}
        />
      )}

      {/* Estimates Kanban View */}
      {showEstimatesKanban && (
        <EstimatesKanbanView
          show={showEstimatesKanban}
          onClose={() => setShowEstimatesKanban(false)}
          estimates={estimates}
          onUpdateStatus={(id, status) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status } : est));
          }}
          onViewDetails={(estimate) => {
            setSelectedEstimate(estimate);
            setShowEstimateDetails(true);
          }}
          onApprove={(id) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status: 'approved' as const } : est));
          }}
          onReject={(id) => {
            setEstimates(estimates.map(est => est.id === id ? { ...est, status: 'rejected' as const } : est));
          }}
        />
      )}

      {/* Orders Kanban View */}
      {showOrdersKanban && (
        <OrdersKanbanView
          show={showOrdersKanban}
          onClose={() => setShowOrdersKanban(false)}
          orders={orders}
          onUpdateStatus={(id, status) => {
            setOrders(orders.map(ord => ord.id === id ? { ...ord, status } : ord));
          }}
          onViewDetails={(order) => {
            setSelectedOrder(order);
            setShowOrderDetails(true);
          }}
        />
      )}
    </div>
  );
}