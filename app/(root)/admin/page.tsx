import LoadingPage from '@/app/loading';

import AdminContainer from '@/components/shared/header/AdminContainer';

import { Suspense } from 'react';
export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense key={query + currentPage} fallback={<LoadingPage />}>
        <AdminContainer query={query} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
