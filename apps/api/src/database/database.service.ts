import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDatabase } from '@riyamaga/database';
import type { Database } from '@riyamaga/database';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  readonly db: Database;
  private readonly client: ReturnType<typeof createDatabase>['client'];

  constructor(config: ConfigService) {
    const url = config.getOrThrow<string>('DATABASE_URL');
    const { db, client } = createDatabase(url);
    this.db = db;
    this.client = client;
  }

  async ping(): Promise<boolean> {
    await this.client`select 1`;
    return true;
  }

  async onApplicationShutdown(): Promise<void> {
    await this.client.end({ timeout: 5 });
  }
}