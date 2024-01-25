import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const list = document.querySelector('.image-list');
const span = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-button');
const secSpan = document.querySelector('.sec-loader');

span.style.display = 'none';
secSpan.style.display = 'none';
loadBtn.style.display = 'none';
form.addEventListener('submit', handleSearchOnForm);
loadBtn.addEventListener('click', loadMoreImages);

const queryParams = {
  currentPage: 1,
  pageSize: 40,
  refreshPage: '',
  inputValue: '',
};

function handleSearchOnForm(event) {
  event.preventDefault();
  list.innerHTML = '';
  span.style.display = 'block';
  loadBtn.style.display = 'none';
  queryParams.inputValue = event.target.elements.input.value.trim();
  if (!queryParams.inputValue) {
    iziToast.warning({
      title: 'Caution',
      message: 'Sorry, you have not entered anything in the search',
    });
    span.style.display = 'none';
    return;
  }
  fetchImages(queryParams.inputValue, queryParams.currentPage)
    .then(({ data }) => {
      span.style.display = 'none';
      const totalPages = Math.ceil(data.totalHits / queryParams.pageSize);
      if (queryParams.currentPage === totalPages) {
        loadBtn.style.display = 'none';
      } else {
        loadBtn.style.display = 'block';
      }
      if (!data || data.totalHits === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      queryParams.refreshPage = new SimpleLightbox('.image-list a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      queryParams.refreshPage.refresh();
      form.reset();
    })
    .catch(error => {
      span.style.display = 'none';
      console.log(error);
    });
}

async function fetchImages(name, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '41847717-e04c221e42f4fa0d8db3b7e62';
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });
    return response;
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Sorry! The site is currently unavailable. Please try later!',
    });
    console.error(error.message);
  }
}

async function loadMoreImages() {
  queryParams.currentPage += 1;
  secSpan.style.display = 'block';
  loadBtn.style.display = 'none';
  const getImgHeight = () =>
    document.querySelector('.image-list-item').getBoundingClientRect();
  try {
    const { data } = await fetchImages(
      queryParams.inputValue,
      queryParams.currentPage
    );
    if (!data || data.totalHits === 0) {
      iziToast.warning({
        title: 'Caution',
        message: 'No matching images found.',
      });
      loadBtn.style.display = 'none';
      secSpan.style.display = 'none';
      return;
    }
    list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    window.scrollBy({
      top: getImgHeight().height * 2,
      left: 0,
      behavior: 'smooth',
    });
    queryParams.refreshPage.refresh();
    const totalPages = Math.ceil(data.totalHits / queryParams.pageSize);
    if (queryParams.currentPage === totalPages) {
      iziToast.info({
        title: 'Caution',
        message: `We're sorry, but you've reached the end of search results.`,
      });
      loadBtn.style.display = 'none';
      secSpan.style.display = 'none';
      return;
    }
    secSpan.style.display = 'none';
    loadBtn.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
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
