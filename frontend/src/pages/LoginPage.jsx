import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/auth/authSlice";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Mock login logic
    setTimeout(() => {
      if (email === "mis@itfc.in" && password === "Indus@1008") {
        const mockUser = {
          id: 1,
          name: "Admin User",
          email: "mis@itfc.in",
        };
        dispatch(loginSuccess(mockUser));
        navigate("/");
      } else {
        dispatch(loginFailure("Invalid email or password. Try admin@example.com / password"));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-zinc-400">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 p-3 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Contact Admin
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
