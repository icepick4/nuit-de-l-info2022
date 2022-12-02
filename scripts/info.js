const path = "/data/mst.json"
const template =  document.querySelector('#info_t');
const main = document.querySelector('.main');
const btn_back = document.querySelector('#back');
const loading = document.querySelector("#loading")
btn_back.addEventListener("click",function() {
	document.location.href="/"
})

function load() {
	fetch(path)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {

       show(json['data'])
   })
   /*.catch(function () {
       console.log("error");
   })*/
}


function show(data) {
	console.log(data);
	data.forEach(el => {
		let tmp = template.content.cloneNode(true);
		tmp.querySelector("#name").innerHTML= el["name"]
		tmp.querySelector("#description").innerHTML= el["description"]
		tmp.querySelector("#transmissions").innerHTML= el["transmissions"]
		tmp.querySelector("#symptoms").innerHTML= el["symptoms"]
		tmp.querySelector("#detection").innerHTML= el["detection"]
		tmp.querySelector("#treatment").innerHTML= el["treatment"]
		main.appendChild(tmp)

	});

	main.removeChild(loading)
	
}

load()


