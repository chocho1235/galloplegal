import React, { useEffect, useRef } from 'react';
import { Scale, Users, Award, Globe, Briefcase, Heart } from 'lucide-react';

function Story() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const milestones = [
    {
      year: 2020,
      title: "The Beginning",
      description: "Founded with a vision to make equine legal services accessible to all horse enthusiasts.",
      icon: <Scale size={24} className="text-blue-400" />,
      image: "https://images.unsplash.com/photo-1553984840-b8cbc34f5215?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      year: 2021,
      title: "Growing Community",
      description: "Expanded our network to 50+ specialized equine lawyers across the country.",
      icon: <Users size={24} className="text-green-400" />,
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      year: 2022,
      title: "Industry Recognition",
      description: "Awarded 'Best Legal Tech Innovation' in the equestrian industry.",
      icon: <Award size={24} className="text-yellow-400" />,
      image: "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      year: 2023,
      title: "International Expansion",
      description: "Extended our services to international equestrian markets.",
      icon: <Globe size={24} className="text-purple-400" />,
      image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Journey</h1>
      <p className="text-gray-300 text-lg md:text-xl text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
        From a simple idea to a global platform, discover how we're transforming equine legal services.
      </p>

      <div className="relative" ref={timelineRef}>
        {/* Timeline line - hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>

        {/* Timeline items */}
        <div className="space-y-12 md:space-y-24">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`timeline-item relative opacity-0 translate-y-10 transition-all duration-700 ease-out ${
                index % 2 === 0 ? 'md:text-left' : 'md:text-right'
              }`}
            >
              {/* Content */}
              <div
                className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Text content */}
                <div className="w-full md:w-1/2">
                  <div className="bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      {milestone.icon}
                      <span className="text-blue-400 font-bold">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base">{milestone.description}</p>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Timeline dot - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-800"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Story;