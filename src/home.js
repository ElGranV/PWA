let default_proj = [{nom:"Air bash", description: "Projet de robotique, électronique et informatique de montage et programmation de drone entièrement fait par les memebres.", image:"https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/1/6/e/16ec9e966c_68361_album-drone.jpg"
}, {nom: "App", description: "Projet d'application permettant de gérer le fonctionnement interne de l'association."}, {nom:"UApp", description:"Application permettant de centraliser une partie des services de la FAC. Mais proposant aussi un système de doléances où les étudiants peuvent signaler des problèmes"}]

let default_members = [{pseudo:"Pepin", story:"Etudiant en M1 Miage, longue expérience professionnelle au McDo. Je maîtrise js, htlm/css, C# (Microsoft Power!), Blender, UE4, Java, C et tant d'autres... ypepin.fr ;)", photo_profil:"https://avatars0.githubusercontent.com/u/57906011?s=400&u=3e1562c176c948d3fc545bc65acc748a9148f049&v=4"}, {pseudo:"Mafiamanix", story:"Bientôt homme le plus puissant de Guadeloupe, je manie à la perfection la manipulation des masses. Mon objectif : réécrire l'histoire pour lui redonner sa signification profonde", photo_profil:"https://i1.sndcdn.com/avatars-000015098039-uakswh-t200x200.jpg"},{pseudo:"blackol", story:"Je suis l'homme le plus beau du monde",photo_profil:"https://avatars3.githubusercontent.com/u/43658641?s=400&u=b1a10c5cdc00c9b0f5fb1981bd2d764938c6e92c&v=4"}, {pseudo:"Aristote", story:"R.A.S"}]

let div_p = document.getElementById("projets");
let div_membres = document.getElementById("membres");
let user;
function displayProjects (user)
{
    load_projects(user.identifiant, user.pass, (text)=>{
        projets = JSON.parse(text);
        for (let p of projets)div_p.append(MyProjectView(p)); 
    }, ()=>{
        projets = default_proj;
        for (let p of projets)div_p.append(MyProjectView(p)); 
    });
    let membres = default_members;
    for (let m of membres)
    {
        div_membres.append(MyMemberView(m));
    }

    
}
window.onload  = ()=>
{
    if (mobile)adjustHomePageForMobile();
    
    if (test)user = {identifiant:"Aristote", pseudo:"C18", pass:"lemmerdeur"}
    else
    {
        user = getCookie("user");
        user = JSON.parse(user);
        user.pass = getCookie("pass");

    }
    displayProjects(user)
}