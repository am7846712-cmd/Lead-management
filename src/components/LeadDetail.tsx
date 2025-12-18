import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, XCircle, FileText, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';

interface LeadDetailProps {
  userRole: 'salesperson' | 'manager' | 'admin';
}

const leadData = {
  id: '1',
  name: 'TechStart Solutions',
  contact: 'Emma Thompson',
  phone: '(512) 555-0145',
  email: 'ethompson@techstart.com',
  address: '456 Innovation Drive',
  city: 'Austin',
  state: 'TX',
  zip: '78701',
  status: 'approved',
  assignedTo: 'John Doe',
  created: '2025-12-10',
  estimatedValue: '$25,000',
  priceLevel: 'Tier 2 - Standard',
};

const statusStages = [
  { name: 'Draft', status: 'completed', icon: CheckCircle },
  { name: 'Pending', status: 'completed', icon: CheckCircle },
  { name: 'Approved', status: 'active', icon: Clock },
  { name: 'Converted', status: 'pending', icon: Clock },
];

const notes = [
  {
    id: 1,
    text: 'Initial contact made. Company is looking to upgrade their equipment.',
    author: 'John Doe',
    date: '2025-12-10 10:30 AM',
  },
  {
    id: 2,
    text: 'Sent product catalog and pricing information. Follow-up scheduled for next week.',
    author: 'John Doe',
    date: '2025-12-10 2:45 PM',
  },
  {
    id: 3,
    text: 'Lead approved. Price level set to Tier 2.',
    author: 'Manager',
    date: '2025-12-11 9:15 AM',
  },
];

export default function LeadDetail({ userRole }: LeadDetailProps) {
  const { id } = useParams();
  const isManagerOrAdmin = userRole === 'manager' || userRole === 'admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Link to="/leads" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900">{leadData.name}</h1>
            <p className="text-gray-600 mt-1">Lead Details & Status</p>
          </div>
          <div className="flex gap-3">
            {leadData.status === 'approved' && (
              <Link
                to="/estimates/create"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FileText className="w-4 h-4" />
                Create Estimate
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Lead Status Timeline</h3>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
            <div className="h-full bg-blue-600" style={{ width: '66.66%' }}></div>
          </div>
          {statusStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={stage.name} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    stage.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : stage.status === 'active'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`text-sm ${
                    stage.status === 'completed' || stage.status === 'active'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {stage.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company & Contact Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Company & Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Company Name</p>
                <p className="text-gray-900">{leadData.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Contact Person</p>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{leadData.contact}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${leadData.phone}`} className="text-blue-600 hover:text-blue-700">
                    {leadData.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${leadData.email}`} className="text-blue-600 hover:text-blue-700">
                    {leadData.email}
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-600 text-sm mb-1">Address</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">
                    {leadData.address}, {leadData.city}, {leadData.state} {leadData.zip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Lead Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Estimated Value</p>
                <p className="text-gray-900 text-xl">{leadData.estimatedValue}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Created Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{leadData.created}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <span className="inline-flex px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  {leadData.status}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Assigned To</p>
                <p className="text-gray-900">{leadData.assignedTo}</p>
              </div>
              {isManagerOrAdmin && (
                <div className="md:col-span-2">
                  <p className="text-gray-600 text-sm mb-1">Assigned Price Level</p>
                  <p className="text-gray-900">{leadData.priceLevel}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Activity Notes</h3>
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <p className="text-gray-900 mb-2">{note.text}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {note.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {note.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <textarea
                placeholder="Add a new note..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {leadData.status === 'approved' && (
                <Link
                  to="/estimates/create"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Create Estimate
                </Link>
              )}
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Send Email
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Schedule Follow-up
              </button>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-gray-900 mb-3">Next Steps</h3>
            {leadData.status === 'approved' ? (
              <div>
                <p className="text-gray-700 text-sm mb-3">
                  Lead has been approved! You can now create an estimate for this customer.
                </p>
                <Link
                  to="/estimates/create"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Create Estimate</span>
                </Link>
              </div>
            ) : (
              <p className="text-gray-700 text-sm">
                Waiting for manager approval. You'll be notified once the lead is reviewed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
