import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import VantaBackground from "@/components/VantaBackground";

type Course = {
    id: string;
    title: string;
    category: string;
    pdfUrl: string;
};

export default function AdminCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const loadCourses = async () => {
        const data = await api.listPdfCourses();
        setCourses(data);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const upload = async () => {
        if (!file || !token || !title || !category) return;

        try {
            setLoading(true);

            await api.uploadPdfCourse({
                title,
                category,
                file,
                token,
            });

            // reset form
            setTitle("");
            setCategory("");
            setFile(null);

            await loadCourses();
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id: string) => {
        if (!token) return;

        const ok = window.confirm(
            "Are you sure you want to delete this course? This cannot be undone."
        );
        if (!ok) return;

        try {
            setLoading(true);

            await fetch(`http://localhost:5000/api/courses/pdf/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCourses((prev) => prev.filter((c) => c.id !== id));
        } finally {
            setLoading(false);
        }
    };

    return (
        <VantaBackground>
            <div className="min-h-screen px-8 py-16 text-white max-w-5xl mx-auto">
                <h1 className="text-3xl mb-8">Manage Courses</h1>

                {/* Upload */}
                <div className="bg-black/40 p-6 rounded-xl mb-12">
                    <h2 className="text-lg mb-4">Upload PDF Course</h2>

                    <input
                        placeholder="Title"
                        value={title}
                        className="block w-full mb-3 bg-black/30 p-2 rounded"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        placeholder="Category"
                        value={category}
                        className="block w-full mb-3 bg-black/30 p-2 rounded"
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />

                    <button
                        onClick={upload}
                        disabled={loading}
                        className="mt-4 px-4 py-2 bg-cyan-400 text-black rounded disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload PDF"}
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {courses.length === 0 && (
                        <p className="text-white/50">No courses uploaded yet.</p>
                    )}

                    {courses.map((c) => (
                        <div
                            key={c.id}
                            className="bg-black/30 p-4 rounded-lg flex items-center justify-between"
                        >
                            <div>
                                <p className="font-medium">{c.title}</p>
                                <p className="text-xs text-white/50">{c.category}</p>
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={c.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-cyan-400 hover:underline"
                                >
                                    View
                                </a>

                                <button
                                    onClick={() => remove(c.id)}
                                    disabled={loading}
                                    className="text-red-400 hover:underline disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </VantaBackground>
    );
}
