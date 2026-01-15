"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-zinc-950 text-gray-300 py-16 border-t border-white/10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                            Eric's <span className="text-red-600">Pro Painting</span>
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Transforming homes and businesses in Richmond and the East Bay with precision, quality, and respect.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-gray-400">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-gray-400">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-gray-400">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Services</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Our Process</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Portfolio</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Get a Quote</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-red-500 transition-colors">Interior Painting</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Exterior Painting</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Commercial Painting</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Cabinet Refinishing</a></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Deck Staining</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                                <span>(510) 555-0123</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                                <span>hello@ericspropainting.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                                <span>Richmond, CA & Serving the entire East Bay Area</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {currentYear} Eric's Pro Painting. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
