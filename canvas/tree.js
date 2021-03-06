var canvas,
    ctx;
// "画板"
canvas = document.getElementById('demo-canvas');
// "画笔"
ctx = canvas.getContext("2d");


var maxgeneration,
    generation;

/**
 * 画棵树
 *
 */
function drawtree(gens,scale) {
    generation = 0;
    maxgeneration = gens;//树杈个数

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.scale(scale,scale);
    drawbranch(-Math.PI / 2);
    ctx.restore();
}

/**
 * 画树杈
 * @param angle
 */
function drawbranch(angle) {
    ctx.save();
    var scale = random(0.75, 1);
    generation++;
    ctx.strokeStyle = "hsl(" + generation * 10 + ", 100%,50%)";
    if (generation > maxgeneration) {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 5;
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0);
    ctx.stroke();
    ctx.translate(150, 0);
    ctx.scale(scale, scale);

    if (generation < maxgeneration) { // 继续分叉
        drawbranch(random(0, Math.PI / 4));
        drawbranch(random(-Math.PI / 4, 0));
    }

    if (+generation === +maxgeneration) {// 达到顶点
        if (random(0, 1) > 0.5) {
            // 画叶子
            drawbranch(random(0, Math.PI / 4));
            drawbranch(random(-Math.PI / 4, 0));
            drawbranch(random(0, Math.PI / 4));
            drawbranch(random(-Math.PI / 4, 0));
            drawbranch(random(0, Math.PI / 4));
        } else {
            // 画果实
            ctx.fillStyle = 'pink';
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    generation--;
    ctx.restore();
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}


//设置画板大小-实际图片大小
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有的）的图像上。
//源图像 = 您打算放置到画布上的绘图。
//目标图像 = 您已经放置在画布上的绘图。
ctx.globalCompositeOperation = "lighter";
drawtree(8,0.5);
drawtree(10,0.7);