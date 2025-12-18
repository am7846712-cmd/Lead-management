import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import UnifiedSalesPortal from './components/UnifiedSalesPortal';

// Shared data types
export interface EstimateItem {
  sku: string;
  description: string;
  qty: number;
  price: number;
}

export interface Estimate {
  id: string;
  customer: string;
  contactName: string;
  email: string;
  phone: string;
  items: EstimateItem[];
  notes: string;
  total: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'converted';
  createdBy: string;
  createdDate: string;
  createdTime: string;
}

export interface Order {
  id: string;
  customer: string;
  contactName: string;
  email: string;
  phone: string;
  poNumber: string;
  items: EstimateItem[];
  shippingMethod: string;
  notes: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdBy: string;
  createdDate: string;
  createdTime: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  industry: string;
  source: string;
  estimatedValue: number;
  notes: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'converted';
  createdBy: string;
  createdDate: string;
  createdTime: string;
  assignedTo?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'salesperson' | 'manager' | 'admin'>('salesperson');
  const [userName, setUserName] = useState('John Smith');

  // Shared state for estimates and orders
  const [estimates, setEstimates] = useState<Estimate[]>([
    {
      id: 'EST-1234',
      customer: 'Acme Labs',
      contactName: 'Sarah Johnson',
      email: 'sarah.johnson@acmelabs.com',
      phone: '(555) 123-4567',
      items: [
        { sku: 'FR-D017', description: 'Sensor Pro XL', qty: 10, price: 245 },
      ],
      notes: 'Rush order requested',
      total: 2450,
      status: 'pending',
      createdBy: 'John S.',
      createdDate: '2025-12-10',
      createdTime: '2 days ago',
    },
    {
      id: 'EST-5894',
      customer: 'BlueSky Foods',
      contactName: 'Michael Chen',
      email: 'm.chen@blueskyfoods.com',
      phone: '(555) 234-5678',
      items: [
        { sku: 'FR-D244', description: 'Hydraulic Valve Set', qty: 25, price: 3495.36 },
      ],
      notes: 'Requires manager approval for volume discount',
      total: 87384,
      status: 'pending',
      createdBy: 'Maria L.',
      createdDate: '2025-12-04',
      createdTime: '8 days ago',
    },
    {
      id: 'EST-4983',
      customer: 'Cortex Health',
      contactName: 'Dr. Emily Rodriguez',
      email: 'e.rodriguez@cortexhealth.com',
      phone: '(555) 345-6789',
      items: [
        { sku: 'FR-D044', description: 'Medical Grade Sensor', qty: 50, price: 304.76 },
      ],
      notes: 'FDA compliant required',
      total: 15238,
      status: 'draft',
      createdBy: 'James K.',
      createdDate: '2025-12-11',
      createdTime: '1 day ago',
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-4847',
      customer: 'Delta Foods',
      contactName: 'Robert Taylor',
      email: 'r.taylor@deltafoods.com',
      phone: '(555) 456-7890',
      poNumber: 'PO-78901',
      items: [
        { sku: 'FR-D189', description: 'Food Processing Valve', qty: 15, price: 1656.47 },
      ],
      shippingMethod: 'Standard Ground',
      notes: 'Deliver to warehouse dock',
      total: 24847,
      status: 'processing',
      createdBy: 'John S.',
      createdDate: '2025-12-11',
      createdTime: '12 hours ago',
    },
    {
      id: 'ORD-8882',
      customer: 'Nova Health',
      contactName: 'Dr. Lisa Martinez',
      email: 'l.martinez@novahealth.com',
      phone: '(555) 567-8901',
      poNumber: 'PO-98821',
      items: [
        { sku: 'FR-D925', description: 'Healthcare Monitor Kit', qty: 8, price: 1235.25 },
      ],
      shippingMethod: 'Express',
      notes: 'Urgent delivery required',
      total: 9882,
      status: 'shipped',
      createdBy: 'Maria L.',
      createdDate: '2025-12-09',
      createdTime: '3 days ago',
    },
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LEAD-1001',
      companyName: 'TechVision Solutions',
      contactName: 'David Park',
      email: 'd.park@techvision.com',
      phone: '(555) 789-0123',
      address: '890 Tech Boulevard',
      city: 'Houston',
      state: 'TX',
      zip: '77002',
      industry: 'Technology',
      source: 'Trade Show',
      estimatedValue: 125000,
      notes: 'Interested in automation solutions. Follow up in Q1.',
      status: 'pending',
      createdBy: 'John S.',
      createdDate: '2025-12-11',
      createdTime: '1 day ago',
      assignedTo: 'John S.',
    },
    {
      id: 'LEAD-1002',
      companyName: 'GreenLeaf Manufacturing',
      contactName: 'Amanda Williams',
      email: 'a.williams@greenleaf.com',
      phone: '(555) 890-1234',
      address: '456 Industrial Park',
      city: 'Houston',
      state: 'TX',
      zip: '77019',
      industry: 'Manufacturing',
      source: 'Website Inquiry',
      estimatedValue: 85000,
      notes: 'Needs custom packaging equipment. Waiting for manager approval.',
      status: 'pending',
      createdBy: 'Maria L.',
      createdDate: '2025-12-10',
      createdTime: '2 days ago',
      assignedTo: 'Maria L.',
    },
    {
      id: 'LEAD-1003',
      companyName: 'MediCare Plus',
      contactName: 'Dr. James Thompson',
      email: 'j.thompson@medicareplus.com',
      phone: '(555) 901-2345',
      address: '123 Healthcare Drive',
      city: 'Houston',
      state: 'TX',
      zip: '77021',
      industry: 'Healthcare',
      source: 'Referral',
      estimatedValue: 65000,
      notes: 'New medical facility opening. Draft lead needs completion.',
      status: 'draft',
      createdBy: 'James K.',
      createdDate: '2025-12-12',
      createdTime: '6 hours ago',
    },
  ]);

  const handleLogin = (role: 'salesperson' | 'manager' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    // Set name based on role for demo purposes
    setUserName(role === 'manager' || role === 'admin' ? 'Mike Johnson (Manager)' : 'Sarah Johnson');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('salesperson');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <UnifiedSalesPortal 
      userRole={userRole} 
      userName={userName}
      onLogout={handleLogout}
      estimates={estimates}
      setEstimates={setEstimates}
      orders={orders}
      setOrders={setOrders}
      leads={leads}
      setLeads={setLeads}
    />
  );
}