const path = "/data/mst.json"

function load() {
	fetch(path)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {

       show(json)
   })
   .catch(function () {
       console.log("error");
   })
}


function show(data) {
	console.log(data);
}

load()


