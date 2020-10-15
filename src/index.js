let body = document.querySelector("body");


//variables globales
var user = {}, projets = {}, membres = {};
//
 let connect_button = document.getElementById("connect");
let register_button = document.getElementById("register");

connect_button.addEventListener("click", ()=>{
    window.location = "login.html";
});

register_button.addEventListener("click", ()=>{
        window.location = "register.html"}
    );

    function wibAnimation(){
    let can = document.createElement("canvas");
    //can.style.position = "absolute";
    can.style.width = '300px';
    can.style.height = "300px";
    if (mobile)
    {
        can.style.width = '500px';
        can.style.height = "500px";
    }
    can.style.position = "absolute";
    if(mobile) 
    {
        Position.toMiddle(can);
        Position.toBottom(can);
    }
    else 
    {
        Position.toTopLeft(can);
        can.pos = "left";
        can.addEventListener("mouseover", ()=>{
            if (!mobile)
            {
                (can.pos==="left")?Position.toTopRight(can):Position.toTopLeft(can);
                can.pos = (can.pos==="left")?"right":"left";
            }
        })
    }

    document.querySelector("body").append(can);
    let ctx = can.getContext('2d');
    drawWib(ctx, ()=>{
        if(!mobile){can.style.height = "200px";
                    can.style.width = "200px";}
    });
    
    }

function init()
{
    if (mobile)
    {
        adjustAuthPageForMobile();
    }
    wibAnimation();
}
window.onload = init;
