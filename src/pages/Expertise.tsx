import React from 'react';
import { Shield, Gavel, FileText, ScrollText } from 'lucide-react';

function Expertise() {
  const expertiseAreas = [
    {
      icon: <FileText className="text-blue-400" size={32} />,
      title: "Contract Law",
      description: "Expert guidance on purchase agreements, boarding contracts, lease agreements, and other equine-related legal documents.",
      services: [
        "Purchase and sale agreements",
        "Boarding contracts",
        "Training agreements",
        "Lease agreements",
        "Competition contracts"
      ]
    },
    {
      icon: <Shield className="text-green-400" size={32} />,
      title: "Liability Protection",
      description: "Comprehensive legal protection for equine businesses and individuals against liability risks.",
      services: [
        "Release forms",
        "Waivers",
        "Risk management",
        "Accident prevention",
        "Legal compliance"
      ]
    },
    {
      icon: <Gavel className="text-yellow-400" size={32} />,
      title: "Property Law",
      description: "Legal assistance with equine property matters, zoning, and facility regulations.",
      services: [
        "Zoning compliance",
        "Property disputes",
        "Facility regulations",
        "Land use rights",
        "Environmental compliance"
      ]
    },
    {
      icon: <ScrollText className="text-purple-400" size={32} />,
      title: "Insurance Claims",
      description: "Expert handling of insurance matters and claim disputes for equine-related incidents.",
      services: [
        "Policy review",
        "Claim filing",
        "Dispute resolution",
        "Coverage analysis",
        "Risk assessment"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        Our Legal Expertise
      </h1>
      <p className="text-gray-300 text-xl text-center mb-12 max-w-3xl mx-auto">
        Specialized legal services tailored to the unique needs of the equestrian community.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {expertiseAreas.map((area, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="mb-6">{area.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-4">{area.title}</h2>
            <p className="text-gray-300 mb-6">{area.description}</p>
            <ul className="space-y-3">
              {area.services.map((service, serviceIndex) => (
                <li key={serviceIndex} className="flex items-center text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expertise;