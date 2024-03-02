// product-query.handler.ts
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { DbService } from "../db/db.service";
type Product = {};
export class GetProductsQuery {}

@QueryHandler(GetProductsQuery)
export class ProductQueryHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private dbService: DbService) {}

  async execute(query: GetProductsQuery): Promise<Product[]> {
    // Retrieve products from the database
    return Promise.resolve(this.dbService.getUsers());
  }
}
