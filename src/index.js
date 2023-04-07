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

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

let pageNumber = 1;
let input = '';
let imageCounter = 40;

function onSearch(e) {
  e.preventDefault();
  hideLoadMoreBtn();
  input = e.currentTarget.elements.searchQuery.value.trim();
  pageNumber = 1;
  imageCounter = 40;
  clearHtmlMarkup();
  fetchImages(input, pageNumber, true)
    .then(result => {
      renderHtmlMarkup(result.imagesArray);
    })
    .then(unHideLoadMoreBtn);
}

async function onLoadMore() {
  pageNumber += 1;
  imageCounter += 40;
  await fetchImages(input, pageNumber).then(result => {
    renderHtmlMarkup(result.imagesArray);
    if (imageCounter > result.totalHitsValue) {
      hideLoadMoreBtn();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

// fetch(
//   'https://pixabay.com/api/?key=35035540-8bd526b593fab0e390d7ded9d&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=1'
// )
