import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrosoft, FaNetworkWired, FaUniversity, FaLightbulb, FaShoppingCart, FaRobot, FaCloud, FaShieldAlt, FaGlobe, FaCode, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { GiArtificialIntelligence, GiCircuitry, GiCyberEye } from 'react-icons/gi';
import logo from "../assets/wipro.png";
import WiproChart from './WiproChart';

const companyData = {
    "name": "Wipro Ltd.",
    "logo": "logo",
    "heroImage": "https://alchimica.co.in/wp-content/uploads/2020/12/Wipro-Kodathi.png",
    "description": "Wipro Ltd. is a global leader in information technology, consulting, and business process services. Headquartered in Bangalore, India, Wipro provides a wide range of technology solutions including software development, IT infrastructure management, cloud services, and cybersecurity. The company serves a diverse array of industries such as finance, healthcare, retail, and manufacturing, offering tailored solutions to help organizations navigate digital transformation and enhance operational efficiency.",
    "projects": [
      {
        "id": 1,
        "name": "Digital Transformation Initiatives",
        "description": "Implementing digital transformation strategies across various industries",
        "image": "https://www.smart-energy.com/wp-content/uploads/2021/08/ipiccy_image-2021-08-26T120059.528-2.jpg",
        "link": "https://example.com/digital-transformation"
      },
      {
        "id": 2,
        "name": "Cloud Migration and Management",
        "description": "Assisting businesses in migrating IT infrastructure to the cloud",
        "image": "https://www.suse.com/c/wp-content/uploads/2024/02/AdobeStock_331925955-scaled.jpeg",
        "link": "https://example.com/cloud-migration"
      },
      {
        "id": 3,
        "name": "Cybersecurity Solutions",
        "description": "Implementing advanced security measures and providing incident response services",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMO74EyzsuMLAvCwA6L46_4GfV8TKWCwcB1w&s",
        "link": "https://example.com/cybersecurity-solutions"
      }
    ],
    "reasons": [
      "Strong market position in global IT services",
      "Comprehensive service offering across multiple technologies",
      "Focus on innovation in AI, data analytics, and IoT",
      "Global presence reducing reliance on single markets",
      "Financial stability with steady revenue growth",
      "Strategic partnerships with major technology providers",
      "Commitment to sustainability and green IT initiatives",
      "Strong and diverse client base across industries",
      "Experienced management team with strategic vision",
      "Continuous investment in talent and R&D"
    ],
    "clients": [
      { "name": "Microsoft", "icon": "FaMicrosoft" },
      { "name": "Cisco", "icon": "FaNetworkWired" },
      { "name": "Citibank", "icon": "FaUniversity" },
      { "name": "Philips", "icon": "FaLightbulb" },
      { "name": "Unilever", "icon": "FaShoppingCart" }
    ],
    "technologies": [
      { "name": "Artificial Intelligence", "icon": FaRobot },
      { "name": "Cloud Computing", "icon": FaCloud },
      { "name": "Internet of Things", "icon": FaNetworkWired },
      { "name": "Cybersecurity", "icon": FaShieldAlt }
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
          src={logo}
          alt="Wipro-logo"
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
          Innovating for a Digital Tomorrow
        </motion.p>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <GiArtificialIntelligence className="text-7xl text-blue-400 animate-pulse" />
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
        <h3 className="text-3xl font-bold text-blue-600 mb-4">{project.name}</h3>
        <p className="text-gray-700 mb-6 text-lg">{project.description}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
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
        <h2 className="text-5xl font-bold text-center text-blue-600 mb-16">Our Solutions</h2>
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
                <h3 className="text-2xl font-bold text-blue-600 mb-3">{project.name}</h3>
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
    className="py-24 bg-blue-50"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-blue-600 mb-16">Why Choose Wipro</h2>
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
            <FaCode className="text-5xl text-blue-500 mb-6" />
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
      <h2 className="text-5xl font-bold text-center text-blue-600 mb-16">Our Technologies</h2>
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
    <Icon className="text-8xl text-blue-500 mb-6" />
    <h3 className="text-2xl font-bold text-gray-700 text-center">{title}</h3>
  </motion.div>
);

const GlobalPresenceSection = () => (
  <motion.section 
    className="py-24 bg-blue-50 relative overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-blue-600 mb-16">Global Presence</h2>
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FaGlobe className="text-9xl text-blue-500" />
        </motion.div>
      </div>
      <p className="text-2xl text-center text-gray-700 max-w-3xl mx-auto">
        With a presence in over 60 countries, Wipro is driving digital transformation and innovation on a global scale, helping businesses thrive in the digital age.
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
      <h2 className="text-5xl font-bold text-center text-blue-600 mb-16">Our Esteemed Clients</h2>
      <div className="flex flex-wrap justify-center gap-16">
      {companyData.clients.map((client, index) => (
          <ClientIcon key={index} icon={client.icon} name={client.name} />
        ))}
      </div>
    </div>
  </motion.section>
);

const ClientIcon = ({ icon, name }) => {
  const IconComponent = icon === 'FaMicrosoft' ? FaMicrosoft :
                        icon === 'FaNetworkWired' ? FaNetworkWired :
                        icon === 'FaUniversity' ? FaUniversity :
                        icon === 'FaLightbulb' ? FaLightbulb :
                        FaShoppingCart;

  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <IconComponent className="text-6xl text-blue-500 mb-4" />
      <p className="text-gray-700 text-lg font-semibold">{name}</p>
    </motion.div>
  );
};

const InnovationSection = () => (
  <motion.section 
    className="py-24 bg-gradient-to-r from-blue-500 to-green-500"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center text-white mb-16">Innovation at Wipro</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <GiCircuitry className="text-5xl text-blue-500 mb-6" />
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Next-Gen Technologies</h3>
          <p className="text-gray-700 text-lg">Our innovation labs are at the forefront of emerging technologies, developing solutions in quantum computing, 5G, and edge computing to shape the future of IT services.</p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <GiCyberEye className="text-5xl text-green-500 mb-6" />
          <h3 className="text-2xl font-bold text-green-600 mb-4">AI-Driven Insights</h3>
          <p className="text-gray-700 text-lg">We're leveraging advanced AI and machine learning algorithms to provide predictive analytics and actionable insights, helping businesses make data-driven decisions.</p>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

const SustainabilitySection = () => (
  <motion.section 
    className="py-24 bg-green-50"
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
          <FaLightbulb className="text-5xl text-green-500 mb-6" />
          <h3 className="text-2xl font-bold text-green-600 mb-4">Green IT Solutions</h3>
          <p className="text-gray-700 text-lg">We're developing energy-efficient technologies and promoting sustainable IT practices to reduce the environmental impact of digital operations.</p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <FaGlobe className="text-5xl text-green-500 mb-6" />
          <h3 className="text-2xl font-bold text-green-600 mb-4">Corporate Responsibility</h3>
          <p className="text-gray-700 text-lg">Through our various initiatives, we're committed to creating a positive impact on communities worldwide, focusing on education, ecology, and social development.</p>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default function WiproProfile() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ProjectsSection />
      <ReasonsSection />
      <TechnologiesSection />
      <InnovationSection />
      <GlobalPresenceSection />
      <ClientsSection />
      <SustainabilitySection />
      <WiproChart />    
    </div>
  );
}