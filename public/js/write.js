let titleInput = document.getElementById('user-title-input');
let userContent = document.getElementById('user-content');
let submitBtn = document.getElementById('submit-btn');

async function postToServer() {
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
