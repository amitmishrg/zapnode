'use client';

import { NodeToolbar, Position } from '@xyflow/react';
import { Button } from './ui/button';
import { SettingsIcon, TrashIcon } from 'lucide-react';

interface WorkflowNodeProps {
  children: React.ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
}

export const WorkflowNode = (props: WorkflowNodeProps) => {
  const {
    children,
    showToolbar = true,
    onDelete,
    onSettings,
    name,
    description,
  } = props;
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size="sm" variant="ghost" onClick={onSettings}>
            <SettingsIcon className="size-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}

      {children}

      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="text-sm font-medium">{name}</p>

          {description && (
            <p className="text-xs text-muted-foreground truncate">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
};
