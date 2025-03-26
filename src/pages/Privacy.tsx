import React from 'react';

function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Information Collection</h2>
          <p className="text-gray-300">
            We collect information necessary to provide legal services, including contact details, case information, 
            and communication records. All data is handled with strict confidentiality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Information</h2>
          <p className="text-gray-300">
            Your information is used solely for providing legal services, improving our platform, and maintaining 
            communication. We never sell or share your data with third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
          <p className="text-gray-300">
            We employ industry-standard security measures to protect your information. All communications are 
            encrypted and stored securely.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to access, correct, or delete your personal information. Contact us to exercise 
            these rights or learn more about our data practices.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;