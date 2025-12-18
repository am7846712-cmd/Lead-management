import { useState } from 'react';
import { FileText, Download, Sparkles, Plus, X } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Industrial Bearings #B-2345',
    partNumber: 'B-2345',
    description: 'High-performance industrial bearings for heavy-duty applications',
    price: 45.50,
    image: 'https://images.unsplash.com/photo-1758873263527-ca53b938fbd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwYmVhcmluZ3MlMjBjb21wb25lbnRzfGVufDF8fHx8MTc2NTQ0MDYxOXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '2',
    name: 'Steel Fasteners Kit #SF-8901',
    partNumber: 'SF-8901',
    description: 'Complete fasteners kit with various sizes and types',
    price: 32.25,
    image: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFydHMlMjB0b29sc3xlbnwxfHx8fDE3NjU0NDA2MTh8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

export default function BrochureGenerator() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [pricing, setPricing] = useState<Record<string, string>>({});
  const [expirationDate, setExpirationDate] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const toggleItem = (productId: string) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  const generateAIContent = () => {
    setAiContent(
      "We are pleased to present our premium selection of industrial components, carefully chosen to meet your operational needs. Our industrial bearings offer exceptional durability and performance in demanding applications, while our comprehensive fastener kits provide reliable solutions for assembly and maintenance tasks. Each product has been selected based on industry-leading quality standards and competitive pricing to ensure maximum value for your investment."
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">AI Brochure Generator</h1>
        <p className="text-gray-600 mt-1">Create professional sales brochures with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Select Customer</h3>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Choose a customer...</option>
              <option value="1">ABC Manufacturing Corp</option>
              <option value="2">XYZ Industries Inc</option>
              <option value="3">Global Tech Solutions</option>
              <option value="4">Premier Manufacturing</option>
            </select>
          </div>

          {/* Product Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Select Products to Include</h3>
            <div className="space-y-3">
              {products.map((product) => {
                const isSelected = selectedItems.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleItem(product.id)}
                    className={`flex gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-gray-900">{product.name}</h4>
                          <p className="text-gray-600 text-sm">{product.partNumber}</p>
                          <p className="text-gray-500 text-xs mt-1">{product.description}</p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="mt-3 flex items-center gap-3">
                          <input
                            type="text"
                            value={pricing[product.id] || product.price.toFixed(2)}
                            onChange={(e) => setPricing({ ...pricing, [product.id]: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Price"
                          />
                          <span className="text-gray-600 text-sm">Custom pricing</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Brochure Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Expiration Date</label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-900">Generate descriptive sales text with AI</span>
                  </div>
                </label>

                {useAI && (
                  <div className="mt-4">
                    <button
                      onClick={generateAIContent}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate AI Content
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-gray-900 mb-4">Brochure Preview</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[400px]">
              <div className="text-center mb-6">
                <h2 className="text-gray-900 text-xl mb-2">Product Brochure</h2>
                <p className="text-gray-600 text-sm">
                  {selectedCustomer ? 'ABC Manufacturing Corp' : 'Customer Name'}
                </p>
              </div>

              {aiContent && useAI && (
                <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-600 text-sm">AI Generated</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{aiContent}</p>
                </div>
              )}

              {selectedItems.length > 0 ? (
                <div className="space-y-3">
                  {selectedItems.map((itemId) => {
                    const product = products.find(p => p.id === itemId);
                    if (!product) return null;
                    return (
                      <div key={itemId} className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-gray-900 text-sm mb-1">{product.name}</p>
                        <p className="text-gray-600 text-xs mb-2">{product.description}</p>
                        <p className="text-blue-600">${pricing[itemId] || product.price.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No products selected</p>
                </div>
              )}

              {expirationDate && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <p className="text-gray-600 text-xs">Valid until: {expirationDate}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                disabled={selectedItems.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <p className="text-gray-500 text-xs text-center">
                {selectedItems.length} product(s) selected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
