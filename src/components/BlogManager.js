"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MarkdownEditor from './MarkdownEditor';
import { Plus, Edit, Trash2, Eye, Calendar, User, ArrowLeft, LogOut } from 'lucide-react';

const BlogManager = () => {
  const { signOut } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slowWarning, setSlowWarning] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    setSlowWarning(false);
    
    // Show slow loading warning after 3 seconds
    const slowWarningTimer = setTimeout(() => {
      setSlowWarning(true);
    }, 3000);
    
    try {
      // Add timeout protection (30 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timed out. This might be a network issue. Please check your connection and try again.')), 30000)
      );
      
      const supabasePromise = supabase
        .from('blogs')
        .select('*')
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

  const handleCreateBlog = async (blogData) => {
    try {
      // Add timeout protection
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database request timed out')), 30000)
      );
      
      const supabasePromise = supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single();
      
      const result = await Promise.race([supabasePromise, timeoutPromise]);
      const { data, error } = result;

      if (error) throw error;

      setBlogs([data, ...blogs]);
      setCurrentView('list');
    } catch (error) {
      console.error('Error creating blog:', error);
      // Re-throw to let MarkdownEditor handle the error display
      throw new Error(error.message || 'Failed to create blog post');
    }
  };

  const handleUpdateBlog = async (blogData) => {
    try {
      // Add timeout protection
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database request timed out')), 30000)
      );
      
      const supabasePromise = supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.id)
        .select()
        .single();
      
      const result = await Promise.race([supabasePromise, timeoutPromise]);
      const { data, error } = result;

      if (error) throw error;

      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? data : blog));
      setCurrentView('list');
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
      // Re-throw to let MarkdownEditor handle the error display
      throw new Error(error.message || 'Failed to update blog post');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (error) throw error;

      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleTogglePublished = async (blog) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update({ published: !blog.published })
        .eq('id', blog.id)
        .select()
        .single();

      if (error) throw error;

      setBlogs(blogs.map(b => b.id === blog.id ? data : b));
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (currentView === 'create') {
    return (
      <div>
        {/* Admin Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">
                Flow <span className="text-blue-400">Immersive</span> <span className="text-sm text-gray-400">Admin</span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentView('list')}
                  className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
                  >
                    Back to Site
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-20">
          <MarkdownEditor
            onSave={handleCreateBlog}
            onCancel={() => setCurrentView('list')}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'edit' && editingBlog) {
    return (
      <div>
        {/* Admin Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">
                Flow <span className="text-blue-400">Immersive</span> <span className="text-sm text-gray-400">Admin</span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentView('list');
                    setEditingBlog(null);
                  }}
                  className="border-slate-600 text-gray-300 hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
                  >
                    Back to Site
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-20">
          <MarkdownEditor
            initialTitle={editingBlog.title}
            initialContent={editingBlog.content}
            onSave={handleUpdateBlog}
            onCancel={() => {
              setCurrentView('list');
              setEditingBlog(null);
            }}
            isEditing={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              Flow <span className="text-blue-400">Immersive</span> <span className="text-sm text-gray-400">Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={signOut}
                className="border-slate-600 text-gray-300 hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
              <p className="text-gray-400">Create, edit, and manage your blog posts</p>
            </div>
            <Button
              onClick={() => setCurrentView('create')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-gray-400 mb-4">Loading blog posts...</div>
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
              onClick={() => fetchBlogs()}
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
        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No blog posts yet</h3>
            <p className="text-gray-400 mb-6">Create your first blog post to get started</p>
            <Button
              onClick={() => setCurrentView('create')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 border-blue-500/20 hover:border-blue-400/40 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-white text-xl">{blog.title}</CardTitle>
                        <Badge 
                          variant={blog.published ? "default" : "secondary"}
                          className={blog.published ? 
                            "bg-emerald-600 hover:bg-emerald-700" : 
                            "bg-slate-600 hover:bg-slate-700"
                          }
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {blog.excerpt || 'No excerpt available'}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(blog.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Admin
                        </div>
                      </div>
                    </div>
                    {blog.featured_image && (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-24 h-16 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingBlog(blog);
                        setCurrentView('edit');
                      }}
                      className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublished(blog)}
                      className={blog.published ? 
                        "border-orange-500 text-orange-400 hover:bg-orange-600 hover:text-white hover:border-orange-600" :
                        "border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                      }
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {blog.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white ml-auto"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;