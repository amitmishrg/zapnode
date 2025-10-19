'use client';

import { ErrorView, LoadingView } from '@/components/entity-components';
import { useSuspenseWorkflow } from '@/features/workflows/hooks/use-workflows';

export const EditorLoadingView = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorErrorView = () => {
  return <ErrorView message="Error loading editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  if (!workflow) return null;

  return (
    <div>
      <div>Workflow id: {workflow.id}</div>
      <div>Workflow name: {workflow.name}</div>
      <div>Workflow created at: {workflow.createdAt.toISOString()}</div>
      <div>Workflow updated at: {workflow.updatedAt.toISOString()}</div>
    </div>
  );
};
