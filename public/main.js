const btn = document.querySelector('.lookup');
const inp = document.querySelector('#nameInput');
btn.addEventListener('click', performLookup);

async function performLookup(e) {
  e.preventDefault();
  const name = inp.value;
  try {
    const res = await fetch(`/api?name=${name}`);
    const data = await res.json();
    if ('age' in data) {
      document.querySelector('.age').innerText = data.age;
      document.querySelector('.name').innerText = data.fullName;
      document.querySelector('.nationality').innerText = data.nationality;
      document.querySelector('.food').innerText = data.favouriteFood;
      document.querySelector('.error').classList.add('hidden');
      document.querySelector('.details').classList.remove('hidden');
    } else {
      const knownPeople = data.names;
      document.querySelector('.names').innerText = `Try ${knownPeople}`;
      document.querySelector('.details').classList.add('hidden');
      document.querySelector('.error').classList.remove('hidden');
    }
  } catch (err) {
    console.log(data);
    document.querySelector('.details').classList.add('hidden');
    document.querySelector('.error').classList.remove('hidden');
  }
}
