"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Hide header if scrolled down more than 50px
            if (window.scrollY > 50) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        >
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">

                {/* LOGO */}
                <div className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
                    Eric's <span className="text-red-600">Pro Paint</span>
                </div>

                {/* Optional Right Side Call to Action (Subtle) */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="#contact" className="flex items-center gap-2 text-white font-semibold hover:text-red-500 transition-colors">
                        <Phone className="w-5 h-5" />
                        (510) 555-0123
                    </a>
                    <Button className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-6">
                        Get a Quote
                    </Button>
                </div>

            </div>
        </header>
    );
}
