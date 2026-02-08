import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import VantaBackground from "@/components/VantaBackground";

export default function AdminCourses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        api.listPdfCourses().then(setCourses);
    }, []);

    const upload = async () => {
        const token = localStorage.getItem("token");
        if (!file || !token) return;

        await api.uploadPdfCourse({
            title,
            category,
            file,
            token,
        });

        const updated = await api.listPdfCourses();
        setCourses(updated);
    };

    return (
        <VantaBackground>
            <div className="min-h-screen px-8 py-16 text-white">
                <h1 className="text-3xl mb-6">Manage Courses</h1>

                {/* Upload */}
                <div className="bg-black/40 p-6 rounded-xl mb-10">
                    <input
                        placeholder="Title"
                        className="block mb-3 bg-black/30 p-2 rounded"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Category"
                        className="block mb-3 bg-black/30 p-2 rounded"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <button
                        onClick={upload}
                        className="mt-4 px-4 py-2 bg-cyan-400 text-black rounded"
                    >
                        Upload PDF
                    </button>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {courses.map((c) => (
                        <div
                            key={c.id}
                            className="bg-black/30 p-4 rounded-lg flex justify-between"
                        >
                            <span>{c.title}</span>
                            <a
                                href={c.pdfUrl}
                                target="_blank"
                                className="text-cyan-400"
                            >
                                View
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </VantaBackground>
    );
}
