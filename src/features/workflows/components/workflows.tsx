'use client';

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from '@/components/entity-components';
import {
  useCreateWorkflow,
  useDeleteWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';
import { useWorkflowsParams } from '../hooks/use-workflows-params';
import { useEntitySearch } from '@/hooks/use-entity-search';
import type { Workflow } from '@/generated/prisma';
import { WorkflowIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { search, setSearch } = useEntitySearch({ params, setParams });

  return (
    <EntitySearch
      onChange={setSearch}
      placeholder="Search workflows"
      value={search}
    />
  );
};

export const WorkflowsList = () => {
  const { data } = useSuspenseWorkflows();

  if (data.items.length === 0) return <WorkflowsEmptyView />;

  return (
    <EntityList
      items={data.items}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      getKey={(workflow) => workflow.id}
      emptyView={<WorkflowsEmptyView />}
    />
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();

  const handleNewWorkflow = () => {
    createWorkflow.mutate(
      { name: 'New Workflow' },
      {
        onSuccess: (data) => {
          router.push(`/workflows/${data.id}`);
        },
        onError: (error) => {
          handleError(error);
        },
      }
    );
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleNewWorkflow}
        newButtonLabel="New Workflow"
        isCreating={createWorkflow.isPending}
        disabled={disabled}
      />
    </>
  );
};

export const WorkflowsPagination = () => {
  const [params, setParams] = useWorkflowsParams();

  const { data, isFetching } = useSuspenseWorkflows();
  const { page, totalPages } = data;

  return (
    <EntityPagination
      page={page}
      totalPages={totalPages}
      disabled={isFetching}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoadingView = () => {
  return <LoadingView entity="workflows" message="Loading workflows..." />;
};

export const WorkflowsErrorView = () => {
  return <ErrorView message="Error loading workflows" />;
};

export const WorkflowsEmptyView = () => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();

  const handleNewWorkflow = () => {
    createWorkflow.mutate(
      { name: 'New Workflow' },
      {
        onError: handleError,
        onSuccess: (data) => {
          router.push(`/workflows/${data.id}`);
        },
      }
    );
  };
  return (
    <>
      {modal}
      <EmptyView
        message="No workflows found. Create your first workflow to get started."
        onNew={handleNewWorkflow}
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const deleteWorkflow = useDeleteWorkflow();

  const handleDeleteWorkflow = () => {
    deleteWorkflow.mutate({ id: data.id });
  };

  return (
    <EntityItem
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{' '}
          &bull; Created{' '}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      href={`/workflows/${data.id}`}
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      isRemoving={deleteWorkflow.isPending}
      onRemove={handleDeleteWorkflow}
    />
  );
};
