export default class SearchSection {
  constructor(props) {
    const { $target, keywords, onSearch, onRandom } = props;
    this.recent = keywords;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.section = document.createElement('section');
    this.section.classList.add('searchinig_section');

    $target.appendChild(this.section);

    this.render();
  }

  render($target) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('search_box_wrapper');

    const randomBtn = document.createElement('span');
    randomBtn.classList.add('btn_random');
    randomBtn.innerText = '🐱';
    wrapper.appendChild(randomBtn);

    const searchBox = document.createElement('input');
    searchBox.classList.add('search_box');
    searchBox.placeholder = '고양이를 검색하세요.';
    wrapper.appendChild(searchBox);

    randomBtn.addEventListener('click', this.onRandom);

    this.section.appendChild(wrapper);

    searchBox.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        this.recent = e.target.value;
        this.onSearch(this.recent);
      }
    });
  }
}
