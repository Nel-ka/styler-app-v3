import { Blog } from '../../../types';
import { formatDate } from '../../../utils/date';
import AuthorInfo from './AuthorInfo';

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center justify-between text-gray-600">
          <AuthorInfo author={blog.author} date={blog.published_at} />
        </div>
      </header>

      <div className="mb-8">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        {blog.content}
      </div>
    </article>
  );
}