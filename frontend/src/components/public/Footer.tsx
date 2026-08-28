const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Footer() {
  return (
    <footer className="bg-[#05030a] py-8 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-8 md:px-24 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold text-white tracking-wide">
          Khoi<span className="text-[#a855f7]">&lt;/&gt;</span>
        </div>
        <div className="text-base text-gray-500">
          © {new Date().getFullYear()} All rights reserved
        </div>
        <div className="flex space-x-6 text-base text-gray-400">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
