'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/srcc/components/ui/carousel';
import { Comic } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

const ComicCarousel = ({ data }: { data: Comic[] }) => {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((comic: Comic) => (
          <CarouselItem key={comic.id}>
            <Link href={`/comic/${comic.slug}`}>
              <div className='relative mx-auto'>
                <Image
                  src={comic.images[0].image!}
                  alt={comic.title}
                  height='0'
                  width='0'
                  sizes='100vw'
                  className='w-full h-auto'
                />
                <div className='absolute inset-0 flex items-end justify-center'>
                  <h2 className='bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white'>
                    {comic.title}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ComicCarousel;
