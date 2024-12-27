import { formatDate } from '../../../utils/date';

interface AuthorInfoProps {
  author: {
    name: string;
    avatar: string;
  };
  date: string;
}

export default function AuthorInfo({ author, date }: AuthorInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-medium">{author.name}</p>
        <time className="text-sm text-gray-500">
          {formatDate(date)}
        </time>
      </div>
    </div>
  );
}