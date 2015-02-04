(function () {
    var oContainer = document.getElementById('container');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');

    var ROW = 4,//行数
        COL = 6,//列数
        NUM = ROW * COL,//总个数
        BIG_IMG_WIDTH = 750,//大图宽度
        BIG_IMG_HEIGHT = 500,//大图高度
        THUMB_IMG_WIDTH = THUMB_IMG_HEIGHT = 125;//缩略图宽度和高度

    var rowindex = 0
        , columnindex = 0;

    function createContainer() {
        for (var i = 0; i < ROW; i++) {
            for (var j = 0; j < COL; j++) {
                var iColGap = (oContainer.offsetWidth - COL * THUMB_IMG_WIDTH) / (COL + 1),//列与列之间的宽度
                    iRowGap = (oContainer.offsetHeight - ROW * THUMB_IMG_HEIGHT) / (ROW + 1);//行与行之间的宽度

                var oDiv = document.createElement('div');
                var pos = {
                    left: parseInt(iColGap + j * (iColGap + THUMB_IMG_WIDTH)),
                    top: parseInt(iRowGap + i * (iRowGap + THUMB_IMG_HEIGHT))
                };
                oDiv.martrix = {//矩阵对象，用来记录格子的行号和列号
                    col: j,
                    row: i
                };
                oDiv.id = "#img" + i + "_" + j;
                oDiv.className = 'img';
                oDiv.pos = pos;
                oDiv.style.left = pos.left + 'px';
                oDiv.style.top = pos.top + 'px';
                oDiv.style.width = THUMB_IMG_WIDTH + 'px';
                oDiv.style.height = THUMB_IMG_HEIGHT + 'px';
                //oDiv.style.backgroundImage = 'url(' + imgurl + ')';
                oDiv.innerHTML = '<span></span>';
                oContainer.appendChild(oDiv);
            }
        }
    }

    createContainer();

    function appendNewPic(imgurl) {
        var iColGap = (oContainer.offsetWidth - COL * THUMB_IMG_WIDTH) / (COL + 1),//列与列之间的宽度
            iRowGap = (oContainer.offsetHeight - ROW * THUMB_IMG_HEIGHT) / (ROW + 1);//行与行之间的宽度

        var oDiv = document.getElementById("#img" + rowindex + "_" + columnindex)

        oDiv.style.backgroundImage = 'url(' + imgurl + ')';

        window.setTimeout(function () {
            setStyle3d(oDiv, 'transform', "rotate(" + (Math.random() * 40 - 20) + "deg)");
        }, 100);

        columnindex++;
        if (columnindex >= COL) {
            columnindex = 0;
            rowindex++;
        }
    }

    window.appendNewPic = appendNewPic;


    // 点击图片
    var bClickd = false;

    function clickHandle(e) {
        var oSpan;
        var aImg = document.getElementsByClassName('img');

        var img = /url\((.+)\)/i.test(this.style.backgroundImage) && RegExp.$1;

        if (!img) {
            return;
        }
        if (bClickd) {//表示已经合并，点击则打散
            for (var i = 0; i < aImg.length; i++) {
                oSpan = aImg[i].getElementsByTagName('span')[0];

                aImg[i].style.left = aImg[i].pos.left + 'px';
                aImg[i].style.top = aImg[i].pos.top + 'px';
                setStyle3d(aImg[i], 'transform', "rotate(" + (Math.random() * 40 - 20) + "deg)");
                oSpan.style.opacity = 0;
                aImg[i].className = 'img';
            }
            oPrev.style.display = oNext.style.display = 'none';

        } else {//需要合并成一张大图
            var bigImgPos = {
                left: (oContainer.offsetWidth - BIG_IMG_WIDTH) / 2,
                top: (oContainer.offsetHeight - BIG_IMG_HEIGHT) / 2
            };
            for (var i = 0; i < aImg.length; i++) {
                oSpan = aImg[i].getElementsByTagName('span')[0];

                oSpan.style.background = 'url(' + img + ') ' + (-aImg[i].martrix.col * THUMB_IMG_WIDTH) + 'px ' + (-aImg[i].martrix.row * THUMB_IMG_HEIGHT) + 'px';
                oSpan.style.opacity = 1;
                aImg[i].style.left = bigImgPos.left + aImg[i].martrix.col * (THUMB_IMG_WIDTH + 1) + 'px';
                aImg[i].style.top = bigImgPos.top + aImg[i].martrix.row * (THUMB_IMG_HEIGHT + 1) + 'px';
                setStyle3d(aImg[i], 'transform', 'rotate(0deg)');
                aImg[i].className = "img piece";
            }
        }
        bClickd = !bClickd;
    }

    $(document).delegate('.img', 'click', clickHandle);

    //左右按钮
    oPrev.style.display = oNext.style.display = 'block';
    oPrev.onclick = oNext.onclick = function () {
        if (this == oPrev) {
            iNow--;
            if (iNow == -1) {
                iNow = NUM - 1;
            }
        } else {
            iNow++;
            if (iNow == NUM) {
                iNow = 0;
            }
        }
        var arr = [];
        for (var i = 0; i < NUM; i++) {
            arr.push(i);
        }
        arr.sort(function () {//一个小技巧，产生乱序排序
            return Math.random() - 0.5;
        });
        var timer = setInterval(function () {
            var item = arr.pop();
            aImg[item].getElementsByTagName('span')[0].style.background = 'url(img/' + (iNow + 1) + '.jpg) ' + (-aImg[item].martrix.col * THUMB_IMG_WIDTH) + 'px ' + (-aImg[item].martrix.row * THUMB_IMG_HEIGHT) + 'px';
            if (arr.length == 0) {
                clearInterval(timer);
            }
        }, 30);
    };

    function setStyle3d(elem, attr, value) {
        ['Webkit', 'Moz', 'Ms', 'O', ''].forEach(function (prefix) {
            elem.style[prefix + attr.charAt(0).toUpperCase() + attr.substr(1)] = value;
        });
    }

})();