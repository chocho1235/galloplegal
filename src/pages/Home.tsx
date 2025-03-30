import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, Clock, Users, Lock, CheckCircle, Send, Gavel, FileText, ScrollText } from 'lucide-react';
import PaymentFlow from '../components/PaymentFlow';
import PaymentSuccess from '../components/PaymentSuccess';

function Home() {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const categories = [
    { id: 'buying', name: 'Buying & Selling', icon: <FileText size={20} /> },
    { id: 'safety', name: 'Safety & Risk', icon: <Shield size={20} /> },
    { id: 'property', name: 'Land & Stables', icon: <Gavel size={20} /> },
    { id: 'protection', name: 'Insurance Help', icon: <ScrollText size={20} /> },
  ];

  const handleSubmit = () => {
    if (!acceptedTerms) {
      alert('Please accept the terms before we connect you with a lawyer');
      return;
    }
    
    if (!message.trim()) {
      alert('Please tell us about your situation');
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = (reference: string) => {
    setReferenceNumber(reference);
    setPaymentComplete(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Expert Legal Guidance for
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                {" "}Equine Matters
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with specialized attorneys who understand the unique legal landscape of equine law.
              Get the expert advice you need to protect your interests.
            </p>
          </div>
        </div>
      </div>

      {/* Question Form Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-6 md:p-8 rounded-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <Clock size={18} />
                  <span>Lawyers ready to help</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={18} />
                  <span>Quick, helpful advice</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400 text-sm">
                  <Lock size={18} />
                  <span>100% Anonymous</span>
                </div>
              </div>

              {!showPayment ? (
                <>
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors text-sm ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon}
                        {category.name}
                      </button>
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <textarea 
                      className="w-full bg-gray-700/50 text-white rounded-lg p-3 pr-12 resize-none text-sm md:text-base backdrop-blur-sm"
                      rows={3}
                      placeholder="Tell us about your situation..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                      className="absolute bottom-3 right-3 text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={handleSubmit}
                    >
                      <Send size={20} />
                    </button>
                  </div>

                  <div className="flex items-start gap-2 mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-xs md:text-sm text-gray-400">
                      By continuing, you agree to our{' '}
                      <Link to="/terms" className="text-blue-400 hover:underline">Terms</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
                      . We'll connect you with a lawyer who can help.
                    </label>
                  </div>

                  <button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm md:text-base"
                    onClick={handleSubmit}
                  >
                    Chat with a Lawyer Now
                  </button>
                </>
              ) : paymentComplete ? (
                <PaymentSuccess />
              ) : (
                <PaymentFlow question={message} onSuccess={handlePaymentSuccess} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose GallopLegal?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide specialized legal expertise tailored to the equine industry, ensuring your interests are protected.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Scale className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Specialized Expertise</h3>
              <p className="text-gray-400">
                Our attorneys have deep knowledge of equine law and industry-specific regulations.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Protection</h3>
              <p className="text-gray-400">
                We handle all aspects of equine law, from contracts to liability and insurance matters.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Response</h3>
              <p className="text-gray-400">
                Get timely legal advice when you need it most, with flexible consultation options.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-200 max-w-md">
                  Connect with our expert attorneys today and get the legal guidance you need.
                </p>
              </div>
              <Link
                to="/pricing"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;