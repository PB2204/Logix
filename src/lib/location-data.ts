import { Country, State, City } from 'country-state-city';

export const getAllCountries = () => {
    return Country.getAllCountries();
};

export const getStatesOfCountry = (countryCode: string) => {
    return State.getStatesOfCountry(countryCode);
};

export const getCitiesOfState = (countryCode: string, stateCode: string) => {
    return City.getCitiesOfState(countryCode, stateCode);
};
