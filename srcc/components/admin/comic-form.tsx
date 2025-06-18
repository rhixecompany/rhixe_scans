'use client';

import { useToast } from '@/hooks/use-toast';
import { createComic, updateComic } from '@/lib/actions/comic.actions';
import { comicDefaultValues } from '@/lib/constants';
import { UploadButton } from '@/lib/uploadthing';
import { insertComicSchema, updateComicSchema } from '@/lib/validators';
import { Comic } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ComicForm = ({
  type,
  comic,
  comicId,
}: {
  type: 'Create' | 'Update';
  comic?: Comic;
  comicId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertComicSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateComicSchema)
        : zodResolver(insertComicSchema),
    defaultValues: comic && type === 'Update' ? comic : comicDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertComicSchema>> = async (
    values
  ) => {
    // On Create
    if (type === 'Create') {
      const res = await createComic(values);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push('/admin/comics');
      }
    }

    // On Update
    if (type === 'Update') {
      if (!comicId) {
        router.push('/admin/comics');
        return;
      }

      const res = await updateComic({ ...values, id: comicId });

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push('/admin/comics');
      }
    }
  };

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'title'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter comic name" {...field} />
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
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'slug'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                      onClick={() => {
                        form.setValue(
                          'slug',
                          slugify(form.getValues('title'), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'category'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'status'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="Enter status" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'price'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter comic price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'stock'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="Enter stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="space-y-2 mt-2 min-h-48">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="comic image"
                          className="w-20 h-20 object-cover object-center rounded-sm"
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: `ERROR! ${error.message}`,
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field">
          {/* isFeatured */}
          Featured Comic
          <Card>
            <CardContent className="space-y-2 mt-2">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="space-x-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt="banner image"
                  className="w-full object-cover object-center rounded-sm"
                  width={1920}
                  height={680}
                />
              )}

              {isFeatured && !banner && (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('banner', res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      description: `ERROR! ${error.message}`,
                    });
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertComicSchema>,
                'description'
              >;
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
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? 'Submitting' : `${type} Comic`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ComicForm;
