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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

import { updateComic } from "@/lib/actions/comic.actions"
import { comicDefaultValues } from "@/lib/constants"
import { updateComicSchema } from "@/lib/validators"
import { Comic } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "../ui/textarea"

const ComicEditForm = ({
  comic,
  comicId
}: {
  comic?: Comic
  comicId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof updateComicSchema>>({
    resolver: zodResolver(updateComicSchema),
    defaultValues: comic ? comic : comicDefaultValues
  })
  const onSubmit: SubmitHandler<z.infer<typeof updateComicSchema>> = async (
    values
  ) => {
    if (!comicId) {
      router.push("/admin/comics")
      return
    }

    const res = await updateComic({ ...values, id: comicId })

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message
      })
    } else {
      toast({
        description: res.message
      })
      router.push("/admin/comics")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
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
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
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
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
                "description"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter comic description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
                "status"
              >
            }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Status
                </FormLabel>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value) => form.setValue("status", value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-neutral-100 dark:bg-neutral-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="dropped">Dropped</SelectItem>
                    <SelectItem value="hiatus">Hiatus</SelectItem>
                    <SelectItem value="season end">Season End</SelectItem>
                    <SelectItem value="coming soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>

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
                z.infer<typeof updateComicSchema>,
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
          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
                "rating"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter rating" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Numchapters */}
          <FormField
            control={form.control}
            name="numchapters"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
                "numchapters"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Numchapters</FormLabel>
                <FormControl>
                  <Input placeholder="Enter numchapters" {...field} />
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
                z.infer<typeof updateComicSchema>,
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
        <div className="flex flex-col md:flex-row gap-5">
          {/* Link */}
          <FormField
            control={form.control}
            name="link"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
                "link"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter comic link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Serialization */}
          <FormField
            control={form.control}
            name="serialization"
            render={({
              field
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateComicSchema>,
                "serialization"
              >
            }) => (
              <FormItem className="w-full">
                <FormLabel>Serialization</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter serialization" {...field} />
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
            {form.formState.isSubmitting ? "Submitting" : `Update Comic`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ComicEditForm
