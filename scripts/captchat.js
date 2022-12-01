console.log("captchat loaded")
checkBox = document.querySelector('.captchat');

console.log(checkBox);
checkBox.addEventListener("click",function(e) {
  console.log("checked");
  checkBox.querySelector("#check_capt").classList.toggle("check_valide")
  
})

const ggg = ["1.svg","2.svg"];
let gg = ggg;
let bb = ["3.svg","4.svg","5.svg","6.svg","7.svg","8.svg","9.svg","10.svg"];

function captchat(argument) {
  let g = Math.floor(Math.random() * 8);
  let done = []
  let capt = document.createElement('div');
  capt.classList.add("captchat_select")

  console.log(capt);

  for (var i = 0; i < 9; i++) {
    if (i!==g){
    let index = Math.floor(Math.random()*bb.length)
    console.log(index);
    console.log(bb);
    let img_path = bb[index];
    let img = document.createElement("img")
    img.src="assets/captchat/"+img_path
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
    img.name ="img_path"
    img.addEventListener("click",img_cliked)
    gg[index] = gg[gg.length -1];
    gg.pop()
    capt.appendChild(img);
    
  }

  document.body.appendChild(capt);
  }
}

function img_cliked(ev) {
  console.log(ev.target.name+"clicked");
}

captchat()