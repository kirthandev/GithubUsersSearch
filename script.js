const searchInput = document.querySelector("#search");
const mainBox = document.querySelector("#main");

const getUserDetails = async (userName) => {
  try {
    let response = await fetch(`https://api.github.com/users/${userName}`);
    if (response.ok) {
      let data = await response.json();
      createUserCard(data);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching data: " + error);
  }
};

const createUserCard = ({
  name,
  bio,
  avatar_url,
  followers,
  following,
  public_repos,
  twitter_username,
  location,
}) => {
  let cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.innerHTML = `
    <div class="rounded-circle w-25">
      <img src="${avatar_url}" class="card-img-top rounded-circle border border-info" alt="">
    </div>
    <div class="card-body">
      <div class="ml-3 mb-2 p-2">
        <h4 class="card-title">${name}</h4>
      </div>
      <div class="ml-3 mb-2 p-2">
        <p class="card-text">${bio}</p>
      </div>
      <div class="ml-3 p-2">
        <section class="mb-2">
          <p class="card-text d-inline">Followers: ${followers}</p>
          <p class="card-text d-inline ml-2 p-2">Following: ${following}</p>
          <p class="card-text d-inline ml-2 p-2">Repos: ${public_repos}</p>
        </section>
        <p class="card-text mb-2 d-inline">Twitter: ${twitter_username}</p>
        <p class="card-text d-inline ml-2 p-2">Location: ${location}</p>
      </div>
    </div>`;

  mainBox.innerHTML = ""; // Clear the main box
  mainBox.appendChild(cardContainer);
};

searchInput.addEventListener("input", (event) => {
  event.preventDefault();
  let userName = event.target.value.trim(); // Trim the input value
  if (userName.length > 0) {
    getUserDetails(userName);
  }
});
