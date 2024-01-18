import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

import redisConfig from '@common/configs/redis.config';
import appConfig from '@common/configs/app.config';
import throttleConfig from '@common/configs/throttle.config';

import { TransformInterceptor } from '@common/interceptors/transform.interceptor';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, redisConfig, throttleConfig],
            isGlobal: true,
        }),
        CacheModule.registerAsync<RedisClientOptions>({
            useFactory: async (config: ConfigService) =>
            ({
                store: redisStore.redisStore as any,
                url: config.get('redis.url'),
            } as RedisClientOptions),
            inject: [ConfigService],
        }),
        BullModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                redis: {
                    host: config.get('redis.host'),
                    port: config.get<number>('redis.port'),
                },
            }),
            inject: [ConfigService],
        }),
        BullBoardModule.forRoot({
            route: '/queues',
            adapter: ExpressAdapter
        }),
        EventEmitterModule.forRoot(),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get<number>('throttle.ttl'),
                    limit: config.get<number>('throttle.limit'),
                },
            ],
        }),
    ],
    exports: [CacheModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }

    ],
})
export class CoreModule { }
