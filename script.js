fetch("http://localhost:3001/messages")
  .then((response) => response.json())
  .then((data) => (document.getElementById("heading").innerHTML = data));
