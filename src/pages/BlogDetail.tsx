import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';
import { LoadingSkeleton } from '../components/Common/LoadingSkeleton';

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

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Extended mock blog data with full content
  const mockBlogs: Blog[] = [
    {
      id: "1",
      slug: "sustainable-fashion-rental-guide",
      title: "The Complete Guide to Sustainable Fashion Through Rental",
      excerpt: "Discover how fashion rental is revolutionizing the way we think about sustainable style and reducing our environmental impact.",
      content: `
        <p>Fashion rental is more than just a trend—it's a movement towards a more sustainable future. By choosing to rent instead of buy, you're not only saving money but also reducing your environmental footprint in ways you might not have considered.</p>

        <h2>The Environmental Impact of Fast Fashion</h2>
        <p>The fashion industry is one of the world's largest polluters, responsible for 10% of global carbon emissions and 20% of wastewater. Fast fashion has created a culture of disposable clothing, where garments are worn just a few times before being discarded.</p>

        <p>Consider these staggering statistics:</p>
        <ul>
          <li>The average garment is worn only 7 times before being thrown away</li>
          <li>It takes 2,700 liters of water to make one cotton t-shirt</li>
          <li>85% of textiles end up in landfills each year</li>
          <li>Clothing production has doubled since 2000</li>
        </ul>

        <h2>How Fashion Rental Changes Everything</h2>
        <p>Fashion rental platforms like Drobe are revolutionizing how we consume fashion. Instead of buying items that sit in our closets unworn, we can access high-quality, designer pieces for special occasions or to try new styles.</p>

        <h3>Benefits of Fashion Rental:</h3>
        <ul>
          <li><strong>Reduced Waste:</strong> One dress can be worn by dozens of people instead of sitting unused in a single closet</li>
          <li><strong>Access to Luxury:</strong> Wear designer pieces at a fraction of the retail price</li>
          <li><strong>Variety:</strong> Try new styles without the commitment of purchase</li>
          <li><strong>Space Saving:</strong> No need for large closets filled with rarely-worn items</li>
          <li><strong>Cost Effective:</strong> Spend less on clothing while wearing higher quality pieces</li>
        </ul>

        <h2>Making the Switch to Rental</h2>
        <p>Transitioning to a rental-first mindset doesn't mean giving up on personal style. It means being more intentional about your fashion choices and considering the lifecycle of each garment.</p>

        <h3>When to Rent vs. Buy:</h3>
        <p><strong>Rent for:</strong></p>
        <ul>
          <li>Special occasions (weddings, galas, parties)</li>
          <li>Trendy pieces you might not wear long-term</li>
          <li>Expensive designer items</li>
          <li>Seasonal clothing</li>
          <li>Professional attire for specific events</li>
        </ul>

        <p><strong>Buy for:</strong></p>
        <ul>
          <li>Everyday basics and staples</li>
          <li>Undergarments and intimate apparel</li>
          <li>Items you'll wear frequently</li>
          <li>Pieces that fit your long-term style vision</li>
        </ul>

        <h2>The Future of Fashion</h2>
        <p>As consumers become more environmentally conscious, the fashion rental market is expected to grow exponentially. By 2030, the global fashion rental market is projected to reach $2.08 billion.</p>

        <p>This shift represents more than just a business opportunity—it's a chance to fundamentally change how we think about ownership, consumption, and personal style. When we rent fashion, we're participating in a circular economy that values access over ownership and sustainability over disposability.</p>

        <h2>Getting Started with Fashion Rental</h2>
        <p>Ready to embrace sustainable fashion through rental? Here are some tips to get started:</p>

        <ol>
          <li><strong>Start Small:</strong> Begin by renting for special occasions before incorporating rental into your everyday wardrobe</li>
          <li><strong>Know Your Measurements:</strong> Accurate sizing is crucial for a good rental experience</li>
          <li><strong>Plan Ahead:</strong> Popular items book up quickly, especially during peak seasons</li>
          <li><strong>Read Reviews:</strong> Other renters' experiences can help you make better choices</li>
          <li><strong>Care for Items:</strong> Treat rental pieces with respect to ensure they remain available for future renters</li>
        </ol>

        <p>Fashion rental isn't just about looking good—it's about feeling good about your choices and their impact on the planet. Every time you choose to rent instead of buy, you're voting for a more sustainable future in fashion.</p>

        <p>Join the movement and discover how fashion rental can transform not just your wardrobe, but your relationship with clothing itself.</p>
      `,
      author: "Sarah Johnson",
      authorAvatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      featuredImage: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tags: ["sustainability", "fashion", "rental", "environment"],
      createdAt: "2024-01-15T10:30:00Z",
      readTime: 8,
      featured: true
    },
    {
      id: "2",
      slug: "wedding-guest-outfit-ideas",
      title: "10 Perfect Wedding Guest Outfit Ideas",
      excerpt: "Look stunning at every wedding with these carefully curated outfit ideas that are perfect for rental.",
      content: `
        <p>Wedding season is here, and finding the perfect outfit for each celebration can be challenging and expensive. Here's where fashion rental comes to the rescue, offering you access to stunning outfits without the hefty price tag or closet clutter.</p>

        <h2>The Wedding Guest Dilemma</h2>
        <p>As a wedding guest, you want to look elegant and appropriate while respecting the couple's special day. The challenge? Every wedding has different dress codes, venues, and seasons to consider. Buying a new outfit for each wedding can quickly become expensive, especially when you might only wear it once.</p>

        <h2>10 Perfect Wedding Guest Outfits</h2>

        <h3>1. The Classic Midi Dress</h3>
        <p>A timeless midi dress in a flattering silhouette works for almost any wedding. Choose jewel tones like emerald, sapphire, or burgundy for elegance. Pair with nude heels and delicate jewelry.</p>
        <p><strong>Perfect for:</strong> Garden parties, afternoon ceremonies, semi-formal weddings</p>

        <h3>2. The Sophisticated Jumpsuit</h3>
        <p>Modern and chic, a well-tailored jumpsuit makes a statement while remaining appropriate. Look for styles with interesting details like wide legs or a cinched waist.</p>
        <p><strong>Perfect for:</strong> Contemporary venues, evening receptions, fashion-forward couples</p>

        <h3>3. The Floral Maxi</h3>
        <p>For spring and summer weddings, a floral maxi dress brings romance and femininity. Choose prints with a darker background to avoid looking too casual.</p>
        <p><strong>Perfect for:</strong> Outdoor ceremonies, beach weddings, brunch receptions</p>

        <h3>4. The Little Black Dress (Updated)</h3>
        <p>The LBD gets a wedding-appropriate update with interesting textures, sleeves, or subtle embellishments. It's foolproof and always elegant.</p>
        <p><strong>Perfect for:</strong> Evening weddings, cocktail receptions, when in doubt</p>

        <h3>5. The Wrap Dress</h3>
        <p>Universally flattering and comfortable, wrap dresses work for various body types. Choose rich colors or subtle prints for wedding appropriateness.</p>
        <p><strong>Perfect for:</strong> Destination weddings, casual ceremonies, plus-size guests</p>

        <h3>6. The Statement Sleeve Dress</h3>
        <p>Add drama with interesting sleeves—bell sleeves, bishop sleeves, or off-shoulder styles. Keep the rest of the outfit simple to let the sleeves shine.</p>
        <p><strong>Perfect for:</strong> Fall weddings, indoor venues, Instagram-worthy moments</p>

        <h3>7. The Two-Piece Set</h3>
        <p>Coordinated separates offer versatility and modern style. Mix and match the pieces later for multiple outfit options.</p>
        <p><strong>Perfect for:</strong> Fashion-forward weddings, younger crowds, creative venues</p>

        <h3>8. The Lace Dress</h3>
        <p>Romantic and feminine, lace dresses bring elegance to any wedding. Choose styles with lining to ensure appropriate coverage.</p>
        <p><strong>Perfect for:</strong> Church weddings, traditional ceremonies, romantic venues</p>

        <h3>9. The Blazer Dress</h3>
        <p>Sharp and sophisticated, a blazer dress works especially well for daytime weddings. Add feminine accessories to soften the look.</p>
        <p><strong>Perfect for:</strong> City weddings, professional couples, modern venues</p>

        <h3>10. The Embellished Dress</h3>
        <p>For evening weddings, choose a dress with subtle embellishments like beading or sequins. Keep accessories minimal to avoid overwhelming the look.</p>
        <p><strong>Perfect for:</strong> Black-tie weddings, evening receptions, glamorous venues</p>

        <h2>Wedding Guest Style Rules</h2>

        <h3>Colors to Avoid:</h3>
        <ul>
          <li><strong>White, ivory, or cream:</strong> Reserved for the bride</li>
          <li><strong>Black (sometimes):</strong> Check with the couple or family about their preferences</li>
          <li><strong>Red:</strong> Can be too attention-grabbing in some cultures</li>
          <li><strong>Neon or overly bright colors:</strong> Can be distracting in photos</li>
        </ul>

        <h3>Dress Code Decoder:</h3>
        <ul>
          <li><strong>Black Tie:</strong> Floor-length gowns or sophisticated cocktail dresses</li>
          <li><strong>Cocktail:</strong> Knee-length to midi dresses, dressy separates</li>
          <li><strong>Semi-Formal:</strong> Midi dresses, nice separates, dressy jumpsuits</li>
          <li><strong>Casual:</strong> Sundresses, nice separates, avoid jeans and sneakers</li>
        </ul>

        <h2>Accessorizing Your Wedding Guest Look</h2>

        <h3>Shoes:</h3>
        <p>Consider the venue when choosing shoes. Stilettos sink into grass, so opt for block heels or wedges for outdoor weddings. Always bring backup flats!</p>

        <h3>Jewelry:</h3>
        <p>Keep it elegant but not overwhelming. If your dress has embellishments, choose simple jewelry. For plain dresses, you can add more statement pieces.</p>

        <h3>Bags:</h3>
        <p>A small clutch or crossbody bag works best. You'll likely be standing, dancing, and moving around, so avoid large bags.</p>

        <h2>The Rental Advantage</h2>
        <p>Renting your wedding guest outfit offers several advantages:</p>

        <ul>
          <li><strong>Cost-effective:</strong> Wear designer pieces at a fraction of the cost</li>
          <li><strong>Variety:</strong> Different outfit for every wedding without closet overflow</li>
          <li><strong>Quality:</strong> Access to high-end pieces you might not otherwise afford</li>
          <li><strong>Stress-free:</strong> Professional cleaning included</li>
          <li><strong>Sustainable:</strong> Reduce fashion waste</li>
        </ul>

        <h2>Planning Your Wedding Guest Wardrobe</h2>

        <p>When you have multiple weddings to attend:</p>

        <ol>
          <li><strong>Plan ahead:</strong> Book rentals early, especially during peak wedding season</li>
          <li><strong>Consider the photos:</strong> You'll likely be in wedding photos, so choose something you'll love seeing years later</li>
          <li><strong>Think about comfort:</strong> You'll be wearing this outfit for hours</li>
          <li><strong>Have a backup plan:</strong> Weather and last-minute changes happen</li>
        </ol>

        <p>Remember, the goal is to celebrate the couple while feeling confident and comfortable. With these outfit ideas and the convenience of rental fashion, you'll be perfectly dressed for every wedding on your calendar.</p>

        <p>Happy wedding season, and here's to looking fabulous while celebrating love!</p>
      `,
      author: "Emily Chen",
      authorAvatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      featuredImage: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tags: ["wedding", "guest outfit", "formal wear", "style tips"],
      createdAt: "2024-01-12T14:20:00Z",
      readTime: 12,
      featured: false
    },
    {
      id: "3",
      slug: "office-wear-rental-revolution",
      title: "How Rental is Revolutionizing Office Wear",
      excerpt: "Professional attire just got more affordable and sustainable with the rise of office wear rentals.",
      content: `
        <p>The modern workplace is evolving, and so is professional fashion. With remote work and hybrid schedules becoming the norm, our approach to office wear is changing dramatically. Enter the office wear rental revolution—a game-changing solution for the modern professional.</p>

        <h2>The Changing Landscape of Work Fashion</h2>
        <p>Gone are the days when professionals needed five different suits for each workday. Today's work environment is more flexible, but when we do need to dress up—for important meetings, presentations, or networking events—we want to look our absolute best.</p>

        <p>This shift has created a unique opportunity: instead of investing in expensive professional wear that might only be worn occasionally, we can now rent high-quality pieces for specific occasions.</p>

        <h2>Why Office Wear Rental Makes Sense</h2>

        <h3>Financial Benefits</h3>
        <p>Professional clothing can be expensive. A quality blazer can cost $200-500, and a complete professional wardrobe can easily run into thousands of dollars. For many professionals, especially those just starting their careers, this represents a significant financial burden.</p>

        <p>Rental changes this equation entirely:</p>
        <ul>
          <li>Rent a $400 blazer for $40-60</li>
          <li>Access designer professional wear at fraction of retail cost</li>
          <li>No need for large upfront investments</li>
          <li>Budget predictability for professional wardrobe needs</li>
        </ul>

        <h3>Flexibility and Variety</h3>
        <p>Professional rental allows you to:</p>
        <ul>
          <li>Adapt your style to different professional situations</li>
          <li>Try new brands and styles without commitment</li>
          <li>Always have something fresh for important meetings</li>
          <li>Adjust your wardrobe as your career evolves</li>
        </ul>

        <h2>What to Rent vs. What to Buy</h2>

        <h3>Perfect for Rental:</h3>
        <ul>
          <li><strong>Statement blazers:</strong> High-impact pieces for important meetings</li>
          <li><strong>Designer dresses:</strong> For conferences, networking events, or presentations</li>
          <li><strong>Seasonal pieces:</strong> Heavy coats, summer suits</li>
          <li><strong>Trendy professional wear:</strong> Stay current without the investment</li>
          <li><strong>Special occasion work wear:</strong> Award ceremonies, company parties</li>
          <li><strong>Interview outfits:</strong> Make a great first impression</li>
        </ul>

        <h3>Better to Buy:</h3>
        <ul>
          <li><strong>Basic blouses and shirts:</strong> Everyday essentials</li>
          <li><strong>Well-fitting trousers:</strong> Wardrobe staples</li>
          <li><strong>Comfortable shoes:</strong> Daily wear items</li>
          <li><strong>Undergarments:</strong> Personal items</li>
          <li><strong>Basic cardigans:</strong> Layering pieces</li>
        </ul>

        <h2>Building a Rental-First Professional Wardrobe</h2>

        <h3>The Foundation Strategy</h3>
        <p>Start with a small collection of high-quality basics that you own:</p>
        <ul>
          <li>2-3 well-fitting blouses in neutral colors</li>
          <li>1-2 pairs of quality trousers</li>
          <li>A classic pencil skirt</li>
          <li>Comfortable, professional shoes</li>
          <li>A basic cardigan or light sweater</li>
        </ul>

        <p>Then, use rental to add:</p>
        <ul>
          <li>Statement blazers for important meetings</li>
          <li>Dresses for special events</li>
          <li>Seasonal outerwear</li>
          <li>Trendy pieces to keep your look current</li>
          <li>Interview outfits to make a great first impression</li>
        </ul>

        <h3>Planning Your Rental Calendar</h3>
        <p>Successful office wear rental requires planning:</p>

        <ol>
          <li><strong>Identify key events:</strong> Mark important meetings, presentations, and networking events on your calendar</li>
          <li><strong>Book in advance:</strong> Popular pieces get reserved quickly</li>
          <li><strong>Consider your schedule:</strong> Ensure rental periods align with your needs</li>
          <li><strong>Plan for backup:</strong> Have alternatives in case of sizing issues</li>
        </ol>

        <h2>Professional Rental Success Stories</h2>

        <h3>The Job Seeker</h3>
        <p>"I was interviewing for senior positions and needed to look the part, but I couldn't afford a new wardrobe. Rental allowed me to wear different high-end outfits to each interview, giving me confidence and helping me land my dream job." - Maria, Marketing Director</p>

        <h3>The Startup Founder</h3>
        <p>"As a startup founder, I needed to look professional for investor meetings but couldn't justify spending thousands on clothes I'd rarely wear. Rental gave me access to designer pieces that helped me make the right impression." - David, Tech Entrepreneur</p>

        <h3>The Consultant</h3>
        <p>"I travel to different clients and need to adapt my style to different corporate cultures. Rental allows me to have the right outfit for each environment without packing a huge suitcase." - Jennifer, Management Consultant</p>

        <h2>The Sustainability Factor</h2>
        <p>Office wear rental isn't just good for your wallet—it's good for the planet:</p>

        <ul>
          <li><strong>Reduced waste:</strong> One blazer serves multiple professionals instead of sitting unused in closets</li>
          <li><strong>Lower carbon footprint:</strong> Fewer new garments need to be produced</li>
          <li><strong>Circular economy:</strong> Extends the life cycle of professional wear</li>
          <li><strong>Conscious consumption:</strong> Encourages thoughtful approach to professional fashion</li>
        </ul>

        <h2>Tips for Office Wear Rental Success</h2>

        <h3>Sizing and Fit</h3>
        <ul>
          <li>Know your measurements across different brands</li>
          <li>Read size guides carefully</li>
          <li>Check return policies for sizing issues</li>
          <li>Consider professional alterations for important events</li>
        </ul>

        <h3>Styling Tips</h3>
        <ul>
          <li>Mix rental pieces with owned basics</li>
          <li>Invest in quality accessories that work with multiple outfits</li>
          <li>Choose versatile colors that coordinate with your existing wardrobe</li>
          <li>Consider the dress code of your specific workplace</li>
        </ul>

        <h3>Care and Maintenance</h3>
        <ul>
          <li>Follow care instructions carefully</li>
          <li>Protect items during wear (use garment bags, avoid spills)</li>
          <li>Report any issues immediately</li>
          <li>Return items promptly and in good condition</li>
        </ul>

        <h2>The Future of Professional Fashion</h2>
        <p>As work continues to evolve, so will our approach to professional fashion. The rental model offers a sustainable, flexible, and cost-effective solution that aligns with modern work patterns.</p>

        <p>We're moving toward a future where access matters more than ownership, where professionals can always look their best without the financial burden or environmental impact of traditional fashion consumption.</p>

        <h2>Getting Started</h2>
        <p>Ready to revolutionize your professional wardrobe? Here's how to begin:</p>

        <ol>
          <li><strong>Assess your needs:</strong> Identify upcoming professional events and wardrobe gaps</li>
          <li><strong>Start small:</strong> Try renting for one important event</li>
          <li><strong>Build relationships:</strong> Find rental platforms that work for your style and budget</li>
          <li><strong>Plan ahead:</strong> Integrate rental into your professional planning process</li>
          <li><strong>Share the knowledge:</strong> Help colleagues discover the benefits of professional rental</li>
        </ol>

        <p>The office wear rental revolution is here, and it's transforming how professionals approach their wardrobes. Join the movement and discover how rental can elevate your professional image while supporting your budget and values.</p>

        <p>Your career deserves the best—and now you can afford to look the part, one rental at a time.</p>
      `,
      author: "Michael Rodriguez",
      authorAvatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      featuredImage: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tags: ["office wear", "professional", "workwear", "rental"],
      createdAt: "2024-01-10T09:15:00Z",
      readTime: 10,
      featured: true
    }
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        // Try to fetch from data file first
        const response = await fetch('/data/blogs.json');
        let blogs = mockBlogs; // fallback to mock data
        
        if (response.ok) {
          const data = await response.json();
          blogs = data;
        }
        
        const foundBlog = blogs.find(blog => blog.slug === slug);
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.warn('Using mock blog data:', error);
        const foundBlog = mockBlogs.find(blog => blog.slug === slug);
        
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Blog post not found</p>
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center text-red-600 hover:text-red-800 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{blog.author}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{blog.author}</p>
                <p className="text-sm text-gray-600">Fashion & Sustainability Writer</p>
              </div>
            </div>
            
            <Link
              to="/blogs"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blogs
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};