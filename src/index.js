document.addEventListener('DOMContentLoaded', function() {

  const yourUUID = "9226fe65-681a-449d-9c5b-bc8abfcc2ba2"
  const imageURL = `https://randopic.herokuapp.com/images/${yourUUID}`
  let imageId = 890
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageEl = document.getElementById("image")
  const imageName = document.getElementById("name")
  const likesSpan = document.getElementById("likes")
  const commentsUl = document.getElementById("comments")
  const likeButton = document.getElementById("like_button")
  const form = document.getElementById("comment_form")
  const input = document.getElementById("comment_input")


  fetch(imageURL)
  .then(response => response.json())
  .then((r) => {
    // console.log(r);
      imageEl.src = r.url
      imageName.innerText = r.name
      likesSpan.innerText = r.like_count
      likesSpan.dataset.likes = r.like_count
      let liEl = document.createElement("li")
      r.comments.forEach(fnForCreatingComment)


  })
  function fnForCreatingComment(el){
    let liEl = document.createElement("li")
    liEl.dataset.id = el.id
    liEl.dataset.imageId = el.image_id
    liEl.innerText = el.content
    commentsUl.append(liEl)
  }

  likeButton.addEventListener("click",(e) => {
        let count = parseInt(likesSpan.innerText)
        likesSpan.innerText = count + 1

        fetch(likeURL, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({image_id: imageId})
        })
        .then(response => response.json())
      })
  form.addEventListener("submit",(e) => {
    e.preventDefault()
    // console.log(input.value);
    let liEl = document.createElement("li")
    liEl.innerText = input.value
    commentsUl.append(liEl)

    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({image_id: imageId, content:input.value})
    })
    .then(response => response.json())
    input.value = ''
  })
})
