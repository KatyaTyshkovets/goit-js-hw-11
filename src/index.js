import './sass/main.scss';
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import UserSearch from './Api.js';
import markupRender  from './markupRender';
import LoadBtn from './onLoadMore.js';


let gallery = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});

const userSearch = new UserSearch();

const loadBtn = new LoadBtn({
    selector: '[data-action="load"]',
    hidden: true,
});


const $serchForm = document.querySelector('.search-form');
const $loadButton = document.querySelector('.load-more');
const $gallery = document.querySelector('.gallery');

$serchForm.addEventListener('submit', onSearch);
$loadButton.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();
    
    userSearch.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

    if (userSearch.query === '') {
        return Notify.failure('Please,text');
    }
    loadBtn.show();
    userSearch.resetPage();
    $gallery.innerHTML = '';
    onLoadMore();
};

function onLoadMore() {
    loadBtn.disable();

    userSearch.fetchImages()
        .then(images => {
            if (images.length === 0) {
                nothingFound();
                loadBtn.hide();
            }
            
            markupRender(images);
            gallery.refresh();
            onScroll();
            loadBtn.able();

            const currentPage = UserSearch.page;
            const totalPage = Math.ceil(Number(images.totalHits) / 40);
            if (currentPage > totalPage) {
                theEndFoundSearch();
                loadBtn.hide();
            }
        });
}

function nothingFound() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}
function theEndFoundSearch() {
    Notify.info("We're sorry, but you've reached the end of search results.");
}




function onScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2.2,
        behavior: "smooth",
    });
}