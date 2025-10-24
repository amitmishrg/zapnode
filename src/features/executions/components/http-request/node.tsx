'use client';

import { memo, useState } from 'react';
import { Node, NodeProps, useReactFlow } from '@xyflow/react';
import { BaseExecutionNode } from '../base-execution-node';
import { GlobeIcon } from 'lucide-react';
import { FormType, HttpRequestDialog } from './dialog';

type HttpRequestNodeData = {
  endpoint?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const { data } = props;
  const { endpoint, method, body } = data;
  const status = 'initial';

  const { setNodes } = useReactFlow();

  const handleSubmit = (values: FormType) => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === props.id) {
          return { ...node, data: { ...node.data, ...values } };
        }
        return node;
      });
    });
  };

  const description = endpoint
    ? `${method || 'GET'}: ${endpoint}`
    : 'Not configured';

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <BaseExecutionNode
        {...props}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
        status={status}
      />

      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={endpoint}
        defaultMethod={method}
        defaultBody={body}
      />
    </>
  );
});

HttpRequestNode.displayName = 'HttpRequestNode';
