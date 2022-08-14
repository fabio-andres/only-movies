/*este archivo contiene el codigo para navegar entre paginas usando la navegacion con hash. dicha navegacion se logra ocultando y desocultando elementos html, ademas modificandoles el estilo y añadiendo eventos a los elementos html

para saber que elementos html ocultar, desocultar o modificar su estilo nos debemos guiar con el diseño ui

TENER EN CUENTA QUE OCULTAR UN ELEMENTO EN UNA PAGINA X HARA QUE DICHO ELEMENTO TAMBIEN SE OCULTE EN OTRA PAGINA Z DONDE SE MOSTRABA EL ELEMENTO. ESTO OCURRE PORQUE SE ESTA MANIPULANDO EL MISMO ARCHIVO HTML

para ocultar elementos html se debe usar js para añadir a dichos elementos la clase que en el codigo css aplica el estilo display:none, osea, si en el codigo css el selector de clase llamado por ejemplo inactive tiene el estilo display:none, entonces la clase inactive es la que se debe añadir al elemento que se desee ocultar

para desocultar elementos html previamente ocultados se debe usar js para eliminar a dichos elementos la clase que en el codigo css aplica el estilo disply: none, osea, si en el codigo css el selector de clase llamado por ejemplo inactive tiene el estilo display:none, entonces la clase inactive es la que se debe eliminar del elemento que se desee desoocultar*/


//se declaran las variables globales para poder usarlas en este archivo y en el archivo main.js

let maxPage//variable donde se almacena el numero maximo de paginas donde se ubican las peliculas en tendencia de la api. en este caso el numero maximo de paginas de la api movie db son 1000. para conocer este valor se lee la documentacion o se hace un console.log() al dato de que se trae en la peticion hecha al endpoint /trending/movie/day

let page = 1//variable usada por la funcion getPaginatedTrendingMovies() ubicada en el archivo main.js. como dicha funcion se ejecuta en este archivo entonces esta variable se declara aqui para que la funcion getPaginatedTrendingMovies() puede usar dicha variable

let infiniteScroll
let resizeImg



//esta funcion se encarga de mostar solo los elementos html correspondientes a la pagina home por lo tanto deben ocultar elementos de otras paginas que no sean home. lo mismo se hace en las otras funciones
function homePage() {
  console.log('Home!!');

  //se elimina la clase header-container--long del elemento almacenado en la variable headerSection dicho elemento es <header>. al eliminar la clase header-container--long se elimina su estilo css ya que dicho estilo solo se debe mostrar en la pagina movie details
  headerSection.classList.remove("header-container--long")

  //eliminar el estilo background asignado al elemento html almacenado en la variable headerSection para lograr esto a background se le asigna un valor vacio. el valor original de background es una imagen que solo debe aparecer en la pagina movie details ""
  headerSection.style.background= ""

  //al boton arrowBtn se le añade la clase inactive la cual aplica un estilo css para ocultar dicho boton
  arrowBtn.classList.add("inactive")
  arrowBtn.classList.remove("header-arrow--white")

  //en el header de la pagina home no mostrar el titulo de la categoria de las pelicula ya que esto solo se debe mostrar en el header de la pagina categories. la clase inactive aplica un estilo css para ocultar el elemento headerCategoryTitle
  headerCategoryTitle.classList.add("inactive")

  //en el header de la pagina home siempre mostrar el titulo de la pagina web
  headerTitle.classList.remove("inactive")

  searchForm.classList.remove("inactive")


  trendingPreviewSection.classList.remove("inactive") 
  categoriesPreviewSection.classList.remove("inactive")
  genericSection.classList.add("inactive")
  movieDetailSection.classList.add("inactive")

  //desoculta la seccion de peliculas favoritas
  likedMoviesSection.classList.remove("inactive")
  


 //se ejecutan las funciones asincronas del archivo main.js. estas funciones se ejecutan cada vez que se entre a la pagina home
 getTrendingMoviesPreview()
 getGenresPreview() 
 getLikedMovies()
}

function categoriesPage() {
  console.log('categories!!');

  headerSection.classList.remove("header-container--long")
  headerSection.style.background= ""
  arrowBtn.classList.remove("inactive")
  arrowBtn.classList.remove("header-arrow--white")
  headerCategoryTitle.classList.remove("inactive")
  headerTitle.classList.add("inactive")
  searchForm.classList.add("inactive")
  trendingPreviewSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive")
  genericSection.classList.remove("inactive")
  movieDetailSection.classList.add("inactive")

  //oculta la seccion de peliculas favoritas
  likedMoviesSection.classList.add("inactive")


  //a la funcion getMoviesByCategories() se le debe enviar como parametro el id de cada categoria de pelicula para que dicha funcion en su implementacion haga la peticion a la categoria correspondiente al id. el id se obtiene del hash de la url de cada categoria. dicho id se añadio al hash en el archivo main.js en la linea 47
  
  //como el hash de la url es por ejemplo #category=878-action, entonces se debe recorrer ese hash y tomar solo el id, osea, tomar 878. como el hash es un string, entonces se usa el metodo split() para obtener el id 878 del string #category=878-action 

  //location.hash.split("=") devuelve un array con 2 elemetos, el primer elemento se almacena en la variable hashCategory dicho elemento es #category. el segundo elemento se almacena en la variable categoryData dicho elemento es 878-action 
  const [hashCategory, categoryData] = location.hash.split("=")
  //como en categoryData se almaceno 878-action, entonces se usa split para obtener el id 878 el cual se almacena en categoryId
  const [categoryId, categoryName] = categoryData.split("-")
  
  //las categorias de peliculas que tengan nombre con espacio como por ejemplo science fiction al asignarlas al hash de la url, entonces, se mostraran en la pagina como science%20fiction ya que la url le añade a los espacios el simbolo %20. para eliminar ese espacio se usa el prototipo (clase) decodeURI(string con espacios %20). dicho nombre de categoria se añadio al hash en el archivo main.js en la linea 47
  const nameWithSpace = decodeURI(categoryName)

  //a la pagina categorias poner le como titulo el nombre de categoria seleccionada, dicho nombre esta almacenado en lavariable nameWithSpace
  headerCategoryTitle.innerHTML = nameWithSpace

  getMoviesByCategories(categoryId)
}

function movieDetailsPage() {
  console.log('Movie!!');

  //se ocultan y desocultan los elementos html estatico necesarios para que se muestre bien la pagina movie details
  headerSection.classList.add('header-container--long');
// headerSection.style.background = '';
arrowBtn.classList.remove('inactive');
arrowBtn.classList.add('header-arrow--white');
headerTitle.classList.add('inactive');
headerCategoryTitle.classList.add('inactive');
searchForm.classList.add('inactive');

trendingPreviewSection.classList.add('inactive');
categoriesPreviewSection.classList.add('inactive');
genericSection.classList.add('inactive');
movieDetailSection.classList.remove('inactive');

//oculta la seccion de peliculas favoritas
likedMoviesSection.classList.add("inactive")


  //se lee el hash de la pagina movie destructurandolo
  const [hashCategory, movieId] = location.hash.split("=")
  
  
  resizeImg = getMovieById(movieId)//se ejecuta la funcion getMovieById() y su valor de retorno se almacena en la variable resizeImg. dicho valor de retorno es una funcion

  resizeImg()//se ejecuta la funcion almacenada en la variable resizeImg para que al entrar en una pelicula se cargue su contenido. si se hubioera puesto getMovieById(movieId) no hubiera funciondo ya que el contenido de dicha funcion no tiene logica sino que retorna una funcion
}

function searchPage() {
  console.log('Search!!');

  headerSection.classList.remove("header-container--long")
  headerSection.style.background= ""
  arrowBtn.classList.remove("inactive")
  arrowBtn.classList.remove("header-arrow--white")
  headerCategoryTitle.classList.remove("inactive")
  headerTitle.classList.add("inactive")
  searchForm.classList.remove("inactive")
  trendingPreviewSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive")
  genericSection.classList.remove("inactive")
  movieDetailSection.classList.add("inactive")

  //oculta la seccion de peliculas favoritas
  likedMoviesSection.classList.add("inactive")

  const [hashCategory, searchValue] = location.hash.split("=")
  getMoviesBySerch(searchValue)

  //como la funcion getPaginatedMoviesBySerch(searchValue) del archivo main.js recibe un parametro entonces se debe enviar dicho parametro  al asignarla al infiniteScroll el problema es que al hacer esto se ejecuta dicha funcion lo cual es un error ya que esta solo se debe ejecutar al hacer scroll vertical maximo. para solucionar esto el contenido de las funcion getPaginatedMoviesBySerch(searchValue) debe ser retornado por dicha funcion de esta forma en infiniteScroll se asigna el contenido de getPaginatedMoviesBySerch(searchValue)
  infiniteScroll = getPaginatedMoviesBySerch(searchValue)//se asigna scroll infinito a la pagina de busquedas. no es necesario poner infiniteScroll() para ejecutar la funcion almacenada en la variable infiniteScroll ya que es solo se ejecuta al hacer scroll

}

function trendsPage() {
  console.log('TRENDS!!');

  headerSection.classList.remove("header-container--long")
  headerSection.style.background= ""
  arrowBtn.classList.remove("inactive")
  arrowBtn.classList.remove("header-arrow--white")
  headerCategoryTitle.classList.remove("inactive")
  headerTitle.classList.add("inactive")
  searchForm.classList.add("inactive")
  trendingPreviewSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive")
  genericSection.classList.remove("inactive")
  movieDetailSection.classList.add("inactive")

  //oculta la seccion de peliculas favoritas
  likedMoviesSection.classList.add("inactive")

  //a la pagina de tendencias poner como titulo el texto tendencias
  headerCategoryTitle.innerHTML = "Tendencias"
  getTrendingMovies()

  //a la variable infiniteScroll se le asigna la funcion getPaginatedTrendingMovies que se creo en el archivo main.js en la linea 119. esto sirve para que cada vez que el evento window.addEventListener('scroll', infiniteScroll, false) ubicado en la linea 198 tenga una funcion que ejecutar. en este caso la funcion getPaginatedTrendingMovies añade scroll infinito a la pagina de tendencias
  infiniteScroll = getPaginatedTrendingMovies;
}


 //funcion que ejecuta la navegacion entre paginas mostrando la pagina correspondiente al hash que tenga la url  
 function nav() {
  console.log({ location });

  

  /*cuando un evento es creado este siempre sera escuchado por el objeto al que se añadio dicho evento incluso si se elimina la funcion que ejecuta el evento, osea, un objeto siempre ejecutara el evento que se le añadio. para lograr que el evento deje de ejecutarse se debe eliminar el evento con el metodo removeEventListener().  como el evento de scroll infinito se añadio al objeto window el cual es un objeto global que contiene al DOM, entonces, el evento scroll infinito se aplicara al DOM, osea, se aplicara a todas las paginas del sitio lo cual es un error por eso se debe eliminar el evento scroll infinito en las paginas donde no se necesite. otra forma de ver esto es que el objeto global window representa la ventana del navegador y como las paginas del sitio web estan dentro de la ventana del navegador, entonces, el evento afectara a todas las paginas del sitio
  
  ademas se debe poner la variable infiniteScroll en false para que la condicion de la linea 215 no se cumpla y no se vuelva a crear el evento */
    if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false });//al objeto window se le remueve el evento scroll
    infiniteScroll = false;
  } 

  if (resizeImg) {
    window.removeEventListener('resize', resizeImg, { passive: false });
    resizeImg = false;
  }
 
  
  //si el hash de la url inicia por #trends quiere decir que estamos ubicados en la pagina trends por lo tanto ejecutar la funcion trendsPage() para ir la pagina trends. startsWith() es un metodo que se usa con strings
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
    //si no se carga ninguna pagina ir al home
  } else {
    homePage();
  }
  document.body.scrollTop = 0

  //se añade scroll infinito solo a las paginas que tengan la instruccion infiniteScroll = getPaginatedTrendingMovies;
  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll, { passive: false });
  }

  if (resizeImg) {
  window.addEventListener('resize', resizeImg, { passive: false });
    }
}
//se añaden los eventos necesarios a los elementos html estaticos dichos elementos son botones:


/*se añade el evento click al boton search: cuando se de click en el boton search cambiar el hash de la pagina actual por 
#search=texto ingresado en la barra de busqueda. esto sirve para 3 cosas:

1- para navegar a la pagina de busquedas mediante la funcion nav

2- para informar al usuario de la busqueda que hace ya que el hash aparace en la barra de direcciones.

3- para obtener del hash solo el texto de la pelicula buscada y enviarlo como parametro a la funcion asincrona que hace la peticion al endpoint de peliculas buscadas y que crea el codigo html donde se muestran las peliculas buscadas*/

searchFormBtn.addEventListener("click", ()=>{
//el atributo .value es un atributo que viene por defecto en los elementos html input. .value contiene el texto ingresado en un input de un formulario
location.hash="#search=" + searchFormInput.value
})


//se añade el evento click al boton ver mas tendencias
trendingBtn.addEventListener("click", ()=>{
location.hash="#trends="
})


//se añade el evento click al boton flecha que se usa para retroceder:
arrowBtn.addEventListener("click", ()=>{
//al dar click en la flecha se retrocede a la pagina anterior. esto se logra con el metodo history.back() el cual devuelve la url anteriormente visitada poniendola en la barra de navegacion
history.back()

/*si ingresamos a una pagina x desde google o desde un link de otra pagina y se presiona atras ejecutando solo history.back() entonces volveremos a google o a la pagina donde estaba el link. si en este caso se desea volver al home de la pagina y no a google, entonces, se pone el siguiente codigo

if (document.domain !== "aqui se pone la url a la que se desea ir"){
  location.hash = "#home"
}else{
history.back()
} */
})


//se añaden los eventos necesarios a la ventana del navegador, osea, la objeto window.


//cuando ocurra el evento DOMContentLoaded ejecutar la funcion nav. el evento DOMContentLoaded ocurre cuando el contenido html de la pagina ya se haya cargado completamente en el navegador sin importar que el codigo ccs o js no se haya cargado, osea, cada vez que se cargue el html de la pagina ejecutar nav
window.addEventListener('DOMContentLoaded', nav, false);

//cuando ocurra el evento hashchange ejecutar la funcion nav. el evento hashchange detecta cuando en la url se cambia el hash
window.addEventListener('hashchange', nav, false);
