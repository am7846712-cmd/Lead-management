import { X, Zap, Download, Eye, FileText, Sparkles, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface BrochureModalProps {
  show: boolean;
  onClose: () => void;
  customers: any[];
}

export function BrochureModal({ show, onClose, customers }: BrochureModalProps) {
  const [step, setStep] = useState<'config' | 'preview'>('config');
  const [formData, setFormData] = useState({
    customer: '',
    title: '',
    industry: '',
    tone: 'professional',
    includeProducts: true,
    includePricing: false,
    includeTestimonials: true,
    includeContact: true,
    selectedProducts: [] as string[],
    customMessage: '',
  });

  const [generatedBrochure, setGeneratedBrochure] = useState({
    title: '',
    content: '',
    products: [] as any[],
  });

  if (!show) return null;

  const availableProducts = [
    { id: '1', name: 'Industrial Bearing Pro', price: '$245', description: 'High-performance bearing for heavy-duty applications' },
    { id: '2', name: 'Hydraulic Pump V2', price: '$1,250', description: 'Efficient hydraulic pump with advanced pressure control' },
    { id: '3', name: 'Precision Valve Kit', price: '$380', description: 'Complete valve assembly for precision flow control' },
    { id: '4', name: 'Motor Controller XL', price: '$890', description: 'Advanced motor controller with smart diagnostics' },
    { id: '5', name: 'Sensor Array Package', price: '$560', description: 'Complete sensor package for monitoring systems' },
  ];

  const handleGenerateBrochure = () => {
    const selectedCustomer = customers.find(c => c.name === formData.customer);
    const selectedProds = availableProducts.filter(p => formData.selectedProducts.includes(p.id));

    // Generate AI-like content based on selections
    const industryContent: Record<string, string> = {
      'Manufacturing': 'As a leader in the manufacturing sector, we understand your need for reliable, high-performance components that keep production lines running smoothly.',
      'Healthcare': 'In healthcare, precision and reliability are paramount. Our solutions are designed to meet the stringent requirements of medical facilities.',
      'Technology': 'Innovation drives technology forward. Our cutting-edge components are engineered to support your technological advancement.',
      'Construction': 'Construction demands durability and performance. Our industrial-grade solutions are built to withstand the toughest job site conditions.',
      'Automotive': 'The automotive industry requires precision engineering. Our components meet the exacting standards of modern vehicle manufacturing.',
      'Food & Beverage': 'Food safety and efficiency are critical. Our solutions comply with industry standards while maximizing operational performance.',
    };

    const toneIntros: Record<string, string> = {
      'professional': 'We are pleased to present our comprehensive product solutions tailored to your business needs.',
      'friendly': 'We\'re excited to share our amazing product lineup that we think would be perfect for your team!',
      'technical': 'This technical brief outlines our engineered solutions designed to optimize your operational parameters.',
      'persuasive': 'Discover how our industry-leading products can transform your operations and drive measurable results.',
    };

    const brochureContent = `
${toneIntros[formData.tone]}

${formData.industry ? industryContent[formData.industry] || '' : 'Our diverse product range is designed to meet the unique challenges of your industry.'}

${formData.customMessage ? `\n${formData.customMessage}\n` : ''}

FEATURED PRODUCTS

${selectedProds.map((prod, idx) => `
${idx + 1}. ${prod.name}
   ${prod.description}
   ${formData.includePricing ? `   Price: ${prod.price}` : ''}
`).join('\n')}

${formData.includeTestimonials ? `
CUSTOMER SUCCESS STORIES

"Working with this team has transformed our operations. The quality and reliability of their products are unmatched." - Manufacturing Director, Tech Industries

"Their technical support and product knowledge have been invaluable to our success." - Operations Manager, Global Solutions
` : ''}

${formData.includeContact ? `
GET IN TOUCH

We'd love to discuss how our solutions can benefit your organization. Contact us today to schedule a consultation or request a detailed quote.

Phone: (555) 123-4567
Email: sales@mtrsr.com
Web: www.mtrsr.com
` : ''}

Thank you for considering our products. We look forward to partnering with you.
    `.trim();

    setGeneratedBrochure({
      title: formData.title || `Product Solutions for ${selectedCustomer?.name || 'Your Company'}`,
      content: brochureContent,
      products: selectedProds,
    });

    setStep('preview');
  };

  const handleDownloadPDF = () => {
    alert('✓ Brochure PDF downloaded successfully!\n\nIn a production environment, this would generate a professionally formatted PDF with your company branding.');
  };

  const handleSaveToLibrary = () => {
    alert('✓ Brochure saved to library!\n\nYou can access saved brochures from your document library.');
    onClose();
  };

  const toggleProduct = (productId: string) => {
    if (formData.selectedProducts.includes(productId)) {
      setFormData({
        ...formData,
        selectedProducts: formData.selectedProducts.filter(id => id !== productId),
      });
    } else {
      setFormData({
        ...formData,
        selectedProducts: [...formData.selectedProducts, productId],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl flex items-center gap-2">
              <Sparkles className="w-7 h-7" />
              AI Brochure Generator
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              Create professional sales brochures in seconds with AI
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'config' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'config' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {step === 'preview' ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-sm">Configure</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step === 'preview' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'preview' ? 'bg-blue-100' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm">Preview & Download</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'config' ? (
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Configuration */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Select Customer *
                  </label>
                  <select
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="">Choose a customer...</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Brochure Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="e.g., Q1 2025 Product Solutions"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Industry Focus
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="">General / All Industries</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Technology">Technology</option>
                    <option value="Construction">Construction</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Tone & Style
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="professional">Professional & Formal</option>
                    <option value="friendly">Friendly & Approachable</option>
                    <option value="technical">Technical & Detailed</option>
                    <option value="persuasive">Persuasive & Sales-Focused</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Include Sections
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.includeProducts}
                        onChange={(e) => setFormData({ ...formData, includeProducts: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Product Details</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.includePricing}
                        onChange={(e) => setFormData({ ...formData, includePricing: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Pricing Information</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.includeTestimonials}
                        onChange={(e) => setFormData({ ...formData, includeTestimonials: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Customer Testimonials</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.includeContact}
                        onChange={(e) => setFormData({ ...formData, includeContact: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Contact Information</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    value={formData.customMessage}
                    onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    rows={3}
                    placeholder="Add a personalized message for this customer..."
                  />
                </div>
              </div>

              {/* Right Column - Product Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Select Products to Feature ({formData.selectedProducts.length} selected)
                </label>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {availableProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        formData.selectedProducts.includes(product.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.selectedProducts.includes(product.id)}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 text-purple-600 rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{product.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                          <p className="text-purple-700 font-mono text-sm">{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Preview */
            <div>
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-6 max-h-[500px] overflow-y-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl text-gray-900 mb-2">{generatedBrochure.title}</h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
                </div>

                <div className="prose prose-sm max-w-none">
                  {generatedBrochure.content.split('\n').map((line, idx) => {
                    if (line.trim() === '') return <div key={idx} className="h-4"></div>;
                    if (line.match(/^[A-Z\s]+$/)) {
                      return <h2 key={idx} className="text-xl text-gray-900 mt-6 mb-3">{line}</h2>;
                    }
                    return <p key={idx} className="text-gray-700 mb-3">{line}</p>;
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
                >
                  <Download className="w-5 h-5" />
                  Download as PDF
                </button>
                <button
                  onClick={handleSaveToLibrary}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <FileText className="w-5 h-5" />
                  Save to Library
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          {step === 'config' ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateBrochure}
                disabled={!formData.customer || !formData.title || formData.selectedProducts.length === 0}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Generate Brochure with AI
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('config')}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                ← Back to Edit
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
