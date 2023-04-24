const hyperlinks = document.querySelectorAll('.navbar ul li a');
const sections = document.querySelectorAll('section');

// on load default hash 'HOME'
window.addEventListener('load', () => {
  location.hash = 'HOME';
  updateUI('#HOME');
  // to clean multiple console errors from map api
  setInterval(() => console.clear(), 1000);
});

// on load change hash
window.addEventListener('hashchange', () => {
  updateUI(location.hash);
});

// update ui on hash change
function updateUI(hash) {
  hyperlinks.forEach(a => a.style.textDecoration = 'none');

  let h = hash.replace('#', '.');
  // highlighting anchor tag in navbar
  document.querySelector(`.navbar ul li ${h}`).style.textDecoration = 'underline';
  document.querySelectorAll('section').forEach(s => { s.classList.remove('active') });
  document.querySelector(`${hash}`).classList.add('active');
}

// Help PopUp Section
const overlayer = document.querySelector('.overlayer');
const helpPopUpAdd = document.querySelector('.help-btn');
const helpPopUpRemove = document.querySelector('.help-popUp-btn');

// Adding Help PopUp
helpPopUpAdd.addEventListener('click', () => overlayer.classList.add('help-popUp-add'));
// Removing Help PopUp
helpPopUpRemove.addEventListener('click', () => overlayer.classList.remove('help-popUp-add'));

//Feedback form
const feedbackBtn = document.querySelector('#feedback-btn');
const email = document.querySelector('#email');
const feedback = document.querySelector('#feedback');

feedbackBtn.addEventListener('click', () => {
  if (feedback.value) {
    location.href = `mailto:riteshgharat05+findmeawater@gmail.com?subject=find-me-a-water Feedback&body=${feedback.value}`;
    feedback.value = '';
    email.value = '';
    setTimeout(() => alert('Thank you for your valuable feedback ❤️'), 1500);
  }
});