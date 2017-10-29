const canvas= document.getElementById("canvas");
const context= canvas.getContext("2d");
const rand = function(num){
	return Math.floor(Math.random()*num+1);
};
const randDelta = function(val){
	return Math.floor(Math.random()*val+50);
};
const Delta = [4,-4];
const colorar = ["blue", "red", "green", "yellow", "pink"]
const createpoint = function(count, canvaswidth, canvasheight){
	a=[];
		const f= randDelta(400);
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
			color: colorar[rand(5)-1]
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
		context.fillStyle = a[count].color;
		context.fillRect(a[count].x,a[count].y,a[count].width,a[count].height);

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
	};
	ar(point,0);
};

const loop =  function() {
	recDraw();
	update();

	requestAnimationFrame(loop);
};
loop();//exercise 2 answer

console.log(a);//exercise 1 answer
//sorry if putting 2 exercises in one code made my code uncomfortable to check