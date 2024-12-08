function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(commentText);
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments();
        commentInput.value = '';
    } else {
        alert('Будь ласка, введіть коментар.');
    }
}

function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
        commentItem.textContent = comment;
        commentsList.appendChild(commentItem);
    });
}

window.onload = function() {
    displayComments();
};

function deleteComment(button) {
    const commentItem = button.parentElement;
    const commentText = commentItem.querySelector("span").innerText;

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments = comments.filter((comment) => comment !== commentText);
    localStorage.setItem("comments", JSON.stringify(comments));
    commentItem.remove();
}

function deleteAllComments() {
    if (confirm("Ви впевнені, що хочете видалити всі коментарі?")) {
        localStorage.removeItem("comments");
        document.getElementById("comments-list").innerHTML = "";
    }
}
