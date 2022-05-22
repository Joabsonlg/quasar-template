export const goToSection = (sectionClass) => {
  const sectionElement = document.getElementsByClassName(sectionClass)[0]
  window.scrollTo({
    top: sectionElement.offsetTop,
    behavior: "smooth"
  });
};

export const goToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
};

export const manageScrollButton = () => {
  const scrollButton = document.querySelector('.scroll-button');
  if (window.scrollY < window.innerHeight / 2) scrollButton.classList.add('hidden')
  else scrollButton.classList.remove('hidden')
  window.onscroll = () => {
    if (window.scrollY < window.innerHeight / 2) scrollButton.classList.add('hidden')
    else scrollButton.classList.remove('hidden')
  }
};
