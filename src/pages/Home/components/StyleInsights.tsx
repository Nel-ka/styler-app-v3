import { useBlogs } from '../../StyleGuide/hooks/useBlogs';
import BlogPreview from '../../StyleGuide/components/BlogPreview';

export default function StyleInsights() {
  const { blogs, loading, error } = useBlogs({ featured: true, limit: 3 });

  if (loading || error) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Style Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogPreview key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}