"use client"

import { useNotesContext } from "../../context/notesStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { MainSkeleton } from "./MainSkeleton"
import { useMyContext } from "@/app/context/store"

export function Structure() {
    const { user } = useNotesContext();
    const { authorized } = useMyContext();
    const router = useRouter()
    console.log("authorized structure page", authorized);
    
    useEffect(() => {
        const timeout = setTimeout(()=>{
            if (!authorized) {
                router.push("/login/signin")
             }
        },5000);

        ()=>clearTimeout(timeout);
    }, [authorized]);

    return (
        <div className="">
            {
                !authorized ? (<div className=""><MainSkeleton/></div>)
                    : (<div className="">
                        <div className="md:hidden border w-[100%] mt-[80px]">
                            <h1 className="shadow-xl text-[50px] sm:text-[70px] text-center text-red-500">Welcome <span className="text-green-400">{user}</span> your creation start here</h1>
                            <div className="w-full border mt-[70px] px-2 py-7 rounded-t-2xl shadow-xl">
                                <div className="">
                                    <h2 className="text-3xl pl-4">Just There </h2>
                                    <div className=" p-2 rounded-sm drop-shadow-md">
                                        <h3 className="pl-9 my-3 underline">Good To Go</h3>
                                        <div className=" flex justify-center gap-2">
                                            <Link className="bg-blue-300 rounded-lg w-[35%] border text-center mt-5 py-2 " href={"/dashboard/create"}>Create</Link>
                                            <Link className="bg-blue-300 rounded-lg w-[35%] border text-center mt-5 py-2 " href={"/dashboard/bulk"}>View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                )

            }
        </div>
    )
}