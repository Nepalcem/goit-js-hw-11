import refs from './refs';

function renderHtmlMarkup(objectsArray) {
  objectsArray.map(imageObject => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = imageObject;

    const markup = `<div class="photo-card">
    <img src="${webformatURL}" alt="" loading="lazy" width="290"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <i>${likes}</i>
      </p>
      <p class="info-item">
        <b>Views</b>
        <i>${views}</i>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <i>${comments}</i>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <i>${downloads}</i>
      </p>
    </div>
  </div>`;

    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}

function clearHtmlMarkup() {
  refs.gallery.innerHTML = '';
}

function unHideLoadMoreBtn() {
  refs.loadMore.classList.add('btn-hidden');
}
function hideLoadMoreBtn() {
  refs.loadMore.classList.remove('btn-hidden');
}

export {
  clearHtmlMarkup,
  renderHtmlMarkup,
  unHideLoadMoreBtn,
  hideLoadMoreBtn,
};
