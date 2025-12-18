import { useState } from 'react';
import { Plus, Tag, Calendar, Percent, Share2, Edit, Trash2 } from 'lucide-react';

interface PromotionsProps {
  userRole: 'salesperson' | 'manager' | 'admin';
}

const promotions = [
  {
    id: '1',
    title: '20% Off Industrial Parts',
    description: 'Get 20% discount on all industrial bearings and fasteners',
    discount: '20%',
    validFrom: '2025-12-01',
    validUntil: '2025-12-31',
    status: 'active',
    products: ['B-2345', 'SF-8901', 'HP-5467'],
  },
  {
    id: '2',
    title: 'Buy 2 Get 1 Free - Fasteners',
    description: 'Purchase 2 fastener kits and get the 3rd one free',
    discount: 'BOGO',
    validFrom: '2025-12-05',
    validUntil: '2025-12-25',
    status: 'active',
    products: ['SF-8901'],
  },
  {
    id: '3',
    title: 'Clearance Sale - Tools',
    description: 'Clear out inventory with 35% off all cutting tools',
    discount: '35%',
    validFrom: '2025-12-10',
    validUntil: '2025-12-20',
    status: 'active',
    products: ['CT-4532'],
  },
  {
    id: '4',
    title: 'Winter Special - Lubricants',
    description: 'Special winter pricing on premium lubricants',
    discount: '15%',
    validFrom: '2025-12-01',
    validUntil: '2026-01-15',
    status: 'active',
    products: ['PL-9876'],
  },
];

export default function Promotions({ userRole }: PromotionsProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    discount: '',
    validFrom: '',
    validUntil: '',
  });

  const isManager = userRole === 'manager' || userRole === 'admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Promotions & Surplus</h1>
          <p className="text-gray-600 mt-1">
            {isManager ? 'Manage promotional campaigns and surplus items' : 'View active promotions and special offers'}
          </p>
        </div>
        {isManager && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Create Promotion
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Active Promotions</p>
          <p className="text-gray-900 text-2xl">{promotions.filter(p => p.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Products on Sale</p>
          <p className="text-gray-900 text-2xl">24</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Discount</p>
          <p className="text-gray-900 text-2xl">22.5%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-gray-600 text-sm mb-1">Promotional Sales</p>
          <p className="text-gray-900 text-2xl">$45,230</p>
        </div>
      </div>

      {/* Create Promotion Form (Manager Only) */}
      {isManager && showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Create New Promotion</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Promotion Title</label>
              <input
                type="text"
                value={newPromotion.title}
                onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., Summer Sale 2025"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe the promotion..."
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Discount Amount</label>
              <input
                type="text"
                value={newPromotion.discount}
                onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., 20% or BOGO"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Product Category</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Select Category</option>
                <option>Bearings</option>
                <option>Fasteners</option>
                <option>Tools</option>
                <option>Motors</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Valid From</label>
              <input
                type="date"
                value={newPromotion.validFrom}
                onChange={(e) => setNewPromotion({ ...newPromotion, validFrom: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Valid Until</label>
              <input
                type="date"
                value={newPromotion.validUntil}
                onChange={(e) => setNewPromotion({ ...newPromotion, validUntil: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create Promotion
            </button>
          </div>
        </div>
      )}

      {/* Promotions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
              <div className="flex items-start justify-between">
                <div className="bg-white rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1">
                    <Percent className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 text-xl">{promo.discount}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-white text-green-700 text-xs rounded-full">
                  {promo.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-gray-900 mb-2">{promo.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{promo.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Valid: {promo.validFrom} to {promo.validUntil}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span>{promo.products.length} products included</span>
                </div>
              </div>

              <div className="flex gap-2">
                {isManager ? (
                  <>
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm flex items-center justify-center gap-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm flex items-center justify-center gap-1">
                    <Share2 className="w-4 h-4" />
                    Share with Customer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
