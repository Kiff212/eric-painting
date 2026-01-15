"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaintRoller, Home, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
    const container = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%", // Earlier start
                toggleActions: "play none none reverse",
            }
        });

        // 1. Title Entrance (Bounce)
        tl.fromTo(titleRef.current,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.6)" }
        )
            // 2. Residential Cards (Pop in)
            .fromTo([card1Ref.current, card2Ref.current],
                { y: 100, opacity: 0, rotationX: 15 },
                { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" }, // Flashy pop
                "-=0.6"
            )
            // 3. Commercial Card (Slide Up & Scale)
            .fromTo(card3Ref.current,
                { y: 120, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
                "-=0.4"
            );

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-24 bg-zinc-950 overflow-hidden">

            {/* Background Ambience (Pulsing) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4 mx-auto relative z-10 max-w-5xl">

                {/* Section Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 text-red-500 border-red-500/30 uppercase tracking-widest text-xs">Our Expertise</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Professional Services</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Comprehensive painting solutions tailored to your needs. From cozy living rooms to large-scale commercial properties.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Residential Interior */}
                    <div ref={card1Ref}>
                        <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-default group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center mb-4 text-red-500 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <PaintRoller className="w-7 h-7" />
                                </div>
                                <CardTitle className="text-2xl">Residential Interior</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-6">Detail-oriented painting for your living spaces.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> Floor & Furniture Protection
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> Cabinet Refinishing
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> Perfect Trim Lines
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 2. Residential Exterior */}
                    <div ref={card2Ref}>
                        <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-default group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <Home className="w-7 h-7" />
                                </div>
                                <CardTitle className="text-2xl">Residential Exterior</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-6">Boost your curb appeal with durable finishes.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Pressure Washing Prep
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Weather-Resistant Paint
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-200">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Deck & Fence Staining
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 3. Commercial Services (Col Span 2) */}
                    <div ref={card3Ref} className="md:col-span-2">
                        <Card className="h-full border-red-900/30 bg-gradient-to-br from-black/80 to-zinc-900/80 backdrop-blur-md text-white shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center text-white mb-4 md:mb-0 shadow-lg border border-white/10 group-hover:bg-red-600 transition-colors duration-500">
                                        <Building2 className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                        Commercial & Office Painting
                                        <Badge className="bg-red-600 text-white border-0 text-xs">Business Preferred</Badge>
                                    </CardTitle>
                                    <p className="text-gray-300 leading-relaxed text-base">
                                        Reliable service for offices, retail, and property management.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <li className="flex items-center gap-3 text-sm text-gray-200 list-none">
                                            <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> Flexible Hours (Nights/Weekends)
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-200 list-none">
                                            <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> Licensed & Insured Crew
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-200 list-none">
                                            <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> Fast Turnover / No Downtime
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-200 list-none">
                                            <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" /> HOA Compliance Experts
                                        </li>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

            </div>
        </section>
    );
}
