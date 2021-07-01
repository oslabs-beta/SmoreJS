import { atom } from 'recoil';

const atoms = {};

// URL for iframe display
atoms.urlState = atom({
  key: 'url',
  default: '',
});

// iframe display
atoms.iframeState = atom({
  key: 'iframe',
  default: '',
});

// react fiber tree state data
atoms.reactState = atom({
  key: 'reactState',
  default: {},
});

// logs of recoil data
atoms.recoilLog = atom({
  key: 'recoilLog',
  default: [],
});

// recoil state data object
atoms.recoilObj = atom({
  key: 'recoilObj',
  default : {},
});

// data logs for display
atoms.testLog = atom({
  key: 'testLog',
  default: '',
});

// username for unique accounts
atoms.currentUser = atom({
  key: 'username',
  default: '',
});

export default atoms;
