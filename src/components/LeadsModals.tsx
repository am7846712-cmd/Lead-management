import { X, Plus, Edit2, Trash2, Phone, Mail, MapPin, Building2, Calendar, DollarSign, TrendingUp, CheckCircle, Clock, XCircle, User, Star, Briefcase, Users } from 'lucide-react';
import { useState } from 'react';

interface Lead {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  estimatedValue: string;
  probability: number;
  nextFollowUp: string;
  assignedTo: string;
  industry: string;
  notes: string;
  createdDate: string;
}

interface AddEditLeadModalProps {
  show: boolean;
  onClose: () => void;
  lead?: Lead | null;
  onSave: (lead: Lead) => void;
}

interface LeadDetailsModalProps {
  show: boolean;
  onClose: () => void;
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onConvertToCustomer: (lead: Lead) => void;
  onUpdateStatus: (id: number, status: Lead['status']) => void;
}

interface ManageLeadsModalProps {
  show: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  onViewDetails: (lead: Lead) => void;
  onConvertToCustomer: (lead: Lead) => void;
}

export function AddEditLeadModal({
  show,
  onClose,
  lead,
  onSave,
}: AddEditLeadModalProps) {
  const [formData, setFormData] = useState<Partial<Lead>>(
    lead || {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      source: 'website',
      status: 'new',
      estimatedValue: '$0',
      probability: 25,
      nextFollowUp: '',
      assignedTo: 'Me',
      industry: '',
      notes: '',
      createdDate: new Date().toISOString().split('T')[0],
    }
  );

  if (!show) return null;

  const handleSubmit = () => {
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Company, Contact, Email, Phone)');
      return;
    }

    const leadData: Lead = {
      id: lead?.id || Date.now(),
      companyName: formData.companyName!,
      contactName: formData.contactName!,
      email: formData.email!,
      phone: formData.phone!,
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      zip: formData.zip || '',
      source: formData.source || 'website',
      status: formData.status as Lead['status'],
      estimatedValue: formData.estimatedValue || '$0',
      probability: formData.probability || 25,
      nextFollowUp: formData.nextFollowUp || '',
      assignedTo: formData.assignedTo || 'Me',
      industry: formData.industry || '',
      notes: formData.notes || '',
      createdDate: formData.createdDate || new Date().toISOString().split('T')[0],
    };

    onSave(leadData);
    alert(`✓ Lead ${lead ? 'updated' : 'created'} successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">{lead ? 'Edit Lead' : 'Create New Lead'}</h2>
            <p className="text-blue-100 text-sm mt-1">
              {lead ? 'Update lead information' : 'Add a new sales prospect'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName || ''}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Tech Solutions Inc"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactName || ''}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="contact@company.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry || ''}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Industry</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Technology">Technology</option>
                  <option value="Retail">Retail</option>
                  <option value="Construction">Construction</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Houston"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state || ''}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="TX"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">ZIP</label>
                  <input
                    type="text"
                    value={formData.zip || ''}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="77002"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Lead Source
                </label>
                <select
                  value={formData.source || 'website'}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="trade-show">Trade Show</option>
                  <option value="cold-call">Cold Call</option>
                  <option value="email">Email Campaign</option>
                  <option value="social-media">Social Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'new'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="new">🆕 New</option>
                  <option value="contacted">📞 Contacted</option>
                  <option value="qualified">✅ Qualified</option>
                  <option value="proposal">📄 Proposal Sent</option>
                  <option value="negotiation">🤝 Negotiation</option>
                  <option value="won">🎉 Won</option>
                  <option value="lost">❌ Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Estimated Value
                </label>
                <input
                  type="text"
                  value={formData.estimatedValue || ''}
                  onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="$25,000"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Win Probability: {formData.probability}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.probability || 25}
                  onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Next Follow-Up
                </label>
                <input
                  type="date"
                  value={formData.nextFollowUp || ''}
                  onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Assigned To
                </label>
                <select
                  value={formData.assignedTo || 'Me'}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Me">Me (Current User)</option>
                  <option value="John Smith">John Smith</option>
                  <option value="Sarah Wilson">Sarah Wilson</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                  <option value="Unassigned">Unassigned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows={4}
                  placeholder="Add notes about this lead..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {lead ? '✓ Update Lead' : '✓ Create Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function LeadDetailsModal({
  show,
  onClose,
  lead,
  onEdit,
  onDelete,
  onConvertToCustomer,
  onUpdateStatus,
}: LeadDetailsModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!show) return null;

  const handleDelete = () => {
    onDelete(lead.id);
    onClose();
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-purple-100 text-purple-700';
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'proposal': return 'bg-yellow-100 text-yellow-700';
      case 'negotiation': return 'bg-orange-100 text-orange-700';
      case 'won': return 'bg-emerald-100 text-emerald-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new': return '🆕';
      case 'contacted': return '📞';
      case 'qualified': return '✅';
      case 'proposal': return '📄';
      case 'negotiation': return '🤝';
      case 'won': return '🎉';
      case 'lost': return '❌';
      default: return '•';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">{lead.companyName}</h2>
            <p className="text-blue-100 text-sm mt-1">Lead Details & Activity</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-xs mb-1">Estimated Value</p>
              <p className="text-green-900 text-xl font-mono">{lead.estimatedValue}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-xs mb-1">Win Probability</p>
              <p className="text-blue-900 text-xl font-mono">{lead.probability}%</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-700 text-xs mb-1">Status</p>
              <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(lead.status)}`}>
                {getStatusIcon(lead.status)} {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-700 text-xs mb-1">Next Follow-Up</p>
              <p className="text-orange-900 text-sm">{lead.nextFollowUp || 'Not set'}</p>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-gray-900 text-sm mb-3">Update Status</h3>
            <div className="flex gap-2 flex-wrap">
              {(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] as Lead['status'][]).map((status) => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(lead.id, status)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition ${
                    lead.status === status
                      ? getStatusColor(status) + ' ring-2 ring-blue-500'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {getStatusIcon(status)} {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 text-lg mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Contact Person</p>
                    <p className="text-gray-900 text-sm">{lead.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Phone</p>
                    <a href={`tel:${lead.phone}`} className="text-blue-600 text-sm hover:underline">{lead.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <a href={`mailto:${lead.email}`} className="text-blue-600 text-sm hover:underline">{lead.email}</a>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Address</p>
                    <p className="text-gray-900 text-sm">{lead.address || 'Not provided'}</p>
                    {lead.city && <p className="text-gray-900 text-sm">{lead.city}, {lead.state} {lead.zip}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Industry</p>
                    <p className="text-gray-900 text-sm">{lead.industry || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Assigned To</p>
                    <p className="text-gray-900 text-sm">{lead.assignedTo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="text-blue-900 text-sm mb-2">Lead Source</h4>
              <p className="text-blue-700 text-sm capitalize">{lead.source.replace('-', ' ')}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h4 className="text-purple-900 text-sm mb-2">Created Date</h4>
              <p className="text-purple-700 text-sm">{lead.createdDate}</p>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 text-lg mb-2">Notes</h3>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {lead.notes || 'No notes available for this lead.'}
            </p>
          </div>

          {/* Convert to Customer */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-green-900 text-lg mb-2">Ready to Convert?</h3>
            <p className="text-green-700 text-sm mb-4">
              Convert this lead to a customer and start creating estimates and orders.
            </p>
            <button
              onClick={() => {
                onConvertToCustomer(lead);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <CheckCircle className="w-5 h-5" />
              Convert to Customer
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(lead)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Lead
            </button>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 border border-red-300 rounded-lg px-3 py-2">
                <span className="text-red-700 text-sm">Confirm delete?</span>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                >
                  No
                </button>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function ManageLeadsModal({
  show,
  onClose,
  leads,
  onUpdateLeads,
  onViewDetails,
  onConvertToCustomer,
}: ManageLeadsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Lead['status']>('all');
  const [sortBy, setSortBy] = useState<'value' | 'probability' | 'date'>('value');

  if (!show) return null;

  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = 
        lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'value') {
        const aVal = parseFloat(a.estimatedValue.replace(/[$,]/g, ''));
        const bVal = parseFloat(b.estimatedValue.replace(/[$,]/g, ''));
        return bVal - aVal;
      }
      if (sortBy === 'probability') return b.probability - a.probability;
      if (sortBy === 'date') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      return 0;
    });

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-purple-100 text-purple-700';
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'proposal': return 'bg-yellow-100 text-yellow-700';
      case 'negotiation': return 'bg-orange-100 text-orange-700';
      case 'won': return 'bg-emerald-100 text-emerald-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new': return '🆕';
      case 'contacted': return '📞';
      case 'qualified': return '✅';
      case 'proposal': return '📄';
      case 'negotiation': return '🤝';
      case 'won': return '🎉';
      case 'lost': return '❌';
      default: return '•';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">All Leads</h2>
            <p className="text-blue-100 text-sm mt-1">
              Manage your sales pipeline ({leads.length} total leads)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, contact, or email..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | Lead['status'])}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="new">🆕 New</option>
              <option value="contacted">📞 Contacted</option>
              <option value="qualified">✅ Qualified</option>
              <option value="proposal">📄 Proposal</option>
              <option value="negotiation">🤝 Negotiation</option>
              <option value="won">🎉 Won</option>
              <option value="lost">❌ Lost</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'value' | 'probability' | 'date')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="value">Sort by Value</option>
              <option value="probability">Sort by Probability</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
          <p className="text-gray-600 text-sm">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No leads found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-gray-900 text-lg">{lead.companyName}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(lead.status)}`}>
                          {getStatusIcon(lead.status)} {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-4 mb-3">
                        <div>
                          <p className="text-gray-500 text-xs">Contact</p>
                          <p className="text-gray-900 text-sm">{lead.contactName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Value</p>
                          <p className="text-green-700 text-sm font-mono">{lead.estimatedValue}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Probability</p>
                          <p className="text-blue-700 text-sm font-mono">{lead.probability}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Source</p>
                          <p className="text-gray-900 text-sm capitalize">{lead.source.replace('-', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Follow-Up</p>
                          <p className="text-gray-900 text-sm">{lead.nextFollowUp || 'Not set'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => onViewDetails(lead)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        View Details
                      </button>
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          onConvertToCustomer(lead);
                          onClose();
                        }}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="Convert to Customer"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
