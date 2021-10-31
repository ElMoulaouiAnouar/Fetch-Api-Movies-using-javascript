var page = 1;
let movies = {
    'imagePath':'https://image.tmdb.org/t/p/w1280',
    'urlApi':'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=',
    getData :async function(item,page){
       await fetch(this.urlApi+page).then(response => response.json()).then(data => {
         document.querySelector('.container').innerHTML = "";
         data['results'].forEach(element => {
            if(element.title.includes(item)){
                 var div = document.createElement('div');
                 div.className = 'movie_container';
                 var img =document.createElement('img');
                 img.src = this.imagePath+element.backdrop_path;
                 img.alt = element.title;
                 var span = document.createElement('span');
                 span.className = 'movie_name';
                 span.textContent = element.title;
                 div.appendChild(img);
                 div.appendChild(span);
                 document.querySelector('.container').appendChild(div);
            }
         });
        })
        document.querySelector('.content span').innerHTML = page;
    }
};
movies.getData('',page);
document.querySelector('input').addEventListener('keyup',function(e){
     if(e.key == 'Enter'){
         movies.getData(this.value,page);
     }
});

document.querySelector('.btn_next').addEventListener('click',function(){
     if(page < 500){
         ++page;
     }
     else{
         page = 10;
         alert('this is last page');
     }
     movies.getData('',page);
});
document.querySelector('.btn_pre').addEventListener('click',function(){
     if(page > 1){
         --page;
     }
     else{
         page = 1;
         alert('this is first page');
     }
     movies.getData('',page);
});