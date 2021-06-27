import React, { useState, useEffect } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import {useRecoilValue, useRecoilState} from 'recoil'
import { getNodes, checkChild } from '../FiberParsingAlgo.tsx';
import atoms from '../atoms';


import * as d3 from 'd3';
import initialElements from '../initial-elements';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

// function DebugObserver(): React.Node {
//   const snapshot = useRecoilSnapshot();
//   useEffect(() => {
//     console.debug('The following atoms were modified:');
//     for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
//       console.debug(node.key, snapshot.getLoadable(node));
//     }
//   }, [snapshot]);

//   return null;
// }

const OverviewFlow = () => {
  const nodeData =  useRecoilValue(atoms.reactState)
  const [elements, setElements] = useState([]);
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  const flowStyles = { width: '100%', height: 700 };
  // const recoilValue = useRecoilValue(atoms.recoilState);
  // console.log(nodeData);
  // assign variable to result of invocation of calling getNodes function of root
  // const nodes = [getNodes(nodeData)];
  // console.log('nodeObj', nodes[0]);
  // console.log('hello', recoilValue);
  
  // d3 component tree rough outline
  // recursive algorithm to display all nodes in a nested list
  // const displayComponentTree = (parent_ul, fiberNodes) => {
  //   let current_ul;
  //   let current_li;

  //   if (parent_ul === null) {
  //     parent_ul = d3.select('body').append('ul');
  //   }

  //   current_li = parent_ul.append('li').text(fiberNodes.name);

  //   if (fiberNodes.children) {
  //     current_ul = current_li.append('ul');

  //     for (let i = 0; i < fiberNodes.children.length; i += 1) {
  //       displayComponentTree(current_ul, fiberNodes.children[i]);
  //     }
  //   }
  // };
 
  // // call displayCompenentTree
  // displayComponentTree(null, nodes[0]);

  const addDepth = (arr, depth = 0) => {
    arr.forEach((obj) => {
      obj.depth = depth;
      addDepth(obj.children, depth + 1);
    });
  };

  // addDepth([nodeData]);

  type els = {
    id: string;
    type: string | null;
    data: object;
    position: object;
    children: any;
    depth: number;
  }

  function getNamedComponents(arr, arrayOfElements: any = [], numOfComponents: any = [0]) {
    arr?.forEach((obj) => {
      // console.log(obj.name);
      if (obj.name) {
        numOfComponents[0] += 1
        const newElements: els = {
          id: '',
          type: null,
          data: {},
          position: {},
          children: [],
          depth: 0,
        };
        // if ( numOfComponents[0] === 1 ) 
        newElements.type = 'input';
        newElements.id = numOfComponents[0].toString();
        newElements.data = {
          label: obj.name,
        };
        newElements.depth = obj.depth;
        newElements.position = { x: 250, y: 50 * numOfComponents };
        newElements.children.push(obj.children) 
        arrayOfElements.push(newElements);

        // namedComponents.push(obj);
      }
      getNamedComponents(obj.children, arrayOfElements, numOfComponents);
    });
    return arrayOfElements;
  }
  
  const linkingTree = (treeData) : any => {
    //iterate through the tree data and make sure child is present before linking
    for (let i = treeData.length -1 ; i >= 0 ; i -= 1) {
      const curTreeNode = treeData[i];
      //assign a pointer to check all other components
      let j = i - 1;
      while (j >=0) {
        //console.log(checkChild(curTreeNode,treeData[j]));
        if (checkChild(curTreeNode, treeData[j]) ) {
          const newLink = {
            id: '',
            source: '',
            target: '',
            type: 'smoothstep',
            animated: true
          };
          newLink.id = `e${j + 1}-${i + 1}`;
          newLink.source = treeData[j]?.id;
          newLink.target = curTreeNode?.id;

          components.push(newLink);
          break;
        }
        j -= 1
      }
    }
  }
      
  const components: any = getNamedComponents([nodeData]);
  if(components) {
    linkingTree(components);
  }    
  
  useEffect(() => {
    // setRecoil(recoilObject);
    setElements( components)
  }, [nodeData]);

  return (
    <>
      <div id="flow-pad">
        <div id='component-tree-tag'>
          <h3>Component Tree</h3>
        </div>
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

