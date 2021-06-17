import {atom} from 'recoil';

const atoms = {};
 atoms.textState = atom({
  key: 'text',
  default: 'http://localhost:3000'
});

atoms.iframeState = atom({
  key: 'iframe',
  default: ''
})


atoms.reactState = atom({
  key: 'reactState',
  default: [],
})

export default atoms