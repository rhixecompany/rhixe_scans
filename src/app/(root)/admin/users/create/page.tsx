import UserCreateForm from "@/components/users/UserCreateForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create User"
}

const CreateUserPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create User</h2>
      <div className="my-8">
        <UserCreateForm />
      </div>
    </>
  )
}

export default CreateUserPage
