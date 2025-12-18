import { X, Plus, Edit2, Trash2, Tag, TrendingDown, ShoppingCart, Mail, FileText } from 'lucide-react';
import { useState } from 'react';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
  appliesTo: string;
}

interface SurplusItem {
  sku: string;
  item: string;
  onHand: number;
  cost: string;
  offer: string;
  category: string;
  reason: 'overstock' | 'low-demand' | 'discontinued';
}

interface ManagePromotionsModalProps {
  show: boolean;
  onClose: () => void;
  promotions: Promotion[];
  onUpdatePromotions: (promotions: Promotion[]) => void;
}

interface ManageSurplusModalProps {
  show: boolean;
  onClose: () => void;
  surplusItems: SurplusItem[];
  onAddToCart: (item: { sku: string; item: string; price: string }) => void;
}

export function ManagePromotionsModal({
  show,
  onClose,
  promotions,
  onUpdatePromotions,
}: ManagePromotionsModalProps) {
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    status: 'active',
    appliesTo: 'All Products',
  });

  if (!show) return null;

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setFormData({
      title: '',
      description: '',
      discount: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'active',
      appliesTo: 'All Products',
    });
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData(promotion);
    setIsCreatingNew(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.discount || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (isCreatingNew) {
      const newPromotion: Promotion = {
        id: Math.max(...promotions.map(p => p.id), 0) + 1,
        title: formData.title!,
        description: formData.description || '',
        discount: formData.discount!,
        startDate: formData.startDate!,
        endDate: formData.endDate!,
        status: formData.status as 'active' | 'inactive',
        appliesTo: formData.appliesTo || 'All Products',
      };
      onUpdatePromotions([...promotions, newPromotion]);
      alert('✓ Promotion created successfully!');
    } else if (editingPromotion) {
      onUpdatePromotions(
        promotions.map(p =>
          p.id === editingPromotion.id
            ? { ...p, ...formData } as Promotion
            : p
        )
      );
      alert('✓ Promotion updated successfully!');
    }

    setIsCreatingNew(false);
    setEditingPromotion(null);
    setFormData({});
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      onUpdatePromotions(promotions.filter(p => p.id !== id));
      alert('✓ Promotion deleted successfully!');
    }
  };

  const handleToggleStatus = (id: number) => {
    onUpdatePromotions(
      promotions.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
          : p
      )
    );
  };

  const handleCancel = () => {
    setIsCreatingNew(false);
    setEditingPromotion(null);
    setFormData({});
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Manage Promotions & Campaigns</h2>
            <p className="text-purple-100 text-sm mt-1">
              Create and manage sales campaigns, discounts, and special offers
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
          {/* Create/Edit Form */}
          {(isCreatingNew || editingPromotion) && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <h3 className="text-gray-900 text-lg mb-4">
                {isCreatingNew ? '✨ Create New Promotion' : '✏️ Edit Promotion'}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">
                    Promotion Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="e.g., Summer Sale - 20% Off"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    rows={2}
                    placeholder="Promotion details and terms..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Discount *</label>
                  <input
                    type="text"
                    value={formData.discount || ''}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="e.g., 15%, $50 off, Buy 2 Get 1"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Applies To</label>
                  <select
                    value={formData.appliesTo || 'All Products'}
                    onChange={(e) => setFormData({ ...formData, appliesTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option>All Products</option>
                    <option>Widgets</option>
                    <option>Sensors</option>
                    <option>Hardware</option>
                    <option>Valves</option>
                    <option>Select Customers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.status === 'active'}
                        onChange={() => setFormData({ ...formData, status: 'active' })}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-sm text-gray-700">🟢 Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.status === 'inactive'}
                        onChange={() => setFormData({ ...formData, status: 'inactive' })}
                        className="w-4 h-4 text-gray-600"
                      />
                      <span className="text-sm text-gray-700">⚪ Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  {isCreatingNew ? '✓ Create Promotion' : '✓ Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Create New Button */}
          {!isCreatingNew && !editingPromotion && (
            <div className="mb-6">
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Create New Promotion
              </button>
            </div>
          )}

          {/* Promotions List */}
          <div className="space-y-4">
            <h3 className="text-gray-900 text-lg">All Promotions ({promotions.length})</h3>

            {promotions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No promotions created yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Create your first promotion to start driving sales
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className={`border-2 rounded-xl p-5 transition ${
                      promo.status === 'active'
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-gray-900 text-lg">{promo.title}</h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              promo.status === 'active'
                                ? 'bg-green-200 text-green-800'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {promo.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                          </span>
                        </div>
                        {promo.description && (
                          <p className="text-gray-600 text-sm mb-2">{promo.description}</p>
                        )}
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-gray-500 text-xs">Discount</p>
                            <p className="text-gray-900 text-sm font-mono">{promo.discount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Duration</p>
                            <p className="text-gray-900 text-sm">
                              {promo.startDate} to {promo.endDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Applies To</p>
                            <p className="text-gray-900 text-sm">{promo.appliesTo}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleToggleStatus(promo.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition ${
                            promo.status === 'active'
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {promo.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEdit(promo)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(promo.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

export function ManageSurplusModal({
  show,
  onClose,
  surplusItems,
  onAddToCart,
}: ManageSurplusModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterReason, setFilterReason] = useState<'all' | 'overstock' | 'low-demand' | 'discontinued'>('all');

  if (!show) return null;

  const filteredItems = surplusItems.filter(
    item => filterReason === 'all' || item.reason === filterReason
  );

  const handleSelectItem = (sku: string) => {
    if (selectedItems.includes(sku)) {
      setSelectedItems(selectedItems.filter(s => s !== sku));
    } else {
      setSelectedItems([...selectedItems, sku]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.sku));
    }
  };

  const handleCreatePromotion = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to create a promotion');
      return;
    }
    alert(
      `✓ Creating promotion for ${selectedItems.length} item(s):\n${selectedItems.join(', ')}\n\nThis would open the promotion creation form with these items pre-selected.`
    );
  };

  const handleSendAlerts = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to send alerts');
      return;
    }
    alert(
      `✓ Sending email alerts to all sales reps about ${selectedItems.length} surplus item(s):\n${selectedItems.join(', ')}\n\nSales team will be notified about special pricing opportunities.`
    );
  };

  const handleAddSelectedToCart = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to add to cart');
      return;
    }
    selectedItems.forEach(sku => {
      const item = surplusItems.find(i => i.sku === sku);
      if (item) {
        onAddToCart({ sku: item.sku, item: item.item, price: item.offer });
      }
    });
    alert(`✓ Added ${selectedItems.length} surplus items to cart with special pricing!`);
    setSelectedItems([]);
  };

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case 'overstock':
        return 'bg-orange-100 text-orange-700';
      case 'low-demand':
        return 'bg-yellow-100 text-yellow-700';
      case 'discontinued':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'overstock':
        return '📦';
      case 'low-demand':
        return '📉';
      case 'discontinued':
        return '🚫';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Manage Surplus & Overstock Inventory</h2>
            <p className="text-orange-100 text-sm mt-1">
              Create promotions and clear excess inventory with special pricing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter & Bulk Actions */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Filter by Reason:</span>
              <button
                onClick={() => setFilterReason('all')}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  filterReason === 'all'
                    ? 'bg-gray-700 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                All ({surplusItems.length})
              </button>
              <button
                onClick={() => setFilterReason('overstock')}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  filterReason === 'overstock'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                📦 Overstock
              </button>
              <button
                onClick={() => setFilterReason('low-demand')}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  filterReason === 'low-demand'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                📉 Low Demand
              </button>
              <button
                onClick={() => setFilterReason('discontinued')}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  filterReason === 'discontinued'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                🚫 Discontinued
              </button>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm">
                  {selectedItems.length} selected
                </span>
                <button
                  onClick={() => setSelectedItems([])}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>

          {selectedItems.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={handleCreatePromotion}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
              >
                <Tag className="w-4 h-4" />
                Create Promotion ({selectedItems.length})
              </button>
              <button
                onClick={handleSendAlerts}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                <Mail className="w-4 h-4" />
                Send Sales Alerts
              </button>
              <button
                onClick={handleAddSelectedToCart}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <TrendingDown className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No surplus items found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your filter criteria
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-lg">
                  Surplus Items ({filteredItems.length})
                </h3>
                <button
                  onClick={handleSelectAll}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-10 py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left text-gray-700 py-3 px-4">SKU</th>
                      <th className="text-left text-gray-700 py-3 px-4">ITEM</th>
                      <th className="text-left text-gray-700 py-3 px-4">CATEGORY</th>
                      <th className="text-left text-gray-700 py-3 px-4">REASON</th>
                      <th className="text-right text-gray-700 py-3 px-4">ON HAND</th>
                      <th className="text-right text-gray-700 py-3 px-4">COST</th>
                      <th className="text-right text-gray-700 py-3 px-4">OFFER PRICE</th>
                      <th className="text-center text-gray-700 py-3 px-4">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr
                        key={item.sku}
                        className={`border-b border-gray-100 hover:bg-blue-50 transition ${
                          selectedItems.includes(item.sku) ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.sku)}
                            onChange={() => handleSelectItem(item.sku)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">
                          {item.sku}
                        </td>
                        <td className="py-3 px-4 text-gray-900 text-sm">{item.item}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${getReasonBadge(
                              item.reason
                            )}`}
                          >
                            {getReasonIcon(item.reason)} {item.reason}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded font-mono">
                            {item.onHand}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600 text-sm font-mono">
                          {item.cost}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-green-700 text-sm font-mono">
                            {item.offer}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => onAddToCart({ sku: item.sku, item: item.item, price: item.offer })}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition"
                              title="Create Promotion"
                              onClick={() => {
                                setSelectedItems([item.sku]);
                                handleCreatePromotion();
                              }}
                            >
                              <Tag className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Select multiple items to create bulk promotions or send team alerts
          </div>
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
