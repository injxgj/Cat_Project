export default class DetailModal {
  constructor(props) {
    const { $target } = props;
    this.data = null;

    this.modalWrapper = document.createElement('div');
    this.modalWrapper.classList.add('modal_wrapper');
    this.modalWrapper.classList.add('hidden');

    $target.appendChild(this.modalWrapper);
  }

  toggleModal() {
    const modal = document.querySelector('.modal_wrapper');
    modal.classList.toggle('hidden');
  }

  setState(data) {
    this.toggleModal();
    this.data = data;
    this.render();
  }

  onClose() {
    this.toggleModal();
    this.data = null;
    this.modalWrapper.innerHTML = '';
  }

  render() {
    const { url } = this.data;
    const { name, origin, temperament } = this.data.breeds[0] ? this.data.breeds[0] : { name: '정보없음', origin: '정보없음', temperament: '정보없음' };
    const { imperial, metric } = this.data.breeds[0] ? this.data.breeds[0].weight : { imperial: '정보없음', metric: '정보없음' };

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    this.modalWrapper.appendChild(overlay);

    const modal = document.createElement('section');
    modal.classList.add('modal');
    this.modalWrapper.appendChild(modal);

    const modalHeader = document.createElement('header');
    modalHeader.classList.add('modal_header');
    modal.appendChild(modalHeader);

    const modalTitle = document.createElement('span');
    modalTitle.classList.add('modal_title');
    modalTitle.innerText = name;
    modalHeader.appendChild(modalTitle);

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('modal_close');
    closeBtn.innerText = 'X';
    modalHeader.appendChild(closeBtn);

    const modalImg = document.createElement('img');
    modalImg.classList.add('modal_image');
    modalImg.src = url;
    modal.appendChild(modalImg);

    const modalSummary = document.createElement('article');
    modal.appendChild(modalSummary);

    closeBtn.addEventListener('click', e => {
      this.onClose();
    });
  }
}
