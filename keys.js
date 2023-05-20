fetch("/keys.json")
   .then(response => response.text())
   .then((response) => {
       console.log(response)
   })
   .catch(err => console.log(err))