import { memo } from 'react';
import { MousePointerIcon } from 'lucide-react';
import { NodeProps } from '@xyflow/react';

import { BaseTriggerNode } from '../../base-trigger-node';

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        // status={nodeStatus}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    </>
  );
});
