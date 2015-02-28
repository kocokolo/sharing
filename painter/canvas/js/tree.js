(function () {
    var maxgeneration = 10,
        counter = 0,
        generation = 0;

    var canvas = document.getElementById('smartdrawer-canvas');
    var c = canvas.getContext("2d");
    var button = document.querySelector('#makeitso');

    button.addEventListener('click', function (e) {
        clear();
        c.globalAlpha = 0.3;
        growtree(true);
        growtree(false);
        c.globalAlpha = 1;
    }, false);


    function clear() {
        c.save();
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.restore();
    }

    function growtree(dir) {
        c.save();
        generation = 0;
        maxgeneration = 11;
        if (maxgeneration > 0 && maxgeneration < 14) {
            if (dir) {
                c.translate(canvas.width - 10, canvas.height);
            } else {
                c.translate(10, canvas.height);
            }
            c.scale(0.7, 0.7);
            branch(-Math.PI / 2);
        }
        c.restore();
    }

    function branch(angle) {
        var bushy = false;

        generation++;
        c.save();
        c.strokeStyle = "hsl(" + generation * 10 + ", 100%,50%)";
        if (generation > maxgeneration) {
            c.strokeStyle = 'white';
        }

        c.lineWidth = 6;
        c.rotate(angle);
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(100, 0);
        c.stroke();
        c.translate(100, 0);
        var scale = randomRange(0.75, 1);
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
        c.restore();
        generation--;
    }

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

})();