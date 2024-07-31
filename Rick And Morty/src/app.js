class rickAndMordy {
  constructor(
    url,
    charectersContainer,
    infoContainer,
    episodeContainer,
    searchInput
  ) {
    this.url = url;
    this.charactersContainer = charectersContainer;
    this.infoContainer = infoContainer;
    this.episodeContainer = episodeContainer;
    this.searchInput = searchInput;

    this.episodesList = [];
  }

  carecters() {
    axios
      .get(this.url)
      .then((rest) => rest.data)
      .then(({ results }) => {
        console.log(results);
        this.charectersRenderUi(results, this.charactersContainer);
        this.rickAndMorty(this.searchInput, results);
        app.clicked(results);
      })
  }

  rickAndMorty(input) {
    input.addEventListener("input", () => {
      const searchResult = searchArry.filter((item) =>
        item.name.toLowerCase().includes(userSearchText)
      );
    });
  }

  clicked(arry) {
    this.charactersContainer.addEventListener("click", (e) => {
      let characterId = null;
      if (e.target.tagName == "H2" || e.target.tagName == "P") {
        characterId = e.target.parentElement.parentElement.parentElement.id;
      } else if (e.target.tagName == "IMG") {
        characterId = e.target.parentElement.parentElement.id;
      } else {
        characterId = e.target.id;
      }
      const resultsRender = arry.filter((item) => characterId == item.id);

      console.log(characterId);
      console.log(resultsRender);

      this.charectersInfoRenderUi(resultsRender, this.infoContainer);
      this.grtEpisodes(resultsRender);
    });
  }

  charectersRenderUi(contentArry, container) {
    container.innerHTML = "";
    contentArry.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "caracter",
        "bg-[#000]",
        "w-full",
        "h-35",
        "rounded-xl",
        "p-4",
        "flex",
        "gap-1",
        "justify-between",
        "items-center",
        "mt-4"
      );
      div.innerHTML = `<div class="flex gap-3">
              <img src="${
                item.image
              }" alt="" class="bg-white w-14 h-14 rounded" />
              <div class="name text-white">
                <h2> ${this.genderStiker(item)} ${item.name}</h2>
                <p> ${item.status} - ${item.species}</p>
              </div>
            </div>`;
      div.setAttribute("id", `${item.id}`);
      container.appendChild(div);
    });
  }

  charectersInfoRenderUi(contentArry, container) {
    container.innerHTML = "";
    contentArry.forEach(() => {
      const div = document.createElement("div");
      div.classList.add(
        "info",
        "w-full",
        "h-full",
        "bg-[#000]",
        "rounded-3xl",
        "overflow-hidden",
        "flex"
      );
      div.innerHTML = `<img src="${contentArry[0].image}" alt="" />
            <div class="textsContainer h-full p-2">
              <h2 class="text-lg text-white font-semibold">${contentArry[0].status} ${contentArry[0].species}</h2>
              <div>
                <p class="text-lg text-white font-medium">Cartoons Rick And Morty</p>
                <p class="text-lg text-white font-medium">Duration : 23 minutes</p>
                <p class="text-lg text-white font-medium">Broadcast day : Mondays</p>
                <p class="text-lg text-white font-medium">Broadcast network: Adult Swim</p>
                <p class="text-lg text-white font-medium">Stars: Chris Parnell - Justin Roiland - Sarah Chalke - Spencer Grammer</p>
                <p class="text-lg text-white font-medium">Genre: Animation - Science Fiction - Comedy - Adventure</p>
                <p class="text-lg text-white font-medium">Country of manufacture: America (United States)</p>
                <p class="text-lg text-white font-medium">IMDb rating: 9.2/10 (462251 votes)</p>
              </div>
            </div>`;
      container.appendChild(div);
    });
  }

  genderStiker(item) {
    if (item.gender === "Male") {
      return "👨‍🦰";
    } else if (item.gender === "Female") {
      return "👩‍🦰";
    }
  }
}

const app = new rickAndMordy(
  "https://rickandmortyapi.com/api/character",
  document.querySelector(".characters-part"),
  document.querySelector(".info-part"),
  document.querySelector(".episodes-container"),
  document.querySelector("#ded")
);
app.carecters();