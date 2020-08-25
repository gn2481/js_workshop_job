const form = document.forms[0]
form.addEventListener('submit', (e) => {
  let desc = form.description.value
  let location = form.location.value
  let fullTime = form.full_time.value
  e.preventDefault()
  // fetch 寫法
  // fetch('https://still-spire-37210.herokuapp.com/positions.json')
  //     .then(request => {console.log(request.json())})
  // debugger
  // console.log(e)
  
  // axios 寫法
  axios.get('https://still-spire-37210.herokuapp.com/positions.json', {
    params: {
      description: desc,
      location: location,
      full_time: fullTime,
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  }); 

})



 