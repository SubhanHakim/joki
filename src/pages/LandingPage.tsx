import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import WorkflowVisualizer from '../components/landing/WorkflowVisualizer';
import SystemDirectives from '../components/landing/SystemDirectives';
import TrustArchitecture from '../components/landing/TrustArchitecture';
import InitializeSection from '../components/landing/InitializeSection';
import Footer from '../components/landing/Footer';
import Lenis from 'lenis';
import { useEffect } from 'react';

// Declare lenis on window
declare global {
    interface Window {
        lenis: any;
    }
}

export default function LandingPage() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Expose to window so Navbar can use it
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            // @ts-ignore
            delete window.lenis;
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200 animate-fade-in">

            {/* Background - Dot Pattern */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}>
            </div>

            {/* Gradient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
            </div>

            <Navbar />

            <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center justify-center pt-20 md:pt-32 pb-20">
                <HeroSection />
                <WorkflowVisualizer />
                <SystemDirectives />
                <TrustArchitecture />
                <InitializeSection />
            </main>

            <Footer />
        </div>
    )
}
