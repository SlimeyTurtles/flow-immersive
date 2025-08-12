"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Database, Eye, Users, Zap, LogIn, LogOut, Settings } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" }
};

const glowOnHover = {
  boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
  transition: { duration: 0.4, ease: "easeOut" }
};

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "gif",
      src: "/flow/ai.gif",
      alt: "AI Explains Itself - Interactive Data Analysis",
      fallback: "/flow/ai.gif",
      title: "AI Explains Itself"
    },
    {
      type: "gif",
      src: "/flow/ar_data_visualization.gif",
      alt: "AR Data Visualization in Action",
      fallback: "/flow/ar-glasses.png",
      title: "AR Data Visualization"
    },
    {
      type: "gif", 
      src: "/flow/collaboration.gif",
      alt: "Team Collaboration in AR",
      fallback: "/flow/collaboration.gif",
      title: "Multi-User Collaboration"
    },
    {
      type: "image",
      src: "/flow/in-browser.png",
      alt: "Web Browser Interface", 
      fallback: "/flow/in-browser.png",
      title: "Works in Any Browser"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-60 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = slide.fallback;
            }}
          />
          {/* Overlay with title */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <motion.h3 
              className="text-white font-semibold text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {slide.title}
            </motion.h3>
          </div>
        </motion.div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-blue-400 w-6' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default function Home() {
  const { user, isAdmin, signOut } = useAuth();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState("Financial");

  const industryContent = {
    "Financial": {
      title: "Stock Portfolio Analysis",
      description: "As an example, Flow turns portfolio analysis into an interactive, spatial experience, helping teams and clients see investment insights clearly and collaboratively.",
      features: [
        "Immersive 3D visualizations",
        "Multiuser Collaboration", 
        "AI-Enhanced Data Interaction"
      ],
      cta: "Explore Stock Portfolio Analysis",
      videoId: "U_QEzKYrTEM",
      link: "https://a.flow.gl/flow/m3eo4iay/display"
    },
    "Environmental": {
      title: "Temperature Anomalies",
      description: "As a demonstration, Flow's temperature anomalies story visualizes shifts in global climate over time, helping audiences intuitively see patterns, trends, and emerging risks in a spatial timeline.",
      features: [
        "Time-based Spatial Visualization",
        "Highlight Regional Variations",
        "Interactive Exporation"
      ],
      cta: "Explore Temperature Anomalies",
      videoId: "iSgyh5MmADg",
      link: "https://a.flow.gl/flow/7mp5g1/display"
    },
    "Energy": {
      title: "Texas 2021 Power Outage",
      description: "As an illustration, Flow's Texas Power Outage story shows how infrastructure failures cascaded across the Texas energy grid, helping users connect causes, impacts, and recovery efforts spatially over time.",
      features: [
        "Visualize System Interdependencies",
        "Event Timeline Navigation",
        "Layered Data Views"
      ],
      cta: "Explore Texas 2021 Power Outage",
      videoId: "QiKqRAxLz4o",
      link: "https://a.flow.gl/flow/yuqa8d/display"
    },
    "Operational": {
      title: "Sales Analysis",
      description: "Use Flow to move beyond summarized charts and uncover the critical transactions that shape financial years, enabling better strategic decisions through detailed spatial visualization.",
      features: [
        "Concrete Data Insights",
        "Critical Details Become Visible in 3D",
        "Actionable Geographic Analysis"
      ],
      cta: "Explore Sales Analysis",
      videoId: "Oswr8ZHjjw0",
      link: "https://a.flow.gl/flow/example-operational/display"
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await signOut();
      setShowAdminMenu(false);
      // Stay on homepage instead of redirecting
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />
      
      {/* Admin floating menu for authenticated admins */}
      {isAdmin && (
        <div className="fixed top-20 right-6 z-40">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-slate-950/80 backdrop-blur-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
            {showAdminMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-lg shadow-lg">
                <div className="py-2">
                  <Link href="/admin/dashboard">
                    <button
                      className="w-full text-left px-4 py-2 text-white hover:bg-slate-800 transition-colors"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      Manage Blogs
                    </button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-white hover:bg-slate-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2 inline" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-6 relative min-h-screen">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/flow/big-globe.png"
            alt="Globe Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex items-center min-h-screen py-20">
          <div className="grid lg:grid-cols-7 gap-8 items-center w-full">
            {/* Left Column - Text Content */}
            <div className="text-left lg:col-span-3">
              <motion.h1 
                {...fadeInUp}
                className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                  See your data clearly
                </span>
              </motion.h1>
              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              >
                Transform complex data into immersive 3D visualizations. Make better decisions with your team using AR smart glasses or any web browser.
              </motion.p>
              <motion.div 
                {...fadeInUp}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link href="/demo">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25 ring-2 ring-cyan-400/30 w-full sm:w-auto"
                  >
                    📅 Schedule Demo
                  </Button>
                </Link>
                <a href="https://a.flow.gl/" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg"
                    className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Try Live Demo
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Column - Carousel */}
            <div className="relative lg:col-span-4 flex justify-center">
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative max-w-xl w-full"
              >
                <HeroCarousel />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See Flow in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Action</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how Flow transforms complex data into immersive, interactive experiences that reveal insights and drive better decisions.
            </p>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm overflow-hidden max-w-3xl mx-auto">
              <CardContent className="p-6">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/wgmMRRfpkZU"
                    title="Flow Immersive Demo Video"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* AI-Powered Insights */}
      <section className="py-20 px-6 bg-slate-900/30 relative">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/flow/graph.png"
            alt="Graph Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              AI-Powered <span className="text-blue-400">Insights</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your data into actionable insights.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-slate-500/20 h-96">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-blue-400" />
                    AI Data Insights
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-300 mb-8">
                    Speech-driven data interactions for clear, instant answers from complex datasets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Ask questions in plain language",
                      "Process data in real-time", 
                      "Spot trends and explore risks"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0">
                    Explore Flow AI <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
            >
              <Card className="bg-slate-800/50 border-slate-500/20 h-96">
                <CardContent className="p-4 h-full">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src="/flow/ai.gif"
                      alt="AI-Driven Insights Visualization"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Communicate */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/flow/heirarchy.png"
            alt="Hierarchy Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={scaleOnHover}
            >
              <Card className="bg-slate-800/50 border-slate-500/20 h-96">
                <CardContent className="p-2 h-full">
                  <div className="aspect-video w-full h-full rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/a0Nhsm1dH24"
                      title="Flow Immersive Communication Demo"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-slate-500/20 h-96">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Eye className="w-8 h-8 text-cyan-400" />
                    Communicate
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-300 mb-8">
                    Share data stories in 3D that everyone can see, explore, and understand.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Turn data into interactive stories",
                      "Connect in XR (augmented/mixed reality) or any web browser",
                      "Replace slide decks with unforgettable experiences"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Collaborate */}
      <section className="py-20 px-6 bg-slate-900/30 relative">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/flow/globe.png"
            alt="Globe Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-stretch"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-slate-500/20 h-full">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Users className="w-8 h-8 text-emerald-400" />
                    Collaborate
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-300 mb-8">
                    Make faster, more confident group decisions through shared, interactive visualizations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Multiuser, real-time interaction with data",
                      "Seamless meetings across XR devices and any web browser",
                      "Shared mental model for aligned decision making"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={scaleOnHover}
            >
              <Card className="bg-slate-800/50 border-slate-500/20 h-96">
                <CardContent className="p-4 h-full">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src="/flow/collaboration.gif"
                      alt="Flow Collaboration Workspace"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How Flow Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Flow Immersive</span> Works
            </h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              {
                step: "1",
                title: "Data Integration",
                description: "Upload CSV or connect your existing data sources securely to Flow Immersive with data push integration.",
                gradient: "from-blue-600 to-cyan-600",
                iconImage: "/flow/icons/data-integration.svg",
                iconFallback: Database
              },
              {
                step: "2", 
                title: "Arrange Data",
                description: "Design your presentation and define narrative steps using the no-code Flow Editor.",
                gradient: "from-cyan-600 to-indigo-600",
                iconImage: "/flow/icons/arrange-data.svg",
                iconFallback: Eye
              },
              {
                step: "3",
                title: "XR Visualization", 
                description: "Optimized for XR devices and web browsers, experience your data in a whole new light.",
                gradient: "from-indigo-600 to-purple-600",
                iconImage: "/flow/icons/xr-visualization.svg",
                iconFallback: Zap
              },
              {
                step: "4",
                title: "Collaborate",
                description: "Invite team members to join shared AR sessions to analyze scenarios and make decisions together.",
                gradient: "from-purple-600 to-pink-600",
                iconImage: "/flow/icons/collaborate.svg",
                iconFallback: Users
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-slate-800/50 border-blue-500/20 text-center h-full group hover:border-blue-400/40 transition-colors">
                  <CardContent className="p-6">
                    <motion.div 
                      whileHover={scaleOnHover}
                      className={`bg-gradient-to-br ${item.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <img
                        src={item.iconImage}
                        alt={`${item.title} icon`}
                        className="w-8 h-8 text-white"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'block';
                        }}
                      />
                      <item.iconFallback className="w-8 h-8 text-white hidden" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* View Anywhere */}
      <section className="py-20 px-6 bg-slate-900/30 relative">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/flow/cone-graph.png"
            alt="Cone Graph Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              View <span className="text-blue-400">Anywhere</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access Flow Immersive across multiple platforms for flexible data visualization and collaboration.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "AR Glasses",
                description: "Visualize and work with your data in your own space—effortlessly, with AR glasses.",
                gradient: "from-purple-900/50 to-pink-900/50",
                border: "border-purple-500/20"
              },
              {
                title: "Web Browser", 
                description: "Access Flow directly from your web browser on laptop or phone for seamless team coordination.",
                gradient: "from-blue-900/50 to-purple-900/50",
                border: "border-blue-500/20"
              },
              {
                title: "XR Headsets",
                description: "Immerse yourself in virtual environments with XR headsets for detailed data analysis and team collaboration.",
                gradient: "from-emerald-900/50 to-blue-900/50", 
                border: "border-emerald-500/20"
              }
            ].map((platform, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`bg-slate-800/50 ${platform.border} text-center group hover:${platform.border.replace('/20', '/40')} transition-colors h-full`}>
                  <CardContent className="p-8">
                    <motion.div 
                      whileHover={scaleOnHover}
                      className={`bg-gradient-to-br ${platform.gradient} rounded-xl mb-6 h-48 flex items-center justify-center overflow-hidden`}
                    >
                      {platform.title === "AR Glasses" ? (
                        <img
                          src="/flow/ar-glasses.png"
                          alt="AR Glasses"
                          className="w-full h-full object-cover"
                        />
                      ) : platform.title === "Web Browser" ? (
                        <img
                          src="/flow/in-browser.png"
                          alt="Web Browser"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-white">{platform.title} Visualization</p>
                      )}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">{platform.title}</h3>
                    <p className="text-gray-300">
                      {platform.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Transforming Decision-Making <br />
              <span className="text-blue-400">Across Industries</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how Flow Immersive assists teams to make better decisions with unprecedented visualizations.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20 max-w-fit mx-auto"
          >
            {["Financial", "Environmental", "Energy", "Operational"].map((industry, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <button
                  onClick={() => setActiveIndustry(industry)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg border ${
                    activeIndustry === industry 
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-cyan-500/25 ring-2 ring-cyan-400/40 border-cyan-400" 
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white hover:shadow-blue-500/20 border-slate-600 hover:border-slate-500"
                  }`}
                >
                  {industry}
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Dynamic Industry Content */}
          <motion.div 
            {...fadeInUp}
            whileHover={glowOnHover}
            key={activeIndustry}
          >
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">{industryContent[activeIndustry].title}</h3>
                    <p className="text-lg text-gray-300 mb-8">
                      {industryContent[activeIndustry].description}
                    </p>
                    <ul className="space-y-4 mb-8">
                      {industryContent[activeIndustry].features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <a href={industryContent[activeIndustry].link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0">
                        {industryContent[activeIndustry].cta} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                  <motion.div 
                    whileHover={scaleOnHover}
                    className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-2 h-96 border border-blue-500/20 overflow-hidden"
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${industryContent[activeIndustry].videoId}`}
                        title={industryContent[activeIndustry].title}
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}