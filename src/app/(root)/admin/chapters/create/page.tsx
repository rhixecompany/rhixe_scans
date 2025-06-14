import ChapterCreateForm from "@/components/chapters/ChapterCreateForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Chapter"
}

const CreateChapterPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Chapter</h2>
      <div className="my-8">
        <ChapterCreateForm />
      </div>
    </>
  )
}

export default CreateChapterPage
