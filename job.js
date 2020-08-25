const form = document.forms[0]
const template = document.querySelector('template')
const temJob = template.content.querySelector('.job')
const temCompany = template.content.querySelector('.company')
const temFullTime = template.content.querySelector('.fulltime')
const temLocation = template.content.querySelector('.location')
const jobPannel = document.getElementById('job-pannel')
const nextBtn = document.querySelector('.pagination-next')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  jobPannel.innerHTML = " "

  var desc = form.description.value
  var location = form.location.value

  if (form.full_time.checked) {
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
      console.log(data.length)
      if (data.length === 50) {
        nextBtn.removeAttribute('disabled')
      }

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
    })

  let i = 2
  nextBtn.addEventListener('click', () => {
    axios.get('https://still-spire-37210.herokuapp.com/positions.json', {
      params: {
        description: desc,
        location: location,
        full_time: fullTime,
        page: i,
      }
    })
      .then(function (response) {
        let data = response.data
        console.log(data.length)
        if (data.length === 50) {
          nextBtn.removeAttribute('disabled')
        }

        data.forEach(obj => {
          let link = data.url
          temJob.setAttribute('href', `${link}`)
          temJob.textContent = obj.title
          temCompany.textContent = obj.company
          temFullTime.textContent = obj.type
          temLocation.textContent = obj.location
          const clone = document.importNode(template.content, true);
          jobPannel.append(clone)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      i++
      nextBtn.setAttribute('disabled','true')
    })
  })