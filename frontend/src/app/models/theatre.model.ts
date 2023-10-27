export class Theatre {
    constructor(
      public theaterID: number,
      public name: string,
      public noofseats: number,
      public cityID: number,
      public city: City
    ) {}
  }
  
  export class City {
    constructor(
      public cityID: number,
      public cityName: string
      
    ) {}
  }
  