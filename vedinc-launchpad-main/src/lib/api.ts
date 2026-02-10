const API_BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const api = {
    login: async (email: string, password: string) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    },

    signup: async (name: string, email: string, password: string) => {
        const res = await fetch(`${API_BASE}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
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

    getPdfCourse: async (id: string) => {
        const token = getToken();

        const res = await fetch(`${API_BASE}/courses/pdf/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.json();
    },
    listAdmins: async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.json();
    },

    createAdmin: async (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/admin/create-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return res.json();
    },

    deleteAdmin: async (id: string) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/admin/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.json();
    },
    listAllUsers: async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/admin/all-users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.json();
    },

};
