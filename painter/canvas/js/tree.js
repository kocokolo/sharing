(function () {
    var maxgeneration = 10,
        counter = 0,
        canvas = document.querySelector('canvas'),
        c = canvas.getContext('2d'),
        generation = 0;


    var button = document.querySelector('#makeitso');

    button.addEventListener('click', function (e) {
        c.save();
        clear();
        growtree(e);
        c.restore();
    }, false);

    function clear() {
        c.save();
        c.clearRect(0, 0, canvas.width , canvas.height );
        c.restore();
    }

    function growtree(e) {
        bushy = false;
        generation = 0;
        maxgeneration = 10;
        if (maxgeneration > 0 && maxgeneration < 14) {
            c.translate(canvas.width / 2, canvas.height - 10);
            c.scale(0.7, 0.7);
            branch(-Math.PI / 2);
        } else {
            alert('!');
        }
        if (e) {
            e.preventDefault();
        }
    }

    function branch(angle) {
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
                c.fillStyle = 'green';
                c.beginPath();
                c.arc(0, 0, 20, 0, Math.PI * 2, true);
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