import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PaymentStatus {
  isValid: boolean;
  amount: number;
  currency: string;
  status: string;
  question?: string;
}

function Admin() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!referenceNumber.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(`http://localhost:3000/verify-payment/${referenceNumber}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_ADMIN_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Verification</h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter reference number"
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading || !referenceNumber.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Verify</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            {status && (
              <div className="mt-6 p-4 rounded-lg bg-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  {status.isValid ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {status.isValid ? 'Payment Verified' : 'Payment Not Found'}
                  </h3>
                </div>
                
                {status.isValid && (
                  <div className="space-y-2 text-gray-300">
                    <p>Amount: {status.amount / 100} {status.currency.toUpperCase()}</p>
                    <p>Status: {status.status}</p>
                    {status.question && (
                      <p>Question: {status.question}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin; 