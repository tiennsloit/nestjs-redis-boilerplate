import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseInterceptors(CacheInterceptor)
  getHello() {
    return "Hello World!";
  }

  getHelloFromService() {
    return this.appService.getHello();
  }
}
