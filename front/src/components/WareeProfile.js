import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSolarPanel, FaLeaf, FaBolt, FaIndustry, FaBuilding, FaSun, FaWind, FaRecycle, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { GiSolarPower, GiWindTurbine, GiElectric, GiEarthAmerica } from 'react-icons/gi';
import logo from "../assets/Waree renewable logo.png";
import WareeChart from './WareeChart';

const companyData = {
    "name": "Waree Renewable Technologies Ltd",
    "logo": "logo",
    "heroImage": "https://media.licdn.com/dms/image/v2/D4D12AQEIHl1XAsqoew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1697715454138?e=2147483647&v=beta&t=BNR16cbKMgi8MEl82vJiM5Kw_iKUW7HFMu5pHXP2XfY",
    "description": "Waree Renewable Technologies Ltd. is a prominent player in the renewable energy sector, specializing in solar power solutions. We design, manufacture, and install high-efficiency solar panels, inverters, and related components for residential, commercial, and industrial sectors. Our focus on research and development drives advancements in solar technology, contributing to a sustainable future.",
    "projects": [
      {
        "id": 1,
        "name": "Masaya Solar",
        "description": "210 MW ground-mounted solar project",
        "image": "https://www.acenrenewables.com/wp-content/uploads/2022/01/ACEN-Masaya-Solar.jpg",
        "link": "https://example.com/masaya-solar"
      },
      {
        "id": 2,
        "name": "NTPC Kawas Floating Solar",
        "description": "1000 KWP floating solar project",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDQYOpjp_jKEKWVbVgjfDAQnGR0_oS_Z16w&s",
        "link": "https://example.com/ntpc-kawas-floating-solar"
      },
      {
        "id": 3,
        "name": "Orbit Bearing Rooftop Solar",
        "description": "400 KW rooftop solar installation",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1tS5Ua2p_x-IJ4PZqoSw2rLeYcRj8YTCHg&s",
        "link": "https://example.com/orbit-bearing-rooftop-solar"
      }
    ],
    "reasons": [
      "Growing global demand for renewable energy",
      "Focus on technological innovation and R&D",
      "Strong market position in the solar industry",
      "Diversified offerings across multiple solar solutions",
      "Alignment with sustainability and ESG criteria",
      "Potential benefits from government incentives and regulations",
      "Scalable business model with global expansion potential",
      "Long-term growth prospects in the renewable energy sector"
    ],
    "clients": [
      { "name": "Continuum Green Energy", "icon": "FaSolarPanel" },
      { "name": "Renew Power", "icon": "FaLeaf" },
      { "name": "Hero Future Energy", "icon": "FaBolt" },
      { "name": "NTPC", "icon": "FaIndustry" },
      { "name": "BAPS Temple", "icon": "FaBuilding" }
    ],
    "technologies": [
      { "name": "Photovoltaic Panels", "icon": GiSolarPower },
      { "name": "Solar Inverters", "icon": GiElectric },
      { "name": "Energy Storage", "icon": FaBolt },
      { "name": "Smart Grid Solutions", "icon": FaRecycle }
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
          alt="Waree-logo"
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
          className="text-xl md:text-3xl text-green-400 max-w-2xl text-center px-4 font-semibold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Powering a Sustainable Future
        </motion.p>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <FaSun className="text-7xl text-yellow-400 animate-pulse" />
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
        <h3 className="text-3xl font-bold text-green-600 mb-4">{project.name}</h3>
        <p className="text-gray-700 mb-6 text-lg">{project.description}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
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
        <h2 className="text-5xl font-bold text-center text-green-600 mb-16">Our Projects</h2>
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
                <h3 className="text-2xl font-bold text-green-600 mb-3">{project.name}</h3>
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
    className="py-24 bg-green-50"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-16">Why Choose Us</h2>
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
            <FaLeaf className="text-5xl text-green-500 mb-6" />
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
      <h2 className="text-5xl font-bold text-center text-green-600 mb-16">Our Technologies</h2>
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
    <Icon className="text-8xl text-green-500 mb-6" />
    <h3 className="text-2xl font-bold text-gray-700 text-center">{title}</h3>
  </motion.div>
);

const GlobalPresenceSection = () => (
  <motion.section 
    className="py-24 bg-green-50 relative overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-16">Global Impact</h2>
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <GiEarthAmerica className="text-9xl text-green-500" />
        </motion.div>
      </div>
      <p className="text-2xl text-center text-gray-700 max-w-3xl mx-auto">
        Our innovative solar solutions are powering sustainable development across the globe, reducing carbon footprints and fostering a cleaner, greener future.
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
      <h2 className="text-5xl font-bold text-center text-green-600 mb-16">Our Esteemed Clients</h2>
      <div className="flex flex-wrap justify-center gap-16">
        {companyData.clients.map((client, index) => (
          <ClientIcon key={index} icon={client.icon} name={client.name} />
        ))}
      </div>
    </div>
  </motion.section>
);

const ClientIcon = ({ icon, name }) => {
  const IconComponent = icon === 'FaSolarPanel' ? FaSolarPanel :
                        icon === 'FaLeaf' ? FaLeaf :
                        icon === 'FaBolt' ? FaBolt :
                        icon === 'FaIndustry' ? FaIndustry :
                        FaBuilding;

                        return (
                          <motion.div 
                            className="flex flex-col items-center"
                            whileHover={{ scale: 1.1, y: -5 }}
                          >
                            <IconComponent className="text-6xl text-green-500 mb-4" />
                            <p className="text-gray-700 text-lg font-semibold">{name}</p>
                          </motion.div>
                        );
                      };
                      
                      const SustainabilitySection = () => (
                        <motion.section 
                          className="py-24 bg-green-100"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                          viewport={{ once: true }}
                        >
                          <div className="container mx-auto px-4">
                            <h2 className="text-5xl font-bold text-center text-green-600 mb-16">Our Commitment to Sustainability</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <motion.div 
                                className="bg-white rounded-2xl p-8 shadow-xl"
                                whileHover={{ scale: 1.05 }}
                              >
                                <FaRecycle className="text-5xl text-green-500 mb-6" />
                                <h3 className="text-2xl font-bold text-green-600 mb-4">Eco-Friendly Manufacturing</h3>
                                <p className="text-gray-700 text-lg">Our production processes are designed to minimize environmental impact, utilizing recycled materials and renewable energy sources.</p>
                              </motion.div>
                              <motion.div 
                                className="bg-white rounded-2xl p-8 shadow-xl"
                                whileHover={{ scale: 1.05 }}
                              >
                                <FaLeaf className="text-5xl text-green-500 mb-6" />
                                <h3 className="text-2xl font-bold text-green-600 mb-4">Carbon Footprint Reduction</h3>
                                <p className="text-gray-700 text-lg">We're committed to reducing our carbon footprint and helping our clients do the same through our efficient solar solutions.</p>
                              </motion.div>
                            </div>
                          </div>
                        </motion.section>
                      );
                      
                      export default function WareeRenewableProfile() {
                        return (
                          <div className="bg-gray-50">
                            <HeroSection />
                            <ProjectsSection />
                            <ReasonsSection />
                            <TechnologiesSection />
                            <SustainabilitySection />
                            <GlobalPresenceSection />
                            <ClientsSection />
                            <WareeChart />    
                          </div>
                        );
                      }