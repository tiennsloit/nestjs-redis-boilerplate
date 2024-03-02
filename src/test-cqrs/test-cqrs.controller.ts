import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetProductsQuery } from "../cqrs/some-service.cqrs";

@Controller("test-cqrs")
export class TestCqrsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getProducts() {
    return this.queryBus.execute(new GetProductsQuery());
  }
}
