
const rotators = document.querySelectorAll('.rotator');

rotators.forEach((rotator) => {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  if (cases.length === 0) {
    return;
  }

  let currentIndex = cases.findIndex(
    (el) => el.classList.contains('rotator__case_active')
  );
  if (currentIndex === -1) {
    currentIndex = 0;
    cases[0].classList.add('rotator__case_active');
  }

  const first = cases[currentIndex];
  if (first.dataset.color) {
    first.style.color = first.dataset.color;
  }

  function showNext() {
    const current = cases[currentIndex];
    current.classList.remove('rotator__case_active');

    currentIndex = (currentIndex + 1) % cases.length;
    const next = cases[currentIndex];

    next.classList.add('rotator__case_active');
    const color = next.dataset.color;
    if (color) {
      next.style.color = color;
    }

    const delay = Number(next.dataset.speed) || 1000;
    setTimeout(showNext, delay);
  }

  const startDelay = Number(first.dataset.speed) || 1000;
  setTimeout(showNext, startDelay);
});
