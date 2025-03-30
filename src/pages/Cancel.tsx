import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Cancel() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col items-center text-center mb-8">
            <XCircle size={48} className="text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h2>
            <p className="text-gray-400">Your payment was cancelled. No charges were made.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">What happened?</h3>
              <p className="text-gray-300 text-sm">
                You cancelled the payment process. If you'd like to try again, 
                you can return to the previous page and complete your payment.
              </p>
            </div>

            <Link
              to="/"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Return to Home
            </Link>

            <p className="text-sm text-gray-400">
              Need help? Contact our support team at support@galloplegal.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancel; 