import icons from 'url:../../img/icons.svg'; //parcel 2  now

export default class View {
  _data;
  //how to write documentation
  /**
   *
   * @param {*} data = Render the recived object to the DOM
   * @param {*} render = @param {Object | Object[]} data  The data to be rendered (e.g. recipe)
   * @returns = @param {boolean} [render=true ]if fals , create markup string instead of rendering to the DOM
   * @return {undefine | string} a markup string is returned if render=false
   * @this {Object} View instance
   * @todo Finish implementation
   */

  /**
   *
   * @param {*} data
   * @param {*} render
   * @returns
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    // inject the dynimic html
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //algorithem to selectivly update DOM
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //trick ,string to DOM conversion
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  //method to clean previous conteiner data
  _clear() {
    this._parentElement.innerHTML = '';
  }
  //method to render the waiting spinner
  renderSpinner = function () {
    const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>`;
    this._parentElement.innerHTML = ''; //clear parent elemente
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    //inject the dynimic html
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    //inject the dynimic html
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
