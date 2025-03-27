import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Palette as Paypal, MessageSquare, Clock, Shield, AlertCircle } from 'lucide-react';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51R73MMQ0wlZSw6rnhps4KaOqMDEncuYhA9RthOkqDbwZE2Q0PgTcigSgKwTmlqs5xls7Limikqmiiup8bI4MoxZi00weDa9Xvl');

interface PaymentFlowProps {
  question: string;
}

function PaymentFlow({ question }: PaymentFlowProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | null>(null);
  const [isSubscription, setIsSubscription] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: isSubscription ? 5000 : 500, // amount in pence
          currency: 'gbp',
          question,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        setError('Payment processing failed. Please try again.');
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Connect with a Qualified Lawyer</h2>
      
      {/* Pricing Options */}
      <div className="space-y-4 mb-8">
        <div 
          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            !isSubscription 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-gray-700 hover:border-gray-600'
          }`}
          onClick={() => setIsSubscription(false)}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Single Question</h3>
            <span className="text-2xl font-bold text-white">£5</span>
          </div>
          <p className="text-gray-400 text-sm">One-time payment for detailed legal guidance</p>
        </div>

        <div 
          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            isSubscription 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-gray-700 hover:border-gray-600'
          }`}
          onClick={() => setIsSubscription(true)}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Monthly Access</h3>
            <span className="text-2xl font-bold text-white">£50</span>
          </div>
          <p className="text-gray-400 text-sm">Unlimited questions for 30 days</p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-2 text-gray-300">
          <Clock size={18} className="text-blue-400" />
          <span className="text-sm">24h Response Time</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <MessageSquare size={18} className="text-green-400" />
          <span className="text-sm">Detailed Response</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Shield size={18} className="text-yellow-400" />
          <span className="text-sm">Secure Payment</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4 mb-8">
        <h3 className="text-white font-semibold mb-2">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard size={20} className="text-blue-400" />
            <span className="text-white">Card</span>
          </button>
          <button
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
              paymentMethod === 'paypal'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <Paypal size={20} className="text-blue-400" />
            <span className="text-white">PayPal</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 mb-4">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Terms and Payment Button */}
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          By proceeding with the payment, you agree to our Terms of Service and Privacy Policy. 
          Your payment is secure and processed by Stripe.
        </p>
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            isProcessing || !paymentMethod
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          onClick={handlePayment}
          disabled={isProcessing || !paymentMethod}
        >
          {isProcessing ? 'Processing...' : `Pay £${isSubscription ? '50' : '5'}`}
        </button>
      </div>
    </div>
  );
}

export default PaymentFlow;