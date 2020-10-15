const red = "rgb(222,5,0)";
const shadow = "0px 3px 3px 4px rgba(0,0,0,0.1)";
const bigShadow = "0px 2px 4px 5px rgba(0,0,0,0.3)";
const defaultImg = "images/default.jpg";
const test = window.location.hostname!=="www.wi-bash.fr";

function MyButton(titre, command = ()=>{}, couleur = red, bg = "white")
{
    let bouton = document.createElement("button");
    bouton.className = "button";
    bouton.style.color = couleur;
    bouton.style.backgroundColor = bg;
    bouton.textContent = titre;
    bouton.addEventListener("click", command);
    return bouton;
    
}

function MyInput(placeholder = "")
{
    let input = document.createElement("input");
    input.className = "inputs";
    input.placeholder = placeholder;
    
    return input;
}
/**
 * 
 * @param {*} largeur 
 * @param {*} hauteur 
 * @param {par défaut "blanc"} couleur 
 * @param {*} ombre 
 */
function MyRect(largeur, hauteur, couleur = "white", ombre = false)
{
    if (typeof largeur !=="string") largeur = largeur + "px";
    if (typeof hauteur !=="string") hauteur = hauteur + "px";
    let rect = document.createElement("div");
    rect.style.backgroundColor = couleur;
    if (ombre) rect.style.boxShadow = shadow;
    rect.style.width = largeur;
    rect.style.height = hauteur;
    return rect;
}
function MyAnimatedRect(top, left, largeur, hauteur, couleur = "white", ombre = false)
{
    top = top + "px";
    left = left + "px";
    let rect = MyRect(largeur, hauteur, couleur, ombre);
    rect.style.position = "absolute";
    rect.style.top = top;
    rect.style.left = left;
    return rect;
    
}
//vue qui permet de résumer un projet dans une petite case
function MyProjectView(projet)
{
    let area = MyRect(window.outerWidth/6, window.outerWidth/6, "white", true);
    let titleSpan = document.createElement("span");
    titleSpan.style.fontWeight = "bold";
    titleSpan.innerHTML = projet.nom+"<br>";
    let img = document.createElement("img");
    if ("image" in projet)
    {
        if (projet.image)
        {
            img.src = projet.image;
        }else img.src = defaultImg;
    }else img.src = defaultImg;
    if (img.src!==defaultImg)img.style.height = "50px";
    area.append(img);
    area.innerHTML += "<hr width='100%'>";
    area.append(titleSpan);
    area.innerHTML += projet.description;
    area.className = "vue_projet";
    area.style.flexDirection = "column";

    area.addEventListener("mouseover",()=>{
        area.style.transitionDuration = "0.1s";
        area.style.boxShadow = bigShadow;
    });
    area.addEventListener("mouseout", ()=>{
        area.style.boxShadow = shadow;
    })
    if (mobile)
    {
        area.style.width = "500px";
        area.style.height = "500px";
    }
    
    return area;

}

function MyMemberView(membre)
{
    let area = MyRect(window.outerWidth/9, window.outerWidth/6, "white", true);
    let titleSpan = document.createElement("span");
    titleSpan.style.fontWeight = "bold";
    titleSpan.innerHTML = membre.pseudo+"<br>";
    let img = document.createElement("img");
    if ("photo_profil" in membre)
    {
        if (membre.photo_profil)
        {
            img.src = membre.photo_profil;
        }else img.src = defaultImg;
    }else img.src = defaultImg;
    if (img.src!==defaultImg)img.style.width = "100%";
    area.append(img);
    area.innerHTML += "<hr width='100%'>";
    area.append(titleSpan);
    area.innerHTML += membre.story;
    area.className = "vue_projet";
    area.style.flexDirection = "column";

    area.addEventListener("mouseover",()=>{
        area.style.transitionDuration = "0.1s";
        area.style.boxShadow = bigShadow;
    });
    area.addEventListener("mouseout", ()=>{
        area.style.boxShadow = shadow;
    })
    if (mobile)
    {
        area.style.width = "500px";
        area.style.height = "500px";
    }
    
    return area;

}
//Metaclasse qui sert de gestionnaire de positionnement
class Position
{
static toMiddle(rect)
{
    let rWidth = rect.style.width.slice(0, -2);
    rWidth = parseInt(rWidth);
    rect.style.left = ((window.innerWidth-rWidth)/2) + "px";
}
static toCenter(rect)
{
    let rWidth = rect.style.width.slice(0, -2);
    rWidth = parseInt(rWidth);
    rect.style.left = ((window.innerWidth-rWidth)/2) + "px";

    let rHeight = rect.style.height.slice(0, -2);
    rHeight = parseInt(rHeight);
    rect.style.top = ((window.innerHeight-rHeight)/2) + "px";
}

static toTopRight(rect)
{
    rect.style.top = "15px";
    let rWidth = rect.style.width.slice(0, -2);
    rWidth = parseInt(rWidth);
    rect.style.left = ((window.innerWidth-rWidth-30)) + "px";
}

static toTopLeft(rect)
{
    rect.style.top = "15px";
    let rWidth = rect.style.width.slice(0, -2);
    rWidth = parseInt(rWidth);
    rect.style.left = "30px";
}
static toRight(rect)
{
    Position.toCenter(rect);
    let rWidth = rect.style.width.slice(0, -2);
    rWidth = parseInt(rWidth);
    rect.style.left = ((window.innerWidth-rWidth-30)) + "px";

}
static toBottom(rect)
{
    let rHeight = rect.style.height.slice(0,-2);
    rHeight = parseInt(rHeight);
    rect.style.top = (window.innerHeight - rHeight- 30)+"px";
}
}


//Animation qui écrit dynamiquement le logo WiB dans un canvas
let id = -1;
let i = 0;
function drawWib(ctx,callback = null, x = 10, y = 10,begun = false)
{
    let steps = [60,80,100,129];
    if (!begun) 
    {
        ctx.beginPath();
        ctx.moveTo(10,10);
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
    }
    
    function step(xStep, yStep, time)
    {
        x+=xStep;
        y += yStep;
        ctx.lineTo(x,y);
        ctx.stroke();
        return setTimeout(()=>drawWib(ctx,callback, x,y,true), time);
    }
    function line(xStep, yStep, time)
    {
        clearTimeout(id);
        id = step(xStep, yStep, time);
    }
    //Debut W
    if (x <= steps[0]) line(1,1,8);
    if (x> steps[0] && x <= steps[1]) line(1,-1.5,10);
    if (x> steps[1] && x <= steps[2])line(1,1.5,10);

    if (x> steps[2] && x <= steps[3])
        {
            ctx.lineCap = "square";
            line(1,-1.1,15);
            if (x===steps[3]+1)
            {
                x+=25;
                y+=10;
                ctx.moveTo(x,y);
            }
        }
        //fin W
        //Debut I
        if (x > steps[3] && y <= 65)line(0,1,10);
        if (x>steps[3] && y >=64)
        {
            
            //point du i
            ctx.lineWidth = 10;
            ctx.stroke();
            clearTimeout(id);
            y=25;
            ctx.beginPath();
            ctx.moveTo(x,y)
            ctx.lineWidth= 1;
            ctx.arc(x, y, 6, 0, 2*Math.PI);
            ctx.fill();
            //Fin du I (avec point)
            //Debut du B
            ctx.canvas.style.transitionDuration = "2s";
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0,0,0,0)";
            let alpha = 0;
            ctx.lineWidth = 10;
            x+= 30;
            y = 12;
            ctx.moveTo(x,y);
            y+=60;
            ctx.bezierCurveTo(180,10,200,30,180,65);
            ctx.lineWidth = 5;
            ctx.moveTo(170,15);
            ctx.bezierCurveTo(170,15, 280, 20, 185, 40);
            ctx.moveTo(185, 40);
            ctx.bezierCurveTo(185, 40, 280,40,180,65);
            //fin du B

            id = setInterval(()=>{
                if (alpha<0.8)
                {alpha+=0.009;
                ctx.strokeStyle = "rgb(0,0,0,"+alpha+")";
                ctx.stroke();
            }
                else {
                    clearInterval(id);
                    if (callback) callback();

                }
            }, 30);


        }
        

    
}
