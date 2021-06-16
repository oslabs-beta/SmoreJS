import React, { FunctionComponent } from 'react';
import {
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import atoms from './atoms';

const StateDisplay : FunctionComponent = ({}) =>{
const reactData = useRecoilValue(atoms.reactState)

// function RefreshUserInfo({userID}) {
//   const refreshUserInfo = useRecoilCallback(({set}) => async id => {
    
    
//     Use an Atom#
//     Another option is to use an atom, instead of a selector, to model the query results. You can imperatively update the atom state with the new query results based on your refresh policy.
    
    
    
//     // React component to refresh query
//     function RefreshReactData() {

//       const refreshIframeData = useRecoilCallback(() => async data => {
//         const userInfo = await myDBQuery({userID});
//         set(userInfoState(userID), userInfo);
//       }, [userID]);
    
//       // Refresh user info every second
//       useEffect(() => {
//         const iframeRefresh = setInterval(refreshIframeData, 1000);
//         return () => clearInterval(intervalID);
//       }, [refreshUserInfo]);
    
//       return null;
//     }

return (
  <>
  <h1> State Data</h1>
  
  </>
)
}
export default StateDisplay