import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { DbService } from "./db/db.service";

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) readonly cacheManager: Cache,
    private dbService: DbService
  ) {}

  async getHello() {
    await this.cacheManager.set(
      "item1",
      JSON.stringify({ name: "abc", age: 2 }),
      { ttl: 60 }
    );
    const cacheItem = await this.cacheManager.get("item1");
    // await this.cacheManager.del('item1');
    // await this.cacheManager.reset();
    console.log(cacheItem);
    return "Hello World!";
  }

  getUsers() {
    return this.dbService.getUsers();
  }
}
