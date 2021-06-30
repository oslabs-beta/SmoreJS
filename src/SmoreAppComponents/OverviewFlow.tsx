import React, { useState, useEffect } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';
import {elements} from '../types';
import {useRecoilValue, useRecoilState} from 'recoil'
import { checkChild, createNewObj } from '../FiberParsingAlgo.tsx';
import atoms from '../atoms';

const AtomDisplay : FunctionComponent = (props) => {
  return (
    <div>
      <button value={props.atom} onClick={props.getAtomToHighlight}>{props.atom}</button>
    </div>
  )
}

const SelectorDisplay : FunctionComponent = (props) => {
  return (
    <div>
      <button value={props.selector} onClick={props.getSelectorToHighlight}>{props.selector}</button>
    </div>
  )
}

// const onLoad = (reactFlowInstance) => {
//   // console.log('flow loaded:', reactFlowInstance);
//   reactFlowInstance.fitView();
// };


const OverviewFlow = () => {
  const nodeData =  useRecoilValue(atoms.reactState)
  const logData = useRecoilValue(atoms.recoilObj)
  const [elements, setElements] = useState([]);
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  const flowStyles = { width: '100%', height: 700 };

  const getSubscriptions = (arr, components: any = []) => {
    arr?.forEach((obj) => {
      if(obj.recoilNode) {
        if (obj.recoilNode.atomSelector[0]) {
          const objOfRecoilStates: any = {};
          objOfRecoilStates.component= obj.name;
          objOfRecoilStates.recoilState = createNewObj(obj.recoilNode.atomSelector);
          components.push(objOfRecoilStates)
        }
      }
      getSubscriptions(obj.children, components);
    });
    return components;
  }

  const subscriptions = getSubscriptions([nodeData]);
  console.log(logData);
  
  for (let i = 0; i < subscriptions.length; i += 1) {
    for (let j = 0; j < subscriptions[i].recoilState.length; j += 1) {
      const curAtomSelectorObject = subscriptions[i].recoilState[j]
      if (!curAtomSelectorObject.hasOwnProperty('updated')) {
        curAtomSelectorObject.updated = false;
      }
      if (logData.knownAtoms.includes(curAtomSelectorObject.key)) {
        curAtomSelectorObject.isAtom = true;
      }
      if (logData.knownSelectors.includes(curAtomSelectorObject.key)) {
        curAtomSelectorObject.isSelector = true;
      }
      logData.atomSelectorValuesNonDefault.forEach(el => {
        if(curAtomSelectorObject.key === el.key && el.updated) {
          curAtomSelectorObject.updated = true;
        }
      })
    }
  }
  
  console.log(subscriptions);

  const getAtomToHighlight = (e: any) => {
    subscriptions.forEach(obj => {
      if(e.target.value===obj.recoilState[0].key){
        setElements((els) =>
          els.map((el) => {
            if (el.data?.label===obj.component){
              if (el.style?.background)
              el.style.background = '#EBDEF0';
            } 
          return el;
          })
        );
      }
    });
  }

  const getSelectorToHighlight = (e: any) => {
    subscriptions.forEach(obj => {
      if(e.target.value===obj.recoilState[0].key){
        setElements((els) =>
          els.map((el) => {
            if (el.data?.label===obj.component){
              if (el.style?.background)
              el.style.background = '#FADBD8';
            } 
          return el;
          })
        );
      }
    });
  }

  function getNamedComponents(arr, arrayOfElements: any = [], numOfComponents: any = [0]) {
    arr?.forEach((obj) => {
      if (obj.name) {
        numOfComponents[0] += 1
        const newElements: elements = {
          id: '',
          type: null,
          data: {},
          position: {},
          children: [],
          style: {background: '#fff'},
        };
        
        newElements.type = 'input';
        newElements.id = numOfComponents[0].toString();
        newElements.data = {
          label: obj.name,
        };
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
<<<<<<< HEAD
  }    
  console.log(components);
=======
  }

  // dagre positioning
  const nodeWidth = 172;
  const nodeHeight = 36;
  
  
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const getLayoutedElements = (elements, direction = 'TB') => {
    dagreGraph.setGraph({ rankdir: direction });
    elements.forEach((el) => {
      if (isNode(el)) {
        
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });
  
    dagre.layout(dagreGraph);
  
    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition =  'top';
        el.sourcePosition =  'bottom';
  
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }
  
      return el;
    });
  };

  const layoutedElements = getLayoutedElements(components);
  
  
>>>>>>> main
  useEffect(() => {
    setElements(layoutedElements) 
  }, [nodeData]);
  
  
  // useEffect(() => {
  //   setElements((els) =>
  //     els.map((el) => {
  //       if (el.data?.label===atomToHighlight){
  //         el.style.background = atomNodeBg;
  //       }
  //       else if (el.data?.label===selectorToHighlight){
  //         el.style.background = selectorNodeBg;
  //       }
  //     return el;
  //     })
  //   );
  // }, [atomNodeBg, selectorNodeBg, setElements]);

  

  const displayAtoms: any = [];
  for (let i = 0; i < logData.knownAtoms?.length; i += 1) {
    displayAtoms.push(<AtomDisplay atom={logData.knownAtoms[i]} key={i} getAtomToHighlight={getAtomToHighlight}/>)
  }

  const displaySelectors: any = [];
  for (let i = 0; i < logData.knownSelectors?.length; i += 1) {
    displaySelectors.push(<SelectorDisplay selector={logData.knownSelectors[i]} key={i} getSelectorToHighlight={getSelectorToHighlight}/>)
  }

  return (
    <>
      <div id="flow-pad">
        <div id='component-tree-tag'>
          <h3>Component Tree</h3>
          <b>Atoms:</b>
          {displayAtoms}
          <br></br>
          <b>Selectors:</b>
          {displaySelectors}
        </div>
      <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      // onLoad={onLoad}
      snapToGrid
      snapGrid={[15, 15]}
      style={flowStyles}
    >
      <MiniMap
        nodeStrokeColor={(n: any) => {
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
