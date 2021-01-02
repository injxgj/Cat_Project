import { getItem } from '../utils/sessionStorage.js';
import Card from './Card.js';
import { lazyLoad } from '../utils/lazyLoad.js';

export default class ResultSection {
  constructor(props) {
    const { $target, data, onClick, onScroll } = props;
    this.data = data;
    this.onClick = onClick;
    this.onScroll = onScroll;
    this.section = document.createElement('section');
    this.section.classList.add('result_section');

    $target.appendChild(this.section);

    this.render();
      lazyLoad();
  }
    lazyLoad();
    const wrapper = document.createElement('div');
    wrapper.classList.add('result_wrapper');

    const data = getItem('data');
    if (data.length) {
      data.forEach(cat => {
        new Card({
          $target: wrapper,
          data: cat,
        });
      });

      wrapper.addEventListener('click', e => {
        e.stopPropagation();
        const modalData = data.filter(cur => cur.id === e.target.parentNode.dataset.id)[0];
        this.onClick(modalData);
      });
    }
    }
    this.section.appendChild(wrapper);
  }
}
