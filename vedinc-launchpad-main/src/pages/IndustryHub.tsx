import VantaBackground from "@/components/VantaBackground";
import { Search } from "lucide-react";

const modules = [
    {
        id: 1,
        title: "Azure DevOps with AI-900",
        category: "Development",
        level: "Beginner",
        description:
            "Learn DevOps fundamentals aligned with Azure AI-900 certification.",
        duration: "12h 30m",
        lessons: 24,
        status: "LIVE",
    },
    {
        id: 2,
        title: "Cloud PC with Citrix",
        category: "Infrastructure",
        level: "Intermediate",
        description:
            "Deploy and manage enterprise Cloud PCs using Citrix & Azure.",
        duration: "10h 15m",
        lessons: 18,
        status: "COMING_SOON",
    },
];

const IndustryHub = () => {
    return (
        <VantaBackground>
            <div className="min-h-screen px-6 py-20 max-w-7xl mx-auto text-white">

                {/* Header */}
                <div className="mb-12">
                    <h1
                        className="text-4xl mb-2"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                        Industry-Ready Learning Hub
                    </h1>
                    <p className="text-white/60">
                        Expert-led modules designed for real-world industry readiness.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-10 relative max-w-md">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                        placeholder="Search modules..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/30 border border-white/15 backdrop-blur text-white outline-none focus:border-cyan-400"
                    />
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <FilterGroup title="Category" options={["Development", "Infrastructure", "Cloud"]} />
                        <FilterGroup title="Level" options={["Beginner", "Intermediate", "Advanced"]} />
                    </aside>

                    {/* Cards */}
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {modules.map((m) => (
                            <div
                                key={m.id}
                                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition"
                            >
                                {/* Tags */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs px-2 py-1 rounded bg-white/10">
                                        {m.category}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${m.level === "Beginner"
                                            ? "bg-cyan-400/20 text-cyan-300"
                                            : "bg-white/10 text-white/60"
                                            }`}
                                    >
                                        {m.level}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold mb-2">
                                    {m.title}
                                </h3>

                                <p className="text-sm text-white/70 mb-5">
                                    {m.description}
                                </p>

                                {/* Meta */}
                                <div className="flex justify-between text-xs text-white/50 mb-6">
                                    <span>{m.duration}</span>
                                    <span>{m.lessons} lessons</span>
                                </div>

                                {/* Action */}
                                {m.status === "LIVE" ? (
                                    <button className="w-full py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">
                                        Start Learning
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full py-2 rounded-lg bg-white/10 text-white/50 cursor-not-allowed"
                                    >
                                        Launching Soon
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </VantaBackground>
    );
};

export default IndustryHub;

/* --- Helper --- */

const FilterGroup = ({ title, options }: { title: string; options: string[] }) => (
    <div>
        <h4 className="text-sm text-white/70 mb-3">{title}</h4>
        <div className="space-y-2">
            {options.map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm text-white/60">
                    <input type="checkbox" className="accent-cyan-400" />
                    {o}
                </label>
            ))}
        </div>
    </div>
);
