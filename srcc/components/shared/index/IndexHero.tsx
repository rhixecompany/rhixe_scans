import LoadingPage from '@/srcc/app/loading';

import data from '@/data/comic';
import { Comic } from '@/types/comic';
import { Suspense } from 'react';
import IndexHeroItem from './IndexHeroItem';
const IndexHero = () => {
  return (
    <div className='text-white pt-2'>
      <div className='relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]'>
        <h3 className='text-[15px] text-white font-semibold leading-5 m-0'>
          Popular Today
        </h3>
      </div>
      <div className='flex flex-wrap bg-[#222222] p-[10px] md:hidden'>
        {data.slice(0, 4).map((comic: Comic) => (
          <Suspense key={comic.slug} fallback={<LoadingPage />}>
            <div className='w-1/2 xs:w-1/2 sm:w-1/4 p-1.5 hover:cursor-pointer group hover:text-themecolor'>
              <IndexHeroItem comic={comic} />
            </div>
          </Suspense>
        ))}
      </div>
      <div className='flex-wrap hidden md:flex bg-[#222222] p-[10px]'>
        {data.slice(0, 5).map((comic: Comic) => (
          <Suspense key={comic.slug} fallback={<LoadingPage />}>
            <div className='w-1/2 xs:w-1/3 sm:w-1/5 p-1.5 hover:cursor-pointer group hover:text-themecolor'>
              <IndexHeroItem comic={comic} />
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default IndexHero;
