'use client';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button
      variant='outline'
      className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10 transition-colors duration-200'
      onClick={handleSignOut}
    >
      <LogOut className='h-5 w-5' />
      <span>LogOut</span>
    </Button>
  );
};

export { SignOut };
