//se seleccionan los elementos del archivo html que se desean ocultar y mostrar segun la pagina donde se navegue. estas variables se ocultan y desocultan en el archivo nav.js 


//se seleccionan los elementos sections del codigo html
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');
const likedMoviesSection = document.querySelector('#liked');


//se seleccionan los elementos Lists & Containers del codigo html
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');
const likedMoviesListArticle = document.querySelector('.liked-movieList');

//se seleccionan los elementos Elementos del codigo html
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');