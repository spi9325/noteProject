"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface resType{
    message:string
}
export default function Delete(){
    const router=useRouter();
    const searchParam = useSearchParams();
    const noteNo = searchParam.get("noteNo");
    
    async function del() {
        try {
            const res = await axios.delete<resType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/delete?noteNo=${noteNo}`,{withCredentials:true})
            alert(res.data.message)
            router.push("/dashboard/bulk");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        del();
    },[])

}