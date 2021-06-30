import {atom} from 'recoil';

const atoms = {};
 atoms.textState = atom({
  key: 'text',
  default: 'http://localhost:3000'
});

atoms.iframeState = atom({
  key: 'iframe',
  default: ''
});

atoms.reactState = atom({
  key: 'reactState',
  default: {},
});

atoms.recoilLog = atom({
  key: 'recoilLog',
  default: [],
});

atoms.recoilObj = atom({
  key: 'recoilObj',
  default : {},
})

atoms.testLog = atom({
  key: 'testLog',
  default: "",
})

export default atoms
