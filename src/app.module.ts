import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { DbService } from './db/db.service';
import { TestCqrsController } from './test-cqrs/test-cqrs.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
    }),
  ],
  controllers: [AppController, TestCqrsController],
  providers: [AppService, DbService],
})
export class AppModule {}
