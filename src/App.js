import { api } from './api/catAPI.js';
import { getItem, setItem } from './utils/sessionStorage.js';
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
        const response = await api.fetchCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          // resultSection 초기화
        }
      },
      onRandom: async keyword => {
        const response = await api.fetchRandomCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          // resultSection 초기화
        }
      },
    });
    const resultSection = new ResultSection({
      $target,
      data,
      onClick: async data => {},
      onScroll: () => {},
    });
    const darkmodeBtn = document.createElement('span');
    darkmodeBtn.innerText = '🌕';
    darkmodeBtn.classList.add('btn_darkmode');
    $target.appendChild(darkmodeBtn);
  }
}
