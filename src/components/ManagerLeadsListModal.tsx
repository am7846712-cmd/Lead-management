import { X, CheckCircle, XCircle, UserPlus, Search, Filter, ChevronDown, DollarSign, Calendar, MapPin, Phone, Mail, Building2, User } from 'lucide-react';
import { useState } from 'react';
import { Lead } from '../App';

interface ManagerLeadsListModalProps {
  show: boolean;
  onClose: () => void;
  leads: Lead[];
  onApproveLead: (id: string) => void;
  onRejectLead: (id: string) => void;
  onAssignLead: (id: string, salesPerson: string) => void;
  onViewDetails: (lead: Lead) => void;
}

export function ManagerLeadsListModal({
  show,
  onClose,
  leads,
  onApproveLead,
  onRejectLead,
  onAssignLead,
  onViewDetails,
}: ManagerLeadsListModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending' | 'approved' | 'rejected' | 'converted'>('all');
  const [salesPersonFilter, setSalesPersonFilter] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLeadForAssign, setSelectedLeadForAssign] = useState<string | null>(null);
  const [assignToSalesPerson, setAssignToSalesPerson] = useState('');

  if (!show) return null;

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSalesPerson = salesPersonFilter === 'all' || lead.createdBy === salesPersonFilter;

    return matchesSearch && matchesStatus && matchesSalesPerson;
  });

  // Get unique sales persons
  const salesPersons = Array.from(new Set(leads.map(l => l.createdBy)));

  // Statistics
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => l.status === 'pending').length;
  const approvedLeads = leads.filter(l => l.status === 'approved').length;
  const draftLeads = leads.filter(l => l.status === 'draft').length;
  const totalValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);

  const handleAssignLead = () => {
    if (selectedLeadForAssign && assignToSalesPerson) {
      onAssignLead(selectedLeadForAssign, assignToSalesPerson);
      setShowAssignModal(false);
      setSelectedLeadForAssign(null);
      setAssignToSalesPerson('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl">Manage All Leads</h2>
            <p className="text-blue-100 text-sm mt-1">Review, approve, reject, and assign leads to sales team</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-gray-600 text-xs mb-1">Total Leads</p>
              <p className="text-gray-900 text-2xl font-mono">{totalLeads}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-yellow-700 text-xs mb-1">Pending Approval</p>
              <p className="text-yellow-900 text-2xl font-mono">{pendingLeads}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
              <p className="text-gray-600 text-xs mb-1">Draft</p>
              <p className="text-gray-900 text-2xl font-mono">{draftLeads}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-700 text-xs mb-1">Approved</p>
              <p className="text-green-900 text-2xl font-mono">{approvedLeads}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-blue-700 text-xs mb-1">Est. Total Value</p>
              <p className="text-blue-900 text-xl font-mono">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by company, contact, email, or lead ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="converted">Converted</option>
            </select>

            {/* Sales Person Filter */}
            <select
              value={salesPersonFilter}
              onChange={(e) => setSalesPersonFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="all">All Sales Persons</option>
              {salesPersons.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No leads found matching your filters.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">LEAD ID</th>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">COMPANY</th>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">CONTACT</th>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">INDUSTRY</th>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">SOURCE</th>
                  <th className="text-right text-gray-700 text-xs py-3 px-3">EST. VALUE</th>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">CREATED BY</th>
                  <th className="text-left text-gray-700 text-xs py-3 px-3">STATUS</th>
                  <th className="text-center text-gray-700 text-xs py-3 px-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => onViewDetails(lead)}
                  >
                    <td className="py-4 px-3">
                      <p className="text-gray-900 text-sm font-mono">{lead.id}</p>
                      <p className="text-gray-500 text-xs">{lead.createdTime}</p>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-900 text-sm">{lead.companyName}</p>
                          <p className="text-gray-500 text-xs">{lead.city}, {lead.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <p className="text-gray-900 text-sm">{lead.contactName}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </p>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {lead.industry}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <p className="text-green-700 text-sm font-mono">${lead.estimatedValue.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs">
                          {lead.createdBy.charAt(0)}
                        </div>
                        <p className="text-gray-700 text-sm">{lead.createdBy}</p>
                      </div>
                    </td>
                    <td className="py-4 px-3">
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
                    <td className="py-4 px-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        {lead.status === 'pending' && (
                          <>
                            <button
                              onClick={() => onApproveLead(lead.id)}
                              className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                              title="Approve Lead"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onRejectLead(lead.id)}
                              className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                              title="Reject Lead"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {(lead.status === 'approved' || lead.status === 'pending') && (
                          <button
                            onClick={() => {
                              setSelectedLeadForAssign(lead.id);
                              setAssignToSalesPerson(lead.assignedTo || '');
                              setShowAssignModal(true);
                            }}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                            title="Assign to Sales Person"
                          >
                            <UserPlus className="w-4 h-4" />
                          </button>
                        )}
                        {lead.status === 'draft' && (
                          <span className="text-gray-400 text-xs px-2">Needs completion</span>
                        )}
                        {lead.status === 'rejected' && (
                          <span className="text-red-400 text-xs px-2">Rejected</span>
                        )}
                        {lead.status === 'converted' && (
                          <span className="text-blue-400 text-xs px-2">Converted</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            Showing {filteredLeads.length} of {totalLeads} leads
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Assign Lead Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-white text-xl">Assign Lead</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="p-1 hover:bg-white/20 rounded transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">Assign this lead to a sales person:</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Sales Person</label>
                  <select
                    value={assignToSalesPerson}
                    onChange={(e) => setAssignToSalesPerson(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Sales Person</option>
                    <option value="John S.">John S.</option>
                    <option value="Maria L.">Maria L.</option>
                    <option value="James K.">James K.</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignLead}
                  disabled={!assignToSalesPerson}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Assign Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
