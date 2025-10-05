import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton';
import { EmptyState } from '../components/Common/EmptyState';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  featuredImage: string;
  tags: string[];
  createdAt: string;
  readTime: number;
  featured: boolean;
}

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Mock blog data
  const mockBlogs: Blog[] = [
    {
      id: "1",
      slug: "sustainable-fashion-rental-guide",
      title: "The Complete Guide to Sustainable Fashion Through Rental",
      excerpt: "Discover how fashion rental is revolutionizing the way we think about sustainable style and reducing our environmental impact.",
      content: "Fashion rental is more than just a trend—it's a movement towards a more sustainable future. By choosing to rent instead of buy, you're not only saving money but also reducing your environmental footprint...",
      author: "Sarah Johnson",
      authorAvatar: "https://i.pinimg.com/1200x/72/fb/3d/72fb3d9b11322e0033dbf026da0f1ead.jpg",
      featuredImage: "https://i.pinimg.com/1200x/72/fb/3d/72fb3d9b11322e0033dbf026da0f1ead.jpg",
      tags: ["sustainability", "fashion", "rental", "environment"],
      createdAt: "2024-01-15T10:30:00Z",
      readTime: 5,
      featured: true
    },
    {
      id: "2",
      slug: "wedding-guest-outfit-ideas",
      title: "10 Perfect Wedding Guest Outfit Ideas",
      excerpt: "Look stunning at every wedding with these carefully curated outfit ideas that are perfect for rental.",
      content: "Wedding season is here, and finding the perfect outfit for each celebration can be challenging and expensive. Here's where fashion rental comes to the rescue...",
      author: "Emily Chen",
      authorAvatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      featuredImage: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["wedding", "guest outfit", "formal wear", "style tips"],
      createdAt: "2024-01-12T14:20:00Z",
      readTime: 7,
      featured: false
    },
    {
      id: "3",
      slug: "office-wear-rental-revolution",
      title: "How Rental is Revolutionizing Office Wear",
      excerpt: "Professional attire just got more affordable and sustainable with the rise of office wear rentals.",
      content: "The modern workplace is evolving, and so is professional fashion. With remote work and hybrid schedules becoming the norm, our approach to office wear is changing...",
      author: "Michael Rodriguez",
      authorAvatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      featuredImage: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["office wear", "professional", "workwear", "rental"],
      createdAt: "2024-01-10T09:15:00Z",
      readTime: 4,
      featured: true
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/blogs.json');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          throw new Error('Failed to fetch blogs');
        }
      } catch (error) {
        console.warn('Using mock blog data:', error);
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = selectedTag
    ? blogs.filter(blog => blog.tags.includes(selectedTag))
    : blogs;

  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);

  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingSkeleton type="blog" count={6} />
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Fashion Blog</h1>
            <p className="text-gray-600">Stay updated with the latest fashion trends and rental tips</p>
          </div>
          <EmptyState
            type="blogs"
            title="No blog posts available"
            description="Check back later for new articles about fashion, sustainability, and rental tips."
            actionLabel="Go Home"
            onAction={() => window.location.href = '/'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Fashion Blog</h1>
          <p className="text-gray-600">Stay updated with the latest fashion trends and rental tips</p>
        </div>

        {/* Tags Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === ''
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedTag === tag
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {!selectedTag && featuredBlogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map(blog => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <img
                          src={blog.authorAvatar}
                          alt={blog.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600">{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedTag ? `Posts tagged "${selectedTag}"` : 'All Posts'}
          </h2>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found for the selected tag.</p>
              <button
                onClick={() => setSelectedTag('')}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                View All Posts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedTag ? filteredBlogs : regularBlogs).map(blog => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <img
                          src={blog.authorAvatar}
                          alt={blog.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600">{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime} min</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{blog.tags.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};