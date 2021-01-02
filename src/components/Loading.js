export default class Loading {
  constructor(props) {
    const { $target } = props;
    this.spinnerWrapper = document.createElement('div');
    this.spinnerWrapper.classList.add('spinner_wrapper');
    this.spinnerWrapper.classList.add('hidden');

    $target.appendChild(this.spinnerWrapper);
    this.render();
  }
  toggleSpinner() {
    const spinner = document.querySelector('.spinner_wrapper');
    spinner.classList.toggle('hidden');
  }
  render() {
    const spinnerImg = document.createElement('img');
    spinnerImg.classList.add('img_spinner');
    spinnerImg.src = 'src/img/loading.gif';

    this.spinnerWrapper.appendChild(spinnerImg);
  }
}
