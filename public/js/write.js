let titleInput = document.getElementById('user-title-input');
let titleContainer = document.getElementById('created-title-container');
let userContent = document.getElementById('user-content');
let contentContainer = document.getElementById('user-content-container');
let submitBtn = document.getElementById('submit-btn');

async function postToServer() {
    console.log("listening");
    let title = titleInput.value;
    let content = userContent.value;

    if (title && content) {
        const response = await fetch(`/api/blogposts`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to create blog post.');
        }
    } else {
        alert('Missing a title and/or content.');
    };
}

submitBtn.addEventListener('click', postToServer);

















// let newArr = [];

// function makeTitle() {

//     let userTitle = titleInput.value;
//     localStorage.setItem("savedtitle", userTitle);

//     // Formats the user's title and clears any previous update; the server will need these instructions later on
    
//     // let userTitle = titleInput.value.toUpperCase();
//     // titleContainer.innerHTML = '';
    
//     // let createdTitle = document.createElement("h1");
//     // createdTitle.classList.add('ml-5', 'mt-5', 'display-4', 'custom-title');
//     // createdTitle.setAttribute('id', 'post-title');
//     // createdTitle.textContent = userTitle;
//     // titleContainer.appendChild(createdTitle);
// }

// function retrieveTitle() {
//     let savedTitle = localStorage.getItem("savedtitle");

//     if (savedTitle === null || savedTitle === undefined) {
//         titleInput.value = "";
//     } else {
//         titleInput.value = savedTitle;
//     }
// }

// retrieveTitle();

// function makeContent() {

//     let newContent = userContent.value;
//     localStorage.setItem("savedcontent", newContent);

//     // Grabs the user's blog post text and splits it based on line breaks (paragraphs)
//     // let newContent = userContent.value;
//     // newArr = newContent.split('\n')

//     // let filteredArr = newArr.filter(function (e) {
//     //     return e != "";
//     // });

//     // Clears any previously written text
//     // contentContainer.innerHTML = '';

//     // Creates a paragraph for each of the paragraphs the user wrote in the textarea box
//     // for (let i = 0; i < filteredArr.length; i++) {
//     //     let paragraphs = document.createElement('p');
//     //     paragraphs.classList.add('ml-5', 'mr-5', 'custom-post');
//     //     paragraphs.textContent = filteredArr[i];
//     //     contentContainer.appendChild(paragraphs);
//     // }

// }

// function retrieveContent() {
//     let savedContent = localStorage.getItem("savedcontent");
//     console.log(savedContent);

//     if (savedContent === null || savedContent === undefined) {
//         userContent.value = "";
//     } else {
//         userContent.value = savedContent;
//     }
// }

// retrieveContent();
