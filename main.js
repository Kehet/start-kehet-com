import './style.css'

function getTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `[${hours}:${minutes}:${seconds}]`;
}

window.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll('.time');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.textContent = getTime();
  }

  const updatingTime = elements[elements.length - 1];
  setInterval(() => {
    updatingTime.textContent = getTime();
  }, 250);
}, false);

