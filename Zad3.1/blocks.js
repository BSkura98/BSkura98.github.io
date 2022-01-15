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
  box.on("dragend", function (e) {
    boxlist.map((b) => {
      if (b != e.currentTarget) {
        var moveObjectPosition = handleIntersection(
          b.attrs,
          e.currentTarget.attrs
        );
        if (moveObjectPosition.x) {
          e.currentTarget.x(moveObjectPosition.x);
        }
        if (moveObjectPosition.y) {
          e.currentTarget.y(moveObjectPosition.y);
        }
      }
    });
  });

  layer.add(box);
  boxlist.push(box);
  stage.add(layer);
}

function handleIntersection(box1, box2) {
  var moveObjectPosition = {
    x: null,
    y: null,
  };

  if (
    !(
      box2.x > box1.x + box1.width ||
      box2.x + box2.width < box1.x ||
      box2.y > box1.y + box1.height ||
      box2.y + box2.height < box1.y
    )
  ) {
    var box2CenterX = (box2.x + box2.width) / 2;
    var box2CenterY = (box2.y + box2.height) / 2;

    var box1CenterX = (box1.x + box1.width) / 2;
    var box1CenterY = (box1.y + box1.width) / 2;

    var vX = box2CenterX - box1CenterX;
    var vY = box2CenterY - box1CenterY;

    if (Math.abs(vX / box1.width) > Math.abs(vY / box1.height)) {
      if (vX < 0) {
        moveObjectPosition.x = box1.x - box2.width;
      } else {
        moveObjectPosition.x = box1.x + box1.width;
      }
    } else {
      if (vY < 0) {
        moveObjectPosition.y = box1.y - box2.height;
      } else {
        moveObjectPosition.y = box1.y + box1.height;
      }
    }
  }

  return moveObjectPosition;
}
