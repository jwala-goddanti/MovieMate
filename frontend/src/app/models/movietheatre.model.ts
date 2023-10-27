export class MovieTheatre {
    movieTheaterID: number = 0;
    movieID: number = 0;
    theaterID: number = 0;
    screenName: string = '';
    ticketCost: number = 0;
    movie: Movie | null = null;
    theatre: Theatre | null = null;
}
  
export class Movie {
    movieID: number = 0;
    title: string = '';
    genre: string = '';
}
  
export class Theatre {
    theaterID: number = 0;
    name: string = '';
    noofseats: number = 0;
    cityID: number = 0;
    city: City | null = null;
}
  
export class City {
    cityID: number = 0;
    cityName: string = '';
}
