import VantaBackground from "@/components/VantaBackground";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <VantaBackground>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

                    <h1
                        className="text-3xl text-white text-center mb-2"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                        Login
                    </h1>

                    <p className="text-center text-white/60 text-sm mb-8 italic tracking-wide">
                        Welcome back
                    </p>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-xs text-white/60 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="user@gmail.com"
                                className="w-full rounded-lg bg-black/30 border border-white/20 px-4 py-2 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-white/60 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg bg-black/30 border border-white/20 px-4 py-2 text-white outline-none focus:border-cyan-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-white/50">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-cyan-400 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </VantaBackground>
    );
};

export default Login;
