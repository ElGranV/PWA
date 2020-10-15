const token = "PPlaFk63u4E6";
async function login (id, pass, success_callback = null, fail_callback = null)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/login.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data,
}).then((reponse)=>reponse.text()).then((text)=>{
  if(success_callback)
  {
    success_callback(text);
  }}).catch((error)=>{
    if (fail_callback)
    {
      fail_callback(error);
    }
  });
};

async function load_projects (id, pass, success_callback = null, fail_callback = null)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("token", token);
  fetch('http://www.wi-bash.fr/application/ListeProjets.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data,
}).then((reponse)=>reponse.text()).then((text)=>{
  if(success_callback)
  {
    success_callback(text);
  }}).catch((error)=>{
    if (fail_callback)
    {
      fail_callback(error);
    }
  });
};

/*
export async function changeMyInfo(id, pass, action, new_value)
{
  let data = new FormData();
  data.append("identifiant", id);
  data.append("pass", pass);
  data.append("token", token);
  data.append("action", action);
  data.append("champ", new_value);
  fetch('http://www.wi-bash.fr/application/monCompte.php', {
  method: 'POST',
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': "multipart/form-data"
  },
  body: data
}).then((reponse)=>reponse.text()).then((text)=>console.log(text)).catch((error)=>{console.log(error)});
};*/