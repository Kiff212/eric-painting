"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, X, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Refs for Animation
  const container = useRef<HTMLElement>(null);
  const redLayer = useRef<HTMLDivElement>(null);
  const imageLayer = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Text Animation Refs
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const brushStrokeRef = useRef<SVGPathElement>(null);

  // Modal Refs
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // --- MODAL ANIMATION (Updated to useGSAP) ---
  useGSAP(() => {
    if (isModalOpen) {
      gsap.to(modalOverlayRef.current, { opacity: 1, duration: 0.3, display: "flex" });
      gsap.fromTo(modalContentRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    } else {
      gsap.to(modalContentRef.current, { y: 50, opacity: 0, scale: 0.95, duration: 0.2 });
      gsap.to(modalOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        onComplete: () => {
          if (modalOverlayRef.current) modalOverlayRef.current.style.display = "none";
          setFormSubmitted(false);
        }
      });
    }
  }, { dependencies: [isModalOpen] });


  useGSAP(() => {
    const tl = gsap.timeline();
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 1. Initial States
    gsap.set([cardRef.current], { y: 50, opacity: 0 });

    // Hide text elements initially
    gsap.set([badgeRef.current, line1Ref.current, line2Ref.current, line3Ref.current, descRef.current, buttonsRef.current], {
      y: 40,
      opacity: 0,
      rotate: 2
    });

    // Prepare Layers
    gsap.set([redLayer.current, imageLayer.current], {
      scale: 0,
      borderRadius: "100%",
    });

    // Prepare Brush Stroke 
    if (brushStrokeRef.current) {
      const length = brushStrokeRef.current.getTotalLength();
      gsap.set(brushStrokeRef.current, { strokeDasharray: length, strokeDashoffset: length });
    }

    // 2. Parallax Effect (ScrollTrigger)
    scrollTl.to(imageRef.current, {
      yPercent: 30,
      ease: "none"
    });

    // 3. Splash Animation Sequence
    tl
      // Red Blob Expand
      .to(redLayer.current, {
        scale: 3,
        duration: 1.2,
        ease: "power2.inOut",
      })
      // Image Layer Reveal
      .to(imageLayer.current, {
        scale: 3,
        duration: 1.4,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(imageLayer.current, { borderRadius: "0%" });
        }
      }, "-=0.9")

      // Card Appearance
      .to(cardRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5")

      // Text Stagger Entrance
      .to([badgeRef.current, line1Ref.current, line2Ref.current, line3Ref.current], {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.1, // Faster stagger
        ease: "back.out(1.7)", // Slight pop
      }, "-=0.8")

      // Brush Stroke Animation
      .to(brushStrokeRef.current, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power2.out" // Faster stroke
      }, "-=0.2")

      // Description & Buttons
      .to([descRef.current, buttonsRef.current], {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.6");

    // 4. Ken Burns (Zoom) 
    gsap.to(imageRef.current, {
      scale: 1.15,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container });

  // Handle Form Submit
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setFormSubmitted(true), 500);
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, enter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.05 : 1,
      duration: 0.3, // Snappier
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">

      {/* --- LAYER 1: RED SPLASH --- */}
      <div
        ref={redLayer}
        className="absolute z-10 bg-red-600 w-[50vmax] h-[50vmax] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-0"
      />

      {/* --- LAYER 2: MASTER IMAGE REVEAL (Red Wall) --- */}
      <div
        ref={imageLayer}
        className="absolute z-20 w-[50vmax] h-[50vmax] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl scale-0"
      >
        <div className="relative w-full h-full">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670"
            alt="Eric Painting - Red Wall Interior"
            className="w-full h-full object-cover origin-center scale-[1.05]"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div>
      </div>

      {/* --- MAIN CONTENT (GLASS CARD) --- */}
      {/* Changed max-w-2xl to max-w-3xl to allow text to fit better */}
      <div className="relative z-30 w-full max-w-3xl px-4 mt-8">
        <Card ref={cardRef} className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden opacity-0 translate-y-[50px]">
          <CardContent className="flex flex-col items-center text-center py-10 px-6 md:px-10">

            {/* TRUST BADGE */}
            <div ref={badgeRef} className="mb-6 transform hover:scale-105 transition-transform duration-300 opacity-0 translate-y-[40px] rotate-2">
              <Badge variant="secondary" className="bg-amber-400/90 hover:bg-amber-500 text-black px-3 py-1 text-xs font-bold shadow-lg border border-amber-200/50 flex gap-2 items-center">
                <Star className="w-3 h-3 fill-black" />
                Skilled & Detailed • Residential Painting
              </Badge>
            </div>

            {/* HEADLINE - SEO Optimized */}
            <div ref={titleGroupRef} className="space-y-2 mb-6">
              <h1 className="text-2xl md:text-5xl font-sans font-black text-white drop-shadow-xl tracking-tight leading-[1.1]">
                {/* Added whitespace-nowrap to prevent break */}
                <span ref={line1Ref} className="block whitespace-nowrap opacity-0 translate-y-[40px] rotate-2">TRANSFORM YOUR HOME!</span>
                <div className="block overflow-visible">
                  <span ref={line2Ref} className="text-red-500 italic relative whitespace-nowrap inline-block pr-2 opacity-0 translate-y-[40px] rotate-2">
                    EXPERT PAINTING
                    {/* Brush Stroke */}
                    <svg className="absolute w-[105%] h-[12px] -bottom-1 -left-[2%] z-[-1] opacity-90" viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path ref={brushStrokeRef} d="M5 10 Q 50 15, 100 10 T 195 10" stroke="#dc2626" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <span ref={line3Ref} className="block text-2xl md:text-4xl mt-1 text-gray-100 opacity-0 translate-y-[40px] rotate-2">IN RICHMOND & EAST BAY</span>
              </h1>
            </div>

            {/* DESCRIPTION - Stylized & Interesting */}
            <p ref={descRef} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium opacity-0 translate-y-[40px] rotate-2">
              Quality residential painting for <span className="text-white font-bold">interiors & exteriors</span>. <br className="hidden md:block" />
              We focus on <span className="text-white font-bold">clean preparation</span> and a <span className="text-white font-bold">flawless finish!</span> <br className="md:hidden" />
              <span className="inline-block mt-2 text-red-100 italic font-light tracking-wide border-b border-red-500/30 pb-0.5">"Your home treated with respect."</span>
            </p>

            {/* CTAs */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 w-full justify-center opacity-0 translate-y-[40px] rotate-2">
              <Button
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                className="bg-red-600 hover:bg-red-700 text-white h-12 px-6 text-base rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.5)] transition-all font-bold"
              >
                Get a Free Quote
              </Button>
              <Button
                variant="outline"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                className="bg-white/10 border-white/40 text-white hover:bg-white hover:text-black h-12 px-6 text-base rounded-full backdrop-blur-sm font-semibold"
              >
                View Portfolio
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* --- CUSTOM MODAL --- */}
      <div
        ref={modalOverlayRef}
        className="fixed inset-0 z-50 bg-black/80 hidden items-center justify-center p-4 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        <div
          ref={modalContentRef}
          className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8">
            {!formSubmitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get your Free Quote</h2>
                  <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className="bg-gray-50 border-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required className="bg-gray-50 border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(510) 555-0123" required className="bg-gray-50 border-gray-200" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Project Details (Optional)</Label>
                    <Input id="details" placeholder="Interior, Exterior, Cabinets..." className="bg-gray-50 border-gray-200" />
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-lg mt-2 shadow-md">
                    Request Quote
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-500 mb-6">Thanks, John. We'll be in touch shortly to schedule your estimate.</p>
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

    </section >
  );
}