import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/new-logo.png";

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Districts", path: "/districts" },
  { label: "Discover", path: "/discover" },
  { label: "Community", path: "/community" },
  { label: "Tourism", path: "/tourism" },
  { label: "Tribes", path: "/tribals" },
  { label: "MarketPlace", path: "/marketplace" },
  { label: "Gallery", path: "/gallery" }
];

interface NavbarProps {
  forceDarkText?: boolean;
}

const Navbar = ({ forceDarkText = false }: NavbarProps = {}) => {
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

  // Simple check for authentication mock
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';

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

  const isActive = (item: NavItem) => {
    if (item.label === "Home" && location.pathname === "/") return true;
    if (item.label === "Districts" && location.pathname === "/districts") return true;
    if (item.label === "Discover" && (location.pathname === "/discover" || location.pathname === "/culture" || location.pathname === "/personalities")) return true;
    if (item.label === "Community" && (location.pathname === "/community" || location.pathname === "/Community")) return true;
    if (item.label === "MarketPlace" && (location.pathname === "/marketplace" || location.pathname === "/Marketplace")) return true;
    if (item.label === "Tourism" && location.pathname === "/tourism") return true;
    if (item.label === "Tribes" && location.pathname === "/tribals") return true;
    if (item.label === "Gallery" && location.pathname === "/gallery") return true;
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${scrolled
      ? "bg-white/80 backdrop-blur-2xl shadow-md border-b border-black/5 py-2"
      : "bg-transparent py-3"
      }`}>
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Bihar Darshan"
            className={`h-10 lg:h-12 w-auto object-contain transition-all duration-500 drop-shadow-md ${!scrolled && !forceDarkText ? "brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""
              }`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <Link
                to={item.path}
                className={`relative flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${scrolled || forceDarkText
                  ? "text-black/70 hover:text-gold"
                  : "text-white/90 hover:text-gold"
                  } ${isActive(item) ? "text-gold" : ""}`}
              >
                {item.label}
                {isActive(item) && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gold rounded-full" />
                )}
              </Link>
            </div>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-2 px-4 h-9 rounded-xl border transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider ${scrolled || forceDarkText
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

          {isAuthenticated ? (
            <Link
              to="/profile"
              className={`hidden lg:block px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider ${scrolled || forceDarkText
                ? "text-black hover:bg-black/5"
                : "text-white hover:bg-white/5"
                }`}
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className={`hidden lg:block px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider ${scrolled || forceDarkText
                ? "text-black hover:bg-black/5"
                : "text-white hover:bg-white/5"
                }`}
            >
              Login
            </Link>
          )}

          {/* Removed Share Your Story button as requested */}

          {/* Mobile Menu Toggle */}
          <button
            className={`xl:hidden p-1 transition-colors ${scrolled || forceDarkText ? "text-black" : "text-white"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="xl:hidden absolute top-full left-4 right-4 mt-3 rounded-3xl bg-white dark:bg-black shadow-2xl border border-black/5 p-8 max-h-[80vh] overflow-y-auto z-[250]">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-bold transition-colors ${isActive(item) ? "text-gold" : "text-black/80 dark:text-white/90"
                    }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            {isAuthenticated ? (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-bold transition-colors ${location.pathname === "/profile" ? "text-gold" : "text-black/80 dark:text-white/90"}`}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-bold transition-colors ${location.pathname === "/login" ? "text-gold" : "text-black/80 dark:text-white/90"}`}
              >
                Login
              </Link>
            )}
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
