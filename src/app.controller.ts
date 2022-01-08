import {Body, Controller, Post, Query} from "@nestjs/common";
import {UrlList} from "./types/url-list";
import {DownloaderService} from "./downloader.service";

@Controller()
export class AppController {
    constructor(private readonly DownloaderService: DownloaderService) {
    }

    @Post("/download")
    async getHello(@Query("target") target: string, @Query("additionalSubfolder") additionalSubfolder: string, @Body() body: UrlList
    ): Promise<void> {
        // console.log('body', body);
        switch (target.toUpperCase()) {
            case "DISK":
                await this.DownloaderService.downloadToDisk(body, additionalSubfolder);
                break;
            case "EAGLEIO":
                await this.DownloaderService.downloadToEagleIO(body, additionalSubfolder);
                break;
            default:
                console.error("Unknown target type!");
        }
    }
}
