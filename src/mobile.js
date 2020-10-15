const mobile = window.navigator.platform!=="Win32" && (Math.min(window.outerWidth,window.outerHeight))<=800;

//fonction qui permet d'ajuster les composant des pages d'authentification (se connecter, s'inscrire ...etc.) pour un petit écran (mobile)
function adjustAuthPageForMobile()
{
    let body = document.querySelector("body");
        body.style.backgroundSize = "1000px 2000px";
        let logo = document.getElementById("logo");
        logo.style.height = "450px";
        logo.style.width = "590px";
        document.getElementById("all").style.marginTop = "70px";
        document.getElementById("wiapp").style.marginBottom = "100px";
        let buttons = document.getElementsByClassName("button");
        for (let b of buttons)
        {
            b.style.width = "95%";
            b.style.height = "95px";
            b.style.fontSize = "34px";
            b.style.borderRadius = "50px";
        }
        let inputs = document.querySelectorAll("input");
        for (let input of inputs)
        {
            input.style.width = "95%";
            input.style.height = "70px";
            input.style.borderRadius = "50px";
        }
}

//fonction qui permet d'ajuster les composant de la page d'accueil pour mobile
function adjustHomePageForMobile()
{
    let body = document.querySelector('body');
    body.style.backgroundSize = "1000px 2000px";

}
