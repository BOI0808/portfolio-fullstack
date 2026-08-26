"use client";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 pt-6 pb-4 px-8 md:px-24 flex justify-between items-center">
      <div className="text-3xl font-bold text-white tracking-wide">
        Khoi<span className="text-[#a855f7]">&lt;/&gt;</span>
      </div>
      <div className="hidden md:flex space-x-8 text-lg text-gray-300">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
