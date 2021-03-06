export default class Card {
  constructor(props) {
    const { $target, data } = props;
    this.data = data;

    this.card = document.createElement('div');
    this.card.classList.add('cat_card');
    this.card.dataset.id = data.id;

    $target.appendChild(this.card);

    this.render();
  }
  render() {
    const url = this.data.url;
    const { name, origin } = this.data.breeds.length > 0 ? this.data.breeds[0] : { name: '정보없음', origin: '정보없음' };

    const cardImage = document.createElement('img');
    cardImage.classList.add('card_image');
    cardImage.classList.add('lazy');
    cardImage.dataset.src = url;

    const cardInfo = document.createElement('article');
    // cardInfo.classList.add('card_info');

    const catName = document.createElement('p');
    catName.innerText = name;

    const catOrigin = document.createElement('p');
    catOrigin.innerText = origin;

    cardInfo.appendChild(catName);
    cardInfo.appendChild(catOrigin);
    this.card.appendChild(cardImage);
    this.card.appendChild(cardInfo);
  }
}
