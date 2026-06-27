import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  ShieldCheck
} from "lucide-react";

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[380px] bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[28px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] p-6 md:p-8 text-white overflow-hidden relative"
    >
      {/* Subtle top light effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A017] to-[#B8860B] shadow-lg shadow-[#D4A017]/30 text-white mb-4"
        >
          <LogIn size={24} />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1.5">
          Welcome Back
        </h2>
        <p className="text-white/60 text-[13px] font-light">
          Continue your journey through Bihar
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-10 h-1 bg-[#D4A017] mx-auto mt-3 rounded-full"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative group">
          <motion.label
            initial={false}
            animate={{
              y: isEmailFocused || email ? -24 : 12,
              x: isEmailFocused || email ? 0 : 40,
              scale: isEmailFocused || email ? 0.8 : 1,
              color: isEmailFocused ? "#D4A017" : "rgba(255,255,255,0.4)"
            }}
            className="absolute left-0 pointer-events-none font-medium transition-all text-sm"
          >
            Email Address
          </motion.label>
          <div className="relative">
            <Mail
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isEmailFocused ? 'text-[#D4A017]' : 'text-white/30'}`}
            />
            <input
              type="email"
              value={email}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4A017] focus:ring-4 focus:ring-[#D4A017]/10 outline-none transition-all text-[13px] font-medium"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative group">
          <motion.label
            initial={false}
            animate={{
              y: isPasswordFocused || password ? -24 : 12,
              x: isPasswordFocused || password ? 0 : 40,
              scale: isPasswordFocused || password ? 0.8 : 1,
              color: isPasswordFocused ? "#D4A017" : "rgba(255,255,255,0.4)"
            }}
            className="absolute left-0 pointer-events-none font-medium transition-all text-sm"
          >
            Password
          </motion.label>
          <div className="relative">
            <Lock
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isPasswordFocused ? 'text-[#D4A017]' : 'text-white/30'}`}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4A017] focus:ring-4 focus:ring-[#D4A017]/10 outline-none transition-all text-[13px] font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#D4A017] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide px-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-4 h-4 border border-white/20 rounded bg-white/5 peer-checked:bg-[#D4A017] peer-checked:border-[#D4A017] transition-all" />
              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white/40 group-hover:text-white transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-[#D4A017] hover:text-[#FFC738] transition-colors uppercase">
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <motion.button
          type="submit"
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-[52px] bg-gradient-to-r from-[#D4A017] to-[#DAA520] hover:to-[#FFD700] text-white font-bold rounded-xl shadow-xl shadow-[#D4A017]/20 flex items-center justify-center gap-3 transition-all duration-300 group mt-2 overflow-hidden relative text-sm"
        >
          <span className="relative z-10">Sign In</span>
          <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-[1px] bg-white/10" />
        <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">OR</span>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      {/* Secondary Button */}
      <motion.button
        type="button"
        whileHover={{ y: -2, backgroundColor: "rgba(248, 245, 239, 0.05)" }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-white/80 hover:text-[#D4A017] hover:border-[#D4A017] transition-all duration-300 font-bold uppercase text-[10px] tracking-widest"
      >
        <UserPlus size={16} />
        Create Account
      </motion.button>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-white/30 uppercase tracking-widest font-bold">
        <ShieldCheck size={12} className="text-[#D4A017]" />
        Secure Protection
      </div>
    </motion.div>
  );
};

export default LoginCard;
