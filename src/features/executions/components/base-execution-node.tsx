'use client';

import { memo, useCallback } from 'react';
import { type NodeProps, Position } from '@xyflow/react';
import { LucideIcon } from 'lucide-react';

import { BaseNode, BaseNodeContent } from '@/components/react-flow/base-node';
import { BaseHandle } from '@/components/react-flow/base-handle';
import { WorkflowNode } from '@/components/workflow-node';

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  //   status: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo((props: BaseExecutionNodeProps) => {
  const {
    id,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  } = props;

  const handleDelete = useCallback(() => {
    console.log('delete');
  }, []);

  return (
    <WorkflowNode
      name={name}
      description={description}
      onSettings={onSettings}
      onDelete={handleDelete}
    >
      <BaseNode onDoubleClick={onDoubleClick}>
        <BaseNodeContent>
          <div className="flex items-center gap-2">
            {typeof Icon === 'string' ? (
              <img src={Icon} alt={name} className="size-4" />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
          </div>

          {children}

          <BaseHandle id="target-1" type="target" position={Position.Left} />
          <BaseHandle id="source-1" type="source" position={Position.Right} />
        </BaseNodeContent>
      </BaseNode>
    </WorkflowNode>
  );
});

BaseExecutionNode.displayName = 'BaseExecutionNode';
