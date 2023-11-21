'use strict';

const input = document.querySelector('input');
const search = document.querySelector('.fa-search');

search.addEventListener('click', () => {
    const location = input.value;
    if (location !== '') {
        const collapse = document.querySelector('.collapse');
        collapse.style.height = '350px';
    }
});
