import { useEffect, useState } from "react";
import VantaBackground from "@/components/VantaBackground";
import { Search } from "lucide-react";
import { FunkyHeading } from "@/components/ui/FunkyHeading";
import { api } from "@/lib/api";

type Course = {
    id: string;
    title: string;
    category: string;
    description: string;
};

const IndustryHub = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await api.listPdfCourses();
                setCourses(data);
            } catch {
                setError("Failed to load courses");
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    const handleOpenCourse = async (id: string) => {
        try {
            const data = await api.getPdfCourse(id);
            window.open(data.pdfUrl, "_blank");
        } catch {
            alert("Failed to open course");
        }
    };

    return (
        <VantaBackground>
            <div className="min-h-screen px-6 py-20 max-w-7xl mx-auto text-white">

                {/* Header */}
                <div className="mb-12">
                    <FunkyHeading headingLevel="h1" className="text-4xl mb-2">
                        Industry-Ready Learning Hub
                    </FunkyHeading>
                    <p className="text-white/60">
                        Expert-led modules designed for real-world industry readiness.
                    </p>
                </div>

                {/* Search (UI only for now) */}
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

                {loading && <p className="text-white/60">Loading courses...</p>}
                {error && <p className="text-red-400">{error}</p>}

                {/* Courses */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {courses.map((c) => (
                        <div
                            key={c.id}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs px-2 py-1 rounded bg-white/10">
                                    {c.category}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">
                                {c.title}
                            </h3>

                            <p className="text-sm text-white/70 mb-6">
                                {c.description}
                            </p>

                            <button
                                onClick={() => handleOpenCourse(c.id)}
                                className="w-full py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                            >
                                Start Learning
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </VantaBackground>
    );
};

export default IndustryHub;
