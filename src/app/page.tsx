import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';

const Page = async () => {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Button variant="secondary">Hello World</Button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default Page;
