const canvas= document.getElementById("canvas");
const context= canvas.getContext("2d");
const badImage = new Image(90, 90);
badImage.src = "http://files.softicons.com/download/game-icons/classic-games-icons-by-thvg/png/512/Pacman%204.png";
const heroImage = new Image(90,90);
heroImage.src = "https://s-media-cache-ak0.pinimg.com/originals/fd/82/2a/fd822a0129aa84fedfd280ec0d387da7.png";
hero = {
    x: canvas.width/2,
    y: canvas.height-90,
    width: 90,
    height: 90,
    xDelta: 15,
    yDelta: 15
};

document.addEventListener('keydown', function(event) {
	if(event.keyCode === 39) {
        hero.x=hero.x+hero.xDelta;
       if(hero.x+hero.width >= canvas.width){
        hero.x = 0; 
      }
      
      }

	if(event.keyCode === 37) {
        hero.x=hero.x-hero.xDelta;
         if(hero.x < 0){
        hero.x = canvas.width-hero.width;
      }
      
     
    } 

	if(event.keyCode === 38) {
        hero.y=hero.y-hero.yDelta;
        if(hero.y<=0){
            hero.y= canvas.height-hero.height;
        }
  	}

	if(event.keyCode === 40) {
        hero.y=hero.y+hero.yDelta;
        if(hero.y+hero.height>canvas.height-hero.height){
            hero.y=0;
        }
  	}
});
const rand = function(num){
	return Math.floor(Math.random()*num+1);
};
const Delta = [5,-5];
const createpoint = function(count, canvaswidth, canvasheight){
	a=[];
	const recursion= function(val){
	
		if(val<=0){
			return "";
		}
		a.push({
			width: 90,
			height: 90,
			x: rand(canvaswidth-90),
			y: rand(canvasheight-90),
			xDelta: Delta[rand(2)-1],
			yDelta: Delta[rand(2)-1],
		});
		recursion(val-1);
	};
	recursion(count);
	return a;
};
	const point = createpoint(5,canvas.width,canvas.height);
	const recDraw = function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		const every = function(a,count){
		if(count>= a.length){
			return;
		}

		context.drawImage(badImage,a[count].x,a[count].y,a[count].width,a[count].height);
        context.drawImage(heroImage,hero.x,hero.y,hero.width,hero.height)
	every(a,count+1);
};
	every(point,0);
};
const update = function(){
	const ar = function(b,i){
		
		if(i === b.length){
			return "";
		}
		if(b[i].x+b[i].width >=canvas.width || b[i].x<0 ){
			b[i].xDelta=-b[i].xDelta;
		}
		if(b[i].y+b[i].height >=canvas.height || b[i].y<0 ){
			b[i].yDelta=-b[i].yDelta;
		}
		b[i].x += b[i].xDelta;
		b[i].y += b[i].yDelta;
        ar(b,i+1);
       
       if((Math.max(b[i].x, hero.x) - Math.min(b[i].x, hero.x)) <= hero.width-20 && ((Math.max(b[i].y, hero.y) - Math.min(b[i].y, hero.y)))<=hero.height-20){
				hero.x=0;
				hero.y=canvas.height-hero.height;
				alert("GAME OVER")
		}
		if((Math.max(b[i].x, hero.x) - Math.min(b[i].x, hero.x)) <= hero.width-20 && (((Math.max(b[i].y, hero.y) - Math.min(b[i].y, hero.y))<=hero.height-20) && ((hero.x===0)))){
			hero.x=canvas.width-hero.width;
		  }
	};
	ar(point,0);
};
const loop =  function(){
	recDraw();
	update();

	requestAnimationFrame(loop);
};
loop();
