import { useState } from 'react';
import { Search, User, MapPin, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react';

const pendingLeads = [
  {
    id: '1',
    name: 'TechStart Solutions',
    contact: 'Emma Thompson',
    phone: '(512) 555-0145',
    email: 'ethompson@techstart.com',
    city: 'Austin',
    state: 'TX',
    assignedTo: 'John Doe',
    created: '2025-12-10',
    estimatedValue: '$25,000',
    notes: 'Company is looking to upgrade their manufacturing equipment. Good opportunity for long-term relationship.',
  },
  {
    id: '5',
    name: 'Smart Logistics Co',
    contact: 'Lisa Anderson',
    phone: '(612) 555-0189',
    email: 'landerson@smartlogistics.com',
    city: 'Minneapolis',
    state: 'MN',
    assignedTo: 'Jane Smith',
    created: '2025-12-09',
    estimatedValue: '$31,200',
    notes: 'Interested in warehouse automation solutions. Requesting quote for conveyor systems.',
  },
  {
    id: '6',
    name: 'Precision Parts Inc',
    contact: 'Robert Johnson',
    phone: '(414) 555-0167',
    email: 'rjohnson@precisionparts.com',
    city: 'Milwaukee',
    state: 'WI',
    assignedTo: 'John Doe',
    created: '2025-12-11',
    estimatedValue: '$18,500',
    notes: 'Small manufacturer looking for replacement parts and maintenance supplies.',
  },
];

export default function ManagerApproval() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [priceLevel, setPriceLevel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = pendingLeads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (leadId: string) => {
    alert(`Lead ${leadId} approved with price level: ${priceLevel}`);
    setSelectedLead(null);
    setPriceLevel('');
  };

  const handleReject = (leadId: string) => {
    alert(`Lead ${leadId} rejected`);
    setSelectedLead(null);
  };

  const activeLead = pendingLeads.find((lead) => lead.id === selectedLead);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Lead Approvals</h1>
        <p className="text-gray-600 mt-1">Review and approve pending leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
          <p className="text-gray-900 text-2xl">{pendingLeads.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Total Value</p>
          <p className="text-gray-900 text-2xl">$74,700</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Response Time</p>
          <p className="text-gray-900 text-2xl">2.3 hrs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => {
                  setSelectedLead(lead.id);
                  setPriceLevel('');
                }}
                className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                  selectedLead === lead.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <h4 className="text-gray-900 mb-2">{lead.name}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{lead.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{lead.city}, {lead.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>{lead.estimatedValue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{lead.created}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Assigned to: {lead.assignedTo}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Review Panel */}
        <div className="lg:col-span-2">
          {activeLead ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-gray-900 mb-4">Review Lead</h2>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-gray-900">{activeLead.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">Submitted on {activeLead.created}</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                    Pending Review
                  </span>
                </div>
              </div>

              {/* Company & Contact Info */}
              <div>
                <h4 className="text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Contact Person</p>
                    <p className="text-gray-900">{activeLead.contact}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Location</p>
                    <p className="text-gray-900">{activeLead.city}, {activeLead.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Phone</p>
                    <p className="text-gray-900">{activeLead.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <p className="text-gray-900">{activeLead.email}</p>
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div>
                <h4 className="text-gray-900 mb-3">Lead Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Estimated Value</p>
                    <p className="text-gray-900 text-xl">{activeLead.estimatedValue}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Assigned Sales Person</p>
                    <p className="text-gray-900">{activeLead.assignedTo}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-gray-900 mb-3">Notes</h4>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-gray-700">{activeLead.notes}</p>
                </div>
              </div>

              {/* Price Level Assignment */}
              <div>
                <h4 className="text-gray-900 mb-3">Assign Price Level</h4>
                <select
                  value={priceLevel}
                  onChange={(e) => setPriceLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Price Level</option>
                  <option value="tier1">Tier 1 - Premium (5% discount)</option>
                  <option value="tier2">Tier 2 - Standard (10% discount)</option>
                  <option value="tier3">Tier 3 - Volume (15% discount)</option>
                  <option value="tier4">Tier 4 - Enterprise (20% discount)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleReject(activeLead.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Lead
                </button>
                <button
                  onClick={() => handleApprove(activeLead.id)}
                  disabled={!priceLevel}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Lead
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No Lead Selected</h3>
              <p className="text-gray-600">
                Select a lead from the list to review and approve
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
