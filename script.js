let searchbtn = document.querySelector(".search")
let usernameinp = document.querySelector(".usernameinp")
let card = document.querySelector(".card")

function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error("User not found");  // .ok ek property hai jo batati hai ki value true hai toh yeh username exist karta h when the request is successful yani ki if user exists to true nahi toh false , and if the request is false that means the user doesn't exist 
        else return raw.json();
    })
}

function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
        if (!raw.ok) throw new Error("Failed to fetch repos...");
        else return raw.json();
    }) 
    // unki sorting kar dena woh repos ki jo updated hai ?sort=updated ki help se  
}

function decorateProfileData(details) {
    console.log(details);

    let data = `<div class="flex items-start space-x-6">
                
                <img src="${details.avatar_url}" alt="User Avatar"
                    class="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 object-cover" />

                <div class="flex-1">
                    <h2 class="text-2xl font-semibold">${details.name}<span
                            class="text-sm text-gray-500 dark:text-gray-400">@${details.login}</span></h2>
                    <p class="text-gray-600 dark:text-gray-300 mt-1 text-sm"> ${details.bio ? details.bio : "Sorry there is no bio..."}</p>

                    <div class="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <p><strong>Company:</strong>${details.company ? details.company : "N/A"}</p>
                        <p><strong>Location:</strong>  ${details.location}</p>
                        <p><strong>Blog:</strong> <a href="#" class="text-blue-600 hover:underline"
                                target="_blank">${details.blog}</a></p>
                    </div>

                    <div class="mt-4 flex flex-wrap text-sm text-gray-800 dark:text-gray-200 gap-4">
                        <span>🔢 <strong>${details.public_repos}</strong> Repos </span>
                        <span>👥 <strong>${details.followers}</strong>  Followers</span>
                        <span>🤝 <strong> ${details.following} </strong> Following</span>
                    </div>
                </div>
            </div>
                `;
    card.innerHTML = data;
}

searchbtn.addEventListener("click", function () {
    let username = usernameinp.value.trim();
    if (username.length > 0) {
        getProfileData(username).then((data) => {
            decorateProfileData(data)
        })
    }
    else {
        alert();
    }
})
