import ComicEditForm from '@/components/admin/comics/ComicEditForm';
import BackButton from '@/components/dashboard/BackButton';
import comicdata from '@/data/comic';
import { Suspense } from 'react';

import LoadingPage from '@/srcc/app/loading';

interface ComicEditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ComicEditPage = async ({ params }: ComicEditPageProps) => {
  const pam = await params;
  const comic = comicdata.find((comic) => comic.slug === pam.slug);

  return (
    <>
      <BackButton text='Back To Comics' link='/admin/comics' />

      <Suspense key={pam.slug} fallback={<LoadingPage />}>
        <ComicEditForm item={comic} />
      </Suspense>
    </>
  );
};

export default ComicEditPage;
