import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import { ApiKey } from './types/api.key.type';

import { PrismaService } from '@common/services/prisma.service';

@Injectable()
export class ApiKeyService {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cache: Cache,
        private readonly prisma: PrismaService
    ) { }

    async get(key: string, checkCache: boolean = true): Promise<ApiKey | null> {
        if (checkCache) {
            const apiKey = await this.cache.get<ApiKey>(`apiKeyUsers:${key}`);

            if (apiKey) {
                return apiKey;
            }
        }

        const apiKey = await this.prisma.apiKey.findUnique({
            where: {
                key
            },
            include: {
                user: true
            }
        });

        if (apiKey) {
            await this.cache.set(`apiKeyUsers:${key}`, apiKey, 3600000);
        }

        return apiKey;
    }
}
