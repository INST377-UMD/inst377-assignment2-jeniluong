fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById('carousel');
    data.message.forEach(img => {
      const imgEl = document.createElement('img');
      imgEl.src = img;
      imgEl.style.width = '100px';
      imgEl.style.margin = '5px';
      carousel.appendChild(imgEl);
    });
  });


fetch('https://dogapi.dog/api/v2/breeds')
  .then(res => res.json())
  .then(data => {
    const breeds = document.getElementById('breeds');
    data.data.forEach(breed => {
      const button = document.createElement('button');
      button.innerText = breed.attributes.name;
      button.classList.add('custom-button');
      button.onclick = () => showBreedInfo(breed);
      breeds.appendChild(button);
    });
  });

function showBreedInfo(breed) {
  const container = document.getElementById('breedInfo');
  container.style.display = 'block';
  container.innerHTML = `
    <h3>${breed.attributes.name}</h3>
    <p>${breed.attributes.description}</p>
    <p>Life Span: ${breed.attributes.life.min} - ${breed.attributes.life.max} years</p>
  `;
}

/* Annyang Dog Breed Voice Command */
if (typeof annyang !== 'undefined') {
  annyang.addCommands({
    'load dog breed *breedname': (breedname) => {
      fetch('https://dogapi.dog/api/v2/breeds')
        .then(res => res.json())
        .then(data => {
          const match = data.data.find(b =>
            b.attributes.name.toLowerCase() === breedname.toLowerCase()
          );
          if (match) showBreedInfo(match);
        });
    }
  });
}