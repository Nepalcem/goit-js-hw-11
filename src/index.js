import './css/style.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more-button'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onLoadMore() {}

function onSearch(e) {
  e.preventDefault();
  const input = e.currentTarget.elements.searchQuery.value;
  parameters.q = input.trim();
  fetchImages().then(console.log);
}

///////
const BASE_URL = 'https://pixabay.com/api/';

const parameters = {
  key: '35035540-8bd526b593fab0e390d7ded9d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
  page: 1,
};

const fetchImages = async () => {
  try {
    const response = await axios.get(BASE_URL, { params: parameters });
    const imagesArray = response.data;
    return imagesArray;
  } catch (error) {
    return console.log(error.message);
  }
};

// fetch(
//   'https://pixabay.com/api/?key=35035540-8bd526b593fab0e390d7ded9d&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=1'
// )
