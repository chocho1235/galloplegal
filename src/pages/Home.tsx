import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, Shield, Clock, Send, 
  CheckCircle, Gavel, FileText, ScrollText, Lock, HelpCircle
} from 'lucide-react';
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-16 flex-grow">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
            <div className="inline-flex items-center bg-blue-500/10 text-blue-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm">
              <Lock size={16} className="mr-2" />
              Private & Confidential Chat
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Horse Law Made <span className="text-blue-400">Simple</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl">
              Quick, friendly help with any horse-related legal matter. Our experienced lawyers are here to protect you and your horses.
            </p>
            
            {!showPayment ? (
              <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-xl border border-gray-700 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
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

                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors text-sm ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.icon}
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea 
                    className="w-full bg-gray-700 text-white rounded-lg p-3 pr-12 resize-none text-sm md:text-base"
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

                <div className="mt-4 flex items-start gap-2">
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
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm md:text-base"
                  onClick={handleSubmit}
                >
                  Chat with a Lawyer Now
                </button>
              </div>
            ) : paymentComplete ? (
              <PaymentSuccess referenceNumber={referenceNumber} question={message} />
            ) : (
              <PaymentFlow question={message} onSuccess={handlePaymentSuccess} />
            )}
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Gavel className="text-yellow-400" size={24} />}
              title="Friendly Expert Help"
              description="Horse-savvy lawyers who speak your language"
            />
            <FeatureCard 
              icon={<Shield className="text-green-400" size={24} />}
              title="Peace of Mind"
              description="We're here to protect you and your horses"
            />
            <FeatureCard 
              icon={<MessageSquare className="text-blue-400" size={24} />}
              title="Clear Guidance"
              description="Simple explanations, no complex legal jargon"
            />
            <FeatureCard 
              icon={<HelpCircle className="text-purple-400" size={24} />}
              title="Always Here"
              description="Get help whenever you need it, day or night"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
      <div className="mb-3 md:mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-400">{description}</p>
    </div>
  );
}

export default Home;