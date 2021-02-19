import { Module } from "@nestjs/common";
import { PageService } from "./page.service";

@Module({
  imports: [],
  providers: [PageService],
  exports: [PageService],
})
export class SharedModule {}
