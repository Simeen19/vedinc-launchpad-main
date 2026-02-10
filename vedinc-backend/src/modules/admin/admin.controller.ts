import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { hashPassword } from "../../utils/hash";
import { UserRole } from "@prisma/client";

export const createAdmin = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const passwordHash = await hashPassword(password);

    const admin = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            role: UserRole.ADMIN,
        },
    });

    return res.status(201).json({
        message: "Admin created",
        admin: {
            id: admin.id,
            email: admin.email,
            role: admin.role,
        },
    });
};


export const deleteAdmin = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        // Fetch target user
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Only admins can be deleted
        if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
            return res.status(400).json({
                message: "Only admins can be deleted",
            });
        }

        // Prevent deleting yourself
        if (req.user?.id === id) {
            return res.status(400).json({
                message: "You cannot delete your own account",
            });
        }

        // Prevent deleting last SUPER_ADMIN
        if (user.role === UserRole.SUPER_ADMIN) {
            const superAdminCount = await prisma.user.count({
                where: { role: UserRole.SUPER_ADMIN },
            });

            if (superAdminCount <= 1) {
                return res.status(400).json({
                    message: "Cannot delete the last SUPER_ADMIN",
                });
            }
        }

        await prisma.user.delete({
            where: { id },
        });

        return res.json({
            message: "Admin deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to delete admin",
        });
    }
};
export const listAdmins = async (_req: Request, res: Response) => {
    try {
        const admins = await prisma.user.findMany({
            where: {
                role: {
                    in: ["ADMIN", "SUPER_ADMIN"],
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return res.json(admins);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to fetch admins",
        });
    }
};
export const listAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to fetch users",
        });
    }
};
