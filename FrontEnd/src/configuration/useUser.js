import { useCallback,useContext } from "react";
import Context from "./UserContext";

export default function useUser(email,password){

    const {jwt,setJwt} = useContext(Context)

    const login = useCallback((email,password) => {
      loginServices({email,password})
      .then(token =>{
          setJwt(token)
      })
      .catch(error => {
          console.log(error)
      })
    },[setJwt])

    const logout = useCallback(() => {
        setJwt(null)
    },[setJwt])

    return {
        isLogged:Boolean(jwt),
        login,
        logout
    }

}