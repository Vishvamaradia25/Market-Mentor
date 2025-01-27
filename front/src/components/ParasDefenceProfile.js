import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaRocket, FaSatellite, FaMicrochip, FaGlobeAsia, FaEye, FaIndustry, FaHandshake, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { GiMissileLauncher, GiNightVision, GiSatelliteCommunication, GiTank, GiSpaceship } from 'react-icons/gi';
import { SiNasa, SiSpacex } from 'react-icons/si';
import logo from "../assets/paras-logo.png"
import ParasChart from './ParasChart';

const companyData = {
  name: "Paras Defence and Space Technologies Ltd",
  logo: logo,
  heroImage: "https://images.moneycontrol.com/static-mcnews/2020/01/8-4-770x435.jpg",
  description: "Paras Defence and Space Technologies Ltd. is a leading Indian company specializing in defense and space sectors. We design, develop, and manufacture cutting-edge products and systems for military and space applications, contributing significantly to national security and space exploration efforts.",
  projects: [
    {
        id: 1,
        name: "Project Nighthawk",
        description: "Advanced night vision system for special forces",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN2M51fTjqmzKSMvCv_MNre-DXd4XdN36WA&s",
        link: "https://example.com/project-nighthawk"
      },
      {
        id: 2,
        name: "Satellite X-1",
        description: "Earth observation satellite with cutting-edge optics",
        image: "https://www.eoportal.org/api/cms/documents/163813/5528120/ICEYE_Auto0.jpeg",
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
    "Strong government support through initiatives like Make in India",
    "Diversified portfolio across multiple critical technologies",
    "Robust R&D capabilities driving continuous innovation",
    "Long-term contracts ensuring stable revenue streams",
    "Partnerships with global technology leaders"
  ],
  clients: [
    { name: "Indian Armed Forces", icon: FaShieldAlt },
    { name: "ISRO", icon: FaRocket },
    { name: "DRDO", icon: FaMicrochip },
    { name: "NASA", icon: SiNasa },
    { name: "SpaceX", icon: SiSpacex }
  ],
  technologies: [
    { name: "Electro-Optics", icon: FaEye },
    { name: "Defense Electronics", icon: GiNightVision },
    { name: "Space Optics", icon: FaSatellite },
    { name: "Radar Systems", icon: FaEye }
  ]
};

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
          src={companyData.logo}
          alt="Paras Defence Logo"
          className=" mb-8"
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
          Defending the Nation, Exploring Space
        </motion.p>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <GiSpaceship className="text-7xl text-yellow-400 animate-bounce" />
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
      className="bg-gray-800 rounded-lg max-w-3xl w-full overflow-hidden"
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
        <h3 className="text-3xl font-bold text-yellow-400 mb-4">{project.name}</h3>
        <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-yellow-500 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors"
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
      className="py-24 bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {companyData.projects.map((project) => (
            <motion.div 
              key={project.id}
              className="bg-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-yellow-300 mb-3">{project.name}</h3>
                <p className="text-gray-300 text-lg">{project.description}</p>
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
    className="py-24 bg-gray-800"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {companyData.reasons.map((reason, index) => (
          <motion.div 
            key={index}
            className="bg-gray-700 rounded-2xl p-8 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <FaShieldAlt className="text-5xl text-yellow-400 mb-6" />
            <p className="text-gray-200 text-lg">{reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const TechnologiesSection = () => (
  <motion.section 
    className="py-24 bg-gray-900"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Our Core Technologies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {companyData.technologies.map((tech, index) => (
          <TechnologyCard key={index} icon={tech.icon} title={tech.name} />
        ))}
      </div>
    </div>
  </motion.section>
);

const InnovationSection = () => (
  <motion.section 
    className="py-24 bg-gray-800"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Innovation at Paras Defence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          className="bg-gray-700 rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <FaMicrochip className="text-5xl text-yellow-400 mb-6" />
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Advanced R&D</h3>
          <p className="text-gray-300 text-lg">Our state-of-the-art research facilities drive continuous innovation in defense and space technologies, keeping us at the forefront of the industry.</p>
        </motion.div>
        <motion.div 
          className="bg-gray-700 rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <FaHandshake className="text-5xl text-yellow-400 mb-6" />
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Strategic Partnerships</h3>
          <p className="text-gray-300 text-lg">We collaborate with global technology leaders and research institutions to develop cutting-edge solutions for complex defense and space challenges.</p>
        </motion.div>
      </div>
    </div>
  </motion.section>
);



const TechnologyCard = ({ icon: Icon, title }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.1, y: -10 }}
  >
    <Icon className="text-8xl text-yellow-400 mb-6" />
    <h3 className="text-2xl font-bold text-gray-200 text-center">{title}</h3>
  </motion.div>
);

const GlobalPresenceSection = () => (
  <motion.section 
    className="py-24 bg-gray-800 relative overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Global Presence</h2>
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FaGlobeAsia className="text-9xl text-yellow-400" />
        </motion.div>
      </div>
      <p className="text-2xl text-center text-gray-300 max-w-3xl mx-auto">
        Our cutting-edge technologies are trusted and deployed in over 30 countries worldwide, safeguarding nations and advancing space exploration.
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
    className="py-24 bg-gray-900"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">Our Esteemed Clients</h2>
      <div className="flex flex-wrap justify-center gap-16">
        {companyData.clients.map((client, index) => (
          <ClientIcon key={index} icon={client.icon} name={client.name} />
        ))}
      </div>
    </div>
  </motion.section>
);

const ClientIcon = ({ icon: Icon, name }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.1, y: -5 }}
  >
    <Icon className="text-6xl text-yellow-400 mb-4" />
    <p className="text-gray-200 text-lg font-semibold">{name}</p>
  </motion.div>
);

export default function ParasDefenceProfile() {
  return (
    <div className="bg-gray-900">
      <HeroSection />
      <ProjectsSection />
      <TechnologiesSection />
      <ReasonsSection />
      <InnovationSection />
      <GlobalPresenceSection />
      <ClientsSection />
      <ParasChart />
    </div>
  );
}