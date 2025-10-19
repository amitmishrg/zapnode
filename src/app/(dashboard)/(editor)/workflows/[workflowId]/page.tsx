import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { prefetchWorkflow } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';
import {
  Editor,
  EditorErrorView,
  EditorLoadingView,
} from '@/features/editor/components/editor';
import { EditorHeader } from '@/features/editor/components/editor-header';

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { workflowId } = await params;

  prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorErrorView />}>
        <Suspense fallback={<EditorLoadingView />}>
          <EditorHeader workflowId={workflowId} />

          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;
