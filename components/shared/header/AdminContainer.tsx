import ComicsTable from '@/components/admin/comics/ComicsTable';
import comicdata from '@/data/comic';
import { Folder, MessageCircle, Newspaper, User } from 'lucide-react';
import AnalyticsChart from './AnalyticsChart';
import AdminCard from './AdminCard';

import chapterdata from '@/data/chapter';
import userdata from '@/data/user';
import { Comic } from '@/types/comic';

import { Chapter } from '@/types/chapter';
import { User as MyUser } from '@/types/user';
const AdminContainer = ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  console.log({
    query: query,
    currentPage: currentPage,
  });
  const comics: Comic[] = comicdata;
  const chapters: Chapter[] = chapterdata;
  const users: MyUser[] = userdata;
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <AdminCard
          title="Comics"
          count={comics.length}
          icon={<Newspaper className="text-neutral-500" size={72} />}
        />
        <AdminCard
          title="Chapters"
          count={chapters.length}
          icon={<Folder className="text-neutral-500" size={72} />}
        />
        <AdminCard
          title="Users"
          count={users.length}
          icon={<User className="text-neutral-500" size={72} />}
        />
        <AdminCard
          title="Comments"
          count={1200}
          icon={<MessageCircle className="text-neutral-500" size={72} />}
        />
      </div>
      <AnalyticsChart />
      <ComicsTable title="Latest Comics" limit={10} items={comics} />
    </>
  );
};

export default AdminContainer;
