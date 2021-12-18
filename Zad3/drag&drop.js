let indexBefore;
let indexDrop;

let drag;
let itemId;
let list;

document.addEventListener("dragstart", ({ target }) => {
  itemId = target.id;
  drag = target;
  list = target.parentNode.children;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === drag) {
      indexBefore = i;
    }
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", ({ target }) => {
  if (target.id !== itemId && target.className === "list-item") {
    drag.remove(drag);
    for (let i = 0; i < list.length; i += 1) {
      if (list[i] === target) {
        indexDrop = i;
      }
    }
    if (indexBefore > indexDrop) {
      target.before(drag);
    } else {
      target.after(drag);
    }
  }
});
