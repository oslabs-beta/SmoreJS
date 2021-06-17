import React, { useState, useEffect } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import {useRecoilValue} from 'recoil'

import atoms from './atoms';


import * as d3 from 'd3';
import initialElements from './initial-elements';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const OverviewFlow = () => {
  const nodeData =  useRecoilValue(atoms.reactState)
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  const flowStyles = { width: 500, height: 500 };
  const allNodes = [];
  // useEffect(() => {
    const getNodes = (node) => {
      const nodeObj = {
        id: node._debugID,
        children: [],
        name: '',
      };
       // recursive algorithm to get all nodes
       let currentNode = node.child;
       while (currentNode) {
       // get all node names
         if (node.elementType && node.elementType.name) {
           nodeObj.name = node.elementType?.name;
         }
         // get all children and siblings
         nodeObj.children.push(getNodes(currentNode));
         currentNode = currentNode.sibling;
       }
 
       // return node object
       return nodeObj;
     };
     
     
     // assign variable to result of invocation of calling getNodes function of root
     const nodes = getNodes(nodeData);
     
    //  const nodes = getNodes(document.getElementById('root')._reactRootContainer._internalRoot.current);
 
     allNodes.push(nodes);
     // logs node object
     console.log('big obj', nodes);
 
     // d3 component tree rough outline
     // recursive algorithm to display all nodes in a nested list
    //  const displayComponentTree = (parent_ul, fiberNodes) => {
    //    let current_ul;
    //    let current_li;
 
    //    if (parent_ul === null) {
    //      parent_ul = d3.select('body').append('ul');
    //    }
 
    //    current_li = parent_ul.append('li').text(fiberNodes.name);
 
    //    if (fiberNodes.children) {
    //      current_ul = current_li.append('ul');
 
    //      for (let i = 0; i < fiberNodes.children.length; i += 1) {
    //        displayComponentTree(current_ul, fiberNodes.children[i]);
    //      }
    //    }
    //  };
 
    //  // call displayCompenentTree
    //  displayComponentTree(null, nodes);
 
     const addDepth = (arr, depth = 0) => {
       arr.forEach((obj) => {
         obj.depth = depth;
         addDepth(obj.children, depth + 1);
       });
     };
 
     addDepth(allNodes);
 
     console.log('array of big obj', allNodes);
 
     // function to organize by id, depth, and name
     // push in order from lowest to highest depth
 
     function getNamedComponents(arr, namedComponents = []) {
       arr.forEach((obj) => {
         // console.log(obj.name);
         if (obj.name !== '') {
           namedComponents.push(obj);
         }
 
         getNamedComponents(obj.children, namedComponents);
       });
       return namedComponents;
     }
 
     console.log('named', getNamedComponents(allNodes));
 
     // setElements(
     //   (nodes) => {
 
     //   },
     // );
  //  }, []);
 
   // console.log('el', elements);
  return (
    <>
      <div id="flow-pad">
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
          if (n.style?.background)
            return n.style.background;
          if (n.type === 'input')
            return '#0041d0';
          if (n.type === 'output')
            return '#ff0072';
          if (n.type === 'default')
            return '#1a192b';

          return '#eee';
        } }
        nodeColor={(n: any) => {
          if (n.style?.background)
            return n.style.background;

          return '#fff';
        } }
        nodeBorderRadius={2} />
      <Controls />
      <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
    </>
  );
};

export default OverviewFlow;
