//exercise 37
 const form = document.querySelector("#form");
 const title = document.querySelector("#title");
 const ImgUrl = document.querySelector("#post-img");
 const desc = document.querySelector("#post-desc");
 const postList = document.querySelector("#all-posts");

// loade post from the Dom

const loadPostFromDom = () =>{
    const posts = getPostFromDom();
    posts.forEach(post => {
        addPostToDom(post)
        
    });
}
document.addEventListener("DOMContentLoaded", loadPostFromDom)
form.addEventListener("submit",addPost);

 function addPost(e){

    e.preventDefault();

    const postTitle =  title.value.trim();
    const postImg = ImgUrl.value.trim();
    const postDesc = desc.value.trim();

    if(postTitle !== "" && postImg !== "" && postDesc !== ""){

        const post = {
            id: Date.now(),
            title : postTitle,
            img : postImg,
            desc : postDesc
        }

        addPostToDom(post);
        savePostToDom(post)
        title.value = "";
        ImgUrl.value = "";
        desc.value = "";
        
    }else{
        return
    }
 }

 //add Post To DOM

 const addPostToDom = (post) =>{
    const li = document.createElement("li");
    li.className = "post-item";

    li.innerHTML = `
        <span class="post-title">${post.title}</span>
          <img
            src="${post.img}"
            alt="img-post"
            id="img"
          />
          <p class="desc">${post.desc}</p>
          <div>
           <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          </div>
         
          `
    
    postList.appendChild(li);
   
    
 }
 
 //save post to the Dom
 const savePostToDom = (post) =>{
    const posts = getPostFromDom();
    posts.push(post)
    localStorage.setItem("posts" , JSON.stringify(posts));

 }
 
 //get Post From the Dom

 const getPostFromDom = () =>{
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    return posts;
 }
