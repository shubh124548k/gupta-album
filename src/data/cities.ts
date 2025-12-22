export interface City {
  id: string;
  name: string;
  state: string;
  popular: boolean;
  photographerCount?: number;
}

export const cities: City[] = [
  { id: "delhi", name: "Delhi", state: "Delhi", popular: true },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", popular: true },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", popular: true },
  { id: "bangalore", name: "Bangalore", state: "Karnataka", popular: true },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", popular: true },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", popular: true },
  { id: "pune", name: "Pune", state: "Maharashtra", popular: false },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", popular: false },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", popular: true },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", popular: false },
  { id: "chandigarh", name: "Chandigarh", state: "Punjab", popular: false },
  { id: "goa", name: "Goa", state: "Goa", popular: true },
];

export const getPopularCities = (): City[] => {
  return cities.filter(c => c.popular);
};

export const getCityByName = (name: string): City | undefined => {
  return cities.find(c => c.name.toLowerCase() === name.toLowerCase());
};

export const getAllCities = (): City[] => {
  return cities;
};
