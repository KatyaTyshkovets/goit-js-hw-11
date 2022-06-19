import { Notify } from 'notiflix';

const axios = require('axios');

export default class UserSearch {
    constructor() {
        this.searchQuery = '';
            this.page = 1;
        this.per_page = 40;
        this.totalHits = null;
    }

    async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
    key: '28057343-75b2b1ade1dfa3d34d67b38a0',
    q:`${this.searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40',
    page: `${this.page}`,
})
        const res = await axios.get(`${BASE_URL}?${params}`);
        if (this.page === 1 && res.data.totalHits !== 0) {
            Notify.success('Hooray! We found totalHits images.');
        }
        this.incrementPage();
        return res.data.hits;
    }
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
        this.totalHits = null;
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}

