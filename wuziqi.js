window.onload = function(){
    let container = document.querySelector(".container");
    let start = document.querySelector("#start");
    let canvas = document.querySelector("canvas");
    let ai = document.querySelector("#ai");
    let player = document.querySelector("#player");
    let box = document.querySelector(".box");
    let box3 = document.querySelector(".box3");
    let tag = document.querySelector(".w");
    let isai = false;
    ai.onclick = function(){
        isai = true;
    };
    player.onclick = function(){
        isai = false;
    };

    start.onclick = function(){
        container.classList.add("show");
        box.classList.add("show");
        box3.classList.add("show");
        start.style.opacity = 0;
        tag.style.opacity = 0;

    };

    let cobj = canvas.getContext("2d");
    let w = 40;
    let pos = {};
    let blank = {};
    function drawboard (){
        cobj.clearRect(0,0,600,600);
        cobj.save();
        cobj.beginPath();
        for(let i = 0; i < 15; i++){
            cobj.moveTo(20,i*w+20);
            cobj.lineTo(580,i*w+20);
            cobj.moveTo(i*w+20,20);
            cobj.lineTo(i*w+20,580);
        }
        cobj.stroke();
        drawdot(3,3);
        drawdot(3,11);
        drawdot(7,7);
        drawdot(11,3);
        drawdot(11,11);
        function drawdot(x,y){
            cobj.save();
            cobj.translate(x*w+20,y*w+20);
            cobj.beginPath();
            cobj.arc(0,0,5,0,Math.PI*2);
            cobj.fill();
            cobj.restore();
        }
        for(let i = 0; i < 15 ; i++){
            for(let k = 0; k < 15; k ++){
              blank[j(i,k)] = true;
            }
        }
    }
    drawboard ();


    function drawchess(x,y,color){
        cobj.save();
        cobj.translate(x*40+20,y*40+20);
        cobj.fillStyle = color;
        cobj.beginPath();
        cobj.arc(0,0,15,0,Math.PI*2);
        cobj.fill();
        cobj.restore();
        pos[j(x,y)] = color;
        delete  blank[j(x,y)];
    }


    let flag = true;
    canvas.onclick = function(e){
            let x = Math.round((e.offsetX-20)/w);
            let y = Math.round((e.offsetY-20)/w);
            if(pos[j(x,y)]){
                return;
            }
            if(flag){
                drawchess(x,y,"black");
                if(check(x,y,"black") === 5){
                   over("黑");
                }
                if(isai === true){
                    let p = getPos();
                    drawchess(p.x,p.y,"white");
                    if(check(p.x,p.y,"white") === 5){
                        over("白");
                    }
                    return;
                }
            }else{
                drawchess(x,y,"white");
                if(check(x,y,"white") === 5){
                    over("白");
                }
            }
            flag = !flag;
    };

    function getPos(){
        let max1 = 0;
        let pos1 = {};
        for(let i in blank){
            let x = parseInt(i.split("_")[0]);
            let y = parseInt(i.split("_")[1]);
            let length = check(x,y,"black");
            if(max1 < length){
                max1 = length;
                pos1 ={x,y};
            }
        }
        let max2 = 0;
        let pos2 = {};
        for(let i in blank){
            let x = parseInt(i.split("_")[0]);
            let y = parseInt(i.split("_")[1]);
            let length = check(x,y,"white");
            if(max2 < length){
                max2 = length;
                pos2 ={x,y}
            }
        }

        if(max1 > max2){
            return pos1;
        }else{
            return pos2;
        }
    }


    let num = 0;
    let num2 = 0;
    let flag3 = true;
    var st;
    let A = 0;
    let B = 0;
    let min = document.querySelector(".min");
    let h1 = document.querySelector("h1");
    let p = document.querySelector("p");
    p.innerHTML = num2+"分"+num+"秒";
    canvas.addEventListener("click",clickFn);
    function clickFn(){
        if(flag3){
            st = setInterval(Fn,1000);
        }
        flag3 = false;
    }
    function Fn(){
        num++;
        if(num%60 === 0){
            num2 ++;
            p.innerHTML = num2+"分"+num+"秒";
            num = 0;
        }
        p.innerHTML = num2+"分"+num+"秒";
        A = num2*60+num;

    }








    let mask = document.querySelector(".mask");
    let wenzi = document.querySelector(".wenzi");
    function over(name){
        clearInterval(st);
        mask.style.display = "block";
        wenzi.innerHTML = name+"棋获胜";
    }


    let restart = document.querySelector("#restart");
    let T = 1;
    restart.onclick = function(){
        if(T === 1){
            B = A;
            h1.innerHTML =Math.floor(B/60)+"分"+(B%60)+"秒";
        }else{
            if(A < B){
                B = A;
                h1.innerHTML =Math.floor(A/60)+"分"+(A%60)+"秒";
            }else{
                h1.innerHTML =Math.floor(B/60)+"分"+(B%60)+"秒";
            }
        }
        T ++;
        clearInterval(st);
        num = 0;
        num2 = 0;
        flag3 = true;
        p.innerHTML = num2+"分"+num+"秒";
        canvas.addEventListener("click",clickFn);
        mask.style.display = "none";
        cobj.clearRect(0,0,600,600);
        drawboard ();
        pos = {};
        xiazai.style.background = "#80C8B0";
        qp.style.background = "#80C8B0";
        imgbox.style.display = "none";
        imgbox.removeChild(newimg);
        f = true
    };

    let qp = document.querySelector("#qp");
    let imgbox = document.querySelector(".imgbox");
    let xiazai = document.querySelector(".xiazai");
    let f = true;
    qp.onclick = function(){
        if(f === true) {
            qp.style.background = "#BAD8BE";
            let url = canvas.toDataURL();
            newimg = new Image;
            newimg.src = url;
            imgbox.appendChild(newimg);
            imgbox.style.display = "block";
            xiazai.href = url;
            xiazai.setAttribute("download", "棋谱.png");
            f = false;
        }
    };
    xiazai.onclick = function(){
        qp.style.background = "#80C8B0";
        xiazai.style.background = "#BAD8BE"
    };

    let  iconfont = document.querySelector(".iconfont");
    let audio = document.querySelector("audio");
    let flag2 = true;
    iconfont.onclick = function(){
        if(flag2){
            audio.pause();
            iconfont.style.animationPlayState = "paused";
        }else{
            audio.play();
            iconfont.style.animationPlayState = "running";
        }
        flag2 = !flag2;
    };



function j(x,y){
    return  x+"_"+y;
}

    //判断连成了几个棋子
    function check(x,y,color){
        let row = 1;
        let i = 1;
        while(pos[j(x+i,y)] === color){
            row++;
            i ++;
        }
        i = 1;
        while(pos[j(x-i,y)] === color){
            row++;
            i ++;
        }
        let lie = 1;
        i = 1;
        while(pos[j(x,y+i)] === color){
            lie++;
            i ++;
        }
        i= 1;
        while(pos[j(x,y-i)] === color){
            lie++;
            i++;
        }

        let x1 = 1;
        i = 1;
        while(pos[j(x-i,y+i)] === color){
            x1++;
            i++;
        }
        i = 1;
        while(pos[j(x+i,y-i)] === color){
            x1++;
            i++;
        }

        let x2 = 1;
        i=1;
        while(pos[j(x+i,y+i)] === color){
            x2++;
            i++;
        }
        i = 1;
        while(pos[j(x-i,y-i)] === color){
            x2++;
            i++;
        }
        return Math.max(row,lie,x1,x2);
    }
};


// Math.round(); //四舍五入
// 创建图片标签 let newimg = new Image