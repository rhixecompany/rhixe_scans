import ChapterEditForm from "@/components/chapters/ChapterEditForm"
import BackButton from "@/components/dashboard/BackButton"
import { getChapterBySlug } from "@/lib/actions/chapter.actions"

import { Suspense } from "react"

import LoadingPage from "@/app/loading"

interface ChapterEditPageProps {
  params: Promise<{
    slug: string
  }>
}

const ChapterEditPage = async ({ params }: ChapterEditPageProps) => {
  const pam = await params

  const item = await getChapterBySlug(pam.slug)

  return (
    <>
      <BackButton text="Back To Chapters" link="/admin/chapters" />
      <h3 className="text-2xl mb-4">Edit Chapter </h3>

      <Suspense key={pam.slug} fallback={<LoadingPage />}>
        <ChapterEditForm chapter={item} chapterId={item.id} />
      </Suspense>
    </>
  )
}

export default ChapterEditPage
