function selectorVariables() {
  const localStorageKey = "selectedBusinesses";

  return {
    localStorageKey: localStorageKey,
  };
}
const options = selectorVariables();
const localStorageKey = options.localStorageKey;

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

document.querySelectorAll(".select").forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    updateLocalStorage();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  restoreSelectedState();
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

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.stopPropagation();
    const selectedId = e.target.parentElement.id;
    removeSelectedEl(selectedId);
  }
});

document.querySelector(".input__down-arrow").addEventListener("click", () => {
  document.querySelector(".multi-selector__buisness").classList.toggle("show");

  document.querySelector(".input__down-arrow").classList.toggle("rotate180");
});

function AppendSelectedBuisness(buisnessesToAppend) {
  const elInputFotSelectedBuisness = document.querySelector(
    ".multi-selector__box"
  );
  elInputFotSelectedBuisness.insertAdjacentHTML(
    "beforeend",
    buisnessesToAppend
  );
}

function onSecect(e) {
  const selected_id = "selected" + " " + e.target.id;
  console.log(selected_id);

  const buisnessesToAppend = `<span class="selected" style="border:1px solid grey; border-radius:15px; wight:auto; padding:4px;margin: 2px; font-size:14px; display:flex; align-items:center; justify-content:center;" id="${selected_id}">${e.target.value} <button class="delete-btn" style="border:none;outline: none;border: 0;background: transparent;" onClick='removeSelectedEl("${selected_id}")'>x</button></span>`;

  if (e.target.checked === true) {
    AppendSelectedBuisness(buisnessesToAppend);
  } else {
    removeSelectedEl(selected_id);
  }
}

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

document.addEventListener("DOMContentLoaded", function () {
  const multiSelectorBox = document.querySelector(".multi-selector__box");
  const input = document.querySelector(".multi-selector__input");

  function toggleInputVisibility() {
    if (multiSelectorBox.children.length > 0) {
      input.style.display = "none";
    } else {
      input.style.display = "block";
    }
  }

  toggleInputVisibility();
  const observer = new MutationObserver(function () {
    toggleInputVisibility();
  });
  observer.observe(multiSelectorBox, { childList: true });
});
