// Функція для роботи з локальним сховищем
function updateLocalStorage() {
  const selectedCheckboxes = document.querySelectorAll(".select:checked");
  const selectedIds = Array.from(selectedCheckboxes, (checkbox) => checkbox.id);
  localStorage.setItem(localStorageKey, JSON.stringify(selectedIds));
}

function restoreSelectedState() {
  const selectedIds = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  selectedIds.forEach((id) => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = true;
      onSecect({ target: checkbox });
    }
  });
}

// Додавання обробників подій для чекбоксів
function attachCheckboxEventListeners() {
  document.querySelectorAll(".select").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      updateLocalStorage();
    });
  });
}

// Оновлення відображення інтерфейсу
function toggleInputVisibility() {
  const multiSelectorBox = document.querySelector(".multi-selector__box");
  const input = document.querySelector(".multi-selector__input");

  if (multiSelectorBox.children.length > 0) {
    input.style.display = "none";
  } else {
    input.style.display = "block";
  }
}

// Додавання обробників подій для відображення інтерфейсу
function attachInterfaceEventListeners() {
  document.querySelector(".input__down-arrow").addEventListener("click", () => {
    document
      .querySelector(".multi-selector__buisness")
      .classList.toggle("show");
    document.querySelector(".input__down-arrow").classList.toggle("rotate180");
  });

  document.addEventListener("click", function (e) {
    const multiSelector = document.querySelector(".multi-selector");
    const multiSelectorBuisness = document.querySelector(
      ".multi-selector__buisness"
    );
    const inputDownArrow = document.querySelector(".input__down-arrow");

    if (
      !multiSelector.contains(e.target) &&
      !e.target.classList.contains("delete-btn")
    ) {
      multiSelectorBuisness.classList.remove("show");
      inputDownArrow.classList.remove("rotate180");
    }
  });

  const multiSelectorBox = document.querySelector(".multi-selector__box");
  const observer = new MutationObserver(function () {
    toggleInputVisibility();
  });
  observer.observe(multiSelectorBox, { childList: true });
}

// Визначення ключа локального сховища
const localStorageKey = "selectedBusinesses";

// Відновлення обраного стану після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  restoreSelectedState();
  attachCheckboxEventListeners();
  attachInterfaceEventListeners();
  toggleInputVisibility();
});

// Додавання обраного бізнесу та оновлення локального сховища
function onSecect(e) {
  const selected_id = "selected" + " " + e.target.id;
  console.log(selected_id);

  const buisnessesToAppend = `<span class="selected" style="border:1px solid grey; border-radius:15px; wight:auto; padding:4px;margin: 2px; font-size:14px; display:flex; align-items:center; justify-content:center;" id="${selected_id}">${e.target.value} <button class="delete-btn" style="border:none;outline: none;border: 0;background: transparent;" onClick='removeSelectedEl("${selected_id}")'>x</button></span>`;

  if (e.target.checked === true) {
    AppendSelectedBuisness(buisnessesToAppend);
  } else {
    removeSelectedEl(selected_id);
  }
  updateLocalStorage();
}

// Додавання обраного бізнесу до відображення
function AppendSelectedBuisness(buisnessesToAppend) {
  const elInputFotSelectedBuisness = document.querySelector(
    ".multi-selector__box"
  );
  elInputFotSelectedBuisness.insertAdjacentHTML(
    "beforeend",
    buisnessesToAppend
  );
}

// Видалення обраного бізнесу
function removeSelectedEl(id) {
  const selectedBuisnes = document.getElementById(id);
  const checkboxId = id.split(" ")[1];

  const uncheckesdListBuisnesItems = document.getElementById(checkboxId);

  if (uncheckesdListBuisnesItems) {
    uncheckesdListBuisnesItems.checked = false;
  }

  selectedBuisnes.parentNode.removeChild(selectedBuisnes);
  updateLocalStorage();
}
