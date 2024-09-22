import { API_URLS } from '../constants/constants';
import { ChartData } from '../types/Types';


export const fetchData = async (): Promise<ChartData[]> => {
  try {
    const response = await fetch(API_URLS.CANDIDATE_DATA);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    const parsedData = parseData(jsonData);
    return parsedData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const parseData = (jsonData: any): ChartData[] => {
  const result: ChartData[] = [];
  jsonData.forEach((yearObj: any) => {
    Object.keys(yearObj).forEach((year) => {
      yearObj[year].forEach((monthObj: any) => {
        Object.keys(monthObj).forEach((month) => {
          monthObj[month].forEach((dateObj: any) => {
            Object.keys(dateObj).forEach((date) => {
              const value = dateObj[date];
              result.push({
                date: date.split(' , ')[0],
                value: value,
              });
            });
          });
        });
      });
    });
  });
  return result;
};
