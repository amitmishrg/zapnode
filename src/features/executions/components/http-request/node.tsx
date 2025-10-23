'use client';

import { memo } from 'react';
import { Node, NodeProps } from '@xyflow/react';
import { BaseExecutionNode } from '../base-execution-node';
import { GlobeIcon } from 'lucide-react';

type HttpRequestNodeData = {
  endpoint?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const { data } = props;
  const { endpoint, method, body, id } = data;

  const description = endpoint
    ? `${method || 'GET'}: ${endpoint}`
    : 'Not configured';

  return (
    <>
      <BaseExecutionNode
        {...props}
        id={id as string}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    </>
  );
});

HttpRequestNode.displayName = 'HttpRequestNode';
