const search = document.querySelector("#search-form > input");
const gallery = document.querySelector("ul");
const intersetionParent = document.querySelector(".intersetion-parent");

let page = 1;

search.oninput = (event) => {
  if (event.target.value.length > 2) {
    getPictures(event.target.value);
  } else if (event.target.value.length === 0) {
    destroyElems(gallery);
    intersectionElem();
  }
};

const getPictures = async (value, destroy = true) => {
  const pixabay = {
    API_KEY: "19334878-c24ce8f0446b1662e85eb1364",
    baseUrl: "https://pixabay.com/api/",
    step: 20,
  };

  const { API_KEY, baseUrl, step } = pixabay;

  const url = `${baseUrl}?key=${API_KEY}&q=${value}&per_page=${step}&page=${page}`;

  gallery.childNodes.length > 0 && destroy && destroyElems(gallery);

  try {
    const response = await fetch(url);
    const json = await response.json();
    await createUI(json.hits);
    await basicLightBoxInit();
  } catch (error) {
    console.error("Ошибка:", error);
  }

  intersectionElem();
};

const createUI = async (data) => {
  data.forEach(({ largeImageURL, webformatURL, tags }) => {
    gallery.innerHTML += `<li>
            <!-- Карточка -->
            <!--   <a href="${largeImageURL}">  -->
            <img
            src="${webformatURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
            />
            </a>
            </li>`;
  });
};

const destroyElems = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

const intersectionElem = () => {
  const intersetion = document.createElement("span");
  intersetion.className = "obs";

  if (
    gallery.childNodes.length === 20 &&
    intersetionParent.children.length === 0
  ) {
    intersetion.innerText = "Loading...";
    intersetionParent.appendChild(intersetion);
  }

  if (gallery.childNodes.length < 20) {
    intersetion.innerText = "";
    destroyElems(intersetionParent);
    page = 1;
  }

  if (document.querySelector(".obs")) {
    page++;
    intersectionObserver.observe(document.querySelector(".obs"));
  }
};

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.intersectionRatio > 0)) {
    getPictures(search.value, false);
  }
});

const basicLightBoxInit = () => {
  const imageInstance = document.querySelectorAll("img");

  imageInstance.forEach((item) => {
    const imgUrl = item.getAttribute("data-source");
    item.onclick = () => basicLightbox.create(`<img src="${imgUrl}">`).show();
  });
};
