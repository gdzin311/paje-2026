class Button
{   constructor(x, y, text, action, width= canvas.width * 0.4, height= canvas.height * 0.1)
    {   this.x = x;
        this.y = y;
        this.text = text;
        this.action = action;
        this.width = width;
        this.height = height;
    }

    draw(selected)
    {   ctx.fillStyle = "black";
        ctx.fillRect(this.x - 4, this.y - 4, this.width + 8, this.height + 8);

        ctx.fillStyle = selected ? "#86060A" : "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = selected ? "white" : "black";
        ctx.font = "30px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    act()
    {   if (this.action)
        {   this.action();
        }
    }
}

class Buttons
{   constructor(list)
    {   this.list = list;
        this.selectedOption = 0;
        this.keysCooldown = { start: 6 };
        this.keysCooldown.actual = this.keysCooldown.start;
    }

    update()
    {   
        if ((this.keysCooldown.actual <= 0))
        {   if (keys[38] || keys[37] || keys[65] || keys[87]) 
            {   this.selectedOption = (this.selectedOption - 1 + this.list.length)%this.list.length;
                this.keysCooldown.actual = this.keysCooldown.start;
            }
            else
            {   if (keys[40] || keys[39] || keys[68] || keys[83])
                {   this.selectedOption = ((this.selectedOption + 1)%this.list.length);
                    this.keysCooldown.actual = this.keysCooldown.start;
                }
            }
            if (keys[13])
            {   this.list[this.selectedOption].act();
            }
        }
        

        this.keysCooldown.actual--;
    }

    draw()
    {   for (let i = 0; i < this.list.length; i++)
        {   this.list[i].draw(i === this.selectedOption);
        }
    }
}

class Menu
{
    constructor()
    {
        this.buttons= new Buttons([]);
        this.changeButtonsMenu();
    }

    changeButtonsMenu()
    {   this.buttons.keysCooldown.actual = this.buttons.keysCooldown.start;
        this.buttons.selectedOption = 0;
        this.buttons.list = 
        [
            new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.3, "Campanha", () =>
            {   
                this.changeButtonsDificult();
            }),
            new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.45, "Multiplayer", () =>
            {
                clearInterval(game)
                game = setInterval(loop, 1000 / FPS);
            }),
            new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.60, "Controles", () =>
            {   this.changeButtonsControls();
            }),
            /*new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.75, "Cor", () =>
            {   this.changeCor();
            })*/
        ];
    }

    changeButtonsDificult()
    {   this.buttons.keysCooldown.actual = this.buttons.keysCooldown.start;
        this.buttons.selectedOption = 2;
        this.buttons.list = 
        [
            new Button(canvas.width * 0.1, canvas.height * 0.1, "Voltar", () =>
                {   
                    this.changeButtonsMenu();
                }, canvas.width*0.1, canvas.height*0.1),
            new Button(canvas.width * 0.1, canvas.height * 0.45, "Facil", () =>
            {   
                clearInterval(game);

                player= new Player(0 + canvas.width*0.4 - canvas.height * 0.06, canvas.height * 0.85, canvas.height * 0.06, canvas.height * 0.05, "blue");
                enemy= new Inimigo(canvas.width - canvas.width*0.4 , canvas.height * 0.85, canvas.height * 0.06, canvas.height*0.05, "red", 500, 1)

                game = setInterval(loop, 1000 / FPS);
            }, canvas.width*0.2),
            new Button(canvas.width * 0.4, canvas.height * 0.45, "Normal", () =>
            {
                clearInterval(game);

                player= new Player(canvas.width*0.4 - canvas.height * 0.06, canvas.height * 0.85, canvas.height * 0.06, canvas.height * 0.05, "blue");
                enemy= new Inimigo(canvas.width - canvas.width*0.4 , canvas.height * 0.85, canvas.height * 0.06, canvas.height*0.05, "red", 500, 2);

                game = setInterval(loop, 1000 / FPS);
            }, canvas.width*0.2),
            new Button(canvas.width * 0.7, canvas.height * 0.45, "Dificil", () =>
            { 
                clearInterval(game);

                player= new Player(0 + canvas.width*0.4 - canvas.height * 0.06, canvas.height * 0.85, canvas.height * 0.06, canvas.height * 0.05, "blue");
                enemy= new Inimigo(canvas.width - canvas.width*0.4 , canvas.height * 0.85, canvas.height * 0.06, canvas.height*0.05, "red", 500, 3);

                game = setInterval(loop, 1000 / FPS);
            }, canvas.width*0.1, canvas.height*0.1)
        ];
    }

    changeButtonsControls() {
    this.buttons.keysCooldown.actual = this.buttons.keysCooldown.start;
    this.buttons.selectedOption = 1;
    this.buttons.list = [
        new Button(canvas.width * 0.1, canvas.height * 0.1, "Voltar", () => {
            this.changeButtonsMenu();
        }, canvas.width * 0.1, canvas.height * 0.1),

        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.2, "Direita: " + String.fromCharCode(input.direita), () => {
            this.remapping = "direita"; 
        }),
        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.3, "Esquerda: " + String.fromCharCode(input.esquerda), () => {
            this.remapping = "esquerda";
        }),
        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.4, "Pulo: " + String.fromCharCode(input.pulo), () => {
            this.remapping = "pulo";
        }),
        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.5, "Ataque_direita: " + String.fromCharCode(input.atk_direita), () => {
            this.remapping = "atk_direita";
        }),
        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.6, "Ataque_esquerda: " + String.fromCharCode(input.atk_esquerda), () => {
            this.remapping = "atk_esquerda";
        }),
        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.7, "Ataque_cima: " + String.fromCharCode(input.atk_cima), () => {
            this.remapping = "atk_cima";
        }),
        new Button(canvas.width/2 - canvas.width*0.2, canvas.height * 0.8, "Ataque_baixo: " + String.fromCharCode(input.atk_baixo), () => {
            this.remapping = "atk_baixo";
        }),
    ];
}

    update()
    {   this.buttons.update();
    }

     draw()
    {   ctx.fillStyle= "brown";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.buttons.draw();
    }
}