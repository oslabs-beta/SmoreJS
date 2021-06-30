// adding depth to each component basd on level i
const addDepth = (arr, depth = 0) => {
    arr.forEach((obj) => {
      obj.depth = depth;
      addDepth(obj.children, depth + 1);
    });
  };
