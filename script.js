const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const fromBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate input
  if (newItem === "") {
    alert("Por favor, insira um item");
    return;
  }

  //check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert("esse item ja existe");
      return;
    }
  }

  // Create item element in DOM
  addItemToDom(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDom(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  // Add new item to the array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExist(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");

  fromBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Edita Item';
  fromBtn.style.backgroundColor = "#228b22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Tem certeza que quer apagar esse item?")) {
    //remove o item
    item.remove();

    //remove item from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
  // if (e.target.parentElement.classList.contains("remove-item")) {
  //   if (confirm("Tem certeza que quer apagar esse item?")) {
  //     e.target.parentElement.parentElement.remove();
  //     checkUI();
  //   }
  // }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  //filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //clear from localStore
  localStorage.removeItem("items");
  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  fromBtn.innerHTML = '<i class ="fa-solid fa-plus"></i> Add Item';
  fromBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// Inicialize app
function init() {
  // Event listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
