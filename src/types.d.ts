// type of element in react-flow component tree
export type elements = {
  id: string;
  type: string | null;
  data: object;
  position: object;
  children: any;
  style: any;
};

export type atomSelectorValuesNonDefault = {
  edit: number,
  key: string,
  values: any,
  updated: boolean,
  isAtom: boolean,
  isSelector: boolean,
};

export type recoilObj = {
  version: number,
  stateID: number,
  dirtyAtoms: any[],
  currentEdit: number,
  knownAtoms: any[],
  knownSelectors: any[],
  atomSelectorValuesNonDefault: any[],
};

export type cache = {
  atomSelector: any[],
  changes: any,
};
