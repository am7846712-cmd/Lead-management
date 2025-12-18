import { X, CheckCircle, XCircle, UserPlus, Building2, User, Mail, Phone, MapPin, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { useState } from 'react';
import { Lead } from '../App';

interface ManagerLeadDetailsModalProps {
  show: boolean;
  onClose: () => void;
  lead: Lead;
  onApproveLead: (id: string) => void;
  onRejectLead: (id: string) => void;
  onAssignLead: (id: string, salesPerson: string) => void;
}

export function ManagerLeadDetailsModal({
  show,
  onClose,
  lead,
  onApproveLead,
  onRejectLead,
  onAssignLead,
}: ManagerLeadDetailsModalProps) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignToSalesPerson, setAssignToSalesPerson] = useState(lead.assignedTo || '');

  if (!show) return null;

  const handleAssignLead = () => {
    if (assignToSalesPerson) {
      onAssignLead(lead.id, assignToSalesPerson);
      setShowAssignModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl">Lead Details</h2>
            <p className="text-blue-100 text-sm mt-1">{lead.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Status and Actions Bar */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between border border-gray-200">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-gray-600 text-xs mb-1">Status</p>
                <span className={`px-3 py-1.5 text-sm rounded-lg ${
                  lead.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  lead.status === 'approved' ? 'bg-green-100 text-green-700' :
                  lead.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  lead.status === 'converted' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <p className="text-gray-600 text-xs mb-1">Created By</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs">
                    {lead.createdBy.charAt(0)}
                  </div>
                  <p className="text-gray-900 text-sm">{lead.createdBy}</p>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <p className="text-gray-600 text-xs mb-1">Created</p>
                <p className="text-gray-900 text-sm">{lead.createdDate}</p>
                <p className="text-gray-500 text-xs">{lead.createdTime}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {lead.status === 'pending' && (
                <>
                  <button
                    onClick={() => onApproveLead(lead.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Lead
                  </button>
                  <button
                    onClick={() => onRejectLead(lead.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Lead
                  </button>
                </>
              )}
              {(lead.status === 'approved' || lead.status === 'pending') && (
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {lead.assignedTo ? 'Reassign' : 'Assign'} Lead
                </button>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Company Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-xs mb-1">Company Name</p>
                <p className="text-gray-900 text-sm">{lead.companyName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Industry</p>
                <p className="text-gray-900 text-sm">{lead.industry}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 text-xs mb-1">Address</p>
                <p className="text-gray-900 text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>
                    {lead.address}<br />
                    {lead.city}, {lead.state} {lead.zip}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-xs mb-1">Contact Name</p>
                <p className="text-gray-900 text-sm">{lead.contactName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Email</p>
                <p className="text-gray-900 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                    {lead.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Phone</p>
                <p className="text-gray-900 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                    {lead.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Lead Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-xs mb-1">Lead Source</p>
                <span className="inline-flex px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                  {lead.source}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Estimated Value</p>
                <p className="text-green-700 text-xl font-mono">
                  ${lead.estimatedValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Assigned To</p>
                <p className="text-gray-900 text-sm">
                  {lead.assignedTo || 'Not assigned'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Created Date</p>
                <p className="text-gray-900 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {lead.createdDate}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Notes
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                {lead.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
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
