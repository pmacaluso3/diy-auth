
const ALL_PAGES=['home', 'signup', 'login', 'logout', 'profile']

function switchPage(targetPage) {
  for (let i = 0; i < ALL_PAGES.length, i++;) {
    document.querySelector(`#${ALL_PAGES[i]}`).classList.add('hidden')
  }

  document.querySelector(`#${targetPage}`).classList.remove('hidden')
}
