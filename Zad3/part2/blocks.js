const randomColor = () => {
  let color = "#";
  let signs = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    color += signs[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateBlock = () => {
  var rectX = stage.width() / 2 - 50;
  var rectY = stage.height() / 2 - 25;
  var color = randomColor();
  var box = new Konva.Rect({
    x: rectX,
    y: rectY,
    width: 50,
    height: 50,
    fill: color,
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });
  box.on("mouseover", function () {
    document.body.style.cursor = "pointer";
  });
  box.on("mouseout", function () {
    document.body.style.cursor = "default";
  });
  group.add(box);
  layer.add(box);

  layer.draw();
};
