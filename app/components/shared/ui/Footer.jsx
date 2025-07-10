import Logo from "../Logo";
import Link from "next/link";
import IconFacebook from "../../landing/svgs/IconFacebook";
import IconInstagram from "../../landing/svgs/IconInstagram";
import IconLinkedIn from "../../landing/svgs/IconLinkedIn";
import IconTikTok from "../../landing/svgs/IconTikTok";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "About", href: "/#about", id: "about" },
  { name: "Features", href: "/#features", id: "features" },
  { name: "Guide", href: "/guide" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 96; // h-24 = 96px
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <footer className="w-full bg-brand-background border-t border-brand-line pt-10 pb-6 px-4 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* 3-column layout */}
        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-0">
          {/* Logo - left, start */}
          <div className="flex-1 flex justify-center md:justify-start items-center mb-4 md:mb-0">
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  router.push("/");
                }
              }}
              className="cursor-pointer"
              aria-label="Home"
            >
              <Logo className="h-8 w-auto" />
            </a>
          </div>
          {/* Navigation links - center */}
          <nav className="flex-1 flex justify-center items-center">
            <div className="flex flex-row gap-8 text-small text-brand-text-secondary">
              {navLinks.map(link => (
                link.id ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={e => handleSmoothScroll(e, link.id)}
                    className="hover:text-brand-text transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link key={link.name} href={link.href} className="hover:text-brand-text transition-colors">
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </nav>
          {/* Social icons - right, end */}
          <div className="flex-1 flex justify-center md:justify-end items-center mt-4 md:mt-0">
            <div className="flex flex-row gap-3 items-center">
              <a href="https://www.facebook.com/profile.php?id=61575867855198" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-text transition-colors"><IconFacebook className="w-6 h-6" /></a>
              <a href="https://www.instagram.com/mospeechaac/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-text transition-colors"><IconInstagram className="w-6 h-6" /></a>
              <a href="https://www.tiktok.com/@mospeechaac" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-brand-text transition-colors"><IconTikTok className="w-6 h-6" /></a>
              <a href="https://www.linkedin.com/company/107264299/admin/dashboard/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-brand-text transition-colors"><IconLinkedIn className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-brand-line" />
        {/* Copyright */}
        <div className="flex flex-row gap-6 items-center justify-center text-p-ui text-brand-text-secondary">
          <span>&copy; {new Date().getFullYear()} Mo Speech. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
