import { Card, CardContent, CardHeader } from '@/srcc/components/ui/card';
import { Comic } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Rating from './rating';

const ComicCard = ({ comic }: { comic: Comic }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/comic/${comic.slug}`}>
          <Image
            src={comic.images[0].image!}
            alt={comic.title}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
        <div className='text-xs'>{comic.category.name}</div>
        <Link href={`/comic/${comic.slug}`}>
          <h2 className='text-sm font-medium'>{comic.title}</h2>
        </Link>
        <div className='flex-between gap-4'>
          <Rating value={Number(comic.rating)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ComicCard;
