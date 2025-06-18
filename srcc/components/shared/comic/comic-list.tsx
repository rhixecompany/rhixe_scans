import { Comic } from '@/types';
import ComicCard from './comic-card';

const ComicList = ({
  data,
  title,
  limit,
}: {
  data: Comic[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((comic: Comic) => (
            <ComicCard key={comic.slug} comic={comic} />
          ))}
        </div>
      ) : (
        <div>
          <p>No comics found</p>
        </div>
      )}
    </div>
  );
};

export default ComicList;
