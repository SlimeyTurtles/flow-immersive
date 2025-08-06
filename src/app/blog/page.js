"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slowWarning, setSlowWarning] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setError('');
      setSlowWarning(false);
      
      // Show slow loading warning after 3 seconds
      const slowWarningTimer = setTimeout(() => {
        setSlowWarning(true);
      }, 3000);
      
      // Add timeout protection (30 seconds for initial blog loading)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timed out. This might be a network issue. Please check your connection and try again.')), 30000)
      );
      
      const supabasePromise = supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      const result = await Promise.race([supabasePromise, timeoutPromise]);
      const { data, error } = result;

      if (error) throw error;
      setBlogs(data || []);
      clearTimeout(slowWarningTimer);
      setSlowWarning(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      clearTimeout(slowWarningTimer);
      setSlowWarning(false);
      setError(error.message || 'Failed to load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Flow <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Blog</span>
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Insights, updates, and deep dives into the future of immersive data visualization and decision making.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <div className="text-gray-400 text-lg mb-4">Loading blog posts...</div>
              {slowWarning && (
                <div className="text-yellow-400 text-sm">
                  This is taking longer than usual. Please wait...
                </div>
              )}
            </div>
          ) : error ? (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="text-red-400 text-lg mb-4">Unable to load blog posts</div>
              <div className="text-gray-400 text-sm mb-6">
                There seems to be a connection issue. Please check your internet connection and try again.
              </div>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => {
                    setLoading(true);
                    setError('');
                    fetchBlogs();
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-800"
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div {...fadeInUp}>
              <Card className="bg-slate-900/50 border-blue-500/20 text-center">
                <CardContent className="py-16">
                  <h3 className="text-2xl font-semibold text-white mb-4">No blog posts yet</h3>
                  <p className="text-gray-400 text-lg">Check back soon for updates and insights!</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid gap-8"
            >
              {blogs.map((blog, index) => (
                <motion.div key={blog.id} variants={fadeInUp}>
                  <Link href={`/blog/${blog.slug}`}>
                    <Card className="bg-slate-900/50 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer">
                      <div className="grid md:grid-cols-3 gap-6 p-6">
                        {blog.featured_image && (
                          <div className="md:col-span-1">
                            <img
                              src={blog.featured_image}
                              alt={blog.title}
                              className="w-full h-48 md:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className={blog.featured_image ? "md:col-span-2" : "md:col-span-3"}>
                          <CardHeader className="p-0">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                                New
                              </Badge>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {getReadingTime(blog.content)}
                                </div>
                              </div>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                              {blog.title}
                            </CardTitle>
                            <CardDescription className="text-gray-300 text-lg leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-0 mt-4">
                            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                              <span className="font-semibold">Read more</span>
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}