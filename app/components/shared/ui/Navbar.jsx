"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Lottie from 'lottie-react';
import Logo from '../Logo';
import { Button } from './button';
import ThemeToggle from './ThemeToggle';
import menuToCloseAnimation from '../../landing/lottie/menu_to_close.json';


// Hamburger menu with Lottie animation
const HamburgerIcon = ({ isOpen, ...props }) => {
  const lottieRef = useRef();
  
  useEffect(() => {
    if (lottieRef.current) {
      if (isOpen) {
        // Play the animation to the "open" state (hamburger to X)
        lottieRef.current.playSegments([0, 43], true);
      } else {
        // Play the animation to the "closed" state (X to hamburger)
        lottieRef.current.playSegments([43, 0], true);
      }
    }
  }, [isOpen]);

  return (
    <div className="w-8 h-8" {...props}>
      {/* 
        To use your own Lottie animation:
        1. Add your hamburger menu Lottie JSON file to app/components/landing/lottie/
        2. Replace the path below with your file name
        3. Adjust the frame numbers in the useEffect above based on your animation
      */}
      <Lottie
        lottieRef={lottieRef}
        animationData={menuToCloseAnimation}
        loop={false}
        autoplay={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useAuth();
  const { openSignIn, signOut } = useClerk();
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuOpen(false); // Close mobile menu if open
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      router.push("/");
    }
  };

  const handleSignIn = () => {
    console.log("Opening sign in");
    openSignIn({
      redirectUrl: "/app"
    });
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 96; // h-24 = 96px
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If not on home page, navigate to home page with hash
      router.push(`/#${targetId}`);
    }
  };

  // Handle hash navigation when page loads
  useEffect(() => {
    if (window.location.pathname === '/' && window.location.hash) {
      const targetId = window.location.hash.substring(1); // Remove the # symbol
      const element = document.getElementById(targetId);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          const navbarHeight = 96; // h-24 = 96px
          const elementPosition = element.offsetTop - navbarHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full border-b-line-width border-brand-line shadow-lg transition-all duration-[1000ms] ease-out ${
      menuOpen 
        ? 'bg-transparent' 
        : 'bg-brand-background/80 backdrop-blur-md'
    }`}>
      <div className="mx-auto grid h-24 max-w-[1920px] grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo - Left Third */}
        <div className="flex justify-start z-50 relative">
          <Link href="/" className="hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation - Center Third */}
        <div className="hidden md:flex items-center justify-center gap-8">
          <Button 
            variant="default"
            onClick={(e) => handleSmoothScroll(e, 'about')}
          >
            About
          </Button>
          <Button 
            variant="default"
            onClick={(e) => handleSmoothScroll(e, 'features')}
          >
            Features
          </Button>
          <Link href="/guide">
            <Button variant="default">User Guide</Button>
          </Link>
          <Link href="/contact">
            <Button variant="default">Contact</Button>
          </Link>
        </div>

        {/* Desktop Auth - Right Third */}
        <div className="hidden md:flex justify-end items-center gap-4">
          <ThemeToggle />
          {isSignedIn ? (
            <Button variant="secondary" size="nav" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button variant="secondary" size="nav" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button - Positioned in right third */}
        <button
          className="md:hidden flex items-center justify-center px-4 focus:outline-none col-start-3 justify-self-end z-50"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <HamburgerIcon isOpen={menuOpen} />
        </button>
      </div>

              {/* Mobile Dropdown */}
        {mounted && (
          <div 
            className={`md:hidden fixed top-0 left-0 w-full bg-brand-background/80 backdrop-blur-xl z-[35] ${
              menuOpen 
                ? 'opacity-100 scale-y-100 origin-top' 
                : 'opacity-0 scale-y-0 origin-top pointer-events-none'
            }`}
            style={{ 
              height: '100vh',
              transition: 'opacity 720ms ease-out, transform 720ms ease-out'
            }}
            // style={{ 
            //   WebkitBackdropFilter: 'blur(20px)',
            //   backdropFilter: 'blur(20px)'
            // }}
          >
          <div className="flex flex-col items-center justify-center h-screen gap-6 px-4">
            <div className="w-11/12 max-w-sm">
              <Button 
                variant="default" 
                className="w-full" 
                onClick={(e) => {
                  handleSmoothScroll(e, 'about');
                  setMenuOpen(false);
                }}
              >
                About
              </Button>
            </div>
            <div className="w-11/12 max-w-sm">
              <Button 
                variant="default" 
                className="w-full" 
                onClick={(e) => {
                  handleSmoothScroll(e, 'features');
                  setMenuOpen(false);
                }}
              >
                Features
              </Button>
            </div>
            <div className="w-11/12 max-w-sm">
              <Link href="/guide" onClick={() => setMenuOpen(false)}>
                <Button variant="default" className="w-full">User Guide</Button>
              </Link>
            </div>
            <div className="w-11/12 max-w-sm">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                <Button variant="default" className="w-full">Contact</Button>
              </Link>
            </div>
            <div className="w-11/12 max-w-sm flex justify-center">
              <ThemeToggle />
            </div>
            <div className="w-11/12 max-w-sm">
              {isSignedIn ? (
                <Button variant="secondary" size="nav" onClick={handleSignOut} className="w-full">
                  Sign Out
                </Button>
              ) : (
                <Button variant="secondary" size="nav" onClick={() => {
                  handleSignIn();
                  setMenuOpen(false);
                }} className="w-full">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
        )}
    </nav>
  );
} 