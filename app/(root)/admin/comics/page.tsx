import ComicsTable from '@/components/admin/comics/ComicsTable';

import Pagination from '@/components/admin/comics/pagination';
import comicdata from '@/data/comic';
import { Comic } from '@/types/comic';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function ComicsPage(props: {
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
  const comics: Comic[] = comicdata;
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          {query && (
            <div>
              Filtered by <i>&quot;{query}&quot;</i>{' '}
              <Link href="/admin/comics">
                <Button variant="outline" size="sm">
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/comics/create">Create Comic</Link>
        </Button>
      </div>

      <ComicsTable title="Comics" items={comics} />
      {comics.length > 20 && (
        <Pagination page={currentPage} totalPages={comics.length % 7} />
      )}
    </div>
  );
}
