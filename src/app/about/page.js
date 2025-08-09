"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp,
  Building,
  GraduationCap,
  Heart,
  Globe,
  Calendar
} from 'lucide-react';

const AboutPage = () => {
  const verticals = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Financial Services",
      description: "Real-time portfolio analysis, asset performance reviews, market trends, and client investment strategy presentations."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Consulting",
      description: "Mergers & acquisitions analysis, project management for technical projects, scenario planning, and risk management."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Healthcare",
      description: "Clinical trial visualization, pharmaceutical R&D collaboration, and medical imaging review."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Public Policy & Environmental",
      description: "Climate impact presentations, policy simulations, donor engagement, and public education campaigns."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "Interactive data learning modules, classroom AR experiences, and STEM data visualization and AI demonstrations."
    }
  ];

  const partners = [
    {
      name: "Meta",
      description: "Collaborating to deliver high-value, multi-user AR experiences on Meta Quest devices for enterprise customers.",
      logo: "/flow/meta.jpg",
      color: "from-blue-600 to-blue-800"
    },
    {
      name: "Qualcomm",
      description: "Partnering on cutting-edge AR processing and mobile platform integration.",
      logo: "/flow/qualcomm.png",
      color: "from-red-600 to-red-800"
    },
    {
      name: "HTC",
      description: "Delivering immersive VR experiences through HTC's enterprise-grade hardware solutions.",
      logo: "/flow/htc.webp",
      color: "from-green-600 to-green-800"
    },
    {
      name: "Magic Leap",
      description: "Creating next-generation spatial computing experiences with Magic Leap's AR platform.",
      logo: "/flow/magic-leap.jpg",
      color: "from-purple-600 to-purple-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="h-screen flex items-center relative">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/flow/about-hero-bg.png"
              alt="About Us Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/flow/big-globe.png";
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Better decisions with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">data visualization</span>
                <br />in augmented reality
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Flow's mission is to transform complex data into dynamic, multi-dimensional narratives across AR, VR, and traditional flat screens.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Iron Man Inspiration Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    Flow Immersive began with a vision inspired by the possibilities of immersive interaction—similar to the scenes from science fiction movies where technology is seamlessly integrated into problem-solving and creation.
                  </p>
                  <p>
                    Our founder, Jason Marsh, often recalls wanting to "build Iron Man with Jarvis"—a system that transforms abstract data into tangible, interactive experiences through augmented reality. Like Tony Stark manipulating 3D data to create a new element, Flow's AR platform is designed to put people in control of their data in a transformative way.
                  </p>
                  <p>
                    We've built a product and tools that transform data into dynamic, multi-dimensional narratives across AR, VR, and traditional flat screens. What started as a vision of an "informational AR" experience has grown into a comprehensive platform that powers meaningful conversations and real insights in boardrooms, classrooms, and beyond.
                  </p>
                  <p>
                    We envision a future where immersive data experiences are the norm, enabling organizations to make decisions faster, collaborate seamlessly, and gain insights previously buried in complex datasets. Flow Immersive aims to create a "global data mind's eye" where data-driven thinking becomes second nature to millions of users worldwide, accessed through the coming wave of AR smart glasses.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl border border-blue-500/20 overflow-hidden">
                  <img
                    src="/flow/ironman.gif"
                    alt="Iron Man holographic data manipulation"
                    className="w-full h-[160%] object-cover object-center -translate-y-[15%]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-slate-900/50 border-blue-500/20 max-w-4xl mx-auto">
                <CardHeader className="text-center pb-8">
                  <div className="w-64 h-64 rounded-full mx-auto mb-6 overflow-hidden border-2 border-blue-500/20">
                    <img
                      src="/flow/Jason_Marsh_CEO.webp"
                      alt="Jason Marsh, Founder & CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-3xl text-white mb-2">Jason Marsh</CardTitle>
                  <CardDescription className="text-blue-400 text-lg">Founder & CEO</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      Jason has a background in developing innovative tech solutions, starting with his work on speech recognition at Apple in the 1990s. At Flow, he leads the vision to create a meaningful AR data platform, making complex data accessible and actionable for all, from the largest enterprises to the consumer.
                    </p>
                    <p>
                      Jason is obsessed with visual thinking, information design, data storytelling, and building things: companies, experiences, user interfaces, visual abstract art, music, and education reform.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Customer Verticals Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Customer Verticals</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We work with a range of clients, including financial institutions, consulting firms, educational organizations, and more. 
                The commonality across Flow use cases is that AR Data Visualization reveals the risk within the data, which is easily seen with our more-detailed visualizations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {verticals.map((vertical, index) => (
                <motion.div
                  key={vertical.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-blue-500/20 hover:border-blue-400/40 transition-colors h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                        {vertical.icon}
                      </div>
                      <CardTitle className="text-white text-xl">{vertical.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 leading-relaxed">
                        {vertical.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Partnerships Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Strategic Partnerships</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Collaboration is at the core of Flow's success. Our partnerships span industry leaders, innovative startups, and global enterprises, enabling us to bring cutting-edge augmented reality solutions to more customers every day.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.7 + index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-blue-500/20 hover:border-blue-400/40 transition-colors h-full group">
                    <CardHeader className="text-center">
                      <div className={`w-32 h-32 bg-gradient-to-br ${partner.color} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden`}>
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="w-full h-full object-cover filter brightness-110"
                        />
                      </div>
                      <CardTitle className="text-white text-xl">{partner.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 leading-relaxed text-center">
                        {partner.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection 
          title="Learn More About Flow"
          subtitle="Discover the impact Flow Immersive can have on you and your organization. Transform your data into immersive experiences that drive better decisions."
        />

        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;