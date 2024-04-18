import { JSONLoader } from "langchain/document_loaders/fs/json";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

export function urlLoader(url: string) {
  return new CheerioWebBaseLoader(url);
}

export function jsonLoader(json: string) {
  return new JSONLoader(json);
}
