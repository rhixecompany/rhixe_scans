"use client"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useToast } from "@/hooks/use-toast"

import { userDefaultValues } from "@/lib/constants"
import { insertUserSchema } from "@/lib/validators"

import { createUser } from "@/lib/actions/user.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const UserCreateForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: userDefaultValues
  })
  const onSubmit: SubmitHandler<z.infer<typeof insertUserSchema>> = async (
    values
  ) => {
    const res = await createUser(values)

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message
      })
    } else {
      toast({
        description: res.message
      })
      router.push("/admin/users")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertUserSchema>,
                "email"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertUserSchema>,
                "username"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter username" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertUserSchema>,
                "image"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Enter user image"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* First_name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertUserSchema>,
                "first_name"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>First_name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first_name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last_name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertUserSchema>,
                "last_name"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Last_name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter last_name" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* Full_name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertUserSchema>,
                "full_name"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Full_name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user full_name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting" : `Create User`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UserCreateForm
