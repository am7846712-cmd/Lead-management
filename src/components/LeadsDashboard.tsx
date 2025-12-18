import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MapPin, User, Calendar } from 'lucide-react';

interface LeadsDashboardProps {
  userRole: 'salesperson' | 'manager' | 'admin';
}

const leads = [
  {
    id: '1',
    name: 'TechStart Solutions',
    contact: 'Emma Thompson',
    status: 'pending',
    assignedTo: 'John Doe',
    city: 'Austin',
    state: 'TX',
    created: '2025-12-10',
    estimatedValue: '$25,000',
  },
  {
    id: '2',
    name: 'Innovative Manufacturing',
    contact: 'Robert Martinez',
    status: 'approved',
    assignedTo: 'John Doe',
    city: 'Phoenix',
    state: 'AZ',
    created: '2025-12-08',
    estimatedValue: '$42,500',
  },
  {
    id: '3',
    name: 'Future Industries Inc',
    contact: 'Sarah Williams',
    status: 'draft',
    assignedTo: 'John Doe',
    city: 'Denver',
    state: 'CO',
    created: '2025-12-11',
    estimatedValue: '$18,750',
  },
  {
    id: '4',
    name: 'NextGen Systems',
    contact: 'Michael Chen',
    status: 'converted',
    assignedTo: 'Jane Smith',
    city: 'Portland',
    state: 'OR',
    created: '2025-11-28',
    estimatedValue: '$58,900',
  },
  {
    id: '5',
    name: 'Smart Logistics Co',
    contact: 'Lisa Anderson',
    status: 'pending',
    assignedTo: 'Jane Smith',
    city: 'Minneapolis',
    state: 'MN',
    created: '2025-12-09',
    estimatedValue: '$31,200',
  },
];

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  converted: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function LeadsDashboard({ userRole }: LeadsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'my-leads' | 'all-leads'>('my-leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const canViewAllLeads = userRole === 'manager' || userRole === 'admin';

  const displayedLeads = leads.filter((lead) => {
    const matchesTab = activeTab === 'my-leads' ? lead.assignedTo === 'John Doe' : true;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Leads Management</h1>
          <p className="text-gray-600 mt-1">Track and manage sales opportunities</p>
        </div>
        <Link
          to="/leads/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Create Lead
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Total Leads</p>
          <p className="text-gray-900 text-2xl">{leads.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
          <p className="text-gray-900 text-2xl">
            {leads.filter((l) => l.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Approved</p>
          <p className="text-gray-900 text-2xl">
            {leads.filter((l) => l.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Converted</p>
          <p className="text-gray-900 text-2xl">
            {leads.filter((l) => l.status === 'converted').length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-1">
            <button
              onClick={() => setActiveTab('my-leads')}
              className={`px-6 py-3 rounded-lg transition ${
                activeTab === 'my-leads'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              My Leads
            </button>
            {canViewAllLeads && (
              <button
                onClick={() => setActiveTab('all-leads')}
                className={`px-6 py-3 rounded-lg transition ${
                  activeTab === 'all-leads'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Leads
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name or contact..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="converted">Converted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedLeads.map((lead) => (
              <Link
                key={lead.id}
                to={`/leads/${lead.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-gray-900">{lead.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[lead.status]}`}>
                    {lead.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{lead.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{lead.city}, {lead.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Created: {lead.created}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Est. Value</span>
                  <span className="text-gray-900">{lead.estimatedValue}</span>
                </div>

                {canViewAllLeads && (
                  <div className="mt-2 text-xs text-gray-500">
                    Assigned to: {lead.assignedTo}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
