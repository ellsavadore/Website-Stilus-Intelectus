import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { trpc } from '@/providers/trpc';

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const credentialsNeeded = !import.meta.env.VITE_APP_ID || import.meta.env.VITE_APP_ID.includes('your_');

  const demoLoginMutation = trpc.auth.demoLogin.useMutation({
    onSuccess: () => {
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    },
    onError: (error) => {
      console.error('Demo login failed:', error);
      setIsLoading(false);
    },
  });

  const handleOAuthLogin = () => {
    setIsLoading(true);
    window.location.href = getOAuthUrl();
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    demoLoginMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-stilus-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stilus-crimson/20 mb-6">
            <Lock className="w-8 h-8 text-stilus-crimson" />
          </div>
          <h1 className="font-display text-[36px] font-medium text-stilus-white mb-2">
            Stilus Intellectus
          </h1>
          <p className="font-body text-[15px] text-stilus-gray">
            Admin Dashboard
          </p>
        </div>

        {/* Warning Card */}
        {credentialsNeeded && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-[13px] font-semibold text-amber-400 mb-1">
                  Konfigurasi Diperlukan
                </p>
                <p className="font-body text-[12px] text-amber-300/80">
                  Silakan set APP_ID dan APP_SECRET di file .env untuk menggunakan Kimi OAuth. Gunakan tombol Demo untuk testing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-[rgba(18,18,18,0.85)] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 space-y-5">
          {/* OAuth Login */}
          <button
            onClick={handleOAuthLogin}
            disabled={isLoading || credentialsNeeded}
            className="w-full font-body text-[15px] font-semibold bg-stilus-crimson text-stilus-white py-4 rounded-lg hover:bg-stilus-crimson-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Menghubungkan...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Login dengan Kimi
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.12]" />
            <span className="font-body text-[12px] text-stilus-muted">atau</span>
            <div className="flex-1 h-px bg-white/[0.12]" />
          </div>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading || demoLoginMutation.isPending}
            className="w-full font-body text-[15px] font-semibold bg-stilus-charcoal text-stilus-white py-4 rounded-lg hover:bg-white/[0.08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border border-white/[0.12]"
          >
            {isLoading || demoLoginMutation.isPending ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                Login Demo
              </>
            )}
          </button>

          {/* Info Text */}
          <p className="font-body text-[12px] text-stilus-muted text-center">
            Login Demo untuk testing dengan akses admin penuh
          </p>
        </div>

        {/* Footer */}
        <p className="font-body text-[12px] text-stilus-muted text-center mt-8">
          Sistem manajemen konsultasi akademik © 2024
        </p>
      </div>
    </div>
  );
}
