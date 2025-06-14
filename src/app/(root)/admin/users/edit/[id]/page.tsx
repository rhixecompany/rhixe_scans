import BackButton from "@/components/dashboard/BackButton"
import UserEditForm from "@/components/users/UserEditForm"
import { getUserById } from "@/lib/actions/user.actions"

import { Suspense } from "react"

import LoadingPage from "@/app/loading"

interface UserEditPageProps {
  params: Promise<{
    id: string
  }>
}

const UserEditPage = async ({ params }: UserEditPageProps) => {
  const pam = await params

  const item = await getUserById(pam.id)

  return (
    <>
      <BackButton text="Back To Users" link="/admin/users" />
      <h3 className="text-2xl mb-4">Edit User </h3>

      <Suspense key={pam.id} fallback={<LoadingPage />}>
        <UserEditForm user={item} userId={item.id} />
      </Suspense>
    </>
  )
}

export default UserEditPage
