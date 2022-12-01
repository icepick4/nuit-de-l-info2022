console.log("captchat loaded")
checkBox = document.querySelector('.captchat');

console.log(checkBox);
checkBox.addEventListener("click",function(e) {

  captchat()
  
})
let selected =[];
const ggg = ["1.svg","2.svg"];
const bbb = ["3.svg","4.svg","5.svg","6.svg","7.svg","8.svg","9.svg","10.svg"];

function captchat(argument) {
  let gg = ggg.map((x) => x);
  let bb = bbb.map((x) => x);
  let g = Math.floor(Math.random() * 8);
  let done = []
  selected =[];
  let capt = document.createElement('div');
  capt.classList.add("captchat_select")
  checkBox.style.backgroundColor="white";
  checkBox.querySelector("#check_capt").classList.remove("check_valide")


  console.log(capt);

  for (var i = 0; i < 9; i++) {
    if (i!==g){
    let index = Math.floor(Math.random()*bb.length)
    console.log(index);
    console.log(bb);
    let img_path = bb[index];
    let img = document.createElement("img")
    img.src="assets/captchat/"+img_path
    img.name =img_path;
    img.addEventListener("click",img_cliked)
    bb[index] = bb[bb.length -1];
    bb.pop()

    capt.appendChild(img);
  }else{
    let index = Math.floor(Math.random()*gg.length)
    console.log(index);
    console.log(gg);
    let img_path = gg[index];
    let img = document.createElement("img")
    img.src="assets/captchat/"+img_path
    img.name =img_path;
    img.addEventListener("click",img_cliked)
    gg[index] = gg[gg.length -1];
    gg.pop()
    capt.appendChild(img);
    
  }

  
  }
  let btn = document.createElement("button")
  btn.innerHTML="Valider"
  btn.addEventListener("click",validate)

  capt.appendChild(btn)
  document.body.appendChild(capt);
}

function img_cliked(ev) {
  console.log(ev.target.name,"clicked");
  ev.target.classList.toggle("selected")
  if (selected.includes(ev.target.name)){
    selected[selected.indexOf(ev.target.name)] = selected[selected.length -1]
    selected.pop()
  }else{
    selected.push(ev.target.name)
  }


}

function validate(ev){
  console.log("clikec")
  console.log(selected,selected.length === 1 , ggg.includes(selected[0]));
  console.log(ggg,selected[0]);
  if (selected.length === 1 && ggg.includes(selected[0])){

    checkBox.querySelector("#check_capt").classList.add("check_valide")
  }else{
    checkBox.style.backgroundColor="red";
    checkBox.querySelector("#check_capt").classList.remove("check_valide")
  }

  document.body.removeChild(document.querySelector('.captchat_select'));

}

