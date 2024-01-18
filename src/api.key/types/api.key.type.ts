import { $Enums } from "@prisma/client";

export type ApiKey = {
    user: {
        id: string;
        email: string;
    };
} & {
    id: string;
    userId: string;
    key: string;
    env: $Enums.ApiKeyEnvironment;
    expired: boolean;
    createdAt: Date;
}