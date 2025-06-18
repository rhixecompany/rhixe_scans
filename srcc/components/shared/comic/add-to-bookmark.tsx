'use client';
import { Button } from '@/srcc/components/ui/button';
import { ToastAction } from '@/srcc/components/ui/toast';
import { useToast } from '@/srcc/hooks/use-toast';
import {
  addItemToBookmark,
  removeItemFromBookmark,
} from '@/srcc/lib/actions/bookmark.actions';
import { Bookmark, BookmarkItem } from '@/types';
import { Loader, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const AddToBookmark = ({
  bookmark,
  item,
}: {
  bookmark?: Bookmark;
  item: BookmarkItem;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleAddToBookmark = async () => {
    startTransition(async () => {
      const res = await addItemToBookmark(item);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      // Handle success add to bookmark
      toast({
        description: res.message,
        action: (
          <ToastAction
            className='bg-primary text-white hover:bg-gray-800'
            altText='Go To Bookmark'
            onClick={() => router.push('/bookmark')}
          >
            Go To Bookmark
          </ToastAction>
        ),
      });
    });
  };

  // Handle remove from bookmark
  const handleRemoveFromBookmark = async () => {
    startTransition(async () => {
      const res = await removeItemFromBookmark(item.id);

      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      });

      return;
    });
  };

  // Check if item is in bookmark
  const existItem = bookmark && bookmark.items.find((x) => x.id === item.id);

  return existItem ? (
    <div>
      <Button
        type='button'
        variant='outline'
        onClick={handleRemoveFromBookmark}
      >
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToBookmark}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToBookmark}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}{' '}
      Add To Bookmark
    </Button>
  );
};

export default AddToBookmark;
