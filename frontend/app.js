const hyperlinks = document.querySelectorAll('.navbar ul li a');
const sections = document.querySelectorAll('section');

// on load default hash 'HOME'
window.addEventListener('load', () => {
  location.hash = 'HOME';
  updateUI('#HOME');
  
// to clean multiple console errors
setInterval(() => console.clear(), 1000);
});

// on load change hash
window.addEventListener('hashchange', () => {
  updateUI(location.hash);
});

// update ui on hash change
function updateUI(hash) {
  hyperlinks.forEach(a => a.style.textDecoration = 'none');

  setTimeout(() => {
    sections.forEach(section => section.style.position = 'fixed');

    document.querySelector(`${hash}`).style.position = 'relative';
  }, 100);


  let h = hash.replace('#', '.');
  // highlighting anchor tag in navbar
  document.querySelector(`.navbar ul li ${h}`).style.textDecoration = 'underline';
}

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