import VantaBackground from "@/components/VantaBackground";

export default function AdminUsers() {
    return (
        <VantaBackground>
            <div className="min-h-screen px-8 py-16 text-white">
                <h1 className="text-3xl mb-4">Users</h1>
                <p className="text-white/60">
                    List of registered users (read-only).
                </p>

                <div className="mt-8 bg-black/40 p-6 rounded-xl">
                    <p className="italic text-white/40">
                        User management will be added later.
                    </p>
                </div>
            </div>
        </VantaBackground>
    );
}
