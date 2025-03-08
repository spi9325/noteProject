"use client"

import axios from "axios";
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export function NoteContainer() {
    const [note, setNote] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);
    const title = useRef<HTMLInputElement>(null);
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setNote(e.target.value)
    }
    async function handelSubmit(){
        try {
            setSaveLoading(true);
            const result = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/notes/create`,
                {
                    title:title.current?.value,
                    description:note
                },
                {
                    withCredentials:true
                }
            )
            if(result.status == 200){
                alert("save successfully refresh page plz")
                setSaveLoading(false);
            }else{
                alert("somthing wrong")
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
        <>

        <div className="mt-[100px] md:mt-0 w-[80%] mx-auto flex flex-col  justify-center items-center md:backdrop-blur-[10px]">
            <label className=" font-semibold">Title:</label>
            <input ref={title} className="rounded p-1 w-[80%] outline-dashed bg-slate-200" type="text" required />
        </div>
        <div className=" w-[100%] mt-[20px] bg-black p-3 h-[auto] rounded-xl relative overflow-y-hidden md:backdrop-blur-[10px]">
            <div className=" bg-white border rounded-xl w-[100%] pt-3 px-1">
                <textarea
                    value={note}
                    onChange={(e) => handleChange(e)}
                    placeholder="Type your notes here..."
                    spellCheck={false}
                    style={{
                        width: '100%',
                        height: '400px',
                        fontSize: '16px',
                        resize: 'vertical',
                        outline: 'none',
                        paddingInline: '3px',
                        overflow: 'auto',
                    }}
                />
            </div>
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 bg-black text-white text-center w-[90px] rounded-b-lg cursor-pointer">
                <button onClick={handelSubmit}>{saveLoading ? "Saving...":"Save"}</button>
            </div>

        </div>
        </>
    )
}