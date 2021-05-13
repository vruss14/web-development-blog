let titleInput = document.getElementById('user-title-input');
let userContent = document.getElementById('user-content');
let submitBtn = document.getElementById('submit-updates');
let userPath = window.location.pathname;
const postId = parseInt(userPath.replace("/api/blogposts/edit/", ""));

async function postToServer() {
    let title = titleInput.value;
    let content = userContent.value;

    if (title && content && postId) {
        const response = await fetch(`/api/blogposts/edit/:id`, {
          method: 'PUT',
          body: JSON.stringify({ title, content, postId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to update blog post.');
        }
    } else {
        alert('Missing a title and/or content.');
    };
}

submitBtn.addEventListener('click', postToServer);