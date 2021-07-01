// adding depth to each component basd on level i
const addDepth = (arr, depth = 0) => {
    arr.forEach((obj) => {
      obj.depth = depth;
      addDepth(obj.children, depth + 1);
    });
  };

//convert objects to strings
export const ifValuesIsObject = (values) => {
  if(typeof values === 'object'){
    const info = []
    for (const [key, value] of Object.entries(values)) {
      if(typeof value === 'object'){
        return ifValuesIsObject(value)
      }
    const text = `${key} - ${value}`
    text.replace(/$/g, '')
    
    info.push(text) 
    }
    return info.join(' ');
  }
  return values;
}

// Version/How many times Virtual DOM has been updated
export const hasVersion = (property: any, str: any) => {
  if (property) return `Virtual DOM has Been updated ${property + 1} time(s)`; 
  return str 
}

// Check if dirtyAtoms, knownAtoms, knownSelectors exist
export const hasArray = (property: any, str: any) => {
  if (property?.length) return property.map((el) => el + ', '); 
  return str 
}
