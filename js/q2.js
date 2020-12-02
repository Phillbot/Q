const input = document.querySelector(".js-input");
const boxes = document.querySelector("#boxes");
const createBtn = document.querySelector("[data-action=create]");
const destroyBtn = document.querySelector("[data-action=destroy]");

createBtn.onclick = () => createBoxes(input.value);
destroyBtn.onclick = () => destroyBoxes(boxes);

input.oninput = (event) => {
  if (event.target.value > 100) {
    event.target.value = 100;
  } else if (event.target.value < 0) {
    event.target.value = 0;
  }
  if (event.target.value.length > 1 && Number(event.target.value[0]) === 0) {
    const a = event.target.value.split("");
    a.shift();

    event.target.value = a.join("");
  }
};

const createBoxes = (amount) => {
  boxes.childNodes.length > 0 && amount > 0 && destroyBoxes(boxes);

  if (amount > 0) {
    const params = {
      step: 10,
      hw: 30,
    };

    let { step, hw } = params;

    for (let i = 0; i < amount; i++) {
      const div = document.createElement("div");

      div.setAttribute(
        "style",
        `height:${hw}px; width:${hw}px; background:${getRandomColor()}`
      );

      hw = hw + step;

      boxes.appendChild(div);
    }
  } else {
    destroyBoxes(boxes);
  }
};

const destroyBoxes = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

const getRandomColor = () => "#" + Math.random().toString(16).substr(-6);
