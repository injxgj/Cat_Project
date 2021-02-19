import { getItem } from '../utils/sessionStorage.js';
import Card from './Card.js';
import { lazyLoad } from '../utils/lazyLoad.js';

export default class ResultSection {
  constructor(props) {
    const { $target, data, onClick, onScroll, scrollFetch } = props;
    this.data = data;
    this.onClick = onClick;
    this.onScroll = onScroll;
    this.scrollFetch = scrollFetch;
    this.section = document.createElement('section');
    this.section.classList.add('result_section');

    $target.appendChild(this.section);

    if (data && data.length > 0) {
      this.render();
      lazyLoad();
    }
  }
  setState() {
    this.render();
    lazyLoad();
  }

  async render() {
    this.section.innerHTML = ''; // *** 하위 children 초기화

    const wrapper = document.createElement('div');

    const data = getItem('data');
    if (data.length > 0) {
      wrapper.classList.add('result_wrapper');

      data.forEach(cat => {
        new Card({
          $target: wrapper,
          data: cat,
        });
      });

      wrapper.addEventListener('click', e => {
        e.stopPropagation();
        if (e.target !== e.currentTarget) {
          const modalData = data.filter(cur => cur.id === e.target.parentNode.dataset.id)[0];
          this.onClick(modalData);
        }
      });
    } else {
      wrapper.classList.add('empty_wrapper');

      const emptyMsg = document.createElement('span');
      emptyMsg.classList.add('empty_msg');
      emptyMsg.innerText = '검색 결과가 없습니다.';
      wrapper.appendChild(emptyMsg);

      const emptyBoxImage = document.createElement('img');
      emptyBoxImage.classList.add('img_emptybox');
      emptyBoxImage.src = 'src/img/emptybox.png';

      wrapper.appendChild(emptyBoxImage);
    }
    this.section.appendChild(wrapper);
  }
}
