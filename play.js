var canvas = document.getElementById("main");
var context = canvas.getContext("2d");
var max_velocity = 35;
//var X=window.innerWidth;
//var Y=window.innerHeight;
var X = 616;
var Y = 360;
function component(x, y, width, height, color, type) {
    this.x = x;
    this.y = y;
    this.color = color
    this.prevX = x;
    this.prevY = y;
    this.type = type;
    this.width = width;
    this.height = height;
    if (this.type == "circle") { this.radius = this.width; }
    if (this.type == "image") this.speedX = 0, this.speedY = 0;
    else this.speedX = 0, this.speedY = 0;

    if (this.type == "image") { this.gravity = 0; }
    else { this.gravity = 0.4; }//this.gravitySpeed=8.48528;}
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.fric = 0.1;


    this.update = function () {
        if (this.type == "image") {
            this.image = new Image();
            this.image.src = this.color;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else if (this.type == "circle") {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        }
        else {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        if (this.type != "image")
            this.hitbottom();
    }
    this.hitbottom = function () {
        if (this.y + this.height > Y)// height=radius
        {
            this.y = Y - this.height;
            /*this.gravitySpeed=-(this.bounce*this.gravitySpeed);
            //this.speedY=-(this.bounce*this.speedY);
            this.speedY=0;*/


            this.speedY = -(this.bounce * this.speedY);
            this.gravitySpeed = 0;


            this.speedX = (1 - this.fric) * this.speedX;
        }
    }
}
function accelerate(n) {
    mygamepiece.gravitySpeed = n;
}
function collission_bb(ball, basket) {
    /*return !(ball.y+ball.height<basket.y ||
        ball.x+ball.width<basket.x || 
        ball.x>basket.x+basket.width ||
        ball.y>basket.y+basket.height)*/
    /*return !(ball.x+ball.width<basket.x ||
        	
            ball.x-ball.width>basket.x+basket.width ||
            ball.y-ball.width>basket.y+basket.width);*/
    return false;

}
var ratio = 0.1;
var mygamepiece = new component(50, 50, 10, 10, "#9030d0", "circle");
var basket = new component(400, 360 - 1183 * ratio + 17, 764 * ratio, 1183 * ratio, "img/basket_face.png", "image");
mygamepiece.update();
basket.update();
var bas = new Image(); //764,1183
bas.src = 'img/basket_face.png';
bas.onload = function () {
    context.drawImage(bas, 400, 360 - 1183 * ratio + 17, 764 * ratio, 1183 * ratio);
}


function collide(r1, r2) {
    var dx = (r1.x) - (r2.x + r2.width / 2);
    var dy = (r1.y) - (r2.y + r2.height / 2);
    var width = (2 * r1.width + r2.width) / 2;
    var height = (2 * r1.height + r2.height) / 2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    var collision = 'none';
    //
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
        if (crossWidth > crossHeight) {
            collision = (crossWidth > (-crossHeight)) ? "bottom" : "left";
        } else {
            collision = (crossWidth > -(crossHeight)) ? "right" : "top";
        }
    }
    return (collision);
}

function updategamearea() {
    context.clearRect(0, 0, X, Y);
    mygamepiece.newPos();
    basket.newPos();
    //basket.update();
    mygamepiece.update();
    basket.update();
    if (collide(mygamepiece, basket) == "top") {	//alert("abdddd");
        if (mygamepiece.x >= basket.x);
        //clearInterval(ob.val);
        else {
            //mygamepiece.gravitySpeed=0;
            mygamepiece.gravitySpeed = -(mygamepiece.bounce * mygamepiece.gravitySpeed);
            mygamepiece.speedX = -(mygamepiece.speedX);
            //alert("hoolllllaaaaaaaa!");
        }
    }
    if (collide(mygamepiece, basket) == "left") mygamepiece.speedX = -(mygamepiece.bounce * mygamepiece.speedX);
    if (collide(mygamepiece, basket) == "right") mygamepiece.speedX = -(mygamepiece.bounce * mygamepiece.speedX);


    /*if(collission_bb(mygamepiece,basket))
    {
        mygamepiece.speedX=-(mygamepiece.speedX);
    }*/

    if (mygamepiece.x + mygamepiece.width > X)// || mygamepiece.x<0)
    {
        mygamepiece.x = X - mygamepiece.width;
        mygamepiece.speedX = -mygamepiece.speedX;
    }
    if (mygamepiece.x < 0) {
        mygamepiece.x = 0;
        mygamepiece.speedX = -mygamepiece.speedX;
    }
    if (mygamepiece.y < 0) {
        mygamepiece.y = 0;
        mygamepiece.speedY = -mygamepiece.speedY;
    }
    //alert("11");
    var ass = document.getElementById('play');
    ass.innerHTML = mygamepiece.x + ' ' + mygamepiece.prevX;
    //if(mygamepiece.x-mygamepiece.prevX<0.01 && mygamepiece.x-mygamepiece.prevX>0)// && mygamepiece.y-mygamepiece.prevY<0.01 && mygamepiece.y-mygamepiece.prevY>0)//parseInt(mygamepiece.gravitySpeed)==0)//==mygamepiece.prevX)// && mygamepiece.speedY==0)
    if (twoplace(mygamepiece.x) == twoplace(mygamepiece.prevX) && twoplace(mygamepiece.y) == twoplace(mygamepiece.prevY)) {
        //alert("working");
        var ass = document.getElementById('play');

        if (mygamepiece.x - mygamepiece.width >= basket.x && mygamepiece.x + mygamepiece.width <= basket.x + basket.width) {
            //alert("done");
            ass.innerHTML = "You Won!";
            clearInterval(xyz);
        }
        else {
            ass.innerHTML = "You Lose";
        }
    }

}
document.addEventListener("keydown", function () {
    accelerate(-8);
}, false);
document.addEventListener("keyup", function () {
    //accelerate(0.1);
}, false);

function twoplace(n) {
    return parseInt((n * 100));
}
var ob = {
    val: 1
}
var throw_angle = Math.PI / 4;
function onstart(obj) {
    clearInterval(abc);
    throw_angle = ((Math.PI / 4 + angle % (Math.PI * 2)) % (2 * Math.PI));//*(180/Math.PI);
    //if(angle==Math.PI/180)throw_angle=Math.PI/4;
    /*velx=max_velocity*Math.cos(throw_angle);
    vely=max_velocity*Math.sin(throw_angle);
	
    one.innerHTML='X-velocity='+velx;
    two.innerHTML='Y-velocity='+vely;*/

    mygamepiece.speedX = velx;
    mygamepiece.speedY = vely;


    //alert(throw_angle*180/Math.PI);
    var xyz = setInterval(function () {
        updategamearea();
    }, 20);
    ob.val = xyz;
}

/************************************************
***********************************************/
/*velx=12*Math.cos(throw_angle);
vely=12*Math.sin(throw_angle);*/



/************************
**********************/


var center = {
    x: mygamepiece.x,//+mygamepiece.width/2,
    y: mygamepiece.y//+mygamepiece.height/2
};

var offset = mygamepiece.width - 2;///2;

posx = center.x + offset;
posy = center.y + offset;


/*context.fillStyle="purple";
context.fillRect(posx,posy,5,5);*/
var arrow = new Image();
arrow.src = "img/arrow.png";
arrow.onload = function () {
    context.drawImage(arrow, posx, posy, 60 * 0.2, 60 * 0.2);
}

//setInterval(rotate,20);
pressed = false;
function update() {
    if (pressed) rotate();
    t.innerHTML = 'Angle=' + ((Math.PI / 4 + angle % (Math.PI * 2)) % (2 * Math.PI)) * (180 / Math.PI);
    throw_angle = ((Math.PI / 4 + angle % (Math.PI * 2)) % (2 * Math.PI));//*(180/Math.PI);
    //if(angle==Math.PI/180)throw_angle=Math.PI/4;
    /*velx=12*Math.cos(throw_angle);
    vely=12*Math.sin(throw_angle);
    one.innerHTML=velx;
    two.innerHTML=vely;*/
    velx = max_velocity * Math.cos(throw_angle);
    vely = max_velocity * Math.sin(throw_angle);

    one.innerHTML = 'X-velocity=' + velx;
    two.innerHTML = 'Y-velocity=' + vely;


}
var abc = setInterval(update, 20);
function press() {
    pressed = true;
}
function unpress() {
    pressed = false;
}
angle = 0;//Math.PI/180;
speed_rotation = 4;

var t = document.getElementById('power');
var one = document.getElementById('one');
var two = document.getElementById('two');

function rotate() {
    //context.clearRect(0,0,300,300);
    context.save();
    context.translate(center.x, center.y);
    //context.rotate(2.3*Math.sin((new Date)*1/1000)-0.15);
    //angle+=1;
    context.rotate(angle - speed_rotation * Math.PI / 180);
    //angle+=speed_rotation*Math.PI/180;
    //context.translate(-center.x,-center.y);
    //context.fillRect(offset,offset,5,5);
    context.clearRect(offset - 1, offset - 1, offset + 5 + 1, offset + 5 + 1);
    context.translate(-center.x, -center.y);
    context.restore();


    context.save();
    context.translate(center.x, center.y);
    //context.rotate(2.3*Math.sin((new Date)*1/1000)-0.15);
    //angle+=1;
    context.rotate(angle);
    angle += speed_rotation * Math.PI / 180;
    //context.translate(-center.x,-center.y);
    //context.fillRect(offset,offset,5,5);
    //arrow.onload = function()
    //{
    context.drawImage(arrow, offset, offset, 60 * 0.2, 60 * 0.2);
    //}
    context.translate(-center.x, -center.y);
    context.restore();
}