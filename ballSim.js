balls = [];

gravity = 9.8;

for (i = 0; i < 7; i++)
{
	balls.push(new ball(20, 20, 10, Math.random()*100, Math.random()*100));
}

function ballSim()
{
		setInterval(gameLoop, 1000/60);
}

function drawBackground()
{
	ctx,fillStyle = "F0F0F0";
	ctx.fillRect(0, 0, canvas_Element.width, canvas_Element.height);
	
}

function gameLoop()
{
	
	update();
	draw();

}

function update()
{
	for(x = 0; x < balls.length; x++)
	{
		balls[x].update();
	}
	
}
function draw()
{
		drawBackground();

	for(x = 0; x < balls.length; x++)
	{
		balls[x].draw();
	}

}

function ball(x, y, r, vx, vy)
{
	this.draw = function()
	{
		
		//ctx.strokeRect(this.x, this.y, this.r, this.r);
		ctx.strokeStyle = "#FF00FF";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.stroke();
	}
	this.update = function()
	{
		if((this.x + this.vx*delta) < canvas_Element.width && (this.x + this.vx*delta) > 0){
			this.x += this.vx*delta;
		}else {
			this.vx *= -1;
		}
		
		
		if((this.y + this.vy*delta) < canvas_Element.height && (this.y + this.vy*delta) > 0){
			this.y += this.vy*delta;
		}else{
			this.vy *= -1;
		}
		
		this.vy += gravity;
	}
	this.x = x;
	this.y = y;
	this.r = r;
	this.vx = vx;
	this.vy = vy;
}
