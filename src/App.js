import { api } from './api/catAPI.js';
import { getItem, setItem } from './utils/sessionStorage.js';
import Loading from './components/Loading.js';
import ResultSection from './components/ResultSection.js';
import SearchSection from './components/SearchSection.js';
import DetailModal from './components/DetailModal.js';
import { scrollFetch } from './utils/scrollFetch.js';

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
        const response = await api.fetchCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          resultSection.setState();
        }
        loading.toggleSpinner();
      },
      onRandom: async keyword => {
        loading.toggleSpinner();
        const response = await api.fetchRandomCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          resultSection.setState();
        }
        loading.toggleSpinner();
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
    // scrollFetch(resultSection, loading);

    const darkmodeBtn = document.createElement('span');
    darkmodeBtn.innerText = '🌕';
    darkmodeBtn.classList.add('btn_darkmode');
    $target.appendChild(darkmodeBtn);
  }
}
