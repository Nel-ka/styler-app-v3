import BlogGrid from './components/BlogGrid';
import { useBlogs } from './hooks/useBlogs';

export default function StyleGuide() {
  const { blogs, loading, error } = useBlogs();

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Style Guide</h1>
      <BlogGrid blogs={blogs} />
    </div>
  );
}