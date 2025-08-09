"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Brain, MessageSquare, Zap, Target, ArrowRight, Mic, Eye, Users } from 'lucide-react';

const FlowAIPage = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Natural Language Queries",
      description: "Ask questions about your data in plain English and get instant, intelligent responses."
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Interaction",
      description: "Use voice commands to navigate, query, and manipulate your data visualizations hands-free."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Smart Pattern Recognition",
      description: "AI automatically identifies trends, anomalies, and insights in your data that might be missed."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Predictive Analytics",
      description: "Generate forecasts and predictions based on historical data patterns and trends."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative AI",
      description: "AI assists in multi-user sessions, facilitating better group decision-making processes."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Get immediate AI-powered insights as your data updates, enabling faster decision making."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/flow/ai-hero-bg.png"
              alt="AI Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/flow/ai.gif";
              }}
            />
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                  FlowAI
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Intelligent data interaction powered by advanced AI. Transform how you explore, 
                understand, and make decisions with your data through natural language and voice commands.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                See FlowAI in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Action</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Watch how FlowAI transforms complex data queries into intuitive conversations.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-4 md:p-8">
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/placeholder-ai-demo"
                      title="FlowAI Demo Video"
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

        {/* Features Grid */}
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Intelligent Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                FlowAI brings artificial intelligence to every aspect of your data visualization experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-blue-500/20 hover:border-blue-400/40 transition-colors h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 text-white">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Transform Your Workflow
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Card className="bg-slate-900/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white mb-4">
                      Ask Questions, Get Answers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-300">
                    <p>"Show me sales trends for the last quarter"</p>
                    <p>"Which regions are underperforming?"</p>
                    <p>"What factors correlate with our best customers?"</p>
                    <p>"Predict next month's revenue based on current trends"</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-4 h-96 border border-blue-500/20 overflow-hidden"
              >
                <img
                  src="/flow/ai.gif"
                  alt="FlowAI in action"
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience FlowAI?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Discover how artificial intelligence can transform your data analysis workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg"
                  >
                    Schedule a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="https://a.flow.gl/" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-900 text-white border-2 border-white px-8 py-4 text-lg"
                  >
                    Try Live Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default FlowAIPage;