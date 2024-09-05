import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaHelicopter, FaIndustry, FaGlobeAsia, FaWrench, FaCog, FaUsers, FaChartLine, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { GiJetFighter, GiHelicopter, GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import logo from '../assets/hallogo.png';
import HALChart from './HALChart';
import background from '../assets/green-plane-ecofriendly-environment.jpg'

const companyData = {
    "name": "Hindustan Aeronautics Limited",
    "logo": "logo",
    "heroImage": background,
    "description": "Hindustan Aeronautics Limited (HAL) is India's premier aerospace and defense company. We design, manufacture, and maintain a wide range of aircraft, helicopters, engines, and avionics for both military and civilian use.",
    "projects": [
      {
        "id": 1,
        "name": "LCA Tejas",
        "description": "Light Combat Aircraft for the Indian Air Force",
        "image": "https://cdn1.img.sputniknews.in/img/07e7/0b/19/5576456_0:0:1280:1024_1920x0_80_0_0_78e2bedf072cf4beae884013724ad5f2.jpg",
        "link": "https://www.hal-india.co.in/Product_Details.aspx?Mkey=54&lKey=&CKey=36"
      },
      {
        "id": 2,
        "name": "ALH Dhruv",
        "description": "Advanced Light Helicopter for military and civilian use",
        "image": "https://i.ytimg.com/vi/oGost9KdhcA/maxresdefault.jpg",
        "link": "https://www.hal-india.co.in/Product_Details.aspx?Mkey=54&lKey=&CKey=30"
      },
      {
        "id": 3,
        "name": "Do-228",
        "description": "Light transport aircraft for civil and military applications",
        "image": "https://www.eufar.net/media/uploads/aircrafts/DLR_Dornier_Do228_D-CFFU_-_1_692x288_1.jpg",
        "link": "https://www.hal-india.co.in/Product_Details.aspx?Mkey=54&lKey=&CKey=35"
      }
    ],
    "reasons": [
      "India's leading aerospace company",
      "Diverse range of aircraft and helicopters",
      "State-of-the-art manufacturing facilities",
      "Strong R&D capabilities",
      "Partnerships with global aerospace leaders",
      "Commitment to self-reliance in defense",
      "Proven track record in aircraft production",
      "Expertise in aircraft upgrade and maintenance",
      "Focus on innovation and technology",
      "Contribution to India's strategic capabilities"
    ],
    "clients": [
      { "name": "Indian Air Force", "icon": "GiJetFighter" },
      { "name": "Indian Army", "icon": "GiHelicopter" },
      { "name": "Indian Navy", "icon": "FaPlane" },
      { "name": "Coast Guard", "icon": "FaHelicopter" },
      { "name": "Civil Aviation", "icon": "GiAirplaneDeparture" }
    ],
    "capabilities": [
      "Fighter Aircraft",
      "Transport Aircraft",
      "Trainer Aircraft",
      "Helicopters",
      "Aero Engines",
      "Avionics & Systems",
      "Aircraft Upgrades",
      "Aircraft Maintenance",
      "Aerospace R&D"
    ]
  }

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        style={{
          backgroundImage: `url(${companyData.heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: scrollY * 0.5
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
        <motion.img
          src={logo}
          alt="HAL-logo"
          className="mb-8 h-24"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-4 text-center px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {companyData.name}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-3xl text-sky-400 max-w-2xl text-center px-4 font-semibold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Touching the Sky with Glory
        </motion.p>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <GiJetFighter className="text-7xl text-sky-400 animate-bounce" />
      </motion.div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-gray-100 rounded-lg max-w-3xl w-full overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="relative">
        <img src={project.image} alt={project.name} className="w-full h-80 object-cover" />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
      <div className="p-8">
        <h3 className="text-3xl font-bold text-sky-400 mb-4">{project.name}</h3>
        <p className="text-gray-700 mb-6 text-lg">{project.description}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-sky-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-sky-400 transition-colors"
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
      className="py-24 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-sky-700 mb-16">Our Aircraft</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {companyData.projects.map((project) => (
            <motion.div 
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-sky-600 mb-3">{project.name}</h3>
                <p className="text-gray-700 text-lg">{project.description}</p>
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
    className="py-24 bg-sky-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-sky-700 mb-16">Why Choose HAL</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {companyData.reasons.map((reason, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-2xl p-8 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <FaPlane className="text-5xl text-sky-500 mb-6" />
            <p className="text-gray-700 text-lg">{reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const TechnologiesSection = () => (
  <motion.section 
    className="py-24 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-sky-700 mb-16">Our Capabilities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <TechnologyCard icon={GiJetFighter} title="Fighter Aircraft" />
        <TechnologyCard icon={GiHelicopter} title="Helicopters" />
        <TechnologyCard icon={FaCog} title="Aero Engines" />
        <TechnologyCard icon={FaWrench} title="MRO Services" />
      </div>
    </div>
  </motion.section>
);

const TechnologyCard = ({ icon: Icon, title }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.1, y: -10 }}
  >
    <Icon className="text-8xl text-sky-500 mb-6" />
    <h3 className="text-2xl font-bold text-gray-700 text-center">{title}</h3>
  </motion.div>
);

const GlobalPresenceSection = () => (
  <motion.section 
    className="py-24 bg-sky-100 relative overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-sky-700 mb-16">Global Presence</h2>
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FaGlobeAsia className="text-9xl text-sky-500" />
        </motion.div>
      </div>
      <p className="text-2xl text-center text-gray-700 max-w-3xl mx-auto">
        Our aircraft and services are trusted by defense forces and civil operators across multiple countries, showcasing Indian aerospace capabilities on the global stage.
      </p>
    </div>
    <motion.div 
      className="absolute inset-0 opacity-10"
      initial={{ backgroundPosition: '0% 0%' }}
      animate={{ backgroundPosition: '100% 100%' }}
      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/world-map.png")',
        backgroundSize: '200%'
      }}
    />
  </motion.section>
);

const ClientsSection = () => (
  <motion.section 
    className="py-24 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-sky-700 mb-16">Our Esteemed Clients</h2>
      <div className="flex flex-wrap justify-center gap-16">
        {companyData.clients.map((client, index) => (
          <ClientIcon key={index} icon={client.icon} name={client.name} />
        ))}
      </div>
    </div>
    </motion.section>
);


const ClientIcon = ({ icon, name }) => {
  let IconComponent;
  switch (icon) {
    case 'GiJetFighter':
      IconComponent = GiJetFighter;
      break;
    case 'GiHelicopter':
      IconComponent = GiHelicopter;
      break;
    case 'FaPlane':
      IconComponent = FaPlane;
      break;
    case 'FaHelicopter':
      IconComponent = FaHelicopter;
      break;
    case 'GiAirplaneDeparture':
      IconComponent = GiAirplaneDeparture;
      break;
    default:
      IconComponent = FaPlane;
  }

  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <IconComponent className="text-6xl text-sky-500 mb-4" />
      <p className="text-gray-700 text-lg font-semibold">{name}</p>
    </motion.div>
  );
};

const CapabilitiesSection = () => (
  <motion.section 
    className="py-24 bg-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-sky-700 mb-16">Our Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {companyData.capabilities.map((capability, index) => (
          <motion.div 
            key={index}
            className="bg-sky-50 rounded-lg p-6 shadow-md"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-sky-600 mb-2">{capability}</h3>
            <p className="text-gray-600">HAL excels in {capability.toLowerCase()}, contributing to India's aerospace capabilities.</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default function HALProfile() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ProjectsSection />
      <ReasonsSection />
      <TechnologiesSection />
      <CapabilitiesSection />
      <GlobalPresenceSection />
      <ClientsSection />
      <HALChart />    
    </div>
  );
}