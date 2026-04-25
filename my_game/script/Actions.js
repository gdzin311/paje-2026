class Ataque extends Entidade
{
    constructor(user, inimigo, direction, dano)
    {
        super(user.x, user.y, user.width/2, user.height, direction)

        this.user= user;
        this.inimigo= inimigo;

        this.posicao();

        this.dano= dano;
        this.lifetime= 12;
        this.image= new Image();
        this.image.src= ataqueImg;

        if(this.colisao(this.inimigo))
            {
                this.inimigo.life.atual-= this.dano;
                this.inimigo.vx+= canvas.width*0.03 * (this.direction * (Math.abs(this.direction)==1));
                this.inimigo.state= "hit"
                this.inimigo.state_coldown= 10;
            }
    }

    posicao()
    {
        switch(this.direction)
        {
            case 1:
                this.width= this.user.width;
                this.height= this.user.height;
                this.x= this.user.x + this.user.width;
                this.y= this.user.y
                break;
            case -1:
                this.width= this.user.width;
                this.height= this.user.height;
                this.x= this.user.x - this.user.width;
                this.y= this.user.y;
                break;
            case 2:
                this.width= this.user.width;
                this.height= this.user.height;
                this.x= this.user.x;
                this.y= this.user.y + this.user.height*1.5;
                break;
            case -2:
                this.width= this.user.width;
                this.height= this.user.height;
                this.x= this.user.x;
                this.y= this.user.y - this.user.height;
                break;
        }


        this.lifetime--;
        return(this.lifetime)
    }

    draw() 
    {
        if((Math.abs(this.direction))==1)
        {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(this.direction, 1);
        ctx.drawImage(this.image, -this.width*0.5 , -this.height / 2, this.width*1.5, this.height);
        ctx.restore();
        }

        if((Math.abs(this.direction))==2)
        {
             ctx.fillStyle= "red"
            ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(Math.PI / this.direction);
        ctx.drawImage(this.image, -this.width/2, -this.height, this.width, this.height);
        ctx.restore();
        }
    }
}