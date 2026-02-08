import app from "./app";
import { env } from "./config/env";
import prisma from "./lib/prisma";

app.listen(env.PORT, async () => {

    console.log(
        `🚀 Server running on port ${env.PORT} (${env.NODE_ENV})`
    );
    (async () => {
        const users = await prisma.user.findMany();
        console.log(users);
    })();
});
