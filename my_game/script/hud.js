class Hud
{
            if (this.life.max !== null)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y-2*(canvas.height*0.01), this.width, canvas.height*0.01);

            let lifePercentual = this.life.actual/this.life.max;
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y-2*(canvas.height*0.01), this.width*(lifePercentual), canvas.height*0.01);
        }
}

