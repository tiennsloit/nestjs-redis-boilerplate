import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Cache } from "cache-manager";
import { DbService } from "./db/db.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
describe("AppController", () => {
  let appController: AppController;
  let dbService: DbService;
  let cacheService: Cache;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            // Mock cache methods as needed for testing
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        // Add any other cache methods your service may use} },
        { provide: DbService, useFactory: () => new DbService() },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
