import { Test, TestingModule } from "@nestjs/testing";
import {
  GetProductsQuery,
  ProductQueryHandler,
} from "../cqrs/some-service.cqrs";
import { TestCqrsController } from "./test-cqrs.controller";
import { QueryBus } from "@nestjs/cqrs";

const mockProductQueryHandler = () => ({ execute: jest.fn() });

describe("TestCqrsController", () => {
  let controller: TestCqrsController;
  let productQueryHandler: ProductQueryHandler;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const mockQueryBus = {
      execute: jest.fn(), // Mocking execute function of QueryBus
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCqrsController],
      providers: [
        {
          provide: ProductQueryHandler,
          useFactory: () => mockProductQueryHandler,
        },
        {
          provide: QueryBus,
          useFactory: () => mockQueryBus, // Providing the mockQueryBus
        },
      ],
    }).compile();

    controller = module.get<TestCqrsController>(TestCqrsController);
    productQueryHandler = module.get<ProductQueryHandler>(ProductQueryHandler);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getProducts", () => {
    it("should return result", async () => {
      const expectedProducts = [];
      jest.mocked(queryBus.execute).mockResolvedValueOnce([]);
      const result = await controller.getProducts();
      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.any(GetProductsQuery)
      );
      expect(result).toStrictEqual(expectedProducts);
    });
  });
});
