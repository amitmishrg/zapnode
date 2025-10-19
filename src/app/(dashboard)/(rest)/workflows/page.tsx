import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  WorkflowContainer,
  WorkflowsErrorView,
  WorkflowsList,
  WorkflowsLoadingView,
} from '@/features/workflows/components/workflows';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';
import type { SearchParams } from 'nuqs';
import { workflowsParamsLoader } from '@/features/workflows/server/params-loader';

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsErrorView />}>
          <Suspense fallback={<WorkflowsLoadingView />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default Page;
