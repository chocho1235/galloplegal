import React from 'react';
import { Star } from 'lucide-react';

function Lawyers() {
  const lawyers = [
    {
      name: "Elizabeth Morgan",
      title: "Equine Law Specialist",
      rating: 4.9,
      reviews: 234,
      specialties: ["Purchase Agreements", "Liability", "Insurance"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
      bio: "15+ years specializing in equine law with expertise in purchase agreements and liability protection."
    },
    {
      name: "James Harrison",
      title: "Contract Law Expert",
      rating: 4.8,
      reviews: 192,
      specialties: ["Sales Contracts", "Boarding Agreements", "Leases"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Former stable owner turned attorney, bringing unique industry insights to equine legal matters."
    },
    {
      name: "Rachel Martinez",
      title: "Equine Insurance Specialist",
      rating: 4.9,
      reviews: 167,
      specialties: ["Insurance Claims", "Risk Management", "Liability"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Specialized in equine insurance law with extensive experience in claim resolution."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        Meet Our Legal Experts
      </h1>
      <p className="text-gray-300 text-xl text-center mb-12 max-w-3xl mx-auto">
        Our attorneys specialize in equine law and have extensive experience in the horse industry.
        Each expert brings unique insights and dedicated expertise to serve your legal needs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lawyers.map((lawyer, index) => (
          <LawyerCard key={index} {...lawyer} />
        ))}
      </div>
    </div>
  );
}

function LawyerCard({ name, title, rating, reviews, specialties, image, bio }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-gray-400">{title}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Star className="text-yellow-400 fill-current" size={20} />
        <span className="text-white font-semibold">{rating}</span>
        <span className="text-gray-400">({reviews} reviews)</span>
      </div>
      <p className="text-gray-300 mb-4">{bio}</p>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty, index) => (
          <span 
            key={index}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
          >
            {specialty}
          </span>
        ))}
      </div>
      <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        Schedule Consultation
      </button>
    </div>
  );
}

export default Lawyers;