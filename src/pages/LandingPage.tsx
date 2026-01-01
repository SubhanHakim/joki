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
        <div className="min-h-screen relative overflow-hidden font-sans selection:bg-green-100 selection:text-green-900 animate-fade-in">

            <Navbar />

            <HeroSection />

            <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center justify-center pb-20">
                <WorkflowVisualizer />
                <SystemDirectives />
                <TrustArchitecture />
                <InitializeSection />
            </main>

            <Footer />
        </div>
    )
}
