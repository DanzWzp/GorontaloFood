import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Galeri 3D", href: "#model" },
    { label: "Ilabulo", href: "#about" },
    { label: "Binte Biluhuta", href: "#about-binte" },
    { label: "Tili Aya", href: "#about-tiliaya" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "backdrop-blur-md bg-charcoal/70 shadow-lg"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-wide text-cream"
        >
          GorontaloFood<span className="text-main">.</span>
        </a>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {links.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-cream/80 transition duration-200 hover:text-main"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Menu Mobile */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          <span className="w-6 h-0.5 bg-cream"></span>
          <span className="w-6 h-0.5 bg-cream"></span>
          <span className="w-6 h-0.5 bg-cream"></span>
        </button>

        {/* Dropdown Mobile */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-charcoal/90 backdrop-blur-md flex flex-col items-center py-4 space-y-3 shadow-md md:hidden"
          >
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium text-cream/80 transition duration-200 hover:text-main"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
