const hyperlinks = document.querySelectorAll('.navbar ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('load', () => {
  location.hash = 'HOME';
  updateUI('#HOME');
});

window.addEventListener('hashchange', () => {
  updateUI(location.hash);
});

function updateUI(hash) {
  /*sections.forEach(section => section.style.position = 'relative');*/
  hyperlinks.forEach(a => a.style.textDecoration = 'none');

  let h = hash.replace('#', '.');
  // highlighting anchor tag in navbar
  document.querySelector(`.navbar ul li ${h}`).style.textDecoration = 'underline';
}