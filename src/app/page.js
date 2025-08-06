"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Database, Eye, Users, Zap, LogIn, LogOut, Settings } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
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

export default function Home() {
  const { user, isAdmin, signOut } = useAuth();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            {...fadeInUp}
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
          >
            Critical Data Driven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Decisions
            </span>
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Flow transforms complex data into shared visualizations, revealing patterns, risks, and opportunities for improved decision making.
          </motion.p>
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link href="/demo">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Request Demo
              </Button>
            </Link>
            <a href="https://a.flow.gl/" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-emerald-400 text-emerald-400 px-8 py-6 rounded-full text-lg font-semibold hover:bg-emerald-400 hover:text-white transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Live Demo
              </Button>
            </a>
          </motion.div>
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
            whileHover={glowOnHover}
          >
            <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4 md:p-8">
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
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
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
              <Card className="bg-slate-800/50 border-blue-500/20 h-full">
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
              whileHover={scaleOnHover}
            >
              <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-500/20 h-80">
                <CardContent className="p-8 h-full flex items-center justify-center">
                  <p className="text-white text-center">AI Insights Visualization</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Communicate */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
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
              <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/20 h-80">
                <CardContent className="p-8 h-full flex items-center justify-center">
                  <p className="text-white text-center">3D Data Stories Visualization</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-cyan-500/20 h-full">
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
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-800/50 border-emerald-500/20 h-full">
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
              <Card className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-500/20 h-80">
                <CardContent className="p-8 h-full flex items-center justify-center">
                  <p className="text-white text-center">Collaboration Workspace</p>
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
              How Flow <span className="text-blue-400">Immersive</span> Works
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
                icon: Database
              },
              {
                step: "2", 
                title: "Arrange Data",
                description: "Design your presentation and define narrative steps using the no-code Flow Editor.",
                gradient: "from-cyan-600 to-indigo-600",
                icon: Eye
              },
              {
                step: "3",
                title: "XR Visualization", 
                description: "Optimized for XR devices and web browsers, experience your data in a whole new light.",
                gradient: "from-indigo-600 to-purple-600",
                icon: Zap
              },
              {
                step: "4",
                title: "Collaborate",
                description: "Invite team members to join shared AR sessions to analyze scenarios and make decisions together.",
                gradient: "from-purple-600 to-pink-600",
                icon: Users
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-slate-800/50 border-blue-500/20 text-center h-full group hover:border-blue-400/40 transition-colors">
                  <CardContent className="p-6">
                    <motion.div 
                      whileHover={scaleOnHover}
                      className={`bg-gradient-to-br ${item.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
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
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
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
                <Card className={`bg-slate-800/50 ${platform.border} text-center group hover:${platform.border.replace('/20', '/40')} transition-colors`}>
                  <CardContent className="p-8">
                    <motion.div 
                      whileHover={scaleOnHover}
                      className={`bg-gradient-to-br ${platform.gradient} rounded-xl p-8 mb-6 h-48 flex items-center justify-center`}
                    >
                      <p className="text-white">{platform.title} Visualization</p>
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
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {["Financial", "Environmental", "Energy", "Operational"].map((industry, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-slate-800/50 border-blue-500/20 text-center group hover:border-blue-400/40 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white">{industry}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stock Portfolio Analysis Example */}
          <motion.div 
            {...fadeInUp}
            whileHover={glowOnHover}
          >
            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">Stock Portfolio Analysis</h3>
                    <p className="text-lg text-gray-300 mb-8">
                      As an example, Flow turns portfolio analysis into an interactive, spatial experience, helping teams and clients see investment insights clearly and collaboratively.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {[
                        "Immersive 3D visualizations",
                        "Multiuser Collaboration", 
                        "AI-Enhanced Data Interaction"
                      ].map((feature, index) => (
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
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0">
                      Explore Stock Portfolio Analysis <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <motion.div 
                    whileHover={scaleOnHover}
                    className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-blue-500/20"
                  >
                    <p className="text-white text-center">Stock Portfolio 3D Visualization</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/50 to-indigo-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your <br />
              <span className="text-blue-400">Decision-Making Process?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join leading organizations that are using Flow Immersive to make critical decisions with unrivaled clarity.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}