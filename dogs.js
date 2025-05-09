fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById('carousel');
    data.message.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.style.width = '100%';
      img.style.height = '100%';
      carousel.appendChild(img);
    });

    // Initialize Simple Slider
    simpleslider.getSlider();
  });


fetch('https://dogapi.dog/api/v2/breeds')
  .then(res => res.json())
  .then(data => {
    const breedsContainer = document.getElementById('breeds');
    data.data.forEach(breed => {
      const btn = document.createElement('button');
      btn.innerText = breed.attributes.name;
      btn.classList.add('custom-button');
      btn.onclick = () => showBreedInfo(breed);
      breedsContainer.appendChild(btn);
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

// Voice Command: load dog breed <name>
if (typeof annyang !== 'undefined') {
  const dogCommands = {
    'load dog breed *breedname': (breedname) => {
      fetch('https://dogapi.dog/api/v2/breeds')
        .then(res => res.json())
        .then(data => {
          const match = data.data.find(b =>
            b.attributes.name.toLowerCase() === breedname.toLowerCase()
          );
          if (match) {
            showBreedInfo(match);
          } else {
            alert(`Breed "${breedname}" not found.`);
          }
        });
    }
  };

  annyang.addCommands(dogCommands);
}