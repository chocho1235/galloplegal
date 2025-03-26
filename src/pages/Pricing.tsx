import React from 'react';
import { CheckCircle } from 'lucide-react';

function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        Affordable Legal Support
      </h1>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Choose the plan that fits your needs. All plans include access to licensed equine law attorneys.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <PriceCard
          title="Single Question"
          price="49"
          features={[
            "One detailed legal consultation",
            "Written summary of advice",
            "Response within 24 hours",
            "Basic document review"
          ]}
        />
        <PriceCard
          title="Monthly Access"
          price="199"
          popular={true}
          features={[
            "Unlimited questions for 30 days",
            "Priority response time",
            "Document review & drafting",
            "Contract templates",
            "Follow-up consultations"
          ]}
        />
        <PriceCard
          title="Annual Plan"
          price="1999"
          features={[
            "Full year of legal support",
            "24/7 emergency access",
            "Comprehensive document services",
            "Dedicated attorney",
            "Monthly legal checkups",
            "Custom contract creation"
          ]}
        />
      </div>
    </div>
  );
}

function PriceCard({ title, price, features, popular = false }) {
  return (
    <div className={`bg-gray-800 rounded-xl p-8 border ${
      popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-700'
    }`}>
      {popular && (
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-white mt-4">{title}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-400">{title === "Annual Plan" ? "/year" : "/month"}</span>
      </div>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <CheckCircle size={20} className="text-blue-400 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-colors ${
        popular
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}>
        Get Started
      </button>
    </div>
  );
}

export default Pricing;