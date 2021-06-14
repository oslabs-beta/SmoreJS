import React, { useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import initialElements from './initial-elements';

const onLoad = (reactFlowInstance: any) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
  // console.log(rootNode._reactRootContainer._internalRoot.current);
};

const OverviewFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  const flowStyles = { width: 700, height: 700 };

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      snapToGrid
      snapGrid={[15, 15]}
      style={flowStyles}
    >
      <MiniMap
        nodeStrokeColor={(n: any) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n: any) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
