import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Clock, Users, BarChart3, Camera, Brain, Activity,
  Shield, Check, Zap, Globe, Database, Lock,
  MonitorSmartphone, BellRing
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className={`bg-black/40 backdrop-blur-sm p-4 mb-3 transition-opacity duration-500 rounded-lg`}>
    <div className="flex items-center mb-2">
      <div className="p-2 bg-indigo-900/50 rounded-lg">
        {React.cloneElement(icon, { size: 20, className: "text-indigo-400" }) }
      </div>
      <h3 className="ml-3 text-base font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-300 text-xs">{description}</p>
  </div>
);

// Statistic Box Component
const StatBox = ({ value, label }) => (
  <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-indigo-500/10">
    <div className="text-indigo-400 text-2xl font-bold">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

// Benefit Card Component
const BenefitCard = ({ icon, title, description }) => (
  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 hover:bg-black/30 transition-all border border-indigo-500/10 group hover:border-indigo-500/30">
    <div className="p-3 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg inline-block mb-4 group-hover:from-indigo-900/50 group-hover:to-purple-900/50 transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Tab Content Component
const TabContent = ({ activeTab, content }) => (
  <div className="max-w-3xl mx-auto">
    <h3 className="text-3xl font-bold mb-4 text-center">
      {content[activeTab].title}
    </h3>
    <p className="text-gray-300 text-center mb-8">
      {content[activeTab].description}
    </p>
    
    <div className="bg-black/30 rounded-lg p-6 border border-indigo-500/10 shadow-lg">
      <ul className="space-y-4">
        {content[activeTab].bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 mt-1">
              <div className="p-1 bg-gradient-to-br from-indigo-600/50 to-purple-600/50 rounded-full">
                <Check size={14} className="text-white" />
              </div>
            </div>
            <span className="text-gray-200">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Header Component - Fixed and properly positioned
const Header = () => (
  <header className="p-4 md:p-6 flex justify-between items-center bg-gray-900/80 backdrop-blur-lg z-50 sticky top-0 border-b border-indigo-500/20 w-full">
    <div className="flex items-center">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md flex items-center justify-center mr-3">
        <Brain size={18} className="text-white" />
      </div>
      <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
        Neuro<span className="text-purple-600">Mark</span>
      </h1>
    </div>
    <div className="flex space-x-2 md:space-x-4">
      <Link to="/employee">
        <button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 md:px-6 md:py-2 rounded-lg font-medium transition-all duration-300 border border-white/20 text-sm md:text-base"
        >
          Employee Portal
        </button>
      </Link>
      <Link to="/Signup">
        <button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 md:px-6 md:py-2 rounded-lg font-medium transition-all duration-300 border border-white/20 text-sm md:text-base"
        >
          Sign Up
        </button>
      </Link>
      <Link to="/Login">
        <button 
          className="bg-purple-600 hover:bg-indigo-700 text-white px-3 py-1 md:px-6 md:py-2 rounded-lg font-medium transition-all duration-300 text-sm md:text-base"
        >
          Login
        </button>
      </Link>
    </div>
  </header>
);

// Hero Section Component
const HeroSection = ({ features, currentSlide, isAnimating, goToSlide }) => (
  <section className="relative overflow-hidden py-10 md:py-20">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-900 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-0"></div>
      {/* <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaehGKVg-WGvL1wcd9oQmodx4maeuy1vruZdO5XnYvS79tG-rW5O5RxgJCOaL4yZGAsk0&usqp=CAU')] opacity-50"></div> */}
    </div>

    <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center relative z-10">
      <div className="w-full lg:w-2/3 mb-10 lg:mb-0">
        <div className="text-white max-w-[700px] mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-purple-500">Next-Gen</span> Facial Recognition<br />
            Attendance System
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg leading-relaxed text-gray-300">
            Transform your attendance tracking with AI-powered recognition technology that processes multiple camera feeds simultaneously.
          </p>
          
          <Link to="/Signup">
            <button 
              className="mt-6 md:mt-8 group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 shadow-lg shadow-indigo-900/30 mx-auto lg:mx-0"
            >
              Get Started
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </button>
          </Link>
          <div className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-4">
            <StatBox value="99.8%" label="Recognition Accuracy" />
            <StatBox value="20+" label="Camera Support" />
            <StatBox value="100+" label="IDs per minute" />
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/3 relative">
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          
          <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl border border-gray-800 relative mx-auto max-w-xs">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-gray-800 rounded-b-lg z-20"></div>
            
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-4 shadow-inner relative overflow-hidden aspect-[9/16]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-600/40 rounded-lg flex items-center justify-center">
                    <Brain size={16} className="text-indigo-300" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">NeuroMark</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-blue-900/60 rounded-full flex items-center justify-center">
                    <BellRing size={12} className="text-blue-300" />
                  </div>
                </div>
              </div>
              
              <div className={`bg-black/30 rounded-lg p-4 mb-3 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-indigo-900/50 rounded-lg">
                    {features[currentSlide].icon && React.cloneElement(features[currentSlide].icon, { 
                      size: 20, 
                      className: "text-indigo-400" 
                    })}
                  </div>
                  <h3 className="ml-3 text-base font-bold text-white">{features[currentSlide].title}</h3>
                </div>
                <p className="text-gray-300 text-xs">{features[currentSlide].description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video bg-black/40 rounded-lg p-1 relative overflow-hidden border border-indigo-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users size={14} className="text-indigo-300/40" />
                    </div>
                    <div 
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
                      style={{ 
                        transform: `translateY(${Math.sin((Date.now() / 1000) + i) * 20}px)`, 
                        transition: 'transform 1s ease-in-out' 
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div className="bg-black/40 p-3 rounded-lg border border-indigo-500/20">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 mr-3 flex items-center justify-center">
                    <Users size={14} className="text-indigo-300" />
                  </div>
                  <div>
                    <div className="h-2 w-20 bg-indigo-500/30 rounded"></div>
                    <div className="h-2 w-12 bg-indigo-500/20 rounded mt-1"></div>
                  </div>
                  <div className="ml-auto px-2 py-1 bg-green-500/30 rounded text-xs text-green-300 border border-green-500/30">
                    Present
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 mr-3 flex items-center justify-center">
                    <Users size={14} className="text-indigo-300" />
                  </div>
                  <div>
                    <div className="h-2 w-16 bg-indigo-500/30 rounded"></div>
                    <div className="h-2 w-10 bg-indigo-500/20 rounded mt-1"></div>
                  </div>
                  <div className="ml-auto px-2 py-1 bg-red-500/30 rounded text-xs text-red-300 border border-red-500/30">
                    Absent
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600/60 to-purple-600/60 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Brain size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className="bg-gray-800 rounded-full h-1 w-1/3"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-indigo-500 w-4' 
                    : 'bg-gray-500/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="py-8 px-6 bg-black/40 backdrop-blur-lg border-t border-indigo-500/10">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="text-white" size={16} />
          </div>
          <h1 className="ml-2 text-lg font-bold text-white">Neuro<span className='text-purple-600'>Mark</span></h1>
        </div>
        <div className="text-center md:text-right">
          <p className="text-gray-400 text-sm">© 2025 NeuroMark. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-1">Enterprise Facial Recognition Technology</p>
        </div>
      </div>
    </div>
  </footer>
);

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAnimation, setShowAnimation] = useState(true);

  // Feature slides for the carousel
  const features = [
    {
      title: "Advanced Facial Recognition",
      description: "Identify individuals with 99.8% accuracy using our proprietary AI algorithm",
      icon: <Camera className="w-12 h-12 mb-4 text-indigo-400" />
    },
    {
      title: "Multi-Camera Processing",
      description: "Simultaneously process up to 20 RTSP camera feeds in real-time",
      icon: <MonitorSmartphone className="w-12 h-12 mb-4 text-indigo-400" />
    },
    {
      title: "Automated Attendance",
      description: "Eliminate manual check-ins with fully automated recognition and tracking",
      icon: <Users className="w-12 h-12 mb-4 text-indigo-400" />
    },
    {
      title: "Data Analytics",
      description: "Generate comprehensive reports with customizable metrics and visualization",
      icon: <BarChart3 className="w-12 h-12 mb-4 text-indigo-400" />
    }
  ];

  // Core benefits
  const benefits = [
    {
      title: "Time Efficiency",
      description: "Save up to 30 hours monthly on attendance management",
      icon: <Clock className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Accuracy",
      description: "Eliminate human error with 99.8% recognition accuracy",
      icon: <Check className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Performance",
      description: "Process over 100 identifications per minute",
      icon: <Zap className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Security",
      description: "Enterprise-grade encryption and compliance",
      icon: <Lock className="w-6 h-6 text-indigo-400" />
    }
  ];

  // Tab content
  const tabContent = {
    overview: {
      title: "Complete Attendance Solution",
      description: "NeuroMark transforms attendance tracking with state-of-the-art facial recognition technology, providing real-time monitoring and automated reporting.",
      bulletPoints: [
        "Process multiple camera feeds simultaneously",
        "Identify registered users with 99.8% accuracy",
        "Generate detailed reports with a single click",
        "Access real-time data on web and mobile"
      ]
    },
    features: {
      title: "Powerful Features",
      description: "Our system combines cutting-edge AI with intuitive interfaces to deliver a seamless attendance tracking experience.",
      bulletPoints: [
        "Multi-camera support for 20+ RTSP streams",
        "Instant facial recognition and matching",
        "Customizable reporting and analytics",
        "Mobile and web interfaces"
      ]
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && showAnimation) {
        nextSlide();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating, showAnimation]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection 
        features={features} 
        currentSlide={currentSlide} 
        isAnimating={isAnimating} 
        goToSlide={goToSlide}
      />
      
      {/* Info Tabs Section */}
      <section className="py-12 md:py-16 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-black/40 rounded-lg p-1 border border-indigo-500/20">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-2 rounded-md transition-all ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <TabContent activeTab={activeTab} content={tabContent} />
        </div>
      </section>
      
      {/* Benefits Grid */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">NeuroMark</span>
          </h2>
          <p className="text-gray-300 text-center mb-10 md:mb-16 max-w-2xl mx-auto">
            Our facial recognition attendance system delivers unmatched performance, security, and ease of use for organizations of all sizes.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard 
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}