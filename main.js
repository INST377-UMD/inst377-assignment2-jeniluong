if (typeof annyang !== "undefined") {
    const commands = {
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
      }
    };
  
    annyang.addCommands(commands);
  
    // Log what Annyang hears
    annyang.addCallback("result", function (phrases) {
      console.log("Annyang heard:", phrases);
    });
  
    // Log errors from Annyang
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