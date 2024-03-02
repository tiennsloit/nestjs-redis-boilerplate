import { Test } from "@nestjs/testing";
import { AppService } from "./app.service";
import { DbService } from "./db/db.service";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
const mockDbService = () =>
  ({
    getUsers: jest.fn(),
  }) as DbService;

const mockCache = () => ({}) as Cache;
describe("App Service", () => {
  let appService: AppService;
  let dbService: DbService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: DbService, useFactory: mockDbService },
        {
          provide: CACHE_MANAGER,
          useValue: {
            // Mock cache methods as needed for testing
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            // Add any other cache methods your service may use
          },
        },
      ],
    }).compile();

    appService = await module.get(AppService);
    dbService = await module.get(DbService);
  });

  describe("getUsers", () => {
    it("calls DBService.getUsers", () => {
      jest.mocked(dbService.getUsers).mockReturnValue("something" as any);
      const result = appService.getUsers();
      expect(dbService.getUsers).toHaveBeenCalled();

      expect(result).toEqual("something");
    });
  });
});
