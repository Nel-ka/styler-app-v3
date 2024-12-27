import { useParams } from 'react-router-dom';
import BlogContent from './components/BlogContent';
import { useBlog } from './hooks/useBlog';

export default function BlogPost() {
  const { id } = useParams();
  const { blog, loading, error } = useBlog(id);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  if (!blog) return <div className="container mx-auto px-4 py-8">Blog post not found</div>;

  return <BlogContent blog={blog} />;
}