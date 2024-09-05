import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaRocket, FaUserSecret, FaTimes, FaExternalLinkAlt, FaMedal, FaGlobeAsia, FaIndustry, FaHandshake } from 'react-icons/fa';
import { GiMissileLauncher, GiNightVision, GiSatelliteCommunication, GiTank } from 'react-icons/gi';

const companyData = {
  name: "Paras Defence and Space Technologies Ltd",
  logo: "https://images.unsplash.com/photo-1569209711961-c68da3f1e34d?w=100&h=100&fit=crop&crop=faces",
  heroImage: "https://images.moneycontrol.com/static-mcnews/2020/01/8-4-770x435.jpg",
  description: "Paras Defence and Space Technologies Ltd. is a leading Indian company specializing in defense and space sectors. We design, develop, and manufacture cutting-edge products and systems for military and space applications, contributing significantly to national security and space exploration efforts.",
  projects: [
    {
      id: 1,
      name: "Project Nighthawk",
      description: "Advanced night vision system for special forces",
      image: "https://images.unsplash.com/photo-1542455349-dcf190ce7bb2?w=800&h=600&fit=crop",
      link: "https://example.com/project-nighthawk"
    },
    {
      id: 2,
      name: "Satellite X-1",
      description: "Earth observation satellite with cutting-edge optics",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop",
      link: "https://example.com/satellite-x1"
    },
    {
      id: 3,
      name: "Defender Shield",
      description: "Next-gen EMP protection for military installations",
      image: "https://images.unsplash.com/photo-1534777367038-9404f45b869a?w=800&h=600&fit=crop",
      link: "https://example.com/defender-shield"
    }
  ],
  reasons: [
    "Strategic position in high-growth defense and space sectors",
    "Strong government support through initiatives like Atmanirbhar Bharat",
    "Diversified portfolio across multiple critical technologies",
    "Robust R&D capabilities driving continuous innovation",
    "Long-term contracts ensuring stable revenue streams"
  ]
};

const HeroSection = () => (
  <motion.div 
    className="relative h-screen overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    <img src={companyData.heroImage} alt="Hero" className="absolute w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-white mb-4 text-center px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {companyData.name}
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Defending the Nation, Exploring Space
      </motion.p>
    </div>
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <FaShieldAlt className="text-5xl text-white animate-pulse" />
    </motion.div>
  </motion.div>
);


const ProjectModal = ({ project, onClose }) => (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-gray-800 rounded-lg max-w-2xl w-full overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="relative">
        <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
        >
          <FaTimes />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
        >
          Learn More <FaExternalLinkAlt className="ml-2" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.section 
      className="py-20 bg-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyData.projects.map((project) => (
            <motion.div 
              key={project.id}
              className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">{project.name}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const ReasonsSection = () => (
  <motion.section 
    className="py-20 bg-gray-900"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-12">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companyData.reasons.map((reason, index) => (
          <motion.div 
            key={index}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <FaShieldAlt className="text-3xl text-yellow-400 mb-4" />
            <p className="text-gray-300">{reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const TechnologiesSection = () => (
  <motion.section 
    className="py-20 bg-gray-800"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">Our Technologies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <TechnologyCard icon={GiMissileLauncher} title="Missile Systems" />
        <TechnologyCard icon={GiNightVision} title="Night Vision" />
        <TechnologyCard icon={GiSatelliteCommunication} title="Satellite Comms" />
        <TechnologyCard icon={GiTank} title="Armored Vehicles" />
      </div>
    </div>
  </motion.section>
);

const TechnologyCard = ({ icon: Icon, title }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-6xl text-yellow-400 mb-4" />
    <h3 className="text-xl font-bold text-gray-200 text-center">{title}</h3>
  </motion.div>
);

const GlobalPresenceSection = () => (
  <motion.section 
    className="py-20 bg-gray-900"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-12">Global Presence</h2>
      <div className="flex justify-center">
        <FaGlobeAsia className="text-9xl text-yellow-400" />
      </div>
      <p className="text-xl text-center text-gray-300 mt-8">
        Our technologies are deployed and trusted in over 30 countries worldwide.
      </p>
    </div>
  </motion.section>
);

const PartnershipsSection = () => (
  <motion.section 
    className="py-20 bg-gray-800"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">Strategic Partnerships</h2>
      <div className="flex flex-wrap justify-center gap-12">
        <PartnerIcon icon={FaIndustry} title="Defense Industry" />
        <PartnerIcon icon={FaRocket} title="Space Agencies" />
        <PartnerIcon icon={FaHandshake} title="Global Alliances" />
      </div>
    </div>
  </motion.section>
);

const PartnerIcon = ({ icon: Icon, title }) => (
  <div className="flex flex-col items-center">
    <Icon className="text-5xl text-yellow-400 mb-2" />
    <p className="text-gray-200">{title}</p>
  </div>
);

const CompanyProfile = () => {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSection />
      <TechnologiesSection />
      <ProjectsSection />
      <ReasonsSection />
      <GlobalPresenceSection />
      <PartnershipsSection />
    </div>
  );
};

export default CompanyProfile;