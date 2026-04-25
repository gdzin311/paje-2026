class Entidade
{
    constructor(x, y, width, height, direction, color= "black", life= null)
    {
        this.x= x;
        this.y= y;
        this.width= width;
        this.height= height;
        this.color= color;
        this.direction= direction;
        this.life= {
            max: life,
            atual: life
        }
        
    }

    colisao(outro)
    {
        return(
            outro.x < this.x + this.width &&
            this.x < outro.x + outro.width &&
            outro.y < this.y + this.height &&
            this.y < outro.y + outro.height
        );
    }

    draw()
    {
        ctx.fillStyle= this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

