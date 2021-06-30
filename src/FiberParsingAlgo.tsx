import lodash from 'lodash'

export const createNewObj = (arr: any[]) => {
  const result: any[] = [];
  arr.forEach(el => {
    const obj: any = {};
    obj.key = lodash.cloneDeep(el.key);
    result.push(obj);
  })
  return result;
}

export const getNodes = ((node: any) => {
  // recursive algorithm to get all nodes
  let currentNode = node?.child;
  const nodeObj = {
    id: node?._debugID,
    tag: node?.tag,
    children: [],
    name: '',
    recoilNode: getRecoilStateData(node),
  };
  while (currentNode) { // get all node names
    if (node?.elementType && node?.elementType.name) {
      nodeObj.name = node?.elementType?.name;
    }
// get all children and siblings
    nodeObj.children.push(getNodes(currentNode));
    currentNode = currentNode.sibling;
  }
  // return node object
  // console.log('nodeObj', nodeObj)
  return nodeObj; 
});

type cache = {
  atomSelector: any[],
  changes: any,
} 

const getRecoilStateData = (node: any) => {
  // const [recoilValue, setRecoil] = useRecoilState(atoms.recoilState);
  const cache: cache = {
    atomSelector: [],
    changes: {}
  };
  if (node.tag === 0 ||  node.tag === 1) {
    let findingDeps: boolean = true;
    let curMemoizedNode = node.memoizedState?.memoizedState
    
    if(curMemoizedNode) {
      console.log('curNode', curMemoizedNode, node)
      while (findingDeps) {
        if(curMemoizedNode.deps) {
          if (curMemoizedNode.deps[1].key) {
            if(cache.atomSelector.includes(curMemoizedNode.deps[1])) {
              // setRecoil(curMemoizedNode.deps[2].current.getState());
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
  }
  return cache;
}

// return Fiber Root Object
export const getFiberRoot = () => {
  const iFrame: HTMLElement | null = document.getElementById('frameId');
  const root = iFrame?.contentDocument.getElementById('root');
  const fiberData = lodash.cloneDeep(root?._reactRootContainer._internalRoot.current);
  console.log('from fiberparsing', fiberData);
  const fiberParsedData = getNodes(fiberData);
  return fiberParsedData;
};
   
//checking if child is in parent
export const checkChild = ( child: any, parent: any, boolean = [false] ) => {
  if(parent.children) {
    parent.children.forEach(el => {
      //checking is el is an array
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
      //otherwise el is an object
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

export const getRecoilData = (node: any) => {
  let recoilData: any;

  const lookingForData = (curNode: any) => {
    curNode.forEach(el => {
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


