import Link from 'next/link';

import data from '@/data/comic';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import EmblaCarousel from './EmblaCarousel';
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

const IndexCarousel = () => {
  return (
    <div className="overflow-hidden">
      <div className="loop owl-carousel full owl-loaded">
        <EmblaCarousel comics={data.slice(0, 10)} options={OPTIONS} />
      </div>

      <div className="overflow-hidden hidden min-[882px]:hidden min-[883px]:block">
        <div className="relative cursor-pointer h-[280px] ml-2.5">
          <Link href={`/series/${data[1].slug}`}>
            <Image
              alt="Trending Crown"
              fetchPriority="high"
              loading="eager"
              width={40}
              height={40}
              decoding="async"
              data-nimg="1"
              src="/crown.webp"
              style={{
                color: 'transparent',
                top: '10px',
                right: '5px',
                position: 'absolute',
                backgroundSize: '100px',
                zIndex: '1',
              }}
            />
            <div className="absolute w-full h-full top-0 left-0 z-1 text-white myblack">
              <div className="mt-[40%] leading-[19px] text-left uppercase px-[5%] py-0">
                <span className="block text-[16px]">
                  Rhixe Scans <b>Trending</b> This Week
                </span>
                <span className="block text-[17px] mt-[5px] h-[55px] overflow-hidden">
                  <b>{data[1].title}</b>
                </span>
              </div>
            </div>
            <div className="h-full w-full overflow-hidden bg-[auto 100%] bg-[top center] bg-black opacity-20">
              <div
                className="h-full w-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${data[1].images[0].image})`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexCarousel;
