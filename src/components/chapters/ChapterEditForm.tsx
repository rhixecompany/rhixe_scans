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

import { updateChapter } from "@/lib/actions/chapter.actions"
import { chapterDefaultValues } from "@/lib/constants"
import { updateChapterSchema } from "@/lib/validators"
import { Chapter } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const ChapterEditForm = ({
  chapter,
  chapterId
}: {
  chapter?: Chapter
  chapterId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof updateChapterSchema>>({
    resolver: zodResolver(updateChapterSchema),
    defaultValues: chapter ? chapter : chapterDefaultValues
  })
  const onSubmit: SubmitHandler<z.infer<typeof updateChapterSchema>> = async (
    values
  ) => {
    if (!chapterId) {
      router.push("/admin/chapters")
      return
    }

    const res = await updateChapter({ ...values, id: chapterId })

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message
      })
    } else {
      toast({
        description: res.message
      })
      router.push("/admin/chapters")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "name"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "slug"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* title */}
          <FormField
            control={form.control}
            name="title"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "title"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Updated_at */}
          <FormField
            control={form.control}
            name="updated_at"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "updated_at"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Updated_at</FormLabel>
                <FormControl>
                  <Input placeholder="Enter updated_at" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Comic */}
          <FormField
            control={form.control}
            name="comic"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "comic"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Comic</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter comic" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Link */}
          <FormField
            control={form.control}
            name="link"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "link"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chapter link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Numimages */}
          <FormField
            control={form.control}
            name="numimages"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateChapterSchema>,
                "numimages"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Numimages</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter numimages" {...field} />
                  </div>
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
            {form.formState.isSubmitting ? "Submitting" : `Update Chapter`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ChapterEditForm
