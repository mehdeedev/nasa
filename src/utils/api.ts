import axios from "axios";

interface IParams {
    q?: string;
    year_start?: string;
    year_end?: string;
    nasa_id?: string;
    media_type?: string;
}

export const BASE_URL = 'https://images-api.nasa.gov/search';

export const generateUrl = (params: IParams) => {
    const searchParams = convertObjectToSearchParams(params)
    return BASE_URL + "?" + searchParams;
}

export const convertObjectToSearchParams = (params: IParams) => {
    return Object.entries(params).filter(([key, val]) => val)
    .map(([key, val]) => `${key}=${val}`).join('&');
}

export function fetchAPI<T>(url: string): Promise<T> {
    return axios.get(url);
  }