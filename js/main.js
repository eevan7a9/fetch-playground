document.querySelector("#header").innerHTML = "Fetch Text, JSON, API";
// declare variables
const getTxt = document.querySelector("#btnGetTxt");
const getJson = document.querySelector("#btnGetJson");
const getApi = document.querySelector("#btnGetApi");
const btnReset = document.querySelector("#btnReset");

const textField = document.querySelector("#textField");

function init() {
  getTxt.addEventListener("click", showText);
  getJson.addEventListener("click", showJson);
  getApi.addEventListener("click", showApi);
  btnReset.addEventListener("click", resetAll);
  btnSubmit.addEventListener("click", addPost);
  textField.value = ""; /** empty the value */
}

const showText = () => {
  fetch("sample.txt")
    .then(res => res.text())
    // .then((data) => console.log(data));
    .then(data => {
      textField.value = data;
    })
    .catch(err => console.log(err));
  document.querySelector("#targetDiv").innerHTML = "";
};

const showJson = () => {
  document.querySelector("#header").innerHTML = "Avengers Hero";
  fetch("avengers.json")
    .then(res => res.json())
    .then(data => {
      let listsHero =
        ""; /** this will hold the data before we show to the DOM */
      let avengers = data;
      avengers.forEach(avenger => {
        listsHero += `
            <ul class=""list-group">
                <li class="list-group-item">ID :${avenger.id}</li>
                <li class="list-group-item">NAME :${avenger.name}</li>
                <li class="list-group-item">NICKNAME :${avenger.nickname}</li>
                <li class="list-group-item">AGE :${avenger.age}</li>
            </ul> 
           `;
      });
      document.querySelector("#targetDiv").innerHTML = listsHero;
    })
    .catch(err => console.log(err));
};

const showApi = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
      let listsPosts = "";
      let posts = data;
      posts.forEach(post => {
        listsPosts += `
                <div class="card mt-2 mb-2">
                    <div class="card-body">
                        <small>ID :${post.id}</small>
                        <h5>${post.title}</h5>
                        <p>${post.body}</p>
                    </div>
                </div> 
            `;
      });
      document.querySelector("#targetDiv").innerHTML = listsPosts;
    });
};

const addPost = event => {
  event.preventDefault();

  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      Accept: "Application/json, text/SecurityPolicyViolationEvent. */*",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  })
    .then(res => res.json())
    .then(data => console.log(data));
};

const resetAll = () => {
  textField.value = "";
  document.querySelector("#targetDiv").innerHTML = "";
  document.querySelector("#title").value = "";
  document.querySelector("#body").value = "";
};
init();
