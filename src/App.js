import { api } from './api/catAPI.js';
import { getItem, setItem } from './utils/sessionStorage.js';
import Loading from './components/Loading.js';
import ResultSection from './components/ResultSection.js';
import SearchSection from './components/SearchSection.js';

export default class App {
  constructor($target) {
    const keywords = getItem('keywords');
    const data = getItem('data');
    const serchSection = new SearchSection({
      $target,
      keywords,
      onSearch: async keyword => {
        loading.toggleSpinner();
        const response = await api.fetchCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          // resultSection 초기화
        }
        loading.toggleSpinner();
      },
      onRandom: async keyword => {
        loading.toggleSpinner();
        const response = await api.fetchRandomCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          // resultSection 초기화
        }
        loading.toggleSpinner();
      },
    });
    const resultSection = new ResultSection({
      $target,
      data,
      onClick: data => {
        detailModal.setState(data);
      },
      onScroll: () => {},
    });
    const loading = new Loading({ $target });
    const detailModal = new DetailModal({
      $target,
    });

    const darkmodeBtn = document.createElement('span');
    darkmodeBtn.innerText = '🌕';
    darkmodeBtn.classList.add('btn_darkmode');
    $target.appendChild(darkmodeBtn);
  }
}
