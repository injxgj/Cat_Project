/* eslint-disable no-useless-catch */
const API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = function (url) {
  const dto = fetch(url)
    .then(response => {
      const data = response.json();
      return data;
    })
    .catch(err => {
      console.error(err);
    });
  return dto;
};

export const api = {
  fetchCats: async keyword => {
    try {
      const breeds = await request(`${API_ENDPOINT}/breeds/search?q=${keyword}`);
      const requests = breeds.map(async breed => {
        return await request(`${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`);
      });
      const responses = await Promise.all(requests);
      const result = Array.prototype.concat.apply([], responses);

      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
  fetchRandomCats: async () => {
    try {
      const result = await request(`${API_ENDPOINT}/images/search?limit=20`);
      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};
