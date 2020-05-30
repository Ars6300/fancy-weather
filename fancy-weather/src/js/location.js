async function getLocation() {
  const url = 'https://ipinfo.io/json?token=cef9eb7dde3e9b';
  const result = {};
  try {
    const res = await fetch(url);
    if (!res.ok) { res.text().then((text) => { throw Error(text); }); }
    const data = await res.json();
    result.city = data.city;
    result.country = data.country;
    result.zip = data.postal;
  } catch (e) {
    return e.message;
  }
  return result;
}

export { getLocation as default };
