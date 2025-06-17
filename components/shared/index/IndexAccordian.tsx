import LoadingPage from '@/app/loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import data from '@/data/comic';
import { Comic } from '@/types/comic';
import { Suspense } from 'react';
import IndexAccordianItem from './IndexAccordianItem';
const IndexAccordian = () => {
  return (
    <Tabs defaultValue="weekly" className="bg-[#222222]">
      <div>
        <div className="px-2.5 pt-[11px]">
          <TabsList className="items-center p-1 text-muted-foreground grid w-[100%] px-1.5 grid-cols-3 h-8 rounded-[2px] justify-center bg-[#333] outline-none">
            <TabsTrigger
              value="weekly"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:hover:text-white hover:text-themecolor text-white text-[12px] data-[state=active]:bg-themecolor data-[state=active]:text-white h-[22px] px-8 font-normal"
            >
              All
            </TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent
            value="weekly"
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ animationDuration: '0s' }}
          >
            {data.slice(0, 10).map((comic: Comic, index: number) => (
              <Suspense key={comic.slug} fallback={<LoadingPage />}>
                <IndexAccordianItem comic={comic} count={index} />
              </Suspense>
            ))}
          </TabsContent>
        </div>
        <div>
          <TabsContent
            value="monthly"
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ animationDuration: '0s' }}
          >
            {data.slice(10, 20).map((comic: Comic, index: number) => (
              <Suspense key={comic.slug} fallback={<LoadingPage />}>
                <IndexAccordianItem comic={comic} count={index} />
              </Suspense>
            ))}
          </TabsContent>
        </div>
        <div>
          <TabsContent
            value="all"
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ animationDuration: '0s' }}
          >
            {data.slice(20, 30).map((comic: Comic, index: number) => (
              <Suspense key={comic.slug} fallback={<LoadingPage />}>
                <IndexAccordianItem comic={comic} count={index} />
              </Suspense>
            ))}
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default IndexAccordian;
