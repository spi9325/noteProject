"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface NotesContextType {
    authorized: boolean;
    setAuthorized: Dispatch<SetStateAction<boolean>>
    toggle: boolean;
    setToggle: Dispatch<SetStateAction<boolean>>;
    user: string;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);



export const NotesContextProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
   const [authorized, setAuthorized] = useState<boolean>(false);
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState("user")

    const validateUser = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/user/authorized`, {
                withCredentials: true,
            });
            setAuthorized(res.data as boolean);
        } catch (error) {
            console.log(error);
            setAuthorized(false);
        }
    };
      
    const getUser = async () => {
        try {
            const res = await axios.get<string>(`${process.env.NEXT_PUBLIC_Backend_URL}/user/getuser`, {
                withCredentials: true,
            });
            setUser(res.data);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    useEffect(() => {
        validateUser()
        getUser()
    }, [])
    useEffect(()=>{
        
        if (authorized) {
            router.push("/dashboard")
        } else {
            router.push("/login/signup")
        }
    },[authorized])
  

    const memoizeValue = useMemo(()=> ({ authorized, setAuthorized, toggle, setToggle, user }),[authorized,toggle,user])

    return <NotesContext.Provider value={memoizeValue}>
        {children}
    </NotesContext.Provider>
}

export const useNotesContext = () => {
    const context = useContext(NotesContext)
    if (!context) throw new Error("pls use app in NotesContextProvider")
    return context;
}