import { useState } from 'react';
import {
  Search,
  MessageSquare,
  User,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Plus,
  FileText,
  ShoppingCart,
  Package,
  Phone,
  Mail,
  Tag,
  MapPin,
  Calendar,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  BarChart3,
  Users,
  Zap,
  Bell,
  Map,
  ExternalLink,
  X,
  Trash2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts';
import { EstimateModal, OrderModal, ConvertModal } from './EstimateOrderModals';
import { ChatPanel, NotificationPanel } from './ChatNotificationPanels';
import { ManagePromotionsModal, ManageSurplusModal } from './PromotionSurplusModals';
import { CustomerDetailsModal, AddEditCustomerModal, ManageCustomersModal } from './CustomerModals';
import { AddEditLeadModal, LeadDetailsModal, ManageLeadsModal } from './LeadsModals';
import { BrochureModal } from './BrochureModal';
import ManagerPortal from './ManagerPortal';
import { Estimate, Order, Lead } from '../App';

interface UnifiedSalesPortalProps {
  userRole: 'salesperson' | 'manager' | 'admin';
  userName: string;
  onLogout: () => void;
  estimates: Estimate[];
  setEstimates: (estimates: Estimate[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
}

const weeklySalesData = [
  { day: 'Mon', current: 18500, previous: 16200 },
  { day: 'Tue', current: 21200, previous: 18900 },
  { day: 'Wed', current: 19800, previous: 17500 },
  { day: 'Thu', current: 24500, previous: 21000 },
  { day: 'Fri', current: 23100, previous: 20800 },
  { day: 'Sat', current: 12300, previous: 11500 },
  { day: 'Sun', current: 9800, previous: 8900 },
];

const topItemsByRevenue = [
  { sku: 'FB-001', revenue: 18500 },
  { sku: 'FB-031', revenue: 16200 },
  { sku: 'FB-044', revenue: 14800 },
  { sku: 'FB-099', revenue: 11500 },
  { sku: 'FB-055', revenue: 8900 },
];

const topItemsByQty = [
  { sku: 'FB-099', qty: 450 },
  { sku: 'FB-055', qty: 380 },
  { sku: 'FB-001', qty: 320 },
  { sku: 'FB-031', qty: 280 },
  { sku: 'FB-044', qty: 195 },
];

const salesByZip = [
  { zip: '77002', sales: '$142,000' },
  { zip: '77008', sales: '$126,500' },
  { zip: '77021', sales: '$99,000' },
  { zip: '77009', sales: '$68,400' },
  { zip: '77012', sales: '$51,250' },
];

const topCustomers = [
  { name: 'Acme Labs', sales: 142000, color: '#3B82F6' },
  { name: 'BlueSky Foods', sales: 126500, color: '#60A5FA' },
  { name: 'Cortex Health', sales: 99000, color: '#93C5FD' },
  { name: 'Northline Retail', sales: 68400, color: '#BFDBFE' },
  { name: 'Bayou Industrial', sales: 51250, color: '#DBEAFE' },
];

const catalogItems = [
  { sku: 'FB-001', item: 'Widget Alpha', qoh: 240, price: '$89.99' },
  { sku: 'FB-031', item: 'Widget Beta', qoh: 180, price: '$74.50' },
  { sku: 'FB-044', item: 'Sensor Pro', qoh: 75, price: '$129.99' },
  { sku: 'FB-099', item: 'Bracket Kit', qoh: 450, price: '$24.99' },
  { sku: 'FB-055', item: 'Valve Assembly', qoh: 380, price: '$45.00' },
];

const fullCatalogItems = [
  { sku: 'FB-001', item: 'Widget Alpha', qoh: 240, price: '$89.99', category: 'Widgets' },
  { sku: 'FB-031', item: 'Widget Beta', qoh: 180, price: '$74.50', category: 'Widgets' },
  { sku: 'FB-044', item: 'Sensor Pro', qoh: 75, price: '$129.99', category: 'Sensors' },
  { sku: 'FB-099', item: 'Bracket Kit', qoh: 450, price: '$24.99', category: 'Hardware' },
  { sku: 'FB-055', item: 'Valve Assembly', qoh: 380, price: '$45.00', category: 'Valves' },
  { sku: 'FB-002', item: 'Widget Gamma', qoh: 120, price: '$95.99', category: 'Widgets' },
  { sku: 'FB-045', item: 'Sensor Elite', qoh: 42, price: '$189.99', category: 'Sensors' },
  { sku: 'FB-056', item: 'Valve Pro', qoh: 200, price: '$68.50', category: 'Valves' },
  { sku: 'FB-100', item: 'Mounting Plate', qoh: 580, price: '$18.99', category: 'Hardware' },
  { sku: 'FB-101', item: 'Connector Kit', qoh: 320, price: '$32.50', category: 'Hardware' },
  { sku: 'FB-046', item: 'Temp Sensor', qoh: 95, price: '$79.99', category: 'Sensors' },
  { sku: 'FB-057', item: 'Pressure Valve', qoh: 145, price: '$112.00', category: 'Valves' },
  { sku: 'FB-003', item: 'Widget Delta', qoh: 88, price: '$102.50', category: 'Widgets' },
  { sku: 'FB-102', item: 'Bolt Set (50pc)', qoh: 890, price: '$15.99', category: 'Hardware' },
  { sku: 'FB-047', item: 'Motion Sensor', qoh: 63, price: '$145.00', category: 'Sensors' },
];

const activePromotions = [
  { title: 'Q4 Bundle – Save 15%', status: 'active' },
  { title: 'Overstock - Up to 40% Off', status: 'active' },
  { title: 'Free Shipping > $1,000', status: 'inactive' },
];

const surplusItems = [
  { sku: 'OVR-010', item: 'Legacy Sensor V2', onHand: 96, offer: '$129' },
  { sku: 'OVR-022', item: 'Bracket Gen1', onHand: 280, offer: '$12' },
  { sku: 'LOW-015', item: 'Hydraulic Valve', onHand: 8, offer: '-' },
];



const recentNotes = [
  { date: '2025-12-11', author: 'JS', note: 'Discussed Q1 volume pricing' },
  { date: '2025-12-08', author: 'MD', note: 'Approved credit increase to $50k' },
  { date: '2025-12-05', author: 'JS', note: 'Follow up on FB-044 delivery' },
];

export default function UnifiedSalesPortal({
  userRole,
  userName,
  onLogout,
  estimates,
  setEstimates,
  orders,
  setOrders,
  leads,
  setLeads,
}: UnifiedSalesPortalProps) {
  // If user is a manager, render the Manager Portal instead
  if (userRole === 'manager' || userRole === 'admin') {
    return <ManagerPortal userName={userName} onLogout={onLogout} estimates={estimates} setEstimates={setEstimates} orders={orders} setOrders={setOrders} leads={leads} setLeads={setLeads} />;
  }

  // Otherwise, render the Salesperson Portal below
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  
  // Notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order' as const,
      title: 'New Order Received',
      message: 'Acme Labs placed order #SO-2456 for $12,450',
      timestamp: '5 min ago',
      isRead: false,
      actionUrl: '/orders/SO-2456',
    },
    {
      id: 2,
      type: 'estimate' as const,
      title: 'Estimate Approved',
      message: 'EST-2455 for BlueSky Foods has been approved by manager',
      timestamp: '1 hour ago',
      isRead: false,
      actionUrl: '/estimates/EST-2455',
    },
    {
      id: 3,
      type: 'message' as const,
      title: 'New Message from Maria Garcia',
      message: 'Great work on the Acme Labs deal! The team is really impressed.',
      timestamp: '2 hours ago',
      isRead: true,
      actionUrl: '/chat',
    },
    {
      id: 4,
      type: 'achievement' as const,
      title: 'Sales Milestone Reached!',
      message: 'Congratulations! You hit $1M in YTD sales',
      timestamp: '3 hours ago',
      isRead: true,
    },
    {
      id: 5,
      type: 'system' as const,
      title: 'Catalog Updated',
      message: 'New pricing effective for 45 products starting Monday',
      timestamp: '5 hours ago',
      isRead: true,
    },
    {
      id: 6,
      type: 'alert' as const,
      title: 'Low Inventory Alert',
      message: 'FB-044 Sensor Pro is below reorder threshold (75 units)',
      timestamp: '1 day ago',
      isRead: true,
      actionUrl: '/catalog/FB-044',
    },
  ]);
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    setShowNotificationPanel(false);
  };
  
  const handleMessageSent = () => {
    setUnreadMessages(Math.max(0, unreadMessages - 1));
  };
  
  // Quick Actions Modals
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  
  // Catalog search and modal states
  const [catalogSearchQuery, setCatalogSearchQuery] = useState('');
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState('All');
  const [cartItems, setCartItems] = useState<Array<{ sku: string; item: string; qty: number; price: string }>>([]);
  
  // Add to cart notification state
  const [addedToCartNotification, setAddedToCartNotification] = useState<string | null>(null);
  
  // Promotions and Surplus modals
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);
  const [showSurplusModal, setShowSurplusModal] = useState(false);
  
  // Promotions state
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
  
  // Surplus items state
  const [surplusInventory, setSurplusInventory] = useState([
    { sku: 'OVR-010', item: 'Legacy Sensor V2', onHand: 96, cost: '$215', offer: '$129', category: 'Sensors', reason: 'discontinued' as const },
    { sku: 'OVR-022', item: 'Bracket Gen1', onHand: 280, cost: '$19.99', offer: '$12', category: 'Hardware', reason: 'overstock' as const },
    { sku: 'LOW-015', item: 'Hydraulic Valve', onHand: 8, cost: '$185', offer: '$110', category: 'Valves', reason: 'low-demand' as const },
    { sku: 'OVR-033', item: 'Cable Assembly V3', onHand: 142, cost: '$45', offer: '$27', category: 'Hardware', reason: 'overstock' as const },
    { sku: 'DIS-008', item: 'Pressure Gauge Type A', onHand: 54, cost: '$89', offer: '$49', category: 'Sensors', reason: 'discontinued' as const },
    { sku: 'LOW-021', item: 'Widget Classic', onHand: 12, cost: '$125', offer: '$75', category: 'Widgets', reason: 'low-demand' as const },
  ]);

  // Customer modals state
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showAddEditCustomer, setShowAddEditCustomer] = useState(false);
  const [showManageCustomers, setShowManageCustomers] = useState(false);
  const [selectedCustomerForDetails, setSelectedCustomerForDetails] = useState<any>(null);
  const [customerToEdit, setCustomerToEdit] = useState<any>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  // Leads modals state
  const [showAddEditLead, setShowAddEditLead] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showManageLeads, setShowManageLeads] = useState(false);
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<any>(null);
  const [leadToEdit, setLeadToEdit] = useState<any>(null);

  // AI Brochure modal state
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  // Contact Action modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedCustomerForContact, setSelectedCustomerForContact] = useState<any>(null);

  // Customer state - comprehensive customer data
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
    },
    {
      id: 2,
      name: 'BlueSky Foods',
      zip: '77008',
      sales: '$126,500',
      contactName: 'Michael Chen',
      email: 'm.chen@blueskyfoods.com',
      phone: '(555) 234-5678',
      address: '456 Commerce Blvd',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$100,000',
      ytdSales: 126500,
      lastOrderDate: '2025-12-10',
      status: 'active' as const,
      notes: 'Food processing equipment buyer. Seasonal spikes in Q2 and Q4.',
    },
    {
      id: 3,
      name: 'Cortex Health',
      zip: '77021',
      sales: '$99,000',
      contactName: 'Dr. Emily Rodriguez',
      email: 'e.rodriguez@cortexhealth.com',
      phone: '(555) 345-6789',
      address: '789 Medical Center Dr',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$75,000',
      ytdSales: 99000,
      lastOrderDate: '2025-12-05',
      status: 'active' as const,
      notes: 'Healthcare facility. Requires FDA compliant products only.',
    },
    {
      id: 4,
      name: 'Northline Retail',
      zip: '77009',
      sales: '$68,400',
      contactName: 'James Patterson',
      email: 'jpatterson@northlineretail.com',
      phone: '(555) 456-7890',
      address: '321 Retail Plaza',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$50,000',
      ytdSales: 68400,
      lastOrderDate: '2025-11-28',
      status: 'active' as const,
      notes: 'Retail chain buyer. Prefers bulk orders with extended delivery.',
    },
    {
      id: 5,
      name: 'Bayou Industrial',
      zip: '77012',
      sales: '$51,250',
      contactName: 'Robert Williams',
      email: 'r.williams@bayouindustrial.com',
      phone: '(555) 567-8901',
      address: '654 Industrial Way',
      city: 'Houston',
      state: 'TX',
      creditLimit: '$60,000',
      ytdSales: 51250,
      lastOrderDate: '2025-12-01',
      status: 'active' as const,
      notes: 'Manufacturing client. Interested in volume discounts.',
    },
  ]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote('');
    }
  };

  const handleAddToCart = (item: { sku: string; item: string; price: string }) => {
    const existingItem = cartItems.find(cartItem => cartItem.sku === item.sku);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.sku === item.sku
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { sku: item.sku, item: item.item, qty: 1, price: item.price }]);
    }
    
    // Show professional notification
    setAddedToCartNotification(`${item.sku} - ${item.item}`);
    setTimeout(() => {
      setAddedToCartNotification(null);
    }, 2500);
  };

  const handleRemoveFromCart = (sku: string) => {
    setCartItems(cartItems.filter(item => item.sku !== sku));
  };

  const handleCreateEstimateWithCart = () => {
    // Convert cart items to estimate line items
    const lineItems = cartItems.map(item => ({
      sku: item.sku,
      description: item.item,
      qty: item.qty,
      price: parseFloat(item.price.replace('$', '')),
    }));
    
    setEstimateForm({
      ...estimateForm,
      items: lineItems.length > 0 ? lineItems : [{ sku: '', description: '', qty: 1, price: 0 }],
    });
    
    setShowFullCatalog(false);
    setShowEstimateModal(true);
  };

  const handleCreateOrderWithCart = () => {
    // Convert cart items to order line items
    const lineItems = cartItems.map(item => ({
      sku: item.sku,
      description: item.item,
      qty: item.qty,
      price: parseFloat(item.price.replace('$', '')),
    }));
    
    setOrderForm({
      ...orderForm,
      items: lineItems.length > 0 ? lineItems : [{ sku: '', description: '', qty: 1, price: 0 }],
    });
    
    setShowFullCatalog(false);
    setShowOrderModal(true);
  };

  const handleTogglePromotionStatus = (id: number) => {
    setPromotions(promotions.map(p =>
      p.id === id
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  // Customer management functions
  const handleViewCustomerDetails = (customer: any) => {
    setSelectedCustomerForDetails(customer);
    setShowCustomerDetails(true);
  };

  const handleEditCustomer = (customer: any) => {
    setCustomerToEdit(customer);
    setShowCustomerDetails(false);
    setShowAddEditCustomer(true);
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const handleSaveCustomer = (customer: any) => {
    if (customer.id && customers.find(c => c.id === customer.id)) {
      // Update existing customer
      setCustomers(customers.map(c => c.id === customer.id ? customer : c));
    } else {
      // Add new customer
      setCustomers([...customers, customer]);
    }
    setCustomerToEdit(null);
  };

  const handleCreateEstimateForCustomer = (customer: any) => {
    setEstimateForm({
      ...estimateForm,
      customer: customer.name,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
      address: `${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}`,
    });
    setShowEstimateModal(true);
  };

  const handleCreateOrderForCustomer = (customer: any) => {
    setOrderForm({
      ...orderForm,
      customer: customer.name,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
      address: `${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}`,
    });
    setShowOrderModal(true);
  };

  // Lead management functions
  const handleViewLeadDetails = (lead: any) => {
    setSelectedLeadForDetails(lead);
    setShowLeadDetails(true);
  };

  const handleEditLead = (lead: any) => {
    setLeadToEdit(lead);
    setShowLeadDetails(false);
    setShowAddEditLead(true);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const handleSaveLead = (leadData: any) => {
    // Convert the old Lead format to the new App.tsx Lead format
    const newLead: Lead = {
      id: leadData.id || `LEAD-${Date.now()}`,
      companyName: leadData.companyName,
      contactName: leadData.contactName,
      email: leadData.email,
      phone: leadData.phone,
      address: leadData.address || '',
      city: leadData.city || '',
      state: leadData.state || '',
      zip: leadData.zip || '',
      industry: leadData.industry || 'General',
      source: leadData.source || 'Direct',
      estimatedValue: typeof leadData.estimatedValue === 'string' 
        ? parseInt(leadData.estimatedValue.replace(/[$,]/g, '')) || 0
        : leadData.estimatedValue || 0,
      notes: leadData.notes || '',
      status: 'pending',  // New leads default to pending status for manager approval
      createdBy: userName,
      createdDate: new Date().toISOString().split('T')[0],
      createdTime: 'Just now',
      assignedTo: userName,
    };

    if (leadData.id && leads.find(l => l.id === leadData.id)) {
      // Update existing lead
      setLeads(leads.map(l => l.id === leadData.id ? { ...l, ...newLead } : l));
    } else {
      // Add new lead
      setLeads([...leads, newLead]);
    }
    setLeadToEdit(null);
  };

  const handleUpdateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleConvertLeadToCustomer = (lead: any) => {
    // Create new customer from lead
    const newCustomer = {
      id: Date.now(),
      name: lead.companyName,
      contactName: lead.contactName,
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      city: lead.city,
      state: lead.state,
      zip: lead.zip,
      sales: '$0',
      creditLimit: '$50,000',
      ytdSales: 0,
      lastOrderDate: 'N/A',
      status: 'active' as const,
      notes: `Converted from lead on ${new Date().toLocaleDateString()}. Original notes: ${lead.notes}`,
    };

    setCustomers([...customers, newCustomer]);
    
    // Update lead status to won
    setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'won' } : l));
    
    alert(`✓ Lead converted to customer successfully!\n\n"${lead.companyName}" is now in your customer list.`);
  };

  // Form states for Estimate and Order modals
  const [estimateForm, setEstimateForm] = useState({
    customer: '',
    contactName: '',
    email: '',
    phone: '',
    items: [{ sku: '', description: '', qty: 1, price: 0 }],
    notes: '',
  });

  const [orderForm, setOrderForm] = useState({
    customer: '',
    contactName: '',
    email: '',
    phone: '',
    poNumber: '',
    items: [{ sku: '', description: '', qty: 1, price: 0 }],
    shippingMethod: 'Standard',
    notes: '',
  });

  const filteredCatalogItems = catalogItems.filter(item =>
    item.sku.toLowerCase().includes(catalogSearchQuery.toLowerCase()) ||
    item.item.toLowerCase().includes(catalogSearchQuery.toLowerCase())
  );

  const filteredFullCatalog = fullCatalogItems.filter(item => {
    const matchesCategory = selectedCatalogCategory === 'All' || item.category === selectedCatalogCategory;
    return matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(fullCatalogItems.map(item => item.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add to Cart Notification Toast */}
      {addedToCartNotification && (
        <div className="fixed top-24 right-6 z-[200] animate-slide-in-right">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px]">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm">Added to Cart</p>
              <p className="text-xs text-green-100 mt-0.5">{addedToCartNotification}</p>
            </div>
            <button
              onClick={() => setAddedToCartNotification(null)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FIXED TOP HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: App Name */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">MT</span>
              </div>
              <div>
                <h1 className="text-gray-900 text-xl">MT-RSR Sales Portal</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-gray-500 text-xs">Unified Dashboard</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-green-600 text-xs">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Global Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers, products, orders..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Right: Quick Actions + User */}
            <div className="flex items-center gap-4">
              {/* Date/Time */}
              <div className="text-right mr-2">
                <p className="text-gray-900 text-sm">{currentTime}</p>
                <p className="text-gray-500 text-xs">{currentDate}</p>
              </div>

              {/* Shopping Cart */}
              <button
                onClick={() => setShowFullCatalog(true)}
                className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Chat Notification */}
              <button
                onClick={() => setShowChatPanel(!showChatPanel)}
                className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className="relative p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="relative pl-4 border-l border-gray-200">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 text-sm">{userName}</p>
                    <p className="text-gray-500 text-xs capitalize">{userRole}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-gray-900 text-sm">{userName}</p>
                      <p className="text-gray-500 text-xs">john.smith@mtrsr.com</p>
                      <p className="text-blue-600 text-xs mt-1 capitalize">Role: {userRole}</p>
                    </div>

                    <button className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition w-full text-left text-sm">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>

                    <button className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition w-full text-left text-sm">
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </button>

                    <button
                      onClick={onLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition w-full text-left text-sm border-t border-gray-200 mt-2 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN SCROLLABLE CONTENT */}
      <main className="px-6 py-6 pb-24">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* SECTION A: PERFORMANCE SNAPSHOT */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-gray-600 text-sm mb-2">Week to Date</p>
              <p className="text-gray-900 text-3xl font-mono mb-2">$18,250</p>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12.3%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-gray-600 text-sm mb-2">Month to Date</p>
              <p className="text-gray-900 text-3xl font-mono mb-2">$98,420</p>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+8.9%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-gray-600 text-sm mb-2">Year to Date</p>
              <p className="text-gray-900 text-3xl font-mono mb-2">$1,184,020</p>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+15.4%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <p className="text-gray-600 text-sm mb-2">Lifetime</p>
              <p className="text-gray-900 text-3xl font-mono mb-2">$2,744,050</p>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+5.2%</span>
              </div>
            </div>
          </div>

          {/* SECTION B: SALES VISUALIZATION */}
          <div className="grid grid-cols-2 gap-6">
            {/* Weekly Sales Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Weekly Sales Trend</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weeklySalesData}>
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
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#D1D5DB"
                    strokeWidth={2}
                    dot={false}
                    name="Last Week"
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 4 }}
                    name="This Week"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top Items Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Top Items Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* By Revenue */}
                <div>
                  <p className="text-gray-600 text-xs mb-2">By Revenue</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={topItemsByRevenue} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" style={{ fontSize: '10px' }} />
                      <YAxis
                        type="category"
                        dataKey="sku"
                        stroke="#6B7280"
                        style={{ fontSize: '10px' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* By Quantity */}
                <div>
                  <p className="text-gray-600 text-xs mb-2">By Quantity</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={topItemsByQty} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" style={{ fontSize: '10px' }} />
                      <YAxis
                        type="category"
                        dataKey="sku"
                        stroke="#6B7280"
                        style={{ fontSize: '10px' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="qty" fill="#10B981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: GEOGRAPHIC & CUSTOMER INSIGHTS */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sales by ZIP */}
            <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">Sales by ZIP Code</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                  <Map className="w-4 h-4" />
                  View Map
                </button>
              </div>
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left text-gray-700 text-sm py-2 px-2">ZIP</th>
                    <th className="text-right text-gray-700 text-sm py-2 px-2">SALES</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByZip.map((item) => (
                    <tr key={item.zip} className="border-b border-gray-100">
                      <td className="py-3 px-2 text-gray-900 text-sm">{item.zip}</td>
                      <td className="py-3 px-2 text-right text-gray-900 text-sm font-mono">
                        {item.sales}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Customers */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Top Customers by Sales</h3>
              <div className="space-y-3">
                {topCustomers.map((customer) => (
                  <button
                    key={customer.name}
                    onClick={() => setSelectedCustomer(customer.name)}
                    className="w-full text-left hover:bg-gray-50 rounded-lg p-2 transition"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900 text-sm">{customer.name}</span>
                      <span className="text-gray-900 text-sm font-mono">
                        ${(customer.sales / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(customer.sales / 142000) * 100}%`,
                          backgroundColor: customer.color,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                  onClick={() => setShowEstimateModal(true)}
                >
                  <FileText className="w-5 h-5" />
                  <span>Create Estimate</span>
                </button>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-sm"
                  onClick={() => setShowConvertModal(true)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Convert to Order</span>
                </button>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                  onClick={() => setShowOrderModal(true)}
                >
                  <Package className="w-5 h-5" />
                  <span>Create Order</span>
                </button>

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition shadow-sm"
                  onClick={() => setShowAddEditLead(true)}
                >
                  <Users className="w-5 h-5" />
                  <span>Create New Lead</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION D: CATALOG & INVENTORY */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 text-lg mb-4">Master Catalog Search</h3>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by part # or description..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={catalogSearchQuery}
                onChange={(e) => setCatalogSearchQuery(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left text-gray-700 text-sm py-3 px-4">SKU</th>
                    <th className="text-left text-gray-700 text-sm py-3 px-4">ITEM</th>
                    <th className="text-right text-gray-700 text-sm py-3 px-4">QOH</th>
                    <th className="text-right text-gray-700 text-sm py-3 px-4">PRICE</th>
                    <th className="text-center text-gray-700 text-sm py-3 px-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalogItems.map((item) => (
                    <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 text-sm font-mono">{item.sku}</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">{item.item}</td>
                      <td className="py-3 px-4 text-right text-gray-900 text-sm font-mono">
                        {item.qoh}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 text-sm font-mono">
                        {item.price}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <button
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mx-auto"
                onClick={() => setShowFullCatalog(true)}
              >
                View Full Catalog
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECTION E: PROMOTIONS & SURPLUS */}
          <div className="grid grid-cols-2 gap-6">
            {/* Active Promotions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">Current Campaigns</h3>
                <button
                  className="text-blue-600 hover:text-blue-700 text-sm"
                  onClick={() => setShowPromotionsModal(true)}
                >
                  Manage Promotions
                </button>
              </div>
              <div className="space-y-3">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition ${
                      promo.status === 'active' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Tag className={`w-5 h-5 ${promo.status === 'active' ? 'text-green-600' : 'text-gray-600'}`} />
                      <div className="flex-1">
                        <span className="text-gray-900 text-sm block">{promo.title}</span>
                        {promo.description && (
                          <span className="text-gray-500 text-xs block mt-0.5">{promo.description}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleTogglePromotionStatus(promo.id)}
                      className={`px-3 py-1 rounded-full text-xs transition ${
                        promo.status === 'active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      title={promo.status === 'active' ? 'Click to deactivate' : 'Click to activate'}
                    >
                      {promo.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Surplus Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">Surplus / Overstock</h3>
                <button
                  className="text-blue-600 hover:text-blue-700 text-sm"
                  onClick={() => setShowSurplusModal(true)}
                >
                  View All
                </button>
              </div>
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left text-gray-700 text-sm py-2 px-2">SKU</th>
                    <th className="text-left text-gray-700 text-sm py-2 px-2">ITEM</th>
                    <th className="text-right text-gray-700 text-sm py-2 px-2">ON HAND</th>
                    <th className="text-right text-gray-700 text-sm py-2 px-2">OFFER</th>
                  </tr>
                </thead>
                <tbody>
                  {surplusItems.map((item) => (
                    <tr key={item.sku} className="border-b border-gray-100">
                      <td className="py-3 px-2 text-gray-900 text-sm font-mono">{item.sku}</td>
                      <td className="py-3 px-2 text-gray-900 text-sm">{item.item}</td>
                      <td className="py-3 px-2 text-right">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded">
                          {item.onHand}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-gray-900 text-sm font-mono">
                        {item.offer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION F: MY CUSTOMERS TABLE & LEADS/AI BROCHURE */}
          <div className="grid grid-cols-12 gap-6">
            {/* My Customers Table */}
            <div className="col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">My Customers ({customers.length})</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={customerSearchQuery}
                    onChange={(e) => setCustomerSearchQuery(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() => setShowAddEditCustomer(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                  <button
                    onClick={() => setShowManageCustomers(true)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    View All
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-xs mb-4">
                Top performing accounts · Click row for details
              </p>
              
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left text-gray-700 text-sm py-3 px-3">Customer Name</th>
                    <th className="text-left text-gray-700 text-sm py-3 px-3">Contact</th>
                    <th className="text-left text-gray-700 text-sm py-3 px-3">ZIP</th>
                    <th className="text-right text-gray-700 text-sm py-3 px-3">YTD SALES</th>
                    <th className="text-center text-gray-700 text-sm py-3 px-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {customers
                    .filter(customer =>
                      customerSearchQuery === '' ||
                      customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
                      customer.contactName.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
                      customer.zip.includes(customerSearchQuery)
                    )
                    .slice(0, 5)
                    .map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition"
                        onClick={() => handleViewCustomerDetails(customer)}
                      >
                        <td className="py-3 px-3 text-gray-900 text-sm">{customer.name}</td>
                        <td className="py-3 px-3 text-gray-700 text-sm">{customer.contactName}</td>
                        <td className="py-3 px-3 text-gray-700 text-sm">{customer.zip}</td>
                        <td className="py-3 px-3 text-right text-gray-900 text-sm font-mono">
                          ${(customer.ytdSales / 1000).toFixed(0)}k
                        </td>
                        <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCustomerForContact(customer);
                                setShowContactModal(true);
                              }}
                              className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition"
                              title={`Call ${customer.phone}`}
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCustomerForContact(customer);
                                setShowContactModal(true);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                              title={`Email ${customer.email}`}
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCreateEstimateForCustomer(customer)}
                              className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                              title="Create Estimate"
                            >
                              Estimate
                            </button>
                            <button
                              onClick={() => handleCreateOrderForCustomer(customer)}
                              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                              title="Create Order"
                            >
                              Order
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Leads & AI Brochure */}
            <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4">Leads & AI Brochure</h3>
              
              {/* Generate AI Brochure */}
              <div className="mb-6">
                <button 
                  onClick={() => setShowBrochureModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-sm"
                >
                  <Zap className="w-5 h-5" />
                  <span>Generate AI Brochure (PDF)</span>
                </button>
                <p className="text-gray-500 text-xs mt-2 text-center">
                  Leads stay outside Fishbowl until Manager approves and assigns pricing
                </p>
              </div>

              {/* Recent Leads */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-gray-900 text-sm">Recent Leads ({leads.length})</h4>
                  <button
                    onClick={() => setShowManageLeads(true)}
                    className="text-blue-600 hover:text-blue-700 text-xs"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {leads.slice(0, 3).map((lead) => {
                    const getStatusColor = (status: string) => {
                      switch (status) {
                        case 'new': return 'bg-blue-100 text-blue-700';
                        case 'contacted': return 'bg-purple-100 text-purple-700';
                        case 'qualified': return 'bg-green-100 text-green-700';
                        case 'proposal': return 'bg-yellow-100 text-yellow-700';
                        default: return 'bg-gray-100 text-gray-700';
                      }
                    };

                    return (
                      <div
                        key={lead.id}
                        onClick={() => handleViewLeadDetails(lead)}
                        className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-gray-900 text-sm">{lead.companyName}</p>
                          <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs mb-1">{lead.contactName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-700 text-xs font-mono">{lead.estimatedValue}</span>
                          <span className="text-blue-700 text-xs">{lead.probability}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lead Management Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="text-blue-900 text-sm mb-2">Lead Workflow</h4>
                <ul className="space-y-2 text-xs text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Create leads for new prospects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Generate AI brochures for presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Convert qualified leads to customers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Panel Overlay */}
      {showChatPanel && (
        <ChatPanel
          show={showChatPanel}
          onClose={() => setShowChatPanel(false)}
          onMessageSent={handleMessageSent}
        />
      )}

      {/* Notification Panel */}
      {showNotificationPanel && (
        <NotificationPanel
          show={showNotificationPanel}
          onClose={() => setShowNotificationPanel(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
        />
      )}

      {/* Estimate Modal */}
      {showEstimateModal && (
        <EstimateModal
          show={showEstimateModal}
          form={estimateForm}
          setForm={setEstimateForm}
          onClose={() => setShowEstimateModal(false)}
        />
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          show={showOrderModal}
          form={orderForm}
          setForm={setOrderForm}
          onClose={() => setShowOrderModal(false)}
        />
      )}

      {/* Convert Modal */}
      {showConvertModal && (
        <ConvertModal
          show={showConvertModal}
          onClose={() => setShowConvertModal(false)}
        />
      )}

      {/* Full Catalog Modal */}
      {showFullCatalog && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setShowFullCatalog(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl">Full Product Catalog</h2>
                <p className="text-blue-100 text-sm mt-1">Browse all {fullCatalogItems.length} available products</p>
              </div>
              <button
                onClick={() => setShowFullCatalog(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Category Filter & Cart Summary */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm">Filter by Category:</span>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCatalogCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        selectedCatalogCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {cartItems.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-700">
                      Cart: <span className="font-mono">{cartItems.length}</span> items
                    </div>
                    <button
                      onClick={() => setCartItems([])}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Catalog Table */}
            <div className="flex-1 overflow-auto p-6">
              <table className="w-full">
                <thead className="border-b-2 border-gray-300 sticky top-0 bg-white">
                  <tr>
                    <th className="text-left text-gray-700 py-3 px-4">SKU</th>
                    <th className="text-left text-gray-700 py-3 px-4">ITEM</th>
                    <th className="text-left text-gray-700 py-3 px-4">CATEGORY</th>
                    <th className="text-right text-gray-700 py-3 px-4">QOH</th>
                    <th className="text-right text-gray-700 py-3 px-4">PRICE</th>
                    <th className="text-center text-gray-700 py-3 px-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFullCatalog.map((item) => {
                    const inCart = cartItems.find(cartItem => cartItem.sku === item.sku);
                    return (
                      <tr key={item.sku} className="border-b border-gray-100 hover:bg-blue-50 transition">
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">{item.sku}</td>
                        <td className="py-3 px-4 text-gray-900 text-sm">{item.item}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.category === 'Widgets' ? 'bg-blue-100 text-blue-700' :
                            item.category === 'Sensors' ? 'bg-purple-100 text-purple-700' :
                            item.category === 'Hardware' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-900 font-mono text-sm">
                          {item.qoh}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-900 font-mono text-sm">
                          {item.price}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {inCart ? (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-green-700 text-sm">✓ In Cart ({inCart.qty})</span>
                              <button
                                onClick={() => handleRemoveFromCart(item.sku)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer with Cart */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <h4 className="text-gray-900 mb-3">Current Cart ({cartItems.length} items)</h4>
                <div className="grid grid-cols-2 gap-3 mb-4 max-h-[200px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.sku} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div>
                        <p className="text-gray-900 text-sm font-mono">{item.sku}</p>
                        <p className="text-gray-600 text-xs">{item.item}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm">Qty: {item.qty}</span>
                        <button
                          onClick={() => handleRemoveFromCart(item.sku)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateEstimateWithCart}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Create Estimate with Cart
                  </button>
                  <button
                    onClick={handleCreateOrderWithCart}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Create Order with Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Promotions Management Modal */}
      {showPromotionsModal && (
        <ManagePromotionsModal
          show={showPromotionsModal}
          onClose={() => setShowPromotionsModal(false)}
          promotions={promotions}
          onUpdatePromotions={setPromotions}
        />
      )}

      {/* Surplus Inventory Management Modal */}
      {showSurplusModal && (
        <ManageSurplusModal
          show={showSurplusModal}
          onClose={() => setShowSurplusModal(false)}
          surplusItems={surplusInventory}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomerForDetails && (
        <CustomerDetailsModal
          show={showCustomerDetails}
          onClose={() => {
            setShowCustomerDetails(false);
            setSelectedCustomerForDetails(null);
          }}
          customer={selectedCustomerForDetails}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
          onCreateEstimate={handleCreateEstimateForCustomer}
          onCreateOrder={handleCreateOrderForCustomer}
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
          customer={customerToEdit}
          onSave={handleSaveCustomer}
        />
      )}

      {/* Manage All Customers Modal */}
      {showManageCustomers && (
        <ManageCustomersModal
          show={showManageCustomers}
          onClose={() => setShowManageCustomers(false)}
          customers={customers}
          onUpdateCustomers={setCustomers}
          onViewDetails={handleViewCustomerDetails}
          onCreateEstimate={handleCreateEstimateForCustomer}
          onCreateOrder={handleCreateOrderForCustomer}
        />
      )}

      {/* Add/Edit Lead Modal */}
      {showAddEditLead && (
        <AddEditLeadModal
          show={showAddEditLead}
          onClose={() => {
            setShowAddEditLead(false);
            setLeadToEdit(null);
          }}
          lead={leadToEdit}
          onSave={handleSaveLead}
        />
      )}

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLeadForDetails && (
        <LeadDetailsModal
          show={showLeadDetails}
          onClose={() => {
            setShowLeadDetails(false);
            setSelectedLeadForDetails(null);
          }}
          lead={selectedLeadForDetails}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
          onConvertToCustomer={handleConvertLeadToCustomer}
          onUpdateStatus={handleUpdateLeadStatus}
        />
      )}

      {/* Manage All Leads Modal */}
      {showManageLeads && (
        <ManageLeadsModal
          show={showManageLeads}
          onClose={() => setShowManageLeads(false)}
          leads={leads}
          onUpdateLeads={setLeads}
          onViewDetails={handleViewLeadDetails}
          onConvertToCustomer={handleConvertLeadToCustomer}
        />
      )}

      {/* AI Brochure Generator Modal */}
      {showBrochureModal && (
        <BrochureModal
          show={showBrochureModal}
          onClose={() => setShowBrochureModal(false)}
          customers={customers}
        />
      )}

      {/* Contact Action Modal */}
      {showContactModal && selectedCustomerForContact && (
        <div className="fixed inset-0 bg-black/40 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => {
            setShowContactModal(false);
            setSelectedCustomerForContact(null);
          }}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl">Contact Customer</h3>
                <p className="text-blue-100 text-sm mt-1">{selectedCustomerForContact.name}</p>
              </div>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setSelectedCustomerForContact(null);
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Contact Person */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-500 text-xs mb-1">Contact Person</p>
                <p className="text-gray-900 text-lg">{selectedCustomerForContact.contactName}</p>
              </div>

              {/* Phone Section */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    <p className="text-gray-700 font-medium">Phone</p>
                  </div>
                </div>
                <p className="text-gray-900 text-lg font-mono mb-3">{selectedCustomerForContact.phone}</p>
                <a
                  href={`tel:${selectedCustomerForContact.phone}`}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-medium"
                  onClick={() => {
                    // Optional: Track call action
                    console.log(`Initiating call to ${selectedCustomerForContact.contactName} at ${selectedCustomerForContact.phone}`);
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              {/* Email Section */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-700 font-medium">Email</p>
                  </div>
                </div>
                <p className="text-gray-900 text-sm mb-3 break-all">{selectedCustomerForContact.email}</p>
                <a
                  href={`mailto:${selectedCustomerForContact.email}?subject=Following up from ${selectedCustomerForContact.name}`}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
                  onClick={() => {
                    // Optional: Track email action
                    console.log(`Opening email to ${selectedCustomerForContact.contactName} at ${selectedCustomerForContact.email}`);
                  }}
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-gray-900">{selectedCustomerForContact.city}, {selectedCustomerForContact.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">ZIP Code</p>
                    <p className="text-gray-900 font-mono">{selectedCustomerForContact.zip}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setSelectedCustomerForContact(null);
                }}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleViewCustomerDetails(selectedCustomerForContact);
                  setShowContactModal(false);
                  setSelectedCustomerForContact(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}