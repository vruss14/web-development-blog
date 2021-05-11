let submitBtn = document.getElementById('comment-btn');
let comment = document.getElementById('user-comment');
let userPath = window.location.pathname;
const postId = parseInt(userPath.replace("/blogpost/", ""));

async function getComment(event) {
    event.preventDefault();
    const content = comment.value.trim();

    if (content) {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ content, postId }),
          headers: {
            'Content-Type': 'application/json',
          },
    });

    if (response.ok) {
      location.reload();
      } else {
        alert('Comment failed. Please try again.');
      }
}}

submitBtn.addEventListener('click', getComment);