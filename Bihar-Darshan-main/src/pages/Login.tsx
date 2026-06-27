import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import loginBg from '../assets/hero.png';
import logo from '../assets/logo.png';
import LoginCard from '../components/districts/LoginCard';

const LoginPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">

      {/* 1. HEADER SECTION */}
      <header className="absolute top-0 left-0 p-8 md:p-12 z-20 flex flex-col items-start gap-4">
        <Link to="/" className="block">
          <img
            src={logo}
            alt="Bihar Darshan"
            className="h-12 md:h-16 w-auto object-contain drop-shadow-2xl"
          />
        </Link>

        <nav>
          <Link to="/" className="text-white/60 hover:text-white transition-all text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* 2. BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-black"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${loginBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px) brightness(0.6)',
          }}
        />
      </div>

      {/* 3. GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/60 z-1" />

      {/* 4. LOGIN INTERFACE (Card) */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
