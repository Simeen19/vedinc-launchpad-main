import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import VantaBackground from "@/components/VantaBackground";

type Admin = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "SUPER_ADMIN";
};

export default function AdminAdmins() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loadAdmins = async () => {
        const data = await api.listAdmins();
        setAdmins(data);
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    const createAdmin = async () => {
        setLoading(true);
        await api.createAdmin({ name, email, password });
        setName("");
        setEmail("");
        setPassword("");
        await loadAdmins();
        setLoading(false);
    };

    const deleteAdmin = async (id: string) => {
        if (!confirm("Delete this admin?")) return;
        await api.deleteAdmin(id);
        await loadAdmins();
    };

    return (
        <VantaBackground>
            <div className="min-h-screen px-8 py-16 text-white max-w-5xl mx-auto">
                <h1 className="text-3xl mb-8">Manage Admins</h1>

                {/* Create admin */}
                <div className="bg-black/40 p-6 rounded-xl mb-10">
                    <h2 className="text-xl mb-4">Create Admin</h2>

                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block mb-3 bg-black/30 p-2 rounded w-full"
                    />
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block mb-3 bg-black/30 p-2 rounded w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block mb-4 bg-black/30 p-2 rounded w-full"
                    />

                    <button
                        onClick={createAdmin}
                        disabled={loading}
                        className="px-4 py-2 bg-cyan-400 text-black rounded"
                    >
                        {loading ? "Creating..." : "Create Admin"}
                    </button>
                </div>

                {/* Admin list */}
                <div className="space-y-3">
                    {admins.map((a) => (
                        <div
                            key={a.id}
                            className="flex justify-between items-center bg-black/30 p-4 rounded"
                        >
                            <div>
                                <p className="font-semibold">
                                    {a.name}{" "}
                                    <span className="text-xs opacity-70">({a.role})</span>
                                </p>
                                <p className="text-sm opacity-60">{a.email}</p>
                            </div>

                            {a.role !== "SUPER_ADMIN" && (
                                <button
                                    onClick={() => deleteAdmin(a.id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </VantaBackground>
    );
}
