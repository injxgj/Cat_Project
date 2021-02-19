import { addItem } from '../utils/sessionStorage.js';
import { api } from '../api/catAPI.js';

export async function scrollFetch(loading, resultSection) {
  if ('IntersectionObserver' in window) {
    let bottom = document.querySelector('.bottom');
    let scrollFetchObserver = await new IntersectionObserver(async function (entries, observer) {
      try {
        const response = await api.fetchRandomCats();
        entries[0].isIntersecting;
        loading.toggleSpinner();
        addItem('data', response.data);
        resultSection.setState();
        loading.toggleSpinner();
      } catch (e) {
        throw { message: e };
      }
    });

    bottom && scrollFetchObserver.observe(bottom);
  }
}
