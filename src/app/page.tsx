import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';

const Page = async () => {
  await requireAuth();

  const users = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <h1>Home</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default Page;
