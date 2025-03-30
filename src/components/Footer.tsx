import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              GallopLegal
            </h3>
            <p className="text-gray-400 text-sm">
              Expert legal guidance for equine matters. Protecting your interests with specialized expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/expertise" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Legal Expertise
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="text-blue-400 mt-1" size={16} />
                <span className="text-gray-400 text-sm">support@galloplegal.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="text-blue-400 mt-1" size={16} />
                <span className="text-gray-400 text-sm">+44 (0) 20 7123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="text-blue-400 mt-1" size={16} />
                <span className="text-gray-400 text-sm">London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Info className="text-blue-400 mt-1 h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Important Legal Disclaimer</h3>
            </div>
            <div className="text-gray-400 space-y-3 text-sm">
              <p>
                GallopLegal is a platform that connects users with licensed attorneys specializing in equine law. 
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
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <div>© {new Date().getFullYear()} GallopLegal. All rights reserved.</div>
          <div className="mt-2">
            <a href="https://equinology.co.uk" className="hover:text-gray-400 transition-colors">
              Powered by Equinology
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;