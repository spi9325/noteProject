"use client"
import { CustomeButton } from "@/app/UI/CustomeButton";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap"
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/context/store";

gsap.registerPlugin(ScrollTrigger);


interface testimonialType {
    name: string;
    bg: string;
    profile: string;
    review: string;
}

export function Slider() {
    const router = useRouter();
    let mm = gsap.matchMedia();

    const {authorized} = useMyContext();
    const testomonial: testimonialType[] = [
        {
            name: "baburao",
            bg: "bg-green-200",
            profile: "B",
            review: "this is greate website to save noted and access "
        },
        {
            name: "shyam",
            bg: "bg-red-200",
            profile: 'S',
            review: "my team use this website for saving articles"
        },
        {
            name: "raju",
            bg: "bg-green-200",
            profile: "R",
            review: "i am ITUS qualified,i use this for chating securly"
        },
        {
            name: "unknown",
            bg: "bg-red-200",
            profile: "K",
            review: "i use this for feedback for my customers"
        }


    ]
    
    useGSAP(() => {
        mm.add("(min-width:768px)", () => {
            gsap.from("#child", {
                x: "305%",
                opacity: 0,
                duration: 1,
                stagger:1,
                scrollTrigger: {
                    trigger: "#parent",
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 1,
                }
            })
        })

        mm.add("(max-width:767px)", () => {
            gsap.from(".B", {
                x: "200%",
                duration: 10,
                scrollTrigger: {
                    trigger: ".B",
                    scroller: "body",
                    start: "top 60%",
                    end: "top 30%",
                    scrub: 10
                }
            })
            gsap.from(".S", {
                x: "-200%",
                duration: 10,
                scrollTrigger: {
                    trigger: ".S",
                    scroller: "body",
                    start: "top 60%",
                    end: "top 30%",
                    scrub: 10
                }
            })
            gsap.from(".R", {
                x: "200%",
                duration: 10,
                scrollTrigger: {
                    trigger: ".R",
                    scroller: "body",
                    start: "top 60%",
                    end: "top 30%",
                    scrub: 10
                }
            })
            gsap.from(".K", {
                x: "-200%",
                duration: 10,
                scrollTrigger: {
                    trigger: ".K",
                    scroller: "body",
                    start: "top 60%",
                    end: "top 30%",
                    scrub: 10
                }
            })
        })

    })
   
    function gotoDashboard(){
        if(authorized){
            router.push("/dashboard");
        }else{
            router.push("/login/signup")
        }
    }



    return (
        <div className="w-[100%] p-1 mt-[100px]">
            <div className="flex justify-center items-center flex-col gap-9">
                <p className="text-4xl">Ready To Create?</p>
                <div onClick={gotoDashboard}>
                 <Link id="bouncing" href={"/user/dashboard"}><CustomeButton text="Get Started" textSize="text-[22px]" width="w-[150px] lg:w-[200px]" textColor="text-green-200" height="h-[50px]"/></Link>
                </div>
            </div>
            

            <div id="parent" className="rounded-xl mt-9 p-2 grid grid-cols-1 gap-3 md:gap-1 md:grid-cols-4 overflow-x-hidden md:translate-x-(-300%)">
                {
                    testomonial.map((cur, index) => {
                        return (
                            <div key={index} id="child" className={`rounded-xl p-2 shadow-2xl w-[100%] h-[100%] sm:w-[70%] md:w-[100%]  mx-auto py-5 md:px-0 translate-x-[50% ${cur.profile}`}>
                                <div className={` w-16 h-16 sm:w-24 sm:h-24 md:w-12 md:h-12 rounded-full  flex items-center justify-center text-2xl mx-auto ${cur.bg}`}>
                                    <p className="">{cur.profile}</p>
                                </div>

                                <div className="w-[50%] mx-auto text-center mt-2 text-xl">{cur.name}</div>

                                <div className="p-2 w-[70%] text-center mx-auto mt-3">{cur.review}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}