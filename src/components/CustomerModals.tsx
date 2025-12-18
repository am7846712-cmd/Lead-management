import { X, Plus, Edit2, Trash2, Phone, Mail, MapPin, Building2, DollarSign, Calendar, FileText, Package, TrendingUp, User } from 'lucide-react';
import { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  zip: string;
  sales: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  creditLimit: string;
  ytdSales: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  notes: string;
}

interface CustomerDetailsModalProps {
  show: boolean;
  onClose: () => void;
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
  onCreateEstimate: (customer: Customer) => void;
  onCreateOrder: (customer: Customer) => void;
}

interface AddEditCustomerModalProps {
  show: boolean;
  onClose: () => void;
  customer?: Customer | null;
  onSave: (customer: Customer) => void;
}

interface ManageCustomersModalProps {
  show: boolean;
  onClose: () => void;
  customers: Customer[];
  onUpdateCustomers: (customers: Customer[]) => void;
  onViewDetails: (customer: Customer) => void;
  onCreateEstimate: (customerName: string) => void;
  onCreateOrder: (customerName: string) => void;
}

export function CustomerDetailsModal({
  show,
  onClose,
  customer,
  onEdit,
  onDelete,
  onCreateEstimate,
  onCreateOrder,
}: CustomerDetailsModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!show) return null;

  const handleDelete = () => {
    onDelete(customer.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">{customer.name}</h2>
            <p className="text-blue-100 text-sm mt-1">Customer Details & History</p>
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
              <p className="text-green-700 text-xs mb-1">YTD Sales</p>
              <p className="text-green-900 text-xl font-mono">${(customer.ytdSales / 1000).toFixed(0)}k</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-xs mb-1">Credit Limit</p>
              <p className="text-blue-900 text-xl font-mono">{customer.creditLimit}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-700 text-xs mb-1">Last Order</p>
              <p className="text-purple-900 text-sm">{customer.lastOrderDate}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700 text-xs mb-1">Status</p>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
              }`}>
                {customer.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
              </span>
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
                    <p className="text-gray-900 text-sm">{customer.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Phone</p>
                    <a href={`tel:${customer.phone}`} className="text-blue-600 text-sm hover:underline">{customer.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <a href={`mailto:${customer.email}`} className="text-blue-600 text-sm hover:underline">{customer.email}</a>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Address</p>
                    <p className="text-gray-900 text-sm">{customer.address}</p>
                    <p className="text-gray-900 text-sm">{customer.city}, {customer.state} {customer.zip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 text-lg mb-2">Notes</h3>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {customer.notes || 'No notes available for this customer.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                onCreateEstimate(customer);
                onClose();
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FileText className="w-5 h-5" />
              Create Estimate
            </button>
            <button
              onClick={() => {
                onCreateOrder(customer);
                onClose();
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Package className="w-5 h-5" />
              Create Order
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(customer)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Customer
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

export function AddEditCustomerModal({
  show,
  onClose,
  customer,
  onSave,
}: AddEditCustomerModalProps) {
  const [formData, setFormData] = useState<Partial<Customer>>(
    customer || {
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      creditLimit: '$50,000',
      status: 'active',
      notes: '',
    }
  );

  if (!show) return null;

  const handleSubmit = () => {
    if (!formData.name || !formData.contactName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Contact, Email, Phone)');
      return;
    }

    const customerData: Customer = {
      id: customer?.id || Date.now(),
      name: formData.name!,
      contactName: formData.contactName!,
      email: formData.email!,
      phone: formData.phone!,
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      zip: formData.zip || '',
      sales: customer?.sales || '$0',
      creditLimit: formData.creditLimit || '$50,000',
      ytdSales: customer?.ytdSales || 0,
      lastOrderDate: customer?.lastOrderDate || 'N/A',
      status: formData.status as 'active' | 'inactive',
      notes: formData.notes || '',
    };

    onSave(customerData);
    alert(`✓ Customer ${customer ? 'updated' : 'created'} successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">{customer ? 'Edit Customer' : 'Add New Customer'}</h2>
            <p className="text-green-100 text-sm mt-1">
              {customer ? 'Update customer information' : 'Create a new customer record'}
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
          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., Acme Labs"
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactName || ''}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., John Doe"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="contact@acmelabs.com"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="123 Main Street"
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Houston"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="TX"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={formData.zip || ''}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="77002"
                />
              </div>
            </div>

            {/* Credit Limit & Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Credit Limit
                </label>
                <input
                  type="text"
                  value={formData.creditLimit || ''}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="$50,000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="active">🟢 Active</option>
                  <option value="inactive">⚪ Inactive</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                rows={3}
                placeholder="Add any notes about this customer..."
              />
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
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {customer ? '✓ Update Customer' : '✓ Create Customer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ManageCustomersModal({
  show,
  onClose,
  customers,
  onUpdateCustomers,
  onViewDetails,
  onCreateEstimate,
  onCreateOrder,
}: ManageCustomersModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'sales' | 'lastOrder'>('sales');

  if (!show) return null;

  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.zip.includes(searchQuery) ||
        customer.contactName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'sales') return b.ytdSales - a.ytdSales;
      if (sortBy === 'lastOrder') return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime();
      return 0;
    });

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">All Customers</h2>
            <p className="text-blue-100 text-sm mt-1">
              Manage your customer database ({customers.length} total)
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
                placeholder="Search by name, ZIP, or contact..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">🟢 Active Only</option>
              <option value="inactive">⚪ Inactive Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'sales' | 'lastOrder')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="sales">Sort by Sales</option>
              <option value="name">Sort by Name</option>
              <option value="lastOrder">Sort by Last Order</option>
            </select>
          </div>
          <p className="text-gray-600 text-sm">
            Showing {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>

        {/* Customer List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No customers found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-gray-900 text-lg">{customer.name}</h4>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            customer.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {customer.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-gray-500 text-xs">Contact</p>
                          <p className="text-gray-900 text-sm">{customer.contactName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Location</p>
                          <p className="text-gray-900 text-sm">{customer.city || customer.zip}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">YTD Sales</p>
                          <p className="text-green-700 text-sm font-mono">
                            ${(customer.ytdSales / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Last Order</p>
                          <p className="text-gray-900 text-sm">{customer.lastOrderDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => onViewDetails(customer)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        View Details
                      </button>
                      <a
                        href={`tel:${customer.phone}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${customer.email}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          onCreateEstimate(customer.name);
                          onClose();
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        title="Create Estimate"
                      >
                        <FileText className="w-4 h-4" />
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