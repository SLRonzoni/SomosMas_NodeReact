import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: sessionStorage.getItem('userInfo')
  ? JSON.parse(sessionStorage.getItem('userInfo'))
  :'', 
  
  token: sessionStorage.getItem('token')
  ? JSON.parse(sessionStorage.getItem('token'))
  : null 

  };

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

function reducer(state, action) {
  switch (action.type) {

    case "USER_SIGNIN":{
      return {...state,userInfo:action.payload};
    }
   
    default:
      return state;
  }
}


