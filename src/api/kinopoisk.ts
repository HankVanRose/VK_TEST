import axios from 'axios';

// export const fetchMovies = async () => {
//   const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie`, {
//     headers: { 'X-API-KEY': '0Q324AJ-BK6MGPA-HC7S89E-M504R5T' },
//   });
//   return response.data;
// };

// export default async function fetchMovies() {
//   const chunk = 50;
 
//   try {
//     const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie`, {
//       params: {
//         limit: chunk,
//       },

//       headers: { 'X-API-KEY': '0Q324AJ-BK6MGPA-HC7S89E-M504R5T' },
//     });
//     const { docs } = response.data;
//     return docs;
//   } catch (error) {
//     console.error('Ошибка загрузки данных', error);
//   }
// }
