document
    .querySelector('header button')
    .addEventListener("click", function(){
        document
            .querySelector('.form')
            // toggle() funcinalidade de esconder 
            .classList.toggle('show')
    })