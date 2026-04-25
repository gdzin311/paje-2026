class Inimigo extends Entidade
{
    constructor(x, y, width, heigth, color, life, dificuldade)
    {
        super(x, y, (width*dificuldade)/2, (heigth*dificuldade)/2, -1, color, life*dificuldade);

        this.dificuldade= dificuldade;
        this.multiplicador = 1 + dificuldade;

        this.vx= 0;
        this.vy= 0;
        this.baseSpeed= canvas.width*0.003;
        this.jump= canvas.height*0.07;
        this.gravity= canvas.height*0.01;
        this.no_chao= false;

        this.act= null;
        this.state= "idle";
        this.state_coldown= 0;

        this.dano= 100*this.multiplicador;
    }

    comportamento()
    {
        const distancia = player.x - this.x;
        this.direction = distancia < 0 ? -1 : 1;

        if(this.state=="idle" &&((Math.abs(distancia) > this.width*0.75 + player.width && this.direction== -1)||(Math.abs(distancia) > this.width*1.75 && this.direction== 1)))
        {
            this.vx= this.baseSpeed*this.direction;
        }
        else
        {
           if(!(this.state== "hit"))
           {
            this.vx= 0;
           }
        }

        if((this.state== "idle") && !this.act && ((Math.abs(distancia) < this.width*0.75 + player.width && this.direction== -1)||(Math.abs(distancia) < this.width*1.75 && this.direction== 1)))
        {

            this.act= new Ataque(enemy, player, this.direction, this.dano);
            this.state= "atacking";
            this.state_coldown= 100/this.dificuldade;
        }


    }

    rouds()
    {
        if(this.life.atual <= 0) 
            if((this.multiplicador - this.dificuldade) < 3)
                {
                    this.multiplicador+= 1;

                    this.x= canvas.width - canvas.width*0.4; 
                    this.y= canvas.height * 0.85;
                    this.vx= 0;
                    this.vy= 0;
                    this.width= (canvas.height * 0.06*this.multiplicador)/2;
                    this.height= (canvas.height * 0.05*this.multiplicador)/2;

                    this.dano= 100*this.multiplicador;
                    this.life.max= 500*this.multiplicador;
                    this.life.atual= this.life.max;

                    player.x= canvas.width*0.4 - canvas.height * 0.06;
                    player.y= canvas.height * 0.85;
                    player.vx= 0;
                    player.vy= 0;
                    player.act= null;
                    player.state= "idle";
                    player.life.atual+= player.life.max * 1/this.dificuldade;
                }
                else
                {
                    game = setInterval(ganhou, 1000/FPS);
                }
    }

    update()
    {   this.comportamento()

        //fisica y
        this.vy += this.gravity;
        this.y += this.vy;

        if(this.colisao(chao))
        {
            this.y= chao.y - this.height;
            this.vy= 0
            this.no_chao= true
        }
        else
        {
            this.no_chao= false
        }

        if (this.colisao(player))
        {
            if (this.vy > 0) 
            {
                this.y = player.y - this.height; 
                this.vy = 0;
            }
            else 
            {
                if (this.vy < 0) 
                {
                    this.y = player.y + player.height; 
                    this.vy = 0;
                }
            }
        } 

        //fisica x

        this.x+= this.vx;

        if((this.x + this.width)>canvas.width)
        {
            this.x= canvas.width - this.width
        }
        if(this.x<0)
        {
            this.x= 0;
        }

        if (this.colisao(player)) 
        {
            if (this.direction > 0) 
            {
                this.x = player.x - this.width; 
            } 
            else
            {
                if (this.direction < 0)
                {
                    this.x = player.x + player.width;
                }
            }
            this.vx = 0;
        }
        //------------------

        if((!this.state_coldown)&&(!this.act))
        {
            this.state= "idle";
        }

        if(this.act)
        {
            this.act.posicao();
            if(!this.act.lifetime)
            {
                this.act= null;
            }
        }

        this.state_coldown-= 1 * (this.state_coldown > 0);

        //----------------------

        this.rouds()
    }

    draw()
    {
        if(this.act)
        {
            this.act.draw();
        }

        super.draw()
    }
}