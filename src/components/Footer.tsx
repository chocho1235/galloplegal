import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-800 rounded-xl border border-gray-700">
          <div className="flex items-start gap-3 mb-4">
            <Info className="text-blue-400 mt-1 h-5 w-5 md:h-6 md:w-6" />
            <h3 className="text-lg md:text-xl font-semibold text-white">Important Legal Disclaimer</h3>
          </div>
          <div className="text-gray-400 space-y-3 md:space-y-4 text-sm md:text-base">
            <p>
              EquestrianLegal is a platform that connects users with licensed attorneys specializing in equine law. 
              Our service facilitates legal consultations but does not constitute legal representation until formally established.
            </p>
            <p>
              The information provided through this platform is for general informational purposes only and should not be 
              construed as legal advice. Your use of this site does not create an attorney-client relationship.
            </p>
            <p>
              Each legal situation is unique, and outcomes may vary based on specific circumstances. We recommend reviewing our{' '}
              <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link> and engaging directly with an attorney.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs md:text-sm">
          © 2025 EquestrianLegal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;