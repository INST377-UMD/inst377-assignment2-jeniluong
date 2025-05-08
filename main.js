if (typeof annyang !== "undefined") {
    const commands = {
      "hello": () => alert("Hello World"),
      "change the color to *color": (color) => document.body.style.backgroundColor = color,
      "navigate to *page": (page) => {
        const lower = page.toLowerCase();
        if (lower.includes("home")) location.href = "home.html";
        if (lower.includes("stocks")) location.href = "stocks.html";
        if (lower.includes("dogs")) location.href = "dogs.html";
      }
    };
  
    annyang.addCommands(commands);
    annyang.start();
  }
  
  function toggleAudio(on) {
    if (typeof annyang !== "undefined") {
      on ? annyang.start() : annyang.abort();
    }
  }