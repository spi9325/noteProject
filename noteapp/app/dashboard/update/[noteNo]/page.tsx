"use client"
import { NoteDiv } from "@/app/UI/NoteDiv"
import axios from "axios";
import { use, useEffect, useState } from "react"

interface noteType{
    title:string;
    description:string
}
interface updateType{
    createdAt:string 
description:string 
id: number
noteNo: number
title: string
updatedAt: string
userId: number
msg:string
}

export default function Update({params}:{params:Promise<{noteNo:number}>}){
    const {noteNo} =use(params)
    const [note,setNote] = useState<noteType>();
    
    useEffect(()=>{
        async function getNote(){
            try {
                const note = await axios.post<noteType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/view?noteNo=${noteNo}`,{},{
                    withCredentials:true
                });
                setNote(note.data)
            } catch (error) {
                console.log(error);
            }
            
        }
        getNote();
    },[])
    async function updateFn(title:string,description:string){ 
                
       try {
         const res = await axios.patch<updateType>(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/update`,
             {
               noteNo:Number(noteNo),  
               title,
               description  
             },
             {
                 withCredentials:true
             }
         )
 
         if(res.status == 200){
             alert("updation success");
         }
       } catch (error) {
        console.log(error);
       }
        
    }

    return(
        <div className="md:hidden">
            <NoteDiv title={note?.title} description={note?.description} buttonText={"Update"} noteNo={noteNo} updateFn={updateFn}/>
        </div>
    )
}