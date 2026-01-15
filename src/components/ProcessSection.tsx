"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calculator, ShieldCheck, Paintbrush, CheckCheck } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
    const container = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
            }
        });

        // 1. Draw the connection line
        tl.fromTo(lineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1.5, ease: "power3.inOut" }
        );

        // 2. Pop up steps
        const steps = stepsRef.current ? gsap.utils.toArray(stepsRef.current.children) : [];
        tl.fromTo(steps,
            { y: 30, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
            "-=1.2" // Overlap with line drawing
        );

    }, { scope: container });

    const steps = [
        {
            icon: <Calculator className="w-6 h-6 text-red-600" />,
            title: "Free Estimate",
            desc: "We visit your property in Richmond or East Bay for a fair, transparent quote."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
            title: "Protection & Prep",
            desc: "We cover your furniture and floors. Prep is 70% of the job."
        },
        {
            icon: <Paintbrush className="w-6 h-6 text-white" />,
            title: "The Painting",
            desc: "Premium paints applied with precision tools for a flawless finish.",
            active: true // Red circle
        },
        {
            icon: <CheckCheck className="w-6 h-6 text-red-600" />,
            title: "Final Walkthrough",
            desc: "We review the job together. We are only done when you are happy."
        }
    ];

    return (
        <section ref={container} className="w-full py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Simple Process</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">From the first call to the final touch-up, we make painting stress-free.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[40px] left-0 w-full h-1 bg-gray-200 z-0 rounded-full" />
                    <div ref={lineRef} className="hidden md:block absolute top-[40px] left-0 w-full h-1 bg-red-600 z-0 rounded-full origin-left" />

                    {/* Connecting Line (Mobile: Vertical) */}
                    <div className="md:hidden absolute top-0 left-[40px] w-1 h-full bg-gray-200 z-0 rounded-full" />

                    {/* Steps */}
                    <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 md:text-center group">
                                {/* Icon Circle */}
                                <div className={`w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform group-hover:scale-110 duration-300 ${step.active ? 'bg-red-600 border-red-100' : 'bg-white border-white'}`}>
                                    {step.icon}
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
