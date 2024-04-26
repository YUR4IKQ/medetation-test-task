import { IArticle } from "./article";
import { IAudio } from "./audio";

export interface IApiResponse {
  articles: IArticle[],
  audio: IAudio[],
}
