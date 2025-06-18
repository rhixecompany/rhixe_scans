import IndexAccordian from '@/srcc/components/shared/index/IndexAccordian';
import IndexCarousel from '@/srcc/components/shared/index/IndexCarousel';
import IndexGrid from '@/srcc/components/shared/index/IndexGrid';
import IndexHero from '@/srcc/components/shared/index/IndexHero';

export default function Home() {
  return (
    <>
      <div className='w-[100%] float-left min-[882px]:w-[70%] max-[600px]:w-[100%]'>
        <div className='flex justify-center h-full min-h-72'>
          <div className='w-[100%] min-[768px]:w-[100%] min-[880px]:w-[95%] min-[912px]:w-[96%] lg:w-[100%]'>
            <IndexCarousel />
            <IndexHero />
            <IndexGrid />
          </div>
        </div>
      </div>
      <div className='w-[100%] min-[882px]:w-[30%] max-[600px]:w-[100%] float-right'>
        <div className='lg:ml-[15px] min-[855px]:mr-3 lg:mr-0 bg-[#222] rounded-[3px] mb-[18px]'>
          <div className='relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]'>
            <h3 className='text-[15px] text-white font-semibold leading-5 m-0'>
              Popular
            </h3>
          </div>
          <IndexAccordian />
        </div>
      </div>
    </>
  );
}
