const accesskey = "kN5VcrS0I8k5MfSNAnJbwgmUrw3TQIFnyEl3DO4uQJ0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const ShowMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }
    console.log(data);
    
    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a"); 
        imageLink.href = result.links.html;
        imageLink.target= "_blank"; // this will open the link in new tag

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    ShowMore.style.display = "block";
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

ShowMore.addEventListener("click", () => {
    page++;
    searchImages();
});