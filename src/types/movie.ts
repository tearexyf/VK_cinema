export type Movie = {
    id:any,
    title:string,
    originalTitle:string,
    language:string,
    releaseYear:any,
    releaseDate:string,
    genres:[string],
    plot:string,
    runtime:any,
    budget:string,
    revenue:string,
    homepage:string,
    status:string,
    posterUrl:string,
    backdropUrl:string,
    trailerUrl:string,
    trailerYouTubeId:string,
    tmdbRating:any,
    searchL:string,
    keywords:[string],
    countriesOfOrigin:[string],
    languages:[string],
    cast:[string],
    director:string,
    production:string,
    awardsSummary:string,
}

export interface Genre {
  name: string;   
  label: string;  
  image: string;
}

export interface MovieFilters {
  title?:string;
  genre?: string;
  page?: number;
  limit?: number;
}