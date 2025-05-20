import { GenreType } from "../enums/GenreType";
import { StatusType } from "../enums/StatusType";

export class MangaDto {
    id: string = '';
    title: string = '';
    imgUrl: string = '';
    description: string = '';
    startDate: string |undefined;
    endDate: string |undefined;
    score: number = 0.00;
    status: StatusType = StatusType.Unknown;
    volume: number = 0;
    chapter: number = 0;
    rating: number = 0;
    author: string = '';
    adaptation: string = '';
    genre: Array<GenreType> = new Array<GenreType>;
}