const PREFERRED_COLOR = '--color-mode';

function getCurrentMode() {
  const currentMode = localStorage.getItem('current-mode');
  return currentMode;
}

function setCurrentMode(mode) {
  localStorage.setItem('current-mode', mode);
}

const applyDarkMode = function (currentMode) {
  document.documentElement.setAttribute('data-user-color-scheme', currentMode);
  setCurrentMode(currentMode);
};

function getPreferedColor() {
  let response = getComputedStyle(document.documentElement).getPropertyValue(PREFERRED_COLOR);

  if (response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }
  return response;
}

export const toggleDarkmode = function () {
  let currentMode = getCurrentMode();

  if (!currentMode) {
    currentMode = getPreferedColor();
    setCurrentMode(currentMode);
  }

  if (currentMode === 'light') {
    applyDarkMode('dark');
  } else {
    applyDarkMode('light');
  }
};
