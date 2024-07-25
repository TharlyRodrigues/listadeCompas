const itemForm = document.getElementById("item-form");
const ItemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();

  const newItem = ItemInput.value;

  //   validate Input
  if (newItem === "") {
    alert("por favor insira o item");
    return;
  }
  // create list item
  const li = document.createElement("li");

  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  console.log(li);
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

// event listeners
itemForm.addEventListener("submit", addItem);
