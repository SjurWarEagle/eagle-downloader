import {Injectable} from "@nestjs/common";
import {UrlList} from "./types/url-list";
import axios from "axios";
import * as fs from "fs";

const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

require("dotenv").config();

@Injectable()
export class DownloaderService {
    private diskBaseFolder: string;


    constructor() {
        this.diskBaseFolder = process.env.DISK_BASE_FOLDER;
    }

    public async downloadToEagleIO(urls: UrlList, additionalSubfolder?: string): Promise<void> {
        if (!urls) {
            return;
        }
        for (let i = 0; i < urls.urls.length; i++) {
            const url = urls.urls[i];
            const response = await axios.get(url.url, {
                responseType: 'stream',
            });

            if (response.data) {
                let outputDirectory = this.diskBaseFolder;
                if (additionalSubfolder) {
                    outputDirectory += '\\' + additionalSubfolder
                }
                // fs.mkdirSync(outputDirectory, {recursive: true});

                console.log(response.data);

                // await pipeline(response.data, fs.createWriteStream(outputDirectory + '\\' + url.filename));
            }
        }
    }

    public async downloadToDisk(urls: UrlList, additionalSubfolder?: string): Promise<void> {
        if (!urls) {
            return;
        }
        for (let i = 0; i < urls.urls.length; i++) {
            const url = urls.urls[i];
            const response = await axios.get(url.url, {
                responseType: 'stream',
            });

            if (response.data) {
                let outputDirectory = this.diskBaseFolder;
                if (additionalSubfolder) {
                    outputDirectory += '\\' + additionalSubfolder
                }
                fs.mkdirSync(outputDirectory, {recursive: true});

                await pipeline(response.data, fs.createWriteStream(outputDirectory + '\\' + url.filename));
            }
        }
    }
}
