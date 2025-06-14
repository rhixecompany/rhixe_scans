import ComicEditForm from "@/components/comics/ComicEditForm"
import BackButton from "@/components/dashboard/BackButton"
import { getComicBySlug } from "@/lib/actions/comic.actions"

import { Suspense } from "react"

import LoadingPage from "@/app/loading"

interface ComicEditPageProps {
  params: Promise<{
    slug: string
  }>
}

const ComicEditPage = async ({ params }: ComicEditPageProps) => {
  const pam = await params

  const item = await getComicBySlug(pam.slug)

  return (
    <>
      <BackButton text="Back To Comics" link="/admin/comics" />
      <h3 className="text-2xl mb-4">Edit Comic </h3>

      <Suspense key={pam.slug} fallback={<LoadingPage />}>
        <ComicEditForm comic={item} comicId={item.id} />
      </Suspense>
    </>
  )
}

export default ComicEditPage
