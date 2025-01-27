import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTruck, FaIndustry, FaBuilding, FaRoad, FaWarehouse, FaCog, FaTools, FaHardHat, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { GiCrane, GiForklift, GiEarthAmerica, GiTowTruck } from 'react-icons/gi';
import logo from "../assets/Action constructuion logo.png";
import ACEChart from './ACEChart';

const companyData = {
    "name": "Action Construction Equipment Ltd.",
    "logo": "logo",
    "heroImage": "https://www.ace-cranes.com/public/front/images/home-banner.jpg",
    "description": "Action Construction Equipment Ltd. (ACE) is a leading Indian manufacturer specializing in a wide range of construction and material handling equipment. We design, manufacture, and distribute mobile cranes, tower cranes, truck-mounted cranes, excavators, backhoe loaders, forklifts, and road construction machinery. Our focus on technological innovation and quality drives advancements in construction equipment, contributing to efficient infrastructure development.",
    "projects": [
      {
        "id": 1,
        "name": "Delhi Metro expansion",
        "description": "Supply of cranes for Delhi Metro Rail Corporation's expansion project",
        "image": "https://cdn.zeebiz.com/sites/default/files/2024/06/23/301085-metro-ians.png?im=FitAndFill=(1200,900)",
        "link": "https://example.com/delhi-metro-expansion"
      },
      {
        "id": 2,
        "name": "Mumbai-Ahmedabad High-Speed Rail Corridor",
        "description": "Provision of heavy-duty cranes for India's first bullet train project",
        "image": "https://mumbaitribune.in/wp-content/uploads/2024/06/Screenshot_13.png",
        "link": "https://example.com/mumbai-ahmedabad-rail"
      },
      {
        "id": 3,
        "name": "Bharatmala Pariyojana",
        "description": "Supply of road construction equipment for national highway development",
        "image": "https://constructionxperts.co.in/wp-content/uploads/2023/11/Bharatmala-jpg.webp",
        "link": "https://example.com/bharatmala-pariyojana"
      }
    ],
    "reasons": [
      "Growing demand for construction equipment in emerging markets",
      "Focus on technological innovation and product development",
      "Strong market position in the Indian construction equipment industry",
      "Diversified product portfolio catering to various construction needs",
      "Alignment with India's infrastructure development goals",
      "Potential benefits from government initiatives like 'Make in India'",
      "Scalable business model with international expansion potential",
      "Long-term growth prospects in the construction and infrastructure sectors",
      "Strong financial performance and operational efficiency",
      "Strategic partnerships and government project involvement"
    ],
    "clients": [
      { "name": "Larsen & Toubro", "icon": "FaIndustry" },
      { "name": "Tata Projects", "icon": "FaBuilding" },
      { "name": "NHAI", "icon": "FaRoad" },
      { "name": "Reliance Industries", "icon": "FaIndustry" },
      { "name": "Adani Group", "icon": "FaWarehouse" }
    ],
    "technologies": [
      { "name": "Hydraulic Systems", "icon": GiCrane },
      { "name": "Telematics", "icon": FaCog },
      { "name": "IoT-enabled Equipment", "icon": FaTools },
      { "name": "Electric Powertrains", "icon": GiTowTruck }
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
          alt="ACE-logo"
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
          className="text-xl md:text-3xl text-yellow-400 max-w-2xl text-center px-4 font-semibold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Building the Future, One Machine at a Time
        </motion.p>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <GiCrane className="text-7xl text-yellow-400 animate-pulse" />
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
      className="bg-white rounded-lg max-w-3xl w-full overflow-hidden"
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
        <h3 className="text-3xl font-bold text-yellow-600 mb-4">{project.name}</h3>
        <p className="text-yellow-500 mb-6 text-lg">{project.description}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-colors"
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
        <h2 className="text-5xl font-bold text-center text-yellow-600 mb-16">Our Projects</h2>
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
                <h3 className="text-2xl font-bold text-yellow-600 mb-3">{project.name}</h3>
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
    className="py-24 bg-yellow-50"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-600 mb-16">Why Choose Us</h2>
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
            <FaHardHat className="text-5xl text-yellow-500 mb-6" />
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
      <h2 className="text-5xl font-bold text-center text-yellow-600 mb-16">Our Technologies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {companyData.technologies.map((tech, index) => (
          <TechnologyCard key={index} icon={tech.icon} title={tech.name} />
        ))}
      </div>
    </div>
  </motion.section>
);

const TechnologyCard = ({ icon: Icon, title }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.1, y: -10 }}
  >
    <Icon className="text-8xl text-yellow-500 mb-6" />
    <h3 className="text-2xl font-bold text-gray-700 text-center">{title}</h3>
  </motion.div>
);

const GlobalPresenceSection = () => (
  <motion.section 
    className="py-24 bg-yellow-50 relative overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-yellow-600 mb-16">Global Impact</h2>
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <GiEarthAmerica className="text-9xl text-yellow-500" />
        </motion.div>
      </div>
      <p className="text-2xl text-center text-gray-700 max-w-3xl mx-auto">
        Our cutting-edge construction equipment is powering infrastructure development across the globe, contributing to the growth of nations and shaping skylines worldwide.
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
      <h2 className="text-5xl font-bold text-center text-yellow-600 mb-16">Our Esteemed Clients</h2>
      <div className="flex flex-wrap justify-center gap-16">
        {companyData.clients.map((client, index) => (
          <ClientIcon key={index} icon={client.icon} name={client.name} />
        ))}
      </div>
    </div>
  </motion.section>
);

const ClientIcon = ({ icon, name }) => {
  const IconComponent = icon === 'FaIndustry' ? FaIndustry :
                        icon === 'FaBuilding' ? FaBuilding :
                        icon === 'FaRoad' ? FaRoad :
                        icon === 'FaWarehouse' ? FaWarehouse :
                        FaTruck;

  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <IconComponent className="text-6xl text-yellow-500 mb-4" />
      <p className="text-gray-700 text-lg font-semibold">{name}</p>
    </motion.div>
  );
};

const InnovationSection = () => (
  <motion.section 
    className="py-24 bg-yellow-50"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Innovation at ACE</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          className="bg-gray-100 rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <FaCog className="text-5xl text-yellow-400 mb-6" />
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Advanced Engineering</h3>
          <p className="text-gray-700 text-lg">Our R&D team constantly pushes the boundaries of construction equipment technology, developing innovative solutions for increased efficiency and safety.</p>
        </motion.div>
        <motion.div 
          className="bg-gray-100 rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <FaTools className="text-5xl text-yellow-400 mb-6" />
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Smart Equipment</h3>
          <p className="text-gray-700 text-lg">We're integrating IoT and AI technologies into our machines, enabling predictive maintenance, real-time monitoring, and enhanced productivity on construction sites.</p>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

const ProductShowcaseSection = () => (
  <motion.section 
    className="py-24 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-600 mb-16">Our Product Range</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <ProductCard icon={GiCrane} title="Mobile Cranes" />
        <ProductCard icon={GiForklift} title="Forklifts" />
        <ProductCard icon={GiEarthAmerica} title="Excavators" />
        <ProductCard icon={FaTruck} title="Truck-Mounted Cranes" />
      </div>
    </div>
  </motion.section>
);

const ProductCard = ({ icon: Icon, title }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.1, y: -10 }}
  >
    <Icon className="text-8xl text-yellow-500 mb-6" />
    <h3 className="text-2xl font-bold text-yellow-700 text-center">{title}</h3>
  </motion.div>
);

export default function ACEProfile() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ProjectsSection />
      <ReasonsSection />
      <TechnologiesSection />
      <InnovationSection />
      <ProductShowcaseSection />
      <GlobalPresenceSection />
      <ClientsSection />
      <ACEChart />    
    </div>
  );
}