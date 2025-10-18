import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  WorkflowContainer,
  WorkflowsList,
} from '@/features/workflows/components/workflows';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';

const Page = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Error loading workflows</div>}>
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default Page;
