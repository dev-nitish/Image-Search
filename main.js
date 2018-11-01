
const API_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '10508851-f687fe38acdaf8eb6a2103448&q=';
const TYPE = '&image_type=photo';

const loading = document.querySelector('#loading');
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');


loading.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event){
	event.preventDefault();
	const searchTerm = encodeURIComponent(input.value);


	startSearch();
	imageSearch(searchTerm)
		.then(displayImage);


	function startSearch(){
		loading.style.display = '';
		imageSection.innerHTML = '';
	}


	function imageSearch(searchTerm){
		const url = `${API_URL}${API_KEY}${searchTerm}${TYPE}`;

		return fetch(url)
			.then(response => response.json(), {'mode': 'no-cors'})
			.then(result => {
				// console.log(result.hits);
				return result.hits;
			});
	}

	
	function displayImage(images){
			
		images.forEach(image => {
			const imageElement = document.createElement('img');
			imageElement.src = image.webformatURL;
			console.log(image.webformatURL);
			imageSection.appendChild(imageElement);
		});
		loading.style.display = 'none';
	}
}