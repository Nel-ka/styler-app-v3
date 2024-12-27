import { Blog } from '../../../types';
import BlogPreview from './BlogPreview';

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map(blog => (
        <BlogPreview key={blog.id} blog={blog} />
      ))}
    </div>
  );
}