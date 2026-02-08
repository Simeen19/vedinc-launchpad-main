import "express";
import { UserRole } from "../../modules/auth/auth.types";
import { Multer } from "multer";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: UserRole;
            };
            file?: Multer.File;
        }
    }
}

export { };
