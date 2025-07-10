"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../shared/Logo";
import { Button } from "../shared/ui/button";

export default function AppHeader() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("Manual sign out triggered");
    try {
      await signOut();
      console.log("Sign out successful");
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      router.push("/");
    }
  };

  const handleLogoClick = () => {
    console.log("Logo clicked, navigating to landing page");
    router.push("/");
  };

  return (
    <header className="bg-brand-background shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex justify-between items-center py-4">
          <div onClick={handleLogoClick} className="hover:opacity-80 transition-opacity cursor-pointer">
            <Logo className="h-8 w-auto" />
          </div>
          <Button variant="secondary" size="nav" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
} 