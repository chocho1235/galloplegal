import React from 'react';

function Terms() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Service Overview</h2>
          <p className="text-gray-300">
            EquestrianLegal provides a platform connecting users with licensed attorneys specializing in equine law. 
            Our service facilitates legal consultations but does not constitute legal representation until formally established.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">2. User Responsibilities</h2>
          <p className="text-gray-300">
            Users must provide accurate information and use the service in good faith. 
            You are responsible for maintaining the confidentiality of your account information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Legal Disclaimer</h2>
          <p className="text-gray-300">
            Information provided through this platform is for general informational purposes only and should not be 
            construed as legal advice. No attorney-client relationship is formed until explicitly agreed upon in writing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Privacy & Confidentiality</h2>
          <p className="text-gray-300">
            We maintain strict confidentiality standards. Your communications with attorneys are protected by 
            attorney-client privilege once a formal relationship is established.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">5. Payment Terms</h2>
          <p className="text-gray-300">
            Payment is required before accessing legal services. Refunds are available according to our refund policy 
            and applicable law.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Terms;