'use client';

import { memo, useCallback } from 'react';
import { type NodeProps, Position, useReactFlow } from '@xyflow/react';
import { LucideIcon } from 'lucide-react';

import { BaseNode, BaseNodeContent } from '@/components/react-flow/base-node';
import { BaseHandle } from '@/components/react-flow/base-handle';
import { WorkflowNode } from '@/components/workflow-node';
import {
  NodeStatus,
  NodeStatusIndicator,
} from '@/components/react-flow/node-status-indicator';

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: React.ReactNode;
  status: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

export const BaseTriggerNode = memo((props: BaseTriggerNodeProps) => {
  const {
    id,
    icon: Icon,
    name,
    description,
    children,
    status = 'initial',
    onSettings,
    onDoubleClick,
  } = props;

  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = useCallback(() => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== id));

    setEdges((currentEdges) =>
      currentEdges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, [id, setNodes, setEdges]);

  return (
    <WorkflowNode
      name={name}
      description={description}
      onSettings={onSettings}
      onDelete={handleDelete}
    >
      <NodeStatusIndicator
        status={status}
        variant="border"
        className="rounded-l-2xl"
      >
        <BaseNode
          status={status}
          onDoubleClick={onDoubleClick}
          className="rounded-l-2xl relative group border-border"
        >
          <BaseNodeContent>
            <div className="flex items-center gap-2">
              {typeof Icon === 'string' ? (
                <img src={Icon} alt={name} className="size-4" />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
            </div>

            {children}

            <BaseHandle id="source-1" type="source" position={Position.Right} />
          </BaseNodeContent>
        </BaseNode>
      </NodeStatusIndicator>
    </WorkflowNode>
  );
});

BaseTriggerNode.displayName = 'BaseTriggerNode';
