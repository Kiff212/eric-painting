"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, ChevronRight, Home, Building2, PaintRoller, ArrowRight, Loader2, MapPin, User, Mail, Phone, Calendar, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function QuoteWizard() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: "", // interior, exterior, commercial
        size: "1 Room",
        zip: "",
        timeline: "",
        propertyType: "Currently Occupied",
        name: "",
        phone: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    // --- VALIDATION LOGIC (Custom Zod-like) ---
    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.serviceType) {
                newErrors.serviceType = "Please select a service type.";
                isValid = false;
            }
        }

        if (currentStep === 2) {
            if (!formData.zip || !/^\d{5}$/.test(formData.zip)) {
                newErrors.zip = "Please enter a valid 5-digit Zip Code.";
                isValid = false;
            }
            if (!formData.timeline) {
                newErrors.timeline = "Please select a timeline.";
                isValid = false;
            }
        }

        if (currentStep === 3) {
            if (!formData.name) { newErrors.name = "Name is required."; isValid = false; }
            if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) { newErrors.email = "Valid email is required."; isValid = false; }
            if (!formData.phone) { newErrors.phone = "Phone is required."; isValid = false; }
        }

        setErrors(newErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            // Animate Out
            gsap.to(formRef.current, {
                x: -20,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    setStep(s => s + 1);
                    // Animate In
                    gsap.fromTo(formRef.current,
                        { x: 20, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.3, clearProps: "all" }
                    );
                }
            });
        } else {
            // Shake animation for error
            gsap.fromTo(formRef.current, { x: -5 }, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
        }
    };

    const prevStep = () => {
        setStep(s => s - 1);
    };

    const handleSubmit = async () => {
        if (validateStep(3)) {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(r => setTimeout(r, 1500));
            setIsSubmitting(false);
            setIsSuccess(true);
        } else {
            gsap.fromTo(formRef.current, { x: -5 }, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" })); // Clear error on type
        }
    };

    return (
        <section className="w-full py-24 bg-white relative">
            <div className="container mx-auto px-4 max-w-4xl">

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Request Your Quote</h2>
                    <p className="text-gray-500">Tell us about your project. It only takes 2 minutes.</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden max-w-md mx-auto shadow-inner">
                    <div
                        className="h-full bg-red-600 transition-all duration-500 ease-out relative overflow-hidden"
                        style={{ width: `${(step / 3) * 100}%` }}
                    >
                        <div className="absolute inset-0 bg-white/30 skew-x-12 animate-[shimmer_2s_infinite]" />
                    </div>
                </div>

                {/* Form Container */}
                <div ref={containerRef} className="bg-white border md:border-gray-200 md:shadow-2xl md:shadow-red-900/5 rounded-2xl p-6 md:p-10 min-h-[450px] relative overflow-hidden">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <Check className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Quote Requested!</h3>
                            <p className="text-gray-500 mb-8 max-w-md">Thank you, {formData.name}. We have received your details and will call you at <span className="font-bold text-gray-900">{formData.phone}</span> shortly.</p>
                            <Button onClick={() => window.location.reload()} variant="outline" className="border-2 hover:bg-gray-50">Back to Home</Button>
                        </div>
                    ) : (
                        <div ref={formRef}>

                            {/* --- STEP 1: THE PROJECT --- */}
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="space-y-2 text-center md:text-left">
                                        <h3 className="text-2xl font-bold flex items-center gap-2"><PaintRoller className="w-6 h-6 text-red-600" /> What are we painting?</h3>
                                        {errors.serviceType && <p className="text-red-500 text-sm font-medium animate-pulse">{errors.serviceType}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        {[
                                            { id: "interior", icon: <PaintRoller />, label: "Interior" },
                                            { id: "exterior", icon: <Home />, label: "Exterior" },
                                            { id: "commercial", icon: <Building2 />, label: "Commercial" }
                                        ].map((option) => (
                                            <div
                                                key={option.id}
                                                onClick={() => handleInputChange("serviceType", option.id)}
                                                className={`cursor-pointer rounded-xl border-2 p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:shadow-lg
                                            ${formData.serviceType === option.id
                                                        ? "border-red-600 bg-red-50 ring-1 ring-red-600 shadow-md transform scale-105"
                                                        : "border-gray-100 bg-gray-50/50 hover:border-red-200 hover:bg-white"}
                                        `}
                                            >
                                                <div className={`p-4 rounded-full bg-white shadow-sm ${formData.serviceType === option.id ? "text-red-600" : "text-gray-400"}`}>
                                                    {option.icon}
                                                </div>
                                                <span className={`font-bold text-lg ${formData.serviceType === option.id ? "text-red-900" : "text-gray-600"}`}>{option.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-base font-semibold">Estimated Size</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {["1 Room", "2-3 Rooms", "Whole House", "Specific Area"].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => handleInputChange("size", s)}
                                                    className={`py-3 px-4 rounded-lg text-sm font-semibold border-2 transition-all duration-200
                                                ${formData.size === s ? "bg-zinc-900 text-white border-zinc-900 shadow-lg transform -translate-y-1" : "bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50"}
                                            `}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button onClick={nextStep} className="w-full md:w-auto bg-red-600 text-white h-14 px-8 text-lg hover:bg-red-700 shadow-xl shadow-red-600/20 font-bold rounded-xl transition-transform active:scale-95">
                                            Next: Property Details <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* --- STEP 2: LOCATION --- */}
                            {step === 2 && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold flex items-center gap-2"><MapPin className="w-6 h-6 text-red-600" /> Location & Timeline</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="zip" className="text-base">Zip Code</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    id="zip"
                                                    placeholder="e.g. 94804"
                                                    maxLength={5}
                                                    value={formData.zip}
                                                    onChange={(e) => handleInputChange("zip", e.target.value)}
                                                    className={`pl-10 h-12 text-lg ${errors.zip ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.zip && <p className="text-red-500 text-xs font-medium">{errors.zip}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-base">Property Status</Label>
                                            <div className="relative">
                                                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <select
                                                    className="flex h-12 w-full rounded-md border border-gray-200 bg-background pl-10 pr-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={formData.propertyType}
                                                    onChange={(e) => handleInputChange("propertyType", e.target.value)}
                                                >
                                                    <option>Currently Occupied</option>
                                                    <option>Vacant / Moving in</option>
                                                    <option>New Construction</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-base">When do you need this done?</Label>
                                        <div className="flex flex-col gap-3">
                                            {["As soon as possible", "Next 2 weeks", "Flexible"].map((t) => (
                                                <div
                                                    key={t}
                                                    onClick={() => handleInputChange("timeline", t)}
                                                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                                                ${formData.timeline === t ? "border-red-600 bg-red-50/50 shadow-md" : "border-gray-100 hover:border-red-200 hover:bg-white"}
                                            `}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                                                ${formData.timeline === t ? "border-red-600" : "border-gray-300 group-hover:border-red-300"}
                                            `}>
                                                        {formData.timeline === t && <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />}
                                                    </div>
                                                    <span className={`font-semibold text-lg ${formData.timeline === t ? "text-red-900" : "text-gray-700"}`}>{t}</span>
                                                    <Calendar className={`ml-auto w-5 h-5 ${formData.timeline === t ? "text-red-500" : "text-gray-300"}`} />
                                                </div>
                                            ))}
                                        </div>
                                        {errors.timeline && <p className="text-red-500 text-xs font-medium">{errors.timeline}</p>}
                                    </div>

                                    <div className="flex justify-between pt-6">
                                        <Button variant="ghost" onClick={prevStep} className="hover:bg-gray-100 text-gray-600">Back</Button>
                                        <Button onClick={nextStep} className="bg-zinc-900 text-white h-12 px-8 hover:bg-black shadow-lg rounded-xl font-bold">
                                            Next: Contact Info <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* --- STEP 3: CONTACT --- */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-2"><ClipboardList className="w-6 h-6 text-red-600" /> Final Details</h3>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-base">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    placeholder="John Doe"
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    className={`pl-10 h-12 ${errors.name ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-base">Email</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                                        className={`pl-10 h-12 ${errors.email ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                    />
                                                </div>
                                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-base">Phone</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="(510) 555-0123"
                                                        value={formData.phone}
                                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                                        className={`pl-10 h-12 ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Any specific details? (Optional)</Label>
                                            <textarea
                                                id="message"
                                                className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={formData.message}
                                                placeholder="I have a vaulted ceiling..."
                                                onChange={(e) => handleInputChange("message", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-6">
                                        <Button variant="ghost" onClick={prevStep} disabled={isSubmitting} className="hover:bg-gray-100 text-gray-600">Back</Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="bg-red-600 text-white h-14 px-8 w-full md:w-auto shadow-xl hover:bg-red-700 font-bold rounded-xl text-lg transition-all active:scale-95"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                                                </>
                                            ) : (
                                                <>Get My Free Quote <ArrowRight className="w-5 h-5 ml-2" /></>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
