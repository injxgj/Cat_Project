import { api } from './api/catAPI.js';
import { getItem, setItem } from './utils/sessionStorage.js';
import Loading from './components/Loading.js';
import ResultSection from './components/ResultSection.js';
import SearchSection from './components/SearchSection.js';
import DetailModal from './components/DetailModal.js';
import { scrollFetch } from './utils/scrollFetch.js';
import { toggleDarkmode } from './utils/darkmode.js';

export default class App {
  constructor($target) {
    const keywords = getItem('keywords');
    const data = getItem('data');
    const loading = new Loading({ $target });
    const detailModal = new DetailModal({
      $target,
    });
    const serchSection = new SearchSection({
      $target,
      keywords,
      onSearch: async keyword => {
        loading.toggleSpinner();
        try {
          const response = await api.fetchCats(keyword);
          setItem('data', response.data);
          resultSection.setState();
          loading.toggleSpinner();
        } catch (e) {
          console.error(e);
          loading.toggleSpinner();
        }
      },
      onRandom: async keyword => {
        loading.toggleSpinner();
        try {
          const response = await api.fetchRandomCats(keyword);
          setItem('data', response.data);
          resultSection.setState();
          loading.toggleSpinner();
        } catch (e) {
          console.error(e);
          loading.toggleSpinner();
        }
      },
    });
    const resultSection = new ResultSection({
      $target,
      data,
      scrollFetch: scrollFetch.bind(null, loading),
      onClick: data => {
        detailModal.setState(data);
      },
      onScroll: () => {},
    });
    const bottom = document.createElement('div');
    bottom.className = 'bottom';
    $target.appendChild(bottom);

    scrollFetch(loading, resultSection);

    const darkmodeBtn = document.createElement('span');
    darkmodeBtn.innerText = '🌕';
    darkmodeBtn.classList.add('btn_darkmode');
    $target.appendChild(darkmodeBtn);
    darkmodeBtn.addEventListener('click', e => {
      toggleDarkmode();
    });
  }
}
