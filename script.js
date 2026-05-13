async function loadNews(){

  try{

    const response =
      await fetch("/news");

    const data =
      await response.json();

    console.log(data);

    const newsDiv =
      document.getElementById("news");

    newsDiv.innerHTML = "";

    data.forEach(item => {

      const card =
        document.createElement("div");

      card.className = "card";

      card.innerHTML = `
        ${item.image ? `<img src="${item.image}">` : ""}
        <p>${item.text}</p>
        <div class="date">
          ${new Date(item.date).toLocaleString()}
        </div>
      `;

      newsDiv.appendChild(card);

    });

  }catch(err){

    console.log(err);

  }

}

loadNews();

setInterval(loadNews,5000);
const news = [
  {
    title: "New AI Update",
    text: "Latest technology news..."
  }
];