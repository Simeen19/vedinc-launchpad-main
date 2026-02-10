import { useEffect, useState } from "react";
import VantaBackground from "@/components/VantaBackground";
import { api } from "@/lib/api";

type User = {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
};

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.listAllUsers().then(setUsers);
    }, []);

    return (
        <VantaBackground>
            <div className="min-h-screen px-8 py-16 text-white max-w-6xl mx-auto">
                <h1 className="text-3xl mb-2">Users</h1>
                <p className="text-white/60 mb-8">
                    List of all registered users (read-only)
                </p>

                <div className="space-y-3">
                    {users.map((u) => (
                        <div
                            key={u.id}
                            className="flex justify-between items-center bg-black/40 p-4 rounded-xl"
                        >
                            <div>
                                <p className="font-semibold">
                                    {u.name}{" "}
                                    <span className="text-xs opacity-70">
                                        ({u.role})
                                    </span>
                                </p>
                                <p className="text-sm opacity-60">{u.email}</p>
                            </div>

                            <span
                                className={`text-xs px-3 py-1 rounded-full ${u.role === "SUPER_ADMIN"
                                        ? "bg-purple-500/20 text-purple-300"
                                        : u.role === "ADMIN"
                                            ? "bg-cyan-400/20 text-cyan-300"
                                            : "bg-white/10 text-white/60"
                                    }`}
                            >
                                {u.role}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </VantaBackground>
    );
}
