import React from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';

interface PaymentSuccessProps {
  referenceNumber: string;
  question: string;
}

function PaymentSuccess({ referenceNumber, question }: PaymentSuccessProps) {
  const handleWhatsAppClick = () => {
    const message = `Legal Consultation #${referenceNumber}. My question is: ${question}`;
    const whatsappNumber = '447351778518'; // Replace with actual business WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircle size={48} className="text-green-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400">Your consultation reference number is:</p>
        <p className="text-xl font-mono text-blue-400 mt-2">#{referenceNumber}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">Next Steps</h3>
          <p className="text-gray-300 text-sm">
            Click the button below to connect with your lawyer via WhatsApp. 
            You'll receive a response within 24 hours.
          </p>
        </div>

        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare size={20} />
          Connect on WhatsApp
        </button>

        <p className="text-sm text-gray-400">
          Please keep your reference number handy for future correspondence. 
          Your lawyer will respond within 24 hours.
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;