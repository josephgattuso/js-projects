const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// getUser('josephgattuso');

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);

    createUserCard(data);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard('No profile with this username');
    }
  }
}

function createUserCard(user) {
  const cardHTML = `
  <div class="card">
  <div>
    <img
      src="${user.avatar_url}"
      alt="${user.name}"
      class="avatar"
    />
  </div>
  <div class="user-info">
    <h2>${user.name}</h2>
    <p>
      ${user.bio}
    </p>

    <ul>
      <li><strong>${user.followers}</strong> Followers</li>
      <li><strong>${user.following}</strong> Following </li>
      <li><strong>${user.public_repos}</strong> Repos</li>
    </ul>

    <div id="repos">
      <a href="#!" class="repo">Repo 1</a>
      <a href="#!" class="repo">Repo 2</a>
      <a href="#!" class="repo">Repo 3</a>
    </div>
  </div>
</div>
  `;

  main.innerHTML = cardHTML;
}

function createErrorCard(message) {
  const cardHTML = `
    <div class="card">
      <h1>${message}</h1>
    </div>
  `;

  main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
