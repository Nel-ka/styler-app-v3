import { Link } from 'react-router-dom';
import { Blog } from '../../../types';
import { formatDate } from '../../../utils/date';

interface BlogPreviewProps {
  blog: Blog;
}

export default function BlogPreview({ blog }: BlogPreviewProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/style-guide/${blog.id}`}>
        <div className="relative pb-[60%]">
          <img
            src={blog.image}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <time className="text-sm text-gray-500 mb-2 block">
            {formatDate(blog.published_at)}
          </time>
          <h3 className="text-xl font-semibold mb-2 hover:text-gray-600">
            {blog.title}
          </h3>
          <p className="text-gray-600 line-clamp-3">{blog.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}