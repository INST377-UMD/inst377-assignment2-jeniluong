if (typeof annyang !== "undefined") {
    const commands = {
      // Basic commands
      "hello": () => {
        alert("Hello World");
        console.log("Voice Command: hello");
      },
      "change the color to *color": (color) => {
        console.log(`Voice Command: change the color to ${color}`);
        document.body.style.backgroundColor = color;
      },
      "navigate to *page": (page) => {
        const lower = page.toLowerCase();
        console.log(`Voice Command: navigate to ${lower}`);
  
        if (lower.includes("home")) location.href = "home.html";
        else if (lower.includes("stocks")) location.href = "stocks.html";
        else if (lower.includes("dogs")) location.href = "dogs.html";
      },
  
      // Stocks page command
      "lookup *stock": (stock) => {
        const tickerInput = document.getElementById("ticker");
        const daysSelect = document.getElementById("days");
  
        if (tickerInput && daysSelect) {
          tickerInput.value = stock.toUpperCase();
          daysSelect.value = "30";
          if (typeof fetchStock === "function") {
            fetchStock();
          }
          console.log(`Voice Command: lookup ${stock}`);
        }
      },
  
      // Dogs page command
      "load dog breed *breed": (breed) => {
        console.log(`Voice Command: load dog breed ${breed}`);
        fetch('https://dogapi.dog/api/v2/breeds')
          .then(res => res.json())
          .then(data => {
            const match = data.data.find(b =>
              b.attributes.name.toLowerCase() === breed.toLowerCase()
            );
            if (match && typeof showBreedInfo === "function") {
              showBreedInfo(match);
            } else {
              alert(`Breed "${breed}" not found.`);
            }
          })
          .catch(err => console.error("Error fetching breed info:", err));
      }
    };
  
    annyang.addCommands(commands);
  

    annyang.addCallback("result", function (phrases) {
      console.log("Annyang heard:", phrases);
    });
  

    annyang.addCallback("error", function (err) {
      console.error("Annyang error:", err);
    });
  

    annyang.start({ autoRestart: true, continuous: false });
  }
  

  function toggleAudio(on) {
    if (typeof annyang !== "undefined") {
      if (on) {
        console.log("Voice recognition started");
        annyang.start();
      } else {
        console.log("Voice recognition stopped");
        annyang.abort();
      }
    }
  }