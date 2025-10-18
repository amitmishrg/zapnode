'use client';

import { EntityContainer, EntityHeader } from '@/components/entity-components';
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import { toast } from 'sonner';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {workflows.data.map((workflow) => (
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

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
