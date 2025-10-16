'use client';

import { requireAuth } from '@/lib/auth-utils';
import { useTRPC } from '@/trpc/client';
import { caller } from '@/trpc/server';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Page = () => {
  const trpc = useTRPC();
  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const createWorkflow = useMutation({
    ...trpc.createWorkflow.mutationOptions(),
    onSuccess: () => {
      toast.success('Workflow created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <h1>Home</h1>
      <div>{JSON.stringify(workflows, null, 2)}</div>

      <Button
        disabled={createWorkflow.isPending}
        onClick={() => createWorkflow.mutate({ name: 'Workflow 3' })}
      >
        Create Workflow
      </Button>
    </div>
  );
};

export default Page;
