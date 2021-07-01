import React, { FunctionComponent, useState, useEffect } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';
import { Button, Menu, MenuItem } from '@material-ui/core/';
import { elements, recoilObj } from '../types';
import {useRecoilValue, useRecoilState} from 'recoil'
import { checkChild, createNewObj } from '../FiberParsingAlgo';
import atoms from '../atoms';

// Component that displays list of atoms as buttons
const AtomDisplay : FunctionComponent = (props: any) => {
  return (
    <div>
        <MenuItem value={props.atom} onClick={props.getAtomToHighlight}> {props.atom} </MenuItem>
    </div>
  )
}

// Component that displays list of selectors as buttons
const SelectorDisplay : FunctionComponent = (props: any) => {
  return (
    <div>
      <MenuItem value={props.selector} onClick={props.getSelectorToHighlight}> {props.selector} </MenuItem>
    </div>
  )
}

// Component that displays component tree using React Flow
const ComponentTree = () => {
  const nodeData =  useRecoilValue(atoms.reactState)
  const logData: recoilObj = useRecoilValue(atoms.recoilObj)
  const [elements, setElements] = useState([]);
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  const flowStyles = { width: '100%', height: 700, border: 'solid 1px black' };

  // Returns object with name of component and which atom/selector it is subscribed to
  const getSubscriptions = (arr: any[], components: any = []) => {
    arr?.forEach((obj: any) => {
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
  
  // Iterating through each atom/selector in subscriptions object and adding additional data: updated, isAtom, isSelector
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

  // Highlights which component is subscribed to the selected atom on button click
  const getAtomToHighlight = (e: any) => {
    subscriptions.forEach((obj: any) => {
      if(e.target.getAttribute("value")===obj.recoilState[0].key){
        setElements((els: any) =>
          els.map((el: any) => {
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

  // Highlights which component is subscribed to the selected selector on button click
  const getSelectorToHighlight = (e: any) => {
    subscriptions.forEach((obj: any) => {
      if(e.target.getAttribute("value")===obj.recoilState[0].key){
        setElements((els: any) =>
          els.map((el: any) => {
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

  // Iterates through node data and creates elements for React Flow nodes
  const createNodes = (arr: any[], arrayOfElements: any = [], numOfComponents: any = [0]) => {
    arr?.forEach((obj) => {
      if (obj.name) {
        numOfComponents[0] += 1
        const newElements: elements = {
          id: '',
          type: null,
          data: {},
          position: {},
          children: [],
          style: {
            background: '#fff',
            border: 'solid 1px #777',
          },
        };
        
        newElements.type = 'input';
        newElements.id = numOfComponents[0].toString();
        newElements.data = {
          label: obj.name,
        };
        newElements.position = { x: 250, y: 50 * numOfComponents };
        newElements.children.push(obj.children)
        arrayOfElements.push(newElements);
      }
      createNodes(obj.children, arrayOfElements, numOfComponents);
    });
    return arrayOfElements;
  }
  
  // Iterates through node data and creates elements for React Flow edges
  const createEdges = (treeData: any) => {
    // Iterate through the tree data and make sure child is present before linking
    for (let i = treeData.length -1 ; i >= 0 ; i -= 1) {
      const curTreeNode = treeData[i];
      // Assign a pointer to check all other components
      let j = i - 1;
      while (j >=0) {
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

  // Call functions to create nodes and edges
  const components: any = createNodes([nodeData]);
  if(components) {
    createEdges(components);
  }

  // Use dagre to position component tree
  const nodeWidth = 172;
  const nodeHeight = 36;
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set graph, nodes, and edges 
  const getLayoutedElements = (elements: any, direction = 'TB') => {
    dagreGraph.setGraph({ rankdir: direction });
    elements.forEach((el: any) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });
    dagre.layout(dagreGraph);
    
    // Positioning vertically/top to bottom
    return elements.map((el: any) => {
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
  
  // Set elements, run when nodeData changes from previous render
  useEffect(() => {
    setElements(layoutedElements) 
  }, [nodeData]);

  // Set elements' border - highlight which component was updated, run when logdata changes from previous render
  useEffect(() => {
    for (let i = 0; i < subscriptions.length; i += 1) {
      for (let j = 0; j < subscriptions[i].recoilState.length; j += 1) {
        const curAtomSelectorObject = subscriptions[i].recoilState[j]
        if (curAtomSelectorObject.updated) {
          setElements((els) =>
            els.map((el) => {
              if (el.data?.label===subscriptions[i].component) {
                el.style = {
                  ...el.style,
                  border: 'solid 2px red'
                };
              }
              return el;
            })
          );
        }
      }
    }
  }, [logData]);

  const [atomAnchorEl, setAtomAnchorEl] = useState(null);
  const [selectorAnchorEl, setSelectorAnchorEl] = useState(null);

  const atomMenuHandleClick = (event) => {
    setAtomAnchorEl(event.target);
  };
  const atomMenuHandleClose = () => {
    setAtomAnchorEl(null);
  };

  const selectorMenuHandleClick = (event) => {
    setSelectorAnchorEl(event.target);
  };
  const selectorMenuHandleClose = () => {
    setSelectorAnchorEl(null);
  };


  // Iterate through knownAtoms array and push AtomDisplay component into displayAtoms array for every atom
  const displayAtoms: any = [];
  for (let i = 0; i < logData.knownAtoms?.length; i += 1) {
    displayAtoms.push(<AtomDisplay atom={logData.knownAtoms[i]} key={i} getAtomToHighlight={getAtomToHighlight}/>)
  }

  // Iterate through knownSelectors array and push AtomDisplay component into displaySelectors array for every selector
  const displaySelectors: any = [];
  for (let i = 0; i < logData.knownSelectors?.length; i += 1) {
    displaySelectors.push(<SelectorDisplay selector={logData.knownSelectors[i]} key={i} getSelectorToHighlight={getSelectorToHighlight}/>)
  }

  return (
    <>
    
      <div id="flow-pad">
      <div id='component-tree-tag'>
          <h3>Component Tree</h3>
      </div>
      {/* Atom/Selector Menu */}
    <div className="atomSelectMenus">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={atomMenuHandleClick}>
          Atoms
        </Button>
        <Menu
          id="atomMenu"
          anchorEl={atomAnchorEl}
          keepMounted
          open={Boolean(atomAnchorEl)}
          onClose={atomMenuHandleClose}
        >
          {displayAtoms}
        </Menu>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={selectorMenuHandleClick}>
          Selectors
        </Button>
        <Menu
          id="selectorMenu"
          anchorEl={selectorAnchorEl}
          keepMounted
          open={Boolean(selectorAnchorEl)}
          onClose={selectorMenuHandleClose}
        >
          {displaySelectors}
        </Menu>
    </div>

      {/* React Flow component */}
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        snapToGrid
        snapGrid={[15, 15]}
        style={flowStyles}
      >

        {/* Mini Map Component */}
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

        {/* Controls Component  */}
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
    </>
  );
};

export default ComponentTree;
