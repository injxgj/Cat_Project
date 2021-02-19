import { addItem } from '../utils/sessionStorage.js';
import { api } from '../api/catAPI.js';

export async function scrollFetch(loading, resultSection) {
  if ('IntersectionObserver' in window) {
    let bottom = document.querySelector('.bottom');
    let scrollFetchObserver = await new IntersectionObserver(async function (entries, observer) {
      const response = await api.fetchRandomCats();
      if (!response.isError && entries[0].isIntersecting) {
        loading.toggleSpinner();
        addItem('data', response.data);
        resultSection.setState();
        loading.toggleSpinner();
      }
    });

    bottom && scrollFetchObserver.observe(bottom);
  }
}
