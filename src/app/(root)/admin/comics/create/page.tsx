import ComicCreateForm from "@/components/comics/ComicCreateForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Comic"
}

const CreateComicPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Comic</h2>
      <div className="my-8">
        <ComicCreateForm />
      </div>
    </>
  )
}

export default CreateComicPage
