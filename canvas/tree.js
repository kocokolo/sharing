var maxgeneration =10,
    counter = 0,
    generation = 0;

var canvas = document.getElementById('demo-canvas');
var c = canvas.getContext("2d");
c.globalCompositeOperation="lighter";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function growtree() {
    c.save();

    c.translate(canvas.width / 2, canvas.height);
    c.scale(0.7, 0.7);
    branch(-Math.PI / 2);

    c.restore();
}

function branch(angle) {
    c.save();

    var bushy = false;
    var scale = randomRange(0.75, 1);
    generation++;
    c.strokeStyle = "hsl(" + generation * 10 + ", 100%,50%)";
    if (generation > maxgeneration) {
        c.strokeStyle = 'white';
    }
    c.lineWidth = 6;
    c.rotate(angle);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(150, 0);
    c.stroke();
    c.translate(150, 0);
    c.scale(scale, scale);
    if (generation < maxgeneration) {
        branch(randomRange(0, Math.PI / 4));
        branch(randomRange(-Math.PI / 4, 0));
    }
    if (+generation === +maxgeneration) {
        counter++;
        if (bushy) {
            branch(randomRange(0, Math.PI / 4));
            branch(randomRange(-Math.PI / 4, 0));
            branch(randomRange(0, Math.PI / 4));
            branch(randomRange(-Math.PI / 4, 0));
            branch(randomRange(0, Math.PI / 4));
        } else {
            c.fillStyle = 'pink';
            c.beginPath();
            c.arc(0, 0, 30, 0, Math.PI * 2, true);
            c.fill();
        }
    }
    generation--;

    c.restore();
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// begin
growtree();
growtree();