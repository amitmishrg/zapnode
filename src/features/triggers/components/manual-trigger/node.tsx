import { memo } from 'react';
import { MousePointerIcon } from 'lucide-react';
import { NodeProps } from '@xyflow/react';
import { useState } from 'react';

import { BaseTriggerNode } from '../../base-trigger-node';
import { ManualTriggerDialog } from './dialog';

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const status = 'initial';

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        status={status}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />

      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
});
