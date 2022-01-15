function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var width, height, stage, layer;
boxlist = [];
window.onload = () => {
  width = window.innerWidth * 0.8;
  height = window.innerHeight;

  stage = new Konva.Stage({
    container: "canvas",
    width: width,
    height: height,
  });

  layer = new Konva.Layer();

  stage.add(layer);
};

var prevX, prexY;
function generateBlock() {
  var rectX = stage.width() / 2 - 50;
  var rectY = stage.height() - 100;
  var box = new Konva.Rect({
    x: rectX,
    y: rectY,
    width: 50,
    height: 50,
    fill: getRandomColor(),
    stroke: "grey",
    strokeWidth: 1,
    draggable: true,
  });
  box.on("mouseover", function () {
    document.body.style.cursor = "pointer";
  });
  box.on("mouseout", function () {
    document.body.style.cursor = "default";
  });
  box.on("dragstart", function () {
    console.log("dragstart");
    prevX = box.attrs.x;
    prevY = box.attrs.y;
  });
  box.on("dragend", function (e) {
    boxlist.map((b) => {
      if (b != e.currentTarget) {
        if (checkIntersection(e.currentTarget.attrs, b.attrs)) {
          console.log(e.currentTarget.attrs);
          e.currentTarget.attrs.x = prevX;
          e.currentTarget.attrs.y = prevY;
          console.log(e.currentTarget.attrs);
        }
      }
    });
  });

  layer.add(box);
  boxlist.push(box);
  stage.add(layer);
}

function checkIntersection(box1, box2) {
  return !(
    box2.x > box1.x + box1.width ||
    box2.x + box2.width < box1.x ||
    box2.y > box1.y + box1.height ||
    box2.y + box2.height < box1.y
  );
}
