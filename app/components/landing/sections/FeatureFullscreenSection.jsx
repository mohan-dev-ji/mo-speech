import FullscreenIcon from "../svgs/FullscreenIcon";
import Card3 from "../cards/Card3";
import Lottie from "lottie-react";
import FullscreenFeature from "../lottie/FullscreenFeature_SM.json";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import Card1 from "../cards/Card1";


// const lottieGif = "/path/to/your/voice-lottie.gif"; // Replace with actual gif path

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function FeatureFullscreenSection() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const lottieRef = useRef();
  const shouldPlay = isMobile ? inView : hovered;

  useEffect(() => {
    if (lottieRef.current) {
      if (shouldPlay) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [shouldPlay]);

  return (
    <section className="relative w-full flex flex-col items-center px-section-x-mobile md:px-section-x border-b-line-width border-brand-line">

      {/* Animated background ellipses */}
      <div className="absolute left-0 top-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] z-0 animate-ellipse-x blur-3xl opacity-40 pointer-events-none overflow-x-hidden" style={{background: "radial-gradient(circle at 50% 50%, #00b5cd33 100%, transparent 80%)"}} />
      <div className="absolute left-[5%] md:left-[10%] bottom-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] z-0 animate-ellipse-y blur-3xl opacity-30 pointer-events-none overflow-x-hidden" style={{background: "radial-gradient(circle at 50% 50%, #00b5cd33 100%, transparent 80%)"}} />
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-5xl py-16 gap-between-cards">
        {/* Lottie placeholder */}
        <div
          className="flex justify-center items-center"
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={FullscreenFeature}
            style={{ width: "70%", height: "70%" }}
            autoPlay={false}
          />
        </div>
        {/* Card3 */}
        <div className="w-full md:flex-1">
        <Card1
            icon={
              <div className="bg-brand-icon-bg-blue flex items-center justify-center p-[10px] rounded-full size-[55px]">
                <FullscreenIcon className="w-6 h-6" />
              </div>
            }
            title="Fullscreen Mode"
            description="Play symbols fullscreen to retain focus and clarity on what's being modelled"
            hoverShadow="hover:shadow-[0_8px_32px_0_rgba(16,205,100,0.25)]"
          />
          </div>
        {/* <Card3
          icon={<div className="bg-brand-icon-bg-green rounded-full flex items-center justify-center w-[80px] h-[80px]"><FullscreenIcon width={50} height={50} color="#00b5cd" /></div>}
          title="Fullscreen Mode"
          description="Switch to fullscreen for distraction-free AAC modelling sessions."
        /> */}
      </div>
      <style jsx>{`
        @keyframes ellipse-x {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0; }
          50% { transform: translateX(-200px) translateY(40px); opacity: 0.8; }
        }
        @keyframes ellipse-y {
          0%, 100% { transform: translateX(20px) translateY(0); opacity: 0; }
          50% { transform: translateX(40px) translateY(-50px); opacity: 0.8; }
        }
        .animate-ellipse-x { animation: ellipse-x 12s ease-in-out infinite alternate; }
        .animate-ellipse-y { animation: ellipse-y 14s ease-in-out infinite alternate; }
      `}</style>
    </section>
  );
} 