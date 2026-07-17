import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Eye, EyeOff } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.newPassword);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.newPassword);
        const displayName = `${formData.firstName} ${formData.lastName}`.trim();
        if (displayName) {
          await updateProfile(userCredential.user, { displayName });
        }
      }
      
      const token = await userCredential.user.getIdToken();
      const res = await fetch('http://localhost:5000/api/v1/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (!res.ok) throw new Error('Backend sync failed');

      localStorage.setItem('isAuthenticated', 'true');
      navigate('/profile');
    } catch (error: any) {
      console.error("Auth error", error);
      alert(error.message || "Failed to authenticate");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const token = await userCredential.user.getIdToken();
      const res = await fetch('http://localhost:5000/api/v1/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (!res.ok) throw new Error('Backend sync failed');

      localStorage.setItem('isAuthenticated', 'true');
      navigate('/profile');
    } catch (error: any) {
      console.error("Error signing in with Google", error);
      alert(error.message || "Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      <Navbar forceWhiteText={true} />

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 transition-all duration-700"
        style={{
          backgroundImage: `url('src/assets/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          transform: 'scale(1.1)'
        }}
      />

      <div className="absolute inset-0 bg-black/40 z-1" />

      {/* MAIN INTERFACE CARD */}
      <div className="relative z-10 w-full max-w-md p-6 mx-4">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl px-6 py-10 md:px-8 md:py-12 text-white transition-all duration-500">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join the Journey'}
            </h2>
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              {isLogin ? 'Sign in to your account' : 'Create an account to explore Bihar'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-brand-gold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all placeholder:text-gray-500 text-white"
                    placeholder="Rahul"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-brand-gold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all placeholder:text-gray-500 text-white"
                    placeholder="Kumar"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-brand-gold">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all placeholder:text-gray-500 text-white"
                placeholder="name@example.com"
                required
              />
            </div>

            {/* NEW PASSWORD FIELDS */}
            <div className={`${!isLogin ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}`}>
              <div className="w-full relative">
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-brand-gold">
                  {isLogin ? 'Password' : 'New Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    onChange={handleInputChange}
                    className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all placeholder:text-gray-500 text-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-all focus:outline-none cursor-pointer shadow-sm"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="w-full relative animate-in fade-in slide-in-from-right-2 duration-300">
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5 ml-1 text-brand-gold">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleInputChange}
                      className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/20 outline-none transition-all placeholder:text-gray-500 text-white"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black transition-all focus:outline-none cursor-pointer shadow-sm"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-end text-xs">
                <Link to="/forgot-password" className="text-brand-gold hover:text-amber-300 transition-colors font-medium">Forgot password?</Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-4 bg-gold-dark hover:bg-accent-brown text-white font-bold rounded-2xl shadow-xl shadow-amber-950/40 transition-all active:scale-[0.97] mt-4 uppercase tracking-widest text-sm cursor-pointer"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-white/40 text-xs font-semibold uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all active:scale-[0.97] flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-gold font-bold hover:underline decoration-2 underline-offset-4 bg-transparent border-none cursor-pointer"
            >
              {isLogin ? 'Register now' : 'Sign in instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;