import ChaptersTable from '@/components/admin/chapters/ChaptersTable';

import Pagination from '@/components/admin/chapters/pagination';
import chapterdata from '@/data/chapter';
import { Chapter } from '@/types/chapter';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function ChaptersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  console.log({
    query: query,
    currentPage: currentPage,
  });
  const chapters: Chapter[] = chapterdata;
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          {query && (
            <div>
              Filtered by <i>&quot;{query}&quot;</i>{' '}
              <Link href="/admin/chapters">
                <Button variant="outline" size="sm">
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/chapters/create">Create Chapter</Link>
        </Button>
      </div>

      <ChaptersTable title="Chapters" items={chapters} />
      {chapters.length > 20 && (
        <Pagination page={currentPage} totalPages={chapters.length % 7} />
      )}
    </div>
  );
}
