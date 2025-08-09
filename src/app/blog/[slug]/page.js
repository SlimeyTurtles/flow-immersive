"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/CTASection';
import { Calendar, Clock, ArrowLeft, Share2, User } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug);
    }
  }, [params.slug]);

  const fetchBlog = async (slug) => {
    try {
      setError('');
      
      // Add timeout protection (30 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timed out. This might be a network issue. Please check your connection and try again.')), 30000)
      );
      
      const supabasePromise = supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      const { data, error } = await Promise.race([supabasePromise, timeoutPromise]);

      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
        } else {
          throw error;
        }
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(error.message || 'Failed to load blog post. Please try again.');
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

  const cleanMarkdown = (text) => {
    if (!text) return '';
    
    return text
      // Remove images ![alt](url)
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // Remove links [text](url) but keep the text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove headers ### ## #
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold **text** and __text__
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      // Remove italic *text* and _text_
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove code blocks ```
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code `text`
      .replace(/`([^`]+)`/g, '$1')
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Clean up extra whitespace
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-gray-400 text-lg">Loading blog post...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 text-lg mb-4">Unable to load blog post</div>
          <div className="text-gray-400 text-sm mb-6">
            There seems to be a connection issue. Please check your internet connection and try again.
          </div>
          <div className="flex gap-3 justify-center mb-4">
            <Button 
              onClick={() => {
                setLoading(true);
                setError('');
                fetchBlog(params.slug);
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
          <Link href="/blog">
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <Navbar />
        
        <div className="pt-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <Card className="bg-slate-900/50 border-blue-500/20">
                <CardContent className="py-16">
                  <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                  <p className="text-gray-400 text-lg mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
                  <Link href="/blog">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0, duration: 0.4 }}
            className="mb-8"
          >
            <Link href="/blog">
              <Button 
                className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-slate-500/25 ring-1 ring-slate-500/30 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Featured Image */}
          {blog.featured_image && (
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8"
            >
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl"
              />
            </motion.div>
          )}

          {/* Article Header */}
          <motion.header 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {blog.excerpt && (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {cleanMarkdown(blog.excerpt)}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Flow Immersive Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{getReadingTime(blog.content)}</span>
                </div>
              </div>
              
              <Button
                onClick={handleShare}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-emerald-500/25 ring-1 ring-emerald-500/30 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="bg-slate-900/50 border-blue-500/20">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg prose-invert prose-blue max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      h1: ({children}) => <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-8">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                      p: ({children}) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                      a: ({children, href}) => <a href={href} className="text-blue-400 hover:text-blue-300 underline">{children}</a>,
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-400 bg-slate-800/50 py-4 rounded-r-lg">
                          {children}
                        </blockquote>
                      ),
                      code: ({children, className}) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-slate-800 text-blue-300 px-2 py-1 rounded text-sm">{children}</code>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                      pre: ({children}) => (
                        <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto my-6 border border-slate-700">
                          {children}
                        </pre>
                      ),
                      img: ({src, alt}) => {
                        // Check if it's a video file
                        if (src?.match(/\.(mp4|webm|ogg|mov|avi)$/i)) {
                          return (
                            <video 
                              controls 
                              className="rounded-lg my-6 w-full max-w-4xl mx-auto"
                              preload="metadata"
                            >
                              <source src={src} />
                              Your browser does not support the video tag.
                            </video>
                          );
                        }
                        // Check if it's a YouTube link
                        const youtubeMatch = src?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
                        if (youtubeMatch) {
                          return (
                            <div className="aspect-video my-6 rounded-lg overflow-hidden">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                title={alt || 'YouTube video'}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          );
                        }
                        return <img src={src} alt={alt} className="rounded-lg my-6 w-full" />;
                      },
                      ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">{children}</ol>,
                    }}
                  >
                    {blog.content}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </article>

      {/* Call to Action */}
      <CTASection 
        title="Ready to Transform Your Data?"
        subtitle="Experience the power of immersive data visualization with Flow Immersive. See how your data can drive better decisions."
      />

      <Footer />
    </div>
  );
}