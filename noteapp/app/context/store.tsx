"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface State {
    login:boolean
  }
interface StateContextProps{
    result:{ login: boolean; };
    setResult: Dispatch<SetStateAction<{ login: boolean; }>>;
    authorized:boolean
    setAuthorized:Dispatch<SetStateAction<boolean>>
}


const MyContext = createContext<StateContextProps | undefined>(undefined);

export const MyProvider:React.FC<{ children: ReactNode }> = ({children}) =>{

const [result,setResult] = useState<State>({ login:false })
const [authorized,setAuthorized] = useState(false)

    return (
        <MyContext.Provider  value={{result,setResult,authorized ,setAuthorized}}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error("useMyContext must be used within a MyProvider");
    }
    return context;
  };