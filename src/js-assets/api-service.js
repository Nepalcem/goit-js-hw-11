import axios from 'axios';
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';

const parameters = {
  key: '35035540-8bd526b593fab0e390d7ded9d',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
};

const fetchImages = async (searchQuery, pageNumber, unique = false) => {
  try {
    const params = { ...parameters, q: searchQuery, page: pageNumber };
    const response = await axios.get(BASE_URL, { params });
    const imagesArray = response.data.hits;
    if (imagesArray.length < 1) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    const totalHitsValue = response.data.totalHits;
    if (unique) {
      Notiflix.Notify.success(`Hooray! We found ${totalHitsValue} images.`);
    }
    return {
      imagesArray: imagesArray,
      totalHitsValue: totalHitsValue,
    };
  } catch (error) {
    return Notiflix.Notify.failure(error.message);
  }
};

export { fetchImages };

// fetchImages(searchTerm, pageNumber)
//   .then(imagesArray => console.log(imagesArray))
//   .catch(error => console.log(error.message));
