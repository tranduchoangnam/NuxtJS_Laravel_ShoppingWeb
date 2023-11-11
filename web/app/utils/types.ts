export interface Store {
  name: string;
  address: string;
  hoursOpen: string;
  tel: string;
  map: string;
}
export interface Ward {
  Id: string;
  Name: string;
  Level: string;
}
export interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}
export interface City {
  Id: string;
  Name: string;
  Districts: District[];
}
