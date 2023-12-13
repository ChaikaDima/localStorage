const wrapper = document.querySelector('.wrapper')
const input = document.querySelector('input')
const btn = document.querySelector('button')
const savedMessage = document.querySelector('.saved_message')
const chat = document.querySelector('.chat_dialog')

const resetBtn = document.querySelector('.btn')

window.onload = () => {
  const arrLoad = JSON.parse(localStorage.getItem('message'))
  if (arrLoad) {
    arrLoad.forEach(({ text, date }) => {
      const div = document.createElement('div')
      div.innerHTML = `<i class="date">${date}</i> ${text}`
      div.className = 'saved_message'
      chat.append(div)
      chat.scrollTo(0, 100000)
    })
  }
}

const sendMessage = (event) => {
  chat.scrollTo(0, 1000000)
  if (!input.value) {
    return
  }
  event.preventDefault()
  const date = new Date()

  const fullDate = `${date.getFullYear()} ${date.getUTCMonth()} ${date.getUTCHours()}:${date.getUTCMinutes()}`
  const lastMessage = { text: input.value, date: fullDate }

  if (!localStorage.getItem('message')) {
    const arr = []
    arr.push(lastMessage)
    const updateArr = JSON.stringify(arr)
    localStorage.setItem('message', `${updateArr}`)
    const div = document.createElement('div')
    div.innerHTML = `<i class="date" >${lastMessage.date}</i> ${lastMessage.text} `
    chat.append(div)
    div.className = 'saved_message'
    chat.append(div)

    input.value = ''
    return
  }

  const updateArr = JSON.parse(localStorage.getItem('message'))
  updateArr.push(lastMessage)
  localStorage.setItem('message', `${JSON.stringify(updateArr)}`)
  input.value = ''
  const div = document.createElement('div')
  div.className = 'saved_message'
  div.innerHTML = `<i class="date" >${lastMessage.date}</i> ${lastMessage.text} `
  chat.append(div)
}

btn.addEventListener('click', sendMessage)
resetBtn.addEventListener('click', function () {
  localStorage.clear('message')
  location.reload()
})
