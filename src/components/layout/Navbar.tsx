import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const navItems = [
  "Home",
  "Districts",
  "Culture",
  "Community",
  "Tourism",
  "Tribes",
  "MarketPlace",
  "Gallery"
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const getInitialLang = () => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      if (match[1] === "hi") return "Hindi";
    }
    return "English";
  };
  const [lang, setLang] = useState(getInitialLang());
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const handleLanguageChange = (l: string) => {
    setLang(l);
    setLangOpen(false);
    
    const langMap: Record<string, string> = {
      "English": "en",
      "Hindi": "hi"
    };
    const langCode = langMap[l] || "en";
    
    // Set the cookie used by Google Translate
    const cookieVal = langCode === "en" ? "/en/en" : `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=.${window.location.host}; path=/`;
    
    // Reload the page to apply the translation natively
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPath = (item: string) => {
    if (item === "Home") return "/";
    if (item === "Districts") return "/districts";
    if (item === "Culture") return "/culture";
    if (item === "Community") return "/community";
    if (item === "MarketPlace") return "/marketplace";
    if (item === "Tourism") return "/tourism";
    if (item === "Tribes") return "/tribals";
    if (item === "Gallery") return "/gallery";
    return `/#${item.toLowerCase()}`;
  };

  const isActive = (item: string) => {
    if (item === "Home" && location.pathname === "/") return true;
    if (item === "Districts" && location.pathname === "/districts") return true;
    if (item === "Culture" && location.pathname === "/culture") return true;
    if (item === "Community" && (location.pathname === "/community" || location.pathname === "/Community")) return true;
    if (item === "MarketPlace" && (location.pathname === "/marketplace" || location.pathname === "/Marketplace")) return true;
    if (item === "Tourism" && location.pathname === "/tourism") return true;
    if (item === "Tribes" && location.pathname === "/tribals") return true;
    if (item === "Gallery" && location.pathname === "/gallery") return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${scrolled
      ? "bg-white/80 backdrop-blur-2xl shadow-md border-b border-black/5 py-3"
      : "bg-transparent py-5"
      }`}>
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Bihar Darshan"
            className={`h-10 sm:h-12 w-auto object-contain transition-all duration-500 ${scrolled ? "brightness-0" : ""
              }`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item}
              to={getPath(item)}
              className={`relative text-sm font-semibold transition-all duration-300 ${scrolled
                ? "text-black/70 hover:text-gold"
                : "text-white/90 hover:text-gold"
                } ${isActive(item) ? (scrolled ? "text-gold" : "text-gold") : ""}`}
            >
              {item}
              {isActive(item) && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-gold rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-2 px-4 h-9 rounded-xl border transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider ${scrolled
                ? "border-black/10 text-black hover:bg-black/5"
                : "border-white/15 text-white hover:bg-white/5"
                }`}
            >
              <Globe size={14} />
              {lang}
              <span className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {langOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-white dark:bg-zinc-900 border border-black/5 shadow-xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {["English", "Hindi"].map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${lang === l
                      ? "bg-gold text-black"
                      : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/profile"
            className={`hidden lg:block px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider ${scrolled
              ? "text-black hover:bg-black/5"
              : "text-white hover:bg-white/5"
              }`}
          >
            Profile
          </Link>

          <Link
            to="/login"
            className={`hidden lg:block px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider ${scrolled
              ? "text-black hover:bg-black/5"
              : "text-white hover:bg-white/5"
              }`}
          >
            Login
          </Link>

          <button className="hidden md:block px-5 h-9 rounded-xl bg-gold hover:bg-gold-dark text-black font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-md">
            Share Your Story
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`xl:hidden p-1 transition-colors ${scrolled ? "text-black" : "text-white"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="xl:hidden mt-3 rounded-3xl bg-white dark:bg-black shadow-2xl border border-black/5 p-8">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                to={getPath(item)}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-bold transition-colors ${isActive(item) ? "text-gold" : "text-black/80 dark:text-white/90"
                  }`}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className={`text-lg font-bold transition-colors ${location.pathname === "/profile" ? "text-gold" : "text-black/80 dark:text-white/90"}`}
            >
              Profile
            </Link>
            <div className="h-px bg-black/5 dark:bg-white/5 my-2" />
            <div className="flex gap-4">
              {["English", "Hindi"].map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`text-sm font-bold uppercase tracking-wider ${lang === l ? "text-gold" : "text-black/40 dark:text-white/40"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
