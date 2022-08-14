//ester archivo contine el codigo de las peticiones que se hacen a cada endpoint y el codigo que crea elementos html con js donde se muestran los datos que se traen del endpoint

//utils: utils es un comentario que se usa para indicar la parte donde se crean funciones que contienen codigo que se repite. en este caso la funcion createsMovies() contiene un codigo que se repite en 2 de las funciones que estan mas abajo. lo unico que cambia es el parametro movies y container los cuales se envian desde las funciones donde se ejecute la funcion createsMovies()


//funcion que devuelve los datos almacenados en localStorage. dichos datos son las peliculas favoritas, osea, a las que se dio me gusta
function likedMoviesList() {

    //se obtiene el valor de la clave string liked_movies almacenado en local storage y se convierte en un objeto literal para manipularlo mas facil
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
  
    //si hay informacion almacenada en local storage entonces item tendra un valor por lo que la condicion es true y en la variable movies se almacenara item, osea, se almacena el contenido de localStorage. si en localStorage no hay informacion entonces item no tendra un valor por lo que la condicion sera false y en la variable movies se almacenara un objeto vacio {}
    if (item) {
      movies = item;
    } else {
      movies = {};
    }
    
    return movies;//se retornan los datos almacenados en local storage en un objeto literal. si no hay datos se retorna un objeto vacio {}
  }
  

//funcion que se usa para saber si una pelicula ya esta almacenada en localStorage o no. esto sirve para que en localStorage no se guarde varias veces la misma pelicula favorita si el usuaio da click al boton de favoritos varias veces. el parametro movie es un objeto literal que almacena la informacion de cada pelicula de la api 
  function likeMovie(movie) {
    const likedMovies = likedMoviesList();//ejecuta la funcion likedMoviesList() y almacena su valor de retorno en la variable likedMovies, dicho valor de retorno son los datos de localStorage
  
//EXPLICACION DE PORQUE LA CONDICION DEVUELVE true: si el objeto likedMovies tiene un atributo movie (movie es un objeto) que a su vez tiene un atributo id con un valor numerico, entonces la condicion se cumple ya que los numeros devuelven true. como el objeto likedMovies representa las peliculas favoritas almacenadas en localStorage entonces al cumplirse la condicion quiere decir que en localStorage ya esta almacenada la pelicula movie.id, osea, a la pelicula ya se le habia dado me gusta previamente por lo tanto lo que el usuario hizo fue quitar el me gusta por lo tanto al objeto likedMovies en su atributo movie.id se le asigna undefined.

//EXPLICACION DE PORQUE LA CONDICION DEVUELVE false:si la condicion no se cumple entonces quiere decir que la pelicula no estaba guardada en localStorage, osea, a la pelicula no se le habia dado me gusta o se le quito el me gusta. 

//si a la pelicula no se le habia dado me gusta significa que no esta almacenada en localStorage por lo que su valor es null lo cual devuelve false y la conducion no se cumple. si esto ocurre entonces al objeto likedMovies crearle el atributo movie.id y asignarle como valor el objeto movie

//si a la pelicula se le quito el me gusta entonces al atributo movie.id del objeto likedMovies se le asigno undefined lo cual devuelve false y la condicion no se cumple. si esto ocurre entonces al objeto likedMovies asignarle a su atributo movie.id como valor el objeto movie 

    if (likedMovies[movie.id]) {
      likedMovies[movie.id] = undefined;
    } else {
      likedMovies[movie.id] = movie;
    }
  
    //el valor almacenado en la variable likedMovies se almacena en localStorage dentro de la clave "liked_movies". como despues de la anterior condicion likedMovies puede ser un objeto literal o undefined, entonces, se convierte en un string con formato de objeto literal para poder almacenarlo en localStorage
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));

    //se ejecutan estas funciones para que al darle me gusta a una pelicula desde la pagina principal la pelicula se añada a la seccion de favoritos
    getLikedMovies();
    getTrendingMoviesPreview();
  }


function createMovies(movies, container, clean){
//como cada vez que se entre a una pagina que muestra imagenes de peliculas se ejecuta esta funcion la cual hace una peticion a la api, entonces siempre se hara una peticion a la api al entrar a dichas paginas por lo que cada vez que esto ocurra el contenido que se traiga de la api se repetira en la pagina. para evitar el contenido repetido se debe borrar el contenido actual de la pagina cada vez que esta se carga. para hacer esto se debe borrar el contenido del contenedor html donde se muestran los datos traidos de la api usando el atributo .innerHTML ="" el cual tambien sirve para borrar las pantallas de carga creadas

//como hay paginas donde al hacer una nueva peticion a la api si queremos que se borre el contenido actual y hay paginas donde NO queremos que se borre el contenido actual como las paginas con scroll infinito, entonces .innerHTML ="" se debe meter dentro de un condicional if el cual compara el valor clean que se recibio como parametro en la funcion, dicho valor clean se enviado por cada pagina. si clean es true se borra el contenido de la pagina al hacer una peticion y si clean es false el contenido no se borra
     if (clean) {
        container.innerHTML = "";
      }
     

    //se recorren los elementos del array movies los cuales son objetos literales. cada objeto de ese array se almacena en readMovies. cada objeto almacenado en readMovies representa una pelicula de la api por lo que cada uno de esos objetos tiene atributos como el titulo de la pelicula, el id de la pelicula, el poster de la pelicula, etc
     movies.forEach(readMovies => {
         //¿los elementos html creados con js en cual archivo html se generan? los elementos se generan en el archivo html que tenga conectado el archivo js donde se creo el elemento html

        
        //se crea el elemento html div y se le pone como nombre de clase movie-container 
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie-container")

        //se crea el elemento html img, se le pone como nombre de clase movie-img, se le pone el atributo alt con el valor que contiene readMovies.title dicho valor es el nombre de cada pelicula 
        const movieImg = document.createElement("img")

       
        //se le añade al elemento movieImg la clase "movie-img" para asi aplicarle el estilo que dicha clase tiene en el codigo css
        movieImg.classList.add("movie-img")
        movieImg.setAttribute("alt", readMovies.title)

        
        movieImg.setAttribute("src", "https://image.tmdb.org/t/p/w300/" + readMovies.poster_path)//la url https://image.tmdb.org/t/p/w300/ es la url base para traer imagenes de peliculas, esta url se saco de la documentacion de la api. el /w300 es el tamaño de imagen que se desea traer. es el a dicha url hay que concatenarle el archivo de la imagen que se desea ver, dicho archivo se almacena en el atributo poster_path del objeto movies que es el body de la peticion hecha a la api movie db. 
       

         //el atributo loading = "lazy" permite añadir la tecnica de optimizacion lazy loading a cada imagen traida de la api
         movieImg.setAttribute("loading", "lazy")
        
       
         //se añade a cada elemento movieImg un evento click. recordar que readMovies es una variable donde se almacenan los elementos del array movies, dichos elementos son objetos que contienen datos traidos de la api
         movieImg.addEventListener("click", ()=>{
        location.hash = "#movie=" + readMovies.id
    })

        //se añade a cada elemento movieImg el evento error el cual detecta si un recurso no se puede cargar o usar, en este caso detecta si una imagen traida de la api no se cargo, entonces, al detectar esto añadir otra imagen a dicho elemento movieImg. la imagen que se añadio informa al usuario que la imagen original de la api no se pudo cargar
        movieImg.addEventListener("error", () =>{
            movieImg.setAttribute("src", "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png")
        } )

        


        //se crea un boton de me gusta para seleccionar peliculas favoritas
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');

       
        //cuando se haga click al boton de me gusta se le modifica su clase para asi aplicarle un nuevo estilo pero cuando se vuelva a hacer click al boton se le asigna su antigua clase. esto se logra con el metodo .toggle(). tambien cuando se haga click al boton de me gusta ejecutar la funcion likeMovie(readMovies) la cual almacena las peliculas favoritas en local storage
         movieBtn.addEventListener('click', () => {
         movieBtn.classList.toggle('movie-btn--liked');
         likeMovie(readMovies)   
    });


     //si la pelicula esta en localStorage entonces al boton de me me gusta añadirle la clase movie-btn--liked para que se le aplique el estilo de boton de me gusta presionado. la forma en que funciona este codigo es que se ejecuta la funcion likedMoviesList() la cual devuelve un objeto por lo tanto al poner likedMoviesList()[readMovies.id] se comprueba si en el objeto que devuelve likedMoviesList() tiene el atributo readMovies.id con un valor numerico
     if (likedMoviesList()[readMovies.id]){
      movieBtn.classList.add('movie-btn--liked');
    }//otra forma de poner la condicion anteiror es: likedMoviesList()[readMovies.id] && movieBtn.classList.add('movie-btn--liked');

     
        movieContainer.appendChild(movieImg)
        movieContainer.appendChild(movieBtn)//el boton de me gusta se mete dentro del contenedor movieContainer
        container.appendChild(movieContainer)//container es un parametro que se recibio en esta funcion. su valor puede ser la variable trendingMoviesPreviewList o puede ser genericSection las cuales se crearon en el archivo node.js

       
     })
}


function createCategories(genre, container){
     //como cada vez que se entre a la pagina home se ejecuta esta funcion la cual hace una peticion a la api, entonces siempre se hara una peticion a la api al entrar a home, entonces el contenido que se traiga de la api se repetira en la pagina. para evitar el contenido repetido se debe borrar el contenido actual de la pagina cada vez que esta se carga. para hacer esto se debe borrar el contenido del contenedor html donde se muestran los datos traidos de la api usando .innerHTML = ""

     //.innerHTML ="" tambien sirve para borrar las pantallas de carga
     container.innerHTML=""

     genre.forEach(readGenres => {

        const genreContainer = document.createElement("div")
        genreContainer.classList.add("category-container")

        const genreTitle = document.createElement("h3")
        genreTitle.classList.add("category-title")

        /*al elemento genreTitle el cual es un h3 se le añade el atributo id con un valor "id" al que se le concatena un numero que representa una categoria de peliculas. este valor numerico se obtuvo del parametro genre recibido en esta funcion, dicho parametro fue enviado por la funcion async function getMovieById(movieId) de la linea de codigo 240. genre es un objeto que contiene varios atributos referentes al genero de una pelicula en este caso se uso el atributo id de genre. esto se hace para añadir a cada elemento genreTitle un selector id diferente, dicho selector esta definido en el codigo css para aplicar un color diferente a cada categoria de pelicula, osea, que al añadir al elemento genreTitle dicho id se le aplicara un estilo de color a dicho elemento.
        
        los selectores que se usaron en el codigo css fueron literal los id numericos de cada categoria, osea, para poder poner esos selectores en el codigo css primero se hizo una peticion al endpoint de categorias y con console.log se imprimio el json recibido de la peticion para conocer los id de las categorias y asi ponerlos como selectores en css
        
        esto se hizo asi por que en la pagina de pelicula seleccionada la cantidad de categorias varia pues una pelicula puede ser de accion y terror pero otra solo de comedia, osea, que por ejemplo una pelicula que tenga 3 categorias tendra 3 id de generos*/
        genreTitle.setAttribute("id", "id" + readGenres.id)
        const genreTitleText = document.createTextNode(readGenres.name)
        
        genreTitle.appendChild(genreTitleText)
        genreContainer.appendChild(genreTitle)
        container.appendChild(genreContainer)//el parametro que recibe container puede ser la variable categoriesPreviewList o puede ser ... las cuales se crearon en el archivo node.js

        //se añade el evento click a cada categoria de las peliculas para que al dar click sobre ellas se cambien el hash de la url actual y se pueda ir a la pagina de cada categoria. el atributo readGenres.name sirve para que en la url se muestre el nombre de la categoria y asi dar informacion clara al usuario de la categoria de peliculas que esta viendo. COMO EL EVENTO ES EL MISMO PARA TODOS LOS ELEMENTOS ENTONCES DICHO EVENTO SE CREA DENTRO DEL FOR. SI CADA ELEMENTO DEBE TENER UN EVENTO DIFERENTE ENTONCES SE CREAN FUERA DE L FOR
        genreTitle.addEventListener("click", ()=>{
            location.hash= `#category=${readGenres.id}-${readGenres.name}`
        })  
    });
}


//las siguientes funciones contienen peticiones a los diferentes endpoints de la api

//funcion que trae la informacion de las peliculas en tendencia y crea la estructura html donde se muestran dichas peliculas
async function getTrendingMoviesPreview(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)//el numero /3/ es la version de la api
    const data = await res.json()
    console.log(data)
    const movies = data.results//el atributo results del body se almacena en la vairable movies. el atributo results es un array donde sus elmentos son objetos literales que contienen los datos de las peliculas en tendencia del dia

    createMovies(movies, trendingMoviesPreviewList, true)//la variable trendingMoviesPreviewList esta creada en el archivo node.js en la linea 13. el valor true indica que si se desea borrar de la pagina home el contenido de laspeliculas en tendencia cada vez que haya una nueva carga
  } 


async function getGenresPreview(){
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)//el numero /3/ es la version de la api
    const data = await res.json()
    const genre = data.genres

    createCategories (genre, categoriesPreviewList)
} 


async function getMoviesByCategories(id){
    //id es un numero que identifica a cada categoria de pelicula. este valor se debe enviar en la peticion como un query params o en los headers. en este caso se en vio como un query params por lo que se debe leer la documentacion para saber cual query params usar, segun la documentacion se debe usar el query params with_genres asginandole el id
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`)
    const data = await res.json()
    const movies = data.results

    createMovies(movies, genericSection, true)//el valor true indica que si se desea borrar de la pagina home el contenido de categorias cada vez que haya una nueva carga de la pagina home
    }

async function getMoviesBySerch(searchValue){
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchValue}`)
    const data = await res.json()
    const movies = data.results
    maxPage = data.total_pages//se almacena el numero total de paginas donde esta el contenido de peliculas buscadas en la api. como el valor total_pages se obtiene en el endpoint de esta funcion asincrona por eso dicho valor se obtiene aqui asignandolo a la variable maxPage para esa variable sera usada en la funcion asincrona getPaginatedMoviesBySerch(searchValue)

    createMovies(movies, genericSection, clean = true)
}


//el contenido de las funcion getPaginatedMoviesBySerch(searchValue) debe ser retornado para que dicho contenido sea asignado a la variable infiniteScroll en el archivo nav.js en la linea 122 
 function getPaginatedMoviesBySerch(searchValue) {
    return async function(){
    //del elemento html documentElement el cual es el elemento <html> se obtienen los valores de sus atributos scrollTop, scrollHeight, clientHeight
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage//si la pagina actual es menor a la pagina maxima, entonces que el scroll infinito siga haciendo peticiones sino no. con esto se evita que al llegar a la ultima pagina ocurra un error de peticion
  
    //si el usuario hace scroll vertical maximo entonces el valor de la variable scrollIsBottom es true por lo tanto hacer una nueva peticion a la api para cara cargar nuevo contenido en la pagina de tendencias y crear la estructura html para mostrar dicho contenido
    if (scrollIsBottom && pageIsNotMax) {
      page++;//aumenta de 1 en 1 el valor de page consultado en la api
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${page}`)
      const data = await res.json()
      const movies = data.results;
  
      createMovies(movies, genericSection, clean = false);//la variable genericSection esta creada en el archivo node.js en la linea 8. el parametro clean = false indica que NO se desea borrar el contenido de la pagina tending movies si se carga nuevo contenido con scroll infinito
    }
}
}

async function getTrendingMovies(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)//el numero /3/ es la version de la api
    const data = await res.json()
    const movies = data.results//el atributo results contiene un objeto literal con los datos de las peliculas en tendencia del dia
    maxPage = data.total_pages//se almacena el numero total de paginas donde esta el contenido de peliculas en tendencia de la api. como el valor total_pages se obtiene en el endpoint de esta funcion por eso se asigna el valor aqui pero la variable maxPage sera usada en la funcion getPaginatedTrendingMovies()

    createMovies(movies, genericSection, clean = true)//la variable genericSection esta creada en el archivo node.js en la linea 8. //el parametro clean = true indica que si se desea borrar el contenido de la pagina trending movies cada vez que se ingrese a dicha pagina
} 


//funcion que crea scroll infinito en la pagina de trending movies
async function getPaginatedTrendingMovies() {
    //del elemento html documentElement el cual es el elemento <html> se obtienen los valores de sus atributos scrollTop, scrollHeight, clientHeight
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage//si la pagina actual es menor a la pagina maxima, entonces que el scroll infinito siga haciendo peticiones sino no. con esto se evita que al llegar a la ultima pagina ocurra un error de peticion
  
    //si el usuario hace scroll vertical maximo entonces el valor de la variable scrollIsBottom es true por lo tanto hacer una nueva peticion a la api para cara cargar nuevo contenido en la pagina de tendencias y crear la estructura html para mostrar dicho contenido
    if (scrollIsBottom && pageIsNotMax) {
      page++;//aumenta de 1 en 1 el valor de page consultado en la api
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`)
      const data = await res.json()
      const movies = data.results;
  
      createMovies(movies, genericSection, clean = false)//el parametro clean = false indica que NO se desea borrar el contenido de la pagina tending movies si se carga nuevo contenido con scroll infinito
    }
}

//el parametro movieId se pone en la url concatenandolo directamente. movieId no se pasa como un query params ya que la documentacion indica que se contatene directamente
 function getMovieById(movieId){
  return async function(){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)//el numero /3/ es la version de la api
    const movie = await res.json()
    console.log(movie)
    
    /*el siguiente condicional if else es un codigo responsive para mostrar imagenes pequeñas o grandes en la pagina movie details segun el tamaño de pantalla. todo el codigo css va en los archivos css pero en este caso solo esta parte de css se creo con js
    
    si el ancho de pantalla es menor o igual a 599 entonces al elemento headerSection se le asigna un codigo css para mostrar la imagen poster de cada pelicula, ademas, a cada poster se le añade un estilo de sombra para que la flecha de retroceso tenga un contraste y se vea bien. si la condicion no se cumple es porque el ancho de pantalla es mayor a 599 entonces al elemento headerSection se le asigna un codigo css para mostrar la imagen backdrop que es un IMgen mas grande. 
    
    esta estructura no se metio en otra funcion porque este codigo no se repite ya que solo se aplica a la pagina de movie details*/
    if(screen.width <= 619){
    const movieImg = "https://image.tmdb.org/t/p/w500/" + movie.poster_path
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImg})`//url() es una funcion de css que se asigna al atributo background para traer imagenes de rutas remotas a una
    }else{
    const movieImg = `https://image.tmdb.org/t/p/original/`  + movie.backdrop_path
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImg})`
    }
  
 
   //los atributos .title, .overview, .vote_average vienen en la peticion
    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    //se crea la parte donde dice el genero o generos de la pelicula seleccionada
    createCategories(movie.genres, movieDetailCategoriesList)
    
    //se crea la parte de peliculas relacionadas
    getRelatedMovies(movieId)
}  
}

//funcion para obtener peliculas similares a la pelicula seleccionada
async function getRelatedMovies(movieId){

    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`)
    const movie = await res.json()
    const relatedMovies = movie.results
    
    createMovies(relatedMovies, relatedMoviesContainer, clean = true)
} 

//funcion que obtiene los datos almacenados en localStorage, osea, obtiene las peliculas favoritas, osea, las peliculas a las que se dio me gusta para crear la estructura html donde se mostraran
function getLikedMovies() {
    const likedMovies = likedMoviesList();

    //el objeto likedMovies contiene un atributo llamado liked_Movies que tiene como valor la informacion de todas las peliculas almacenadas en localStorage, osea, las peliculas a las que se dio me gusta. el metodo Object.values(likedMovies) crea un array con los valores del atributo liked_Movies
    const moviesArray = Object.values(likedMovies);
  
    createMovies(moviesArray, likedMoviesListArticle, clean = true);
    
    console.log(likedMovies)
  }



    










   
    
   