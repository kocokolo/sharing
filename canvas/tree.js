var maxgeneration,
    generation,
    canvas,
    c;

/**
 * 画板初始化
 */
function init() {
    // "画板"
    canvas = document.getElementById('demo-canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // "画笔"
    c = canvas.getContext("2d");
    c.globalCompositeOperation = "lighter";
}

/**
 * 画棵树
 *
 */
function drawtree(gens,scale) {
    generation = 0;
    maxgeneration = gens;//树杈个数
    c.save();
    c.translate(canvas.width / 2, canvas.height);
    c.scale(scale,scale);
    drawbranch(-Math.PI / 2);
    c.restore();
}

/**
 * 画树杈
 * @param angle
 */
function drawbranch(angle) {
    c.save();
    var scale = random(0.75, 1);
    generation++;
    c.strokeStyle = "hsl(" + generation * 10 + ", 100%,50%)";
    if (generation > maxgeneration) {
        c.strokeStyle = 'white';
    }
    c.lineWidth = 5;
    c.rotate(angle);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(150, 0);
    c.stroke();
    c.translate(150, 0);
    c.scale(scale, scale);

    if (generation < maxgeneration) { // 继续分叉
        drawbranch(random(0, Math.PI / 4));
        drawbranch(random(-Math.PI / 4, 0));
    }

    if (+generation === +maxgeneration) {// 达到顶点
        if (random(0, 1) > 0.5) {
            // 画个花朵
            drawbranch(random(0, Math.PI / 4));
            drawbranch(random(-Math.PI / 4, 0));
            drawbranch(random(0, Math.PI / 4));
            drawbranch(random(-Math.PI / 4, 0));
            drawbranch(random(0, Math.PI / 4));
        } else {
            // 画个果实
            c.fillStyle = 'pink';
            c.beginPath();
            c.arc(0, 0, 30, 0, Math.PI * 2, true);
            c.fill();
        }
    }
    generation--;
    c.restore();
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// begin
init();
drawtree(8,0.5);
drawtree(10,0.7);