import lodash from 'lodash'
import { cache } from './types';

// Deep clone object
export const createNewObj = (arr: any[]) => {
  const result: any[] = [];
  arr.forEach(el => {
    const obj: any = {};
    obj.key = lodash.cloneDeep(el.key);
    result.push(obj);
  })
  return result;
}

// Recursive algorithm to get all nodes and assign necessary properties to new object
export const getNodes = ((node: any) => {
  let currentNode = node?.child;
  const nodeObj = {
    id: node?._debugID,
    tag: node?.tag,
    children: [],
    name: '',
    recoilNode: getRecoilStateData(node),
  };
  // Get all node names
  while (currentNode) { 
    if (node?.elementType && node?.elementType.name) {
      nodeObj.name = node?.elementType?.name;
    }
    // Get all children and siblings
    nodeObj.children.push(getNodes(currentNode));
    currentNode = currentNode.sibling;
  }
  return nodeObj; 
});

// Get data specific to recoil
const getRecoilStateData = (node: any) => {
  const cache: cache = {
    atomSelector: [],
    changes: {}
  };
  
  /*
  ** Tag 0: function component
  ** Tag 1: class component
  ** A component has recoil state data if within the memoizedState property there is a deps property with an array
  */
  if (node.tag === 0 ||  node.tag === 1) {
    let findingDeps: boolean = true;
    let findingDepsPartTwo: boolean = true;
    let curMemoizedNode = node.memoizedState?.memoizedState
    let curMemoNode = node.memoizedState;
    /* 
    ** Look for deps and its values
    ** deps[1] - tells which component is subscribed to which atom/selector
    ** deps[2] at index of 2 - recoil state data 
    */
    if(curMemoizedNode) {
      while (findingDeps) {
        if(curMemoizedNode.deps) {
          if (curMemoizedNode.deps[1].key) {
            if(cache.atomSelector.includes(curMemoizedNode.deps[1])) {
              findingDeps = false;
            }
            else {
              cache.atomSelector.push(curMemoizedNode.deps[1]);
              cache.changes = lodash.cloneDeep(curMemoizedNode.deps[2].current.getState());
            }
          }
        }
        if (curMemoizedNode.next) {
          curMemoizedNode = curMemoizedNode.next;
        }
        else {
          break;
        }
      }
    }
    // Edge case to test recoil apps with recoil version lower than 0.3.1
    if(curMemoNode) {
      while (findingDepsPartTwo) {
        if(curMemoNode.memoizedState) {
          if (curMemoNode.memoizedState.current) {
            if(curMemoNode.memoizedState.current.getState) {
                cache.changes = lodash.cloneDeep(curMemoNode.memoizedState.current.getState());
                findingDepsPartTwo = false;
            }
          }
        }
        if (curMemoNode.next) {
          curMemoNode = curMemoNode.next;
        }
        else {
          break;
        }
      }
    }
  }
  return cache;
}

// Get data from iframe and return Fiber Root object
export const getFiberRoot = () => {
  const iFrame: HTMLElement | null = document.getElementById('frameId');
  const root = iFrame?.contentDocument.getElementById('root');
  const fiberData = lodash.cloneDeep(root?._reactRootContainer._internalRoot.current);
  const fiberParsedData = getNodes(fiberData);
  return fiberParsedData;
};
   
// Check if parent has a child for setting up edges in React Flow component tree
export const checkChild = ( child: any, parent: any, boolean = [false] ) => {
  if(parent.children) {
    parent.children.forEach(el => {
      // Check if each el is an array
      if(Array.isArray(el)) {
        el.forEach(element => {
          if(element.name === child.data.label) {
            return boolean[0] = true;
          }
          else if(element.children) {
            checkChild(child, element, boolean);
          }
        })
      }
      // Otherwise if el is an object
      else {
        if(el.name === child.data.label) {
          return boolean[0] = true
        }
        else if(el.children) {
          checkChild(child, el, boolean);
        }
      }
    })
  }
  return boolean[0];
};

// Get recoil tree data
export const getRecoilData = (node: any) => {
  let recoilData: any;
  const lookingForData = (curNode: any) => {
    curNode.forEach((el: any) => {
      if(el.recoilNode.changes.currentTree) {
        recoilData = el.recoilNode.changes
      }
      else if(el.children) {
        lookingForData(el.children)
      }
    })
    return;
  }
  lookingForData(node.children);
  return recoilData;
}
