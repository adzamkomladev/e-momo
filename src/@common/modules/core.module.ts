import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CacheModule.register(),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get('THROTTLE_TTL'),
                    limit: config.get('THROTTLE_LIMIT'),
                },
            ],
        }),
    ],
    exports: [CacheModule]
})
export class CoreModule { }
