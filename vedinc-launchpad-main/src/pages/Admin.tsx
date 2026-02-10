import VantaBackground from "@/components/VantaBackground";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <VantaBackground>
            <div className="min-h-screen px-6 py-10 text-white">
                {/* Header */}
                <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                    <h1
                        className="text-3xl tracking-wide"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                        Admin Panel
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition text-sm"
                    >
                        Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Web Design */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400 transition">
                        <h2 className="text-lg mb-2 text-cyan-400">
                            Web Design Previews
                        </h2>
                        <p className="text-sm text-white/60 mb-4">
                            Add and manage website preview links.
                        </p>
                        <button
                            className="px-4 py-2 text-sm rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                            onClick={() => navigate("/admin/websites")}
                        >
                            Manage Websites
                        </button>
                    </div>

                    {/* Courses */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400 transition">
                        <h2 className="text-lg mb-2 text-cyan-400">
                            Industry Learning Hub
                        </h2>
                        <p className="text-sm text-white/60 mb-4">
                            Upload courses and manage videos.
                        </p>
                        <button
                            className="px-4 py-2 text-sm rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                            onClick={() => navigate("/admin/courses")}
                        >
                            Manage Courses
                        </button>
                    </div>

                    {/* Users */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400 transition">
                        <h2 className="text-lg mb-2 text-cyan-400">
                            Users
                        </h2>
                        <p className="text-sm text-white/60 mb-4">
                            View registered users and roles.
                        </p>
                        <button
                            className="px-4 py-2 text-sm rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                            onClick={() => navigate("/admin/users")}
                        >
                            View Users
                        </button>
                    </div>

                    {/* 🔐 SUPER ADMIN ONLY */}
                    {role === "SUPER_ADMIN" && (
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-400 transition">
                            <h2 className="text-lg mb-2 text-purple-400">
                                Admin Management
                            </h2>
                            <p className="text-sm text-white/60 mb-4">
                                Create and manage platform administrators.
                            </p>
                            <button
                                className="px-4 py-2 text-sm rounded-lg bg-purple-400 text-black font-semibold hover:bg-purple-300 transition"
                                onClick={() => navigate("/admin/admins")}
                            >
                                Manage Admins
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </VantaBackground>
    );
};

export default Admin;
