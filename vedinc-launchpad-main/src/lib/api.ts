const API_BASE = "http://localhost:5000/api";

export const api = {
    login: async (email: string, password: string) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    },

    uploadPdfCourse: async (data: {
        title: string;
        category: string;
        description?: string;
        file: File;
        token: string;
    }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        if (data.description) formData.append("description", data.description);
        formData.append("pdf", data.file);

        const res = await fetch(`${API_BASE}/courses/admin/pdf`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
            body: formData,
        });

        return res.json();
    },

    listPdfCourses: async () => {
        const res = await fetch(`${API_BASE}/courses/pdf`);
        return res.json();
    },
};
