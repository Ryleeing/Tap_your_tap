let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let svg = Snap(canvasWidth, canvasHeight);

svg.addClass('animation');

function changeRadian(angle) {
  return (Math.PI / 180) * angle;
}
function getRandNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
function getRandColor() {
  let color = [
    '#f9f8e6',
    '#ff8b8b',
    '#61bfad',
    '#f9f7e8',
    '#f9f7e8',
    '#61bfad',
    '#ffffff',
    '#e54b4b',
    '#167c80',
    '#f03f35',
    '#b7e3e4',
    '#fff3b2',
    '#ffe0d8',
    '#ff9b93',
    '#41584b',
    '#f03f35',
    '#efe8d8',
    '#28292b',
    '#e57066',
    '#32b67a',
    '#000000',
    '#facac0',
    '#e6625e',
    '#0bbcda',
    '#d31b33',
    '#fdfo6f',
    '#1fc8e6',
    '#ffefe5',
    '#008fd3',
    '#f4c7ee',
    '#fde3c8',
    '#055a58',
  ];
  let i = Math.floor(getRandNumber(0, color.length));
  return color[i];
}

//  1 随机产生一圈圆，然后随机方向消失
function animate1() {
  let set = Snap.set();
  let srad = getRandNumber(20, 40);
  let num = Math.floor(getRandNumber(5, 15));
  let angle = 360 / num;
  let rad = getRandNumber(100, 300);
  let color = getRandColor();
  for (let i = 0; i < num; i++) {
    (function (i) {
      setTimeout(() => {
        set.push(
          svg.circle({
            cx: canvasWidth / 2 + Math.cos(changeRadian(i * angle)) * rad - canvasWidth / 6,
            cy: canvasHeight / 2 - Math.sin(changeRadian(i * angle)) * rad,
            r: srad,
            fill: color,
          })
        );
      }, 20 * i);
    })(i);
  }
  Snap.animate(
    0,
    srad,
    function (val) {
      set.attr({ r: val });
    },
    50,
    mina.easeout(),
    function () {
      setTimeout(() => {
        // let abc = svg.selectAll('circle')
        set.forEach((ele) => {
          ele.animate(
            { cx: getRandNumber(0, 2*canvasWidth/3), cy: getRandNumber(0, canvasHeight), r: 0 },
            500,
            mina.easeout
          );
        });
      }, 500);
    }
  );

  let list = svg.node.children;
  while (list.length > 40) {
    list[0].remove();
  }
}

//  2 随机位置弹出一些圆，然后在原位置消失
function animate2() {
  let set = Snap.set();
  let num = Math.floor(getRandNumber(5, 10));
  for (let i = 0; i < num; i++) {
    set.push(
      svg.circle({
        cx: (Math.random() * 2 * canvasWidth) / 3,
        cy: Math.random() * canvasHeight,
      })
    );
  }
  set.forEach((ele) => {
    let color = getRandColor();
    ele.attr({
      fill: color,
    });
    let srad = getRandNumber(5,50);
    Snap.animate(
      [0],
      [srad],
      function (val) {
        ele.attr({ r: val[0] });
      },
      500,
      mina.bounce,
      function () {
        set.animate({ r: 0 }, 500, mina.easeout);
      }
    );
  });

  let list = svg.node.children;
  while (list.length > 40) {
    list[0].remove();
  }
}

// 3 在中心点弹出一些空心圆，然后消失
function animate3() {
  let set = Snap.set();
  let num = 15;
  let color = getRandColor();
  for (let i = 0; i < num; i++) {
    set.push(
      svg.circle({
        fillOpacity: 0,
        stroke: color,
        strokeWidth: 4,
      })
    );
  }
  set.forEach((ele) => {
    let srad = getRandNumber(5, 50);
    Snap.animate(
      [0, canvasWidth / 3, canvasHeight / 2],
      [srad, getRandNumber(0, (2 * canvasWidth) / 3), getRandNumber(0, canvasHeight)],
      function (val) {
        ele.attr({ r: val[0], cx: val[1], cy: val[2] });
      },
      500,
      mina.easeout,
      function () {
        set.animate({ r: 0 }, 300, mina.backin);
      }
    );
  });

  let list = svg.node.children;
  while (list.length > 40) {
    list[0].remove();
  }
}

// 4 在中心点弹出一些正方形，然后消失
function animate5() {
  let set = Snap.set();
  // let num = Math.floor(getRandNumber(5, 25));
  let num = 15;
  // let color = getRandColor();
  for (let i = 0; i < num; i++) {
    let color = getRandColor();
    set.push(
      svg.paper.rect({
        fill: color,
      })
    );
  }
  set.forEach((ele) => {
    let w = getRandNumber(20, 100);
    Snap.animate(
      [canvasWidth / 3, canvasHeight / 2, 0, 0],
      [getRandNumber(0, (2 * canvasWidth) / 3), getRandNumber(0, canvasHeight), w, w],
      function (val) {
        ele.attr({ x: val[0], y: val[1], width: w, height: w });
      },
      500,
      mina.bounce,
      function () {
        set.animate({ opacity: 0 }, 300, mina.easeout);
      }
    );
  });

  let list = svg.node.children;
  while (list.length > 40) {
    list[0].remove();
  }
}
//

// 5 随机位置产生一些正方形，然后旋转着进入，然后消失
function animate4() {
  let set = Snap.set();
  let num = Math.floor(getRandNumber(5, 15));
  let color = getRandColor();
  for (let i = 0; i < num; i++) {
    let w = getRandNumber(10, 50);
    set.push(
      svg.paper.rect({
        stroke: color,
        strokeWidth: 4,
        fillOpacity: 0,
      })
    );
  }
  set.forEach((ele) => {
    let x1 = getRandNumber(0, (2 * canvasWidth) / 3);
    let y1 = getRandNumber(0, canvasHeight);
    let x2 = x1 + getRandNumber(-100, 100);
    let y2 = y1 + getRandNumber(-100, 100);
    let w = getRandNumber(10, 80);
    Snap.animate(
      [x1, y1, 0, 0],
      [x2, y2, 100, w],
      function (val) {
        let m = new Snap.Matrix();
        let w = ele.attr('width');
        m.rotate((val[2] / 300) * 360, w / 2 + x2, w / 2 + y2);
        ele.attr({ x: val[0], y: val[1], width: val[3], height: val[3] });
        ele.transform(m);
      },
      800,
      mina.bounce,
      function () {
        set.animate({ width: 0, height: 0 }, 500, mina.backin);
      }
    );
  });

  let list = svg.node.children;
  while (list.length > 40) {
    list[0].remove();
  }
}

// 6 在中心位置产生一个正方形或者圆形，然后向外发散
function animate6() {
  let x1 = canvasWidth / 3;
  let y1 = canvasHeight / 2;

  let rad = getRandNumber(30, 70);

  let shapes = ['circle', 'rect'];
  let color = getRandColor();
  let shape = shapes[Math.floor(getRandNumber(0, shapes.length-1))];
  if (shape == 'circle') {
    // let circle = svg.paper.el('circle', {})
    let circle = new Snap.set();
    Snap.animate(
      [1, rad],
      [15, getRandNumber(800, 1600)],
      (val) => {
        circle.push(
          svg.paper.el('circle', {
            cx: x1,
            cy: y1,
            r: val[1],
            strokeWidth: val[0],
            stroke: color,
            fillOpacity: 0,
          })
        );
      },
      200,
      mina.elastic(),
      () => {
        circle.animate({ opacity: 0 }, 500);
      }
    );
  }
  if (shape == 'rect') {
    let rect = svg.paper.el('rect', {});
    Snap.animate(
      [rad, 1, 0],
      [getRandNumber(500, 1200), 10, 100],
      (val) => {
        rect.attr({
          width: val[0],
          height: val[0],
          x: x1 - rect.attr('width') / 2,
          y: y1 - rect.attr('height') / 2,
          stroke: color,
          strokeWidth: val[1],
          fillOpacity: 0,
        });
        let m = new Snap.Matrix();
        m.rotate((val[2] / 300) * 360, x1, canvasHeight / 2);
        rect.transform(m);
      },
      500,
      mina.easeout,
      () => {
        rect.animate({ opacity: 0 }, 500);
      }
    );
  }
  let list = svg.node.children;
  while (list.length > 40) {
    list[0].remove();
  }
}

const animations = [animate1, animate2, animate3, animate4, animate5, animate6];
