import './css/style.css';
import refs from './js-assets/refs';
import { fetchImages } from './js-assets/api-service';
import {
  clearHtmlMarkup,
  renderHtmlMarkup,
  unHideLoadMoreBtn,
  hideLoadMoreBtn,
} from './js-assets/html-render';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

let pageNumber = 1;
let input = '';
let imageCounter = 40;

async function onSearch(e) {
  e.preventDefault();
  hideLoadMoreBtn();
  input = e.currentTarget.elements.searchQuery.value.trim();
  pageNumber = 1;
  imageCounter = 40;
  clearHtmlMarkup();
  await fetchImages(input, pageNumber, true)
    .then(result => {
      renderHtmlMarkup(result.imagesArray);
    })
    .then(unHideLoadMoreBtn)
    .then(imageLightBox);
}

function imageLightBox() {
  const lightBox = new simpleLightbox('.gallery a');
}

async function onLoadMore() {
  pageNumber += 1;
  imageCounter += 40;
  await fetchImages(input, pageNumber)
    .then(result => {
      renderHtmlMarkup(result.imagesArray);
      if (imageCounter > result.totalHitsValue) {
        hideLoadMoreBtn();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .then(imageLightBox);
}
