import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Camera } from 'lucide-react';
import Room3D from '@/components/Room3D';
import GlassPanel from '@/components/GlassPanel';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuth();
  
  const [mode, setMode] = useState<'signin' | 'signup'>(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'signup') {
      if (form.password !== form.confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      const result = await signUp(form.name, form.email, form.phone, form.password);
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/');
      } else {
        toast.error(result.error || 'Sign up failed');
      }
    } else {
      const result = await signIn(form.email, form.password);
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/');
      } else {
        toast.error(result.error || 'Sign in failed');
      }
    }
    setIsLoading(false);
  };

  return (
    <Room3D className="min-h-screen flex items-center justify-center px-3 md:px-4 py-12 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 md:gap-2.5 mb-8 md:mb-10">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-gold-gradient flex items-center justify-center shadow-glow flex-shrink-0">
            <Camera className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-lg md:text-xl font-bold text-foreground">Gupta Album</h1>
            <p className="text-xs text-muted-foreground">Wedding Photos</p>
          </div>
        </Link>

        <GlassPanel className="p-7 md:p-8 border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-transparent shadow-lg" hover={false}>
          <div className="flex gap-2 mb-6 md:mb-7">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as 'signin' | 'signup')}
                className={`flex-1 py-2.5 md:py-3 rounded-lg font-medium text-xs md:text-sm transition-all ${
                  mode === m ? 'bg-gold-gradient text-primary-foreground shadow-glow' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3">
            {mode === 'signup' && (
              <>
                <input type="text" placeholder="Full Name *" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} className="w-full p-3 md:p-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary outline-none text-xs md:text-sm" required />
                <input type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full p-3 md:p-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary outline-none text-xs md:text-sm" required />
              </>
            )}
            <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} className="w-full p-3 md:p-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary outline-none text-xs md:text-sm" required />
            <input type="text" placeholder="Password *" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} className="w-full p-3 md:p-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary outline-none text-xs md:text-sm" required />
            {mode === 'signup' && (
              <input type="text" placeholder="Confirm Password *" value={form.confirmPassword} onChange={(e) => setForm(p => ({ ...p, confirmPassword: e.target.value }))} className="w-full p-3 md:p-3.5 rounded-lg bg-background/50 border border-border/50 focus:border-primary outline-none text-xs md:text-sm" required />
            )}
            <Button type="submit" disabled={isLoading} className="w-full btn-gold text-primary-foreground py-3 h-auto rounded-lg font-semibold text-sm md:text-base mt-4 md:mt-5">
              {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </GlassPanel>
      </motion.div>
    </Room3D>
  );
};

export default Auth;
