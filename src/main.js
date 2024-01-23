import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const list = document.querySelector('.image-list');
const span = document.querySelector('.loader');

span.style.display = 'none';
form.addEventListener('submit', handleSearchOnForm);

function handleSearchOnForm(event) {
  event.preventDefault();
  list.innerHTML = '';
  span.style.display = 'block';
  const inputValue = event.target.elements.input.value;
  fetchImages(inputValue)
    .then(data => {
      span.style.display = 'none';
      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      list.innerHTML = ('beforeend', createMarkup(data.hits));
      const refreshPage = new SimpleLightbox('.image-list a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      refreshPage.refresh();
      form.reset();
    })
    .catch(error => {
      span.style.display = 'none';
      console.log(error);
    });
}

function fetchImages(name) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '41847717-e04c221e42f4fa0d8db3b7e62';
  const inputName = name;
  const SEARCH_PARAMS = new URLSearchParams({
    key: API_KEY,
    q: inputName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${SEARCH_PARAMS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="image-list-item">
          <a href="${largeImageURL}" class="list-image-link">
            <img class="list-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="image-wrapper">
            <ul class="desc-list">
              <li class="desk-item">
                <h2 class="desk-title">Likes</h2>
                <p class="desk-text">${likes}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Views</h2>
                <p class="desk-text">${views}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Comments</h2>
                <p class="desk-text">${comments}</p>
              </li>
              <li class="desk-item">
                <h2 class="desk-title">Downloads</h2>
                <p class="desk-text">${downloads}</p>
              </li>
            </ul>
          </div>
        </li>`
    )
    .join('');
}
