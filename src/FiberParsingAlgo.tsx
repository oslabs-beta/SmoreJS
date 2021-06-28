import {useRecoilValue} from 'recoil';
import lodash from 'lodash';

// return Fiber Data Object
export const getFiberRoot = () => {
  const iFrame: HTMLElement | null = document.getElementById('frameId');
  const root = iFrame?.contentDocument.getElementById('root');
  const fiberData = lodash.cloneDeep(root?._reactRootContainer._internalRoot.current);
  console.log('Data Source', fiberData);
  return fiberData;
};



const getRecoilStateData = (node): any => {
  const cache: any = [];
  //checks tags to see what kind of React component it is
  if (node.tag === 0 ||  node.tag === 1) {
    let findingDeps: boolean = true;
    let curMemoizedNode = node.memoizedState?.memoizedState
    

    if(curMemoizedNode) {
      console.log('curMemoizedNode', curMemoizedNode)
      console.log('node', node)

      while (findingDeps) {
        if(curMemoizedNode.deps) {
          if (curMemoizedNode.deps[1].key) {
            cache.push(curMemoizedNode.deps[1]);
            findingDeps = false;
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



export const getNodes = (node: any) => {
  const nodeObj = {
    id: node?._debugID,
    tag: node?.tag,
    children: [],
    name: '',
    recoilNode: getRecoilStateData(node),
  };
  // recursive algorithm to get all nodes
  let currentNode = node?.child;
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
}

export const whereIsWaldo = (node, found = []) => {
const waldo = '[LL^-Ej*N]SU2&M3[j}2QZ2k'

if (Array.isArray(node)){
  console.log('entered node is an array')
  for (let i = 0; i< node.length; i +=1){
    if (node[i] === 'waldo'){
      found.push('FOUND WALDO!')
      return found
    }
    if (typeof node[i] === 'object') {
      whereIsWaldo(node[i], found);

    }
  }
}


if (typeof node === 'object' && node !== null){
  // console.log('entered node is an object')
  for (let k in node){
    if(k !== 'return' && k !== 'next' && 'alternate'){
    if (k === 'waldo'){
      found.push('FOUND WALDO!')
      return found
    }
    if (typeof node[k] === 'object') {
      whereIsWaldo(node[k], found);
    }}}}

return found}





