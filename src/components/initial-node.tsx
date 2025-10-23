'use client';

import { memo, useState } from 'react';
import { NodeProps } from '@xyflow/react';
import { PlusIcon } from 'lucide-react';

import { PlaceholderNode } from '@/components/react-flow/placeholder-node';
import { WorkflowNode } from './workflow-node';
import { NodeSelector } from './node-selector';

export const InitialNode = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <WorkflowNode showToolbar={false}>
      <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
        <PlaceholderNode {...props}>
          <div className="cursor-pointer flex items-center justify-center">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </NodeSelector>
    </WorkflowNode>
  );
});
