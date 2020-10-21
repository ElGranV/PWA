let button_connect = document.getElementById("connect");
let input_id = document.getElementsByClassName("inputs")[0];
let input_password  = document.getElementsByClassName("inputs")[1];
/*Si les informations sont bonnes, l'utilisateur est redirigé vers home.html
La fonction login est déclarée dans api.js
*/

button_connect.addEventListener("click", ()=>{
  let id = input_id.nodeValue;
  let pass  =input_password.value;
  if (test)
  {
    window.location = "home.html";
  }else
  {
    login(id, pass, (text)=>
          {window.location = "home.html";
           setCookie("user",JSON.stringify(JSON.parse(text)));setCookie("pass", pass); //window.location = "home.html"}, 
    (error)=>{/*MessageWrongConnexion()*/console.error(error)});
  }
  
  
})

if(mobile) window.onload = adjustAuthPageForMobile;
