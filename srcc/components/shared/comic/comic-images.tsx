'use client';
import { cn } from '@/srcc/lib/utils';
import { ComicImage } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

const ComicImages = ({ images }: { images: ComicImage[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='space-y-4'>
      <Image
        src={images[current].image!}
        alt='comic image'
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center'
      />
      <div className='flex'>
        {images.map((img, index) => (
          <div
            key={img.image}
            onClick={() => setCurrent(index)}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-500'
            )}
          >
            <Image src={img.image!} alt='image' width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicImages;
