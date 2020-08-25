const form = document.forms[0]
const template = document.querySelector('template')
const temJob = template.content.querySelector('.job')
const temCompany = template.content.querySelector('.company')
const temFullTime = template.content.querySelector('.fulltime')
const temLocation = template.content.querySelector('.location')
const jobPannel = document.getElementById('job-pannel')
const nextBtn = document.querySelector('.pagination-next')
let page = 1; //直接設全域變數，這樣大家都拿得到
// axios 寫法
function axiosGet(form) {  //function傳入值不會再傳出，盡量是常數，不要改變
  var desc = form.description.value
  var location = form.location.value
  if (form.full_time.checked) {
    var fullTime = "on"
  }
  console.log(fullTime)
  axios.get('https://still-spire-37210.herokuapp.com/positions.json', {
    params: {
      description: desc,
      location: location,
      full_time: fullTime,
      page: page,
    }
  })
    .then(function (response) {
      console.log(response)
      page++;
      let data = response.data
      console.log(data)
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
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  page = 1;
  jobPannel.innerHTML = " "
  axiosGet(document.forms[0])

  // fetch 寫法
  // fetch('https://still-spire-37210.herokuapp.com/positions.json')
  //     .then(request => {console.log(request.json())})
  // console.log(e)
})

nextBtn.addEventListener('click', () => {
  if (nextBtn.hasAttribute('disabled')) {
    return
  } else {
    axiosGet(document.forms[0])
    nextBtn.setAttribute('disabled', 'true')
  }
})