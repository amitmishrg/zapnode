'use client';

import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from '@/components/entity-components';
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';
import { useWorkflowsParams } from '../hooks/use-workflows-params';
import { useEntitySearch } from '@/hooks/use-entity-search';

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

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data.items.map((workflow) => (
          <div key={workflow.id}>{workflow.name}</div>
        ))}
      </div>
    </div>
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
