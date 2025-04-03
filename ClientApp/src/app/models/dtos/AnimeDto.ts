import { GenreType } from "../enums/GenreType";
import { StatusType } from "../enums/StatusType";

export class AnimeDto {
    id: string = '';
    premier: string = '';
    title: string = '';
    imgUrl: string = '';
    description: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
    score: number = 0.00;
    status: StatusType = StatusType.Unknown;
    episode: number = 0;
    duration: number = 0;
    studio: string = '';
    rating: number = 0;
    prequel: string = '';
    sequel: string = '';
    source: string = '';
    genre: Array<GenreType> = new Array<GenreType>;
    showMore: boolean = false;
}