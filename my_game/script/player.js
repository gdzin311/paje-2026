class Player extends Entidade
{
    constructor(x, y, width, height, color)
    {
        super(x, y, width, height, 1, color, 1000);

        this.vx= 0;
        this.vy= 0;
        this.baseSpeed= canvas.width*0.01;
        this.jump= canvas.height*0.03;
        this.gravity= canvas.height*0.003;
        this.no_chao= false;

        this.act= null;
        this.state= "idle";
        this.state_coldown;


        this.dano= 100;
    }

    movement()
    {
        if(this.state!= "hit")
        {
            if(keys[65])
            {   this.vx = -this.baseSpeed;
                this.direction= -1;
            }
            else
            {   if(keys[68])
                {   this.vx = this.baseSpeed;
                    this.direction= 1;
                }
                else
                {   this.vx = 0;
                }
            }

            if(keys[32]&&(this.no_chao))
            {
                this.vy-= this.jump;
            }
        }
    }

    action()
    {
        if(this.state=="idle")
        {
            if(keys[69])
            {
                this.state= "defense"    
            }

            //ataque x
            if(keys[37])
            {
                this.act= new Ataque(player, enemy, -1, this.dano);
                this.state= "atacking";
            }
            if(keys[39])
            {
                this.act= new Ataque(player, enemy, 1, this.dano);
                this.state= "atacking";

            }

            //ataque y
            if(keys[38])
            {
                this.act= new Ataque(player, enemy, -2, this.dano);
                this.state= "atacking";
            }
            if(keys[40])
            {
                this.act= new Ataque(player, enemy, 2, this.dano);
                this.state= "atacking";
            }
        }
    }

    draw()
    {
        if(this.act)
        {
            this.act.draw();
        }

        super.draw()
    }

    update()
    {   this.movement();

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

        if (this.colisao(enemy))
        {
            if (this.vy > 0) 
            {
                this.y = enemy.y - this.height; 
                this.vy = 0;
            }
            else 
            {
                if (this.vy < 0) 
                {
                    this.y = enemy.y + enemy.height; 
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

        if (this.colisao(enemy)) 
        {
            if (this.direction > 0) 
            {
                this.x = enemy.x - this.width; 
            } 
            else
            {
                if (this.direction < 0)
                {
                    this.x = enemy.x + enemy.width;
                }
            }
            this.vx = 0;
        }
        //------------------
        this.action()

        if(this.act)
        {
            this.act.posicao();
            if(!this.act.lifetime)
            {
                this.act= null;
                this.state= "idle"
            }
        }

        if(!this.state_coldown)
        {
            this.state= "idle";
        }

        this.state_coldown-= 1 * (this.state_coldown > 0);

        //e morreu
        if (this.life.atual <= 0)
        {   clearInterval(game);
            game = setInterval(deathScreen, 1000/FPS);
        }
    }
}
