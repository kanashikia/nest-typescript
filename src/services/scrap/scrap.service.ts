import { Injectable } from '@nestjs/common';
import { scrapPayloadFormat } from 'src/controllers/scrap/scrap.controller';
import fetch from 'node-fetch';
import jsdom from 'jsdom';

@Injectable()
export class ScrapService {
  async scrapById(params: scrapPayloadFormat) {
    return fetch(params.url)
      .then((response) => response.text())
      .then((data) => {
        const domParser = new jsdom.JSDOM(data);
        return domParser.window.document.querySelector(`#${params.customPath}`)
          .textContent;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async scrapByClass(params: scrapPayloadFormat) {
    return fetch(params.url)
      .then((response) => response.text())
      .then((data) => {
        const domParser = new jsdom.JSDOM(data);
        return domParser.window.document.querySelector(`.${params.customPath}`)
          .textContent;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
