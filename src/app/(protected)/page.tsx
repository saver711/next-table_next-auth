import { SignOutButton } from '@/components/soli/ui/signout-button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex gap-14'>
      Home <SignOutButton />
      <Link href='users2'>Users 2 Page</Link>
    </div>
  );
}
