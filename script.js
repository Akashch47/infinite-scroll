const imageContiner = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages= 0;


// Unsplash API
let count = 5;
const apiKey = 'CnbLlf6WIs_n06fIPGyBQjNNIn4L4eH3HNLowqPTtU0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all image loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        loader.hidden = true;
        ready = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    }
}

// helper function
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
};

// create elements for link photos and add them to dom
function displayPhotos(){
    totalImages += photosArray.length;
     photosArray.forEach(function(photo){
        //  create <a> to link to unsplash
         const item = document.createElement('a');
         setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
         });
        
         //  create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put img insise <a> and then append it to image-container
         item.appendChild(img);
         imageContiner.appendChild(item);
     })
}



// Get Photos from usplash api
const getPhotos = async function(){
    try{
        const response = await fetch(apiUrl);
        photosArray  = await response.json();
        displayPhotos();
    }catch(error){
        // Catch error here
    }
}

getPhotos();


// check to see if scrolling near page bottom, Load more photo
window.addEventListener('scroll', function(e){
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1300 && ready){
        ready = false;
        getPhotos();
    }
})