import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import {DownloaderService} from "./downloader.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DownloaderService],
})
export class AppModule {}
