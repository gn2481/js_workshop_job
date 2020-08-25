const form = document.forms[0]
const template = document.querySelector('template')
const temJob = template.content.querySelector('.job') 
const temCompany = template.content.querySelector('.company')
const temFullTime = template.content.querySelector('.fulltime')
const temLocation = template.content.querySelector('.location')
const jobPannel = document.getElementById('job-pannel')
form.addEventListener('submit', () => {
  event.preventDefault()
  jobPannel.innerHTML = " "

  let desc = form.description.value
  let location = form.location.value
 
  if(form.full_time.checked){
    var fullTime = "on"
  }
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

    let data = response.data
    console.log(data)
    data.forEach(obj => {
      let link = data.url
      temJob.setAttribute('href', `${link}`)
      temJob.textContent = obj.title
      temCompany.textContent = obj.company
      temFullTime.textContent = obj.type
      temLocation.textContent = obj.location
      const clone = document.importNode(template.content, true);
      jobPannel.prepend(clone)
    })
    
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  }); 

})



 