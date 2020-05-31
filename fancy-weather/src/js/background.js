const body = document.querySelector('body');

async function getImageLink(key, key2) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${key},${key2}&client_id=vyKjgY7bHJtFSPOP16hrd-crWoz5LT0bM4dperJ9Ti4`;
  let result;
  try {
    const res = await fetch(url);
    if (!res.ok) { res.text().then((text) => { throw Error(text); }); }
    const data = await res.json();
    result = data.urls.full;
  } catch (e) {
    return e.message;
  }
  return result;
}

function preloadImage(url, anImageLoadedCallback) {
  const img = new Image();
  img.onload = anImageLoadedCallback;
  img.src = url;
}

function setImage(key, key1) {
  getImageLink(key, key1).then((ans) => {
    if (!ans.includes('unsplash')) {
      alert(ans);
    } else {
      console.log(`Search for background image: ${key}, ${key1}`);
      body.style.transition = '2s ease-in-out';
      preloadImage(ans, () => {
        body.style.backgroundImage = `url(${ans})`;
      });
    }
  });
}

export { setImage as default };
