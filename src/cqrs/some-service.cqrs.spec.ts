import { Test } from "@nestjs/testing";
import { ProductQueryHandler } from "./some-service.cqrs";
import { DbService } from "../db/db.service";

const mockGetProductsQuery = {};

describe("Some Service", () => {
  let productQueryHandler: ProductQueryHandler;
  let dbService: DbService;

  const mockDbService = () => ({ getUsers: jest.fn() });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductQueryHandler,
        { provide: DbService, useFactory: mockDbService },
      ],
    }).compile();

    productQueryHandler = module.get(ProductQueryHandler);
    dbService = module.get(DbService);
  });

  describe("execute", () => {
    it("should return data", async () => {
      const expectedProduct = [] as any;
      jest.mocked(dbService.getUsers).mockReturnValue(expectedProduct);
      const result = await productQueryHandler.execute(mockGetProductsQuery);
      expect(result).toBe(expectedProduct);
    });
  });
});
