import { useState } from 'react';
import { X, Plus, Trash2, Search } from 'lucide-react';

interface ItemRow {
  sku: string;
  description: string;
  qty: number;
  price: number;
}

interface EstimateForm {
  customer: string;
  contactName: string;
  email: string;
  phone: string;
  items: ItemRow[];
  notes: string;
}

interface OrderForm {
  customer: string;
  contactName: string;
  email: string;
  phone: string;
  poNumber: string;
  items: ItemRow[];
  shippingMethod: string;
  notes: string;
}

interface EstimateModalProps {
  show: boolean;
  onClose: () => void;
  form: EstimateForm;
  setForm: (form: EstimateForm) => void;
  onSubmit?: (form: EstimateForm, total: number) => void;
}

interface OrderModalProps {
  show: boolean;
  onClose: () => void;
  form: OrderForm;
  setForm: (form: OrderForm) => void;
  onSubmit?: (form: OrderForm, total: number) => void;
}

interface ConvertModalProps {
  show: boolean;
  onClose: () => void;
}

// Mock customer data for search
const mockCustomers = [
  { name: 'Acme Labs', contactName: 'Sarah Johnson', email: 'sarah.johnson@acmelabs.com', phone: '(555) 123-4567' },
  { name: 'BlueSky Foods', contactName: 'Michael Chen', email: 'm.chen@blueskyfoods.com', phone: '(555) 234-5678' },
  { name: 'Cortex Health', contactName: 'Dr. Emily Rodriguez', email: 'e.rodriguez@cortexhealth.com', phone: '(555) 345-6789' },
  { name: 'Northline Retail', contactName: 'James Patterson', email: 'jpatterson@northlineretail.com', phone: '(555) 456-7890' },
  { name: 'Bayou Industrial', contactName: 'Robert Williams', email: 'r.williams@bayouindustrial.com', phone: '(555) 567-8901' },
  { name: 'Delta Foods', contactName: 'Robert Taylor', email: 'r.taylor@deltafoods.com', phone: '(555) 678-9012' },
  { name: 'Nova Health', contactName: 'Dr. Lisa Martinez', email: 'l.martinez@novahealth.com', phone: '(555) 789-0123' },
];

// Mock catalog items for search
const mockCatalogItems = [
  { sku: 'FB-001', description: 'Widget Alpha', price: 89.99 },
  { sku: 'FB-031', description: 'Widget Beta', price: 74.50 },
  { sku: 'FB-044', description: 'Sensor Pro', price: 129.99 },
  { sku: 'FB-099', description: 'Bracket Kit', price: 24.99 },
  { sku: 'FB-055', description: 'Valve Assembly', price: 45.00 },
  { sku: 'FB-002', description: 'Widget Gamma', price: 95.99 },
  { sku: 'FB-045', description: 'Sensor Elite', price: 189.99 },
  { sku: 'FB-056', description: 'Valve Pro', price: 68.50 },
  { sku: 'FB-100', description: 'Mounting Plate', price: 18.99 },
  { sku: 'FB-101', description: 'Connector Kit', price: 32.50 },
  { sku: 'FB-046', description: 'Temp Sensor', price: 79.99 },
  { sku: 'FB-057', description: 'Pressure Valve', price: 112.00 },
  { sku: 'FB-003', description: 'Widget Delta', price: 102.50 },
  { sku: 'FB-102', description: 'Bolt Set (50pc)', price: 15.99 },
  { sku: 'FB-047', description: 'Motion Sensor', price: 145.00 },
];

export function EstimateModal({ show, onClose, form, setForm, onSubmit }: EstimateModalProps) {
  const [customerSearch, setCustomerSearch] = useState('');
  const [lineItemSearch, setLineItemSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showLineItemDropdown, setShowLineItemDropdown] = useState(false);

  if (!show) return null;

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { sku: '', description: '', qty: 1, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof ItemRow, value: string | number) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setForm({ ...form, items: newItems });
  };

  const calculateTotal = () => {
    return form.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const handleSubmit = () => {
    console.log('Estimate submitted:', form);
    alert(`Estimate created successfully!\nCustomer: ${form.customer}\nTotal: $${calculateTotal().toFixed(2)}`);
    onClose();
  };

  const handleCustomerSelect = (customer: typeof mockCustomers[0]) => {
    setForm({
      ...form,
      customer: customer.name,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
    });
    setCustomerSearch('');
    setShowCustomerDropdown(false);
  };

  const handleLineItemSelect = (item: typeof mockCatalogItems[0]) => {
    const newItems = [...form.items];
    if (newItems.length === 1 && !newItems[0].sku && !newItems[0].description) {
      // Replace the first empty item
      newItems[0] = {
        sku: item.sku,
        description: item.description,
        qty: 1,
        price: item.price,
      };
    } else {
      // Add as a new item
      newItems.push({
        sku: item.sku,
        description: item.description,
        qty: 1,
        price: item.price,
      });
    }
    setForm({ ...form, items: newItems });
    setLineItemSearch('');
    setShowLineItemDropdown(false);
  };

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customerSearch &&
      (customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.contactName.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerSearch.toLowerCase()))
  );

  const filteredLineItems = mockCatalogItems.filter(
    (item) =>
      lineItemSearch &&
      (item.sku.toLowerCase().includes(lineItemSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(lineItemSearch.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-blue-50">
          <h2 className="text-xl text-gray-900">Create New Estimate</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Customer Search */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Search Customer</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  setShowCustomerDropdown(true);
                }}
                onFocus={() => setShowCustomerDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Search by customer name, contact, or email..."
              />
              {showCustomerDropdown && filteredCustomers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCustomers.map((customer, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCustomerSelect(customer)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-gray-900 text-sm font-medium">{customer.name}</p>
                      <p className="text-gray-600 text-xs">{customer.contactName} • {customer.email}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Select or enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Contact person"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Line Item Search */}
          <div className="mb-4">
            <h3 className="text-gray-900 mb-3">Search Line Items</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={lineItemSearch}
                onChange={(e) => {
                  setLineItemSearch(e.target.value);
                  setShowLineItemDropdown(true);
                }}
                onFocus={() => setShowLineItemDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Search by SKU or description..."
              />
              {showLineItemDropdown && filteredLineItems.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredLineItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLineItemSelect(item)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-gray-900 text-sm font-medium font-mono">{item.sku}</p>
                        <p className="text-gray-600 text-xs">{item.description}</p>
                      </div>
                      <p className="text-gray-900 text-sm font-mono">${item.price.toFixed(2)}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">Line Items</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs text-gray-700 py-2 px-3">SKU</th>
                    <th className="text-left text-xs text-gray-700 py-2 px-3">Description</th>
                    <th className="text-center text-xs text-gray-700 py-2 px-3">Qty</th>
                    <th className="text-right text-xs text-gray-700 py-2 px-3">Price</th>
                    <th className="text-right text-xs text-gray-700 py-2 px-3">Total</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.sku}
                          onChange={(e) => updateItem(index, 'sku', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="FB-001"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="Widget Alpha"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          min="1"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-2 px-3 text-right text-sm text-gray-900 font-mono">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                      <td className="py-2 px-3">
                        {form.items.length > 1 && (
                          <button
                            onClick={() => removeItem(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="py-3 px-3 text-right text-gray-900">
                      <strong>Estimate Total:</strong>
                    </td>
                    <td className="py-3 px-3 text-right text-gray-900 text-lg font-mono">
                      <strong>${calculateTotal().toFixed(2)}</strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows={3}
              placeholder="Additional notes or terms..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Estimate
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrderModal({ show, onClose, form, setForm }: OrderModalProps) {
  const [customerSearch, setCustomerSearch] = useState('');
  const [lineItemSearch, setLineItemSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showLineItemDropdown, setShowLineItemDropdown] = useState(false);

  if (!show) return null;

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { sku: '', description: '', qty: 1, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof ItemRow, value: string | number) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setForm({ ...form, items: newItems });
  };

  const calculateTotal = () => {
    return form.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const handleSubmit = () => {
    console.log('Order submitted:', form);
    alert(`Order created successfully!\nCustomer: ${form.customer}\nSO#: ${form.poNumber}\nTotal: $${calculateTotal().toFixed(2)}`);
    onClose();
  };

  const handleCustomerSelect = (customer: typeof mockCustomers[0]) => {
    setForm({
      ...form,
      customer: customer.name,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
    });
    setCustomerSearch('');
    setShowCustomerDropdown(false);
  };

  const handleLineItemSelect = (item: typeof mockCatalogItems[0]) => {
    const newItems = [...form.items];
    if (newItems.length === 1 && !newItems[0].sku && !newItems[0].description) {
      // Replace the first empty item
      newItems[0] = {
        sku: item.sku,
        description: item.description,
        qty: 1,
        price: item.price,
      };
    } else {
      // Add as a new item
      newItems.push({
        sku: item.sku,
        description: item.description,
        qty: 1,
        price: item.price,
      });
    }
    setForm({ ...form, items: newItems });
    setLineItemSearch('');
    setShowLineItemDropdown(false);
  };

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customerSearch &&
      (customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.contactName.toLowerCase().includes(customerSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerSearch.toLowerCase()))
  );

  const filteredLineItems = mockCatalogItems.filter(
    (item) =>
      lineItemSearch &&
      (item.sku.toLowerCase().includes(lineItemSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(lineItemSearch.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-green-50">
          <h2 className="text-xl text-gray-900">Create New Order</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Customer Search */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Search Customer</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  setShowCustomerDropdown(true);
                }}
                onFocus={() => setShowCustomerDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Search by customer name, contact, or email..."
              />
              {showCustomerDropdown && filteredCustomers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCustomers.map((customer, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCustomerSelect(customer)}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 transition border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-gray-900 text-sm font-medium">{customer.name}</p>
                      <p className="text-gray-600 text-xs">{customer.contactName} • {customer.email}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Select or enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">SO Number *</label>
                <input
                  type="text"
                  value={form.poNumber}
                  onChange={(e) => setForm({ ...form, poNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="SO-2024-001"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Contact person"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Shipping Method</label>
                <select
                  value={form.shippingMethod}
                  onChange={(e) => setForm({ ...form, shippingMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="Standard">Standard Shipping</option>
                  <option value="Express">Express Shipping</option>
                  <option value="Overnight">Overnight</option>
                  <option value="Will Call">Will Call</option>
                </select>
              </div>
            </div>
          </div>

          {/* Line Item Search */}
          <div className="mb-4">
            <h3 className="text-gray-900 mb-3">Search Line Items</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={lineItemSearch}
                onChange={(e) => {
                  setLineItemSearch(e.target.value);
                  setShowLineItemDropdown(true);
                }}
                onFocus={() => setShowLineItemDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Search by SKU or description..."
              />
              {showLineItemDropdown && filteredLineItems.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredLineItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLineItemSelect(item)}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 transition border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-gray-900 text-sm font-medium font-mono">{item.sku}</p>
                        <p className="text-gray-600 text-xs">{item.description}</p>
                      </div>
                      <p className="text-gray-900 text-sm font-mono">${item.price.toFixed(2)}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900">Line Items</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs text-gray-700 py-2 px-3">SKU</th>
                    <th className="text-left text-xs text-gray-700 py-2 px-3">Description</th>
                    <th className="text-center text-xs text-gray-700 py-2 px-3">Qty</th>
                    <th className="text-right text-xs text-gray-700 py-2 px-3">Price</th>
                    <th className="text-right text-xs text-gray-700 py-2 px-3">Total</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.sku}
                          onChange={(e) => updateItem(index, 'sku', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                          placeholder="FB-001"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                          placeholder="Widget Alpha"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                          min="1"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded text-right focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-2 px-3 text-right text-sm text-gray-900 font-mono">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                      <td className="py-2 px-3">
                        {form.items.length > 1 && (
                          <button
                            onClick={() => removeItem(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="py-3 px-3 text-right text-gray-900">
                      <strong>Order Total:</strong>
                    </td>
                    <td className="py-3 px-3 text-right text-gray-900 text-lg font-mono">
                      <strong>${calculateTotal().toFixed(2)}</strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              rows={3}
              placeholder="Delivery instructions, special requirements..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConvertModal({ show, onClose }: ConvertModalProps) {
  if (!show) return null;

  const estimates = [
    { id: 'EST-2456', customer: 'Acme Labs', amount: '$12,450', date: '2025-12-10' },
    { id: 'EST-2455', customer: 'BlueSky Foods', amount: '$8,750', date: '2025-12-09' },
    { id: 'EST-2454', customer: 'Cortex Health', amount: '$15,230', date: '2025-12-08' },
  ];

  const handleConvert = (estimateId: string) => {
    alert(`Converting estimate ${estimateId} to order...`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-purple-50">
          <h2 className="text-xl text-gray-900">Convert Estimate to Order</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-gray-600 text-sm mb-4">
            Select an estimate to convert into a sales order
          </p>

          <div className="space-y-3">
            {estimates.map((estimate) => (
              <div
                key={estimate.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-gray-900">{estimate.id}</p>
                    <p className="text-gray-600 text-sm">{estimate.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-mono">{estimate.amount}</p>
                    <p className="text-gray-500 text-xs">{estimate.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleConvert(estimate.id)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                >
                  Convert to Order
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
