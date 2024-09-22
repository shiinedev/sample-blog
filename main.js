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
   
    attachHandleEvents(li,post);
 }
 
 //attach handle Events 

 const attachHandleEvents = (li,post) =>{
    const deleteBtn = li.querySelector(".delete-btn");
    const editBtn = li.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", () =>{
        handleDelete(post.id, li);
        
    })
    
    editBtn.addEventListener("click", () =>{
        handleEdit(post.id,li);
    })
 }

//handle Edit
const handleEdit = (id, li) =>{
   const postTitle = li.querySelector(".post-title");
   const postImg = li.querySelector("img");
   const postDesc = li.querySelector(".desc");
    const newTitle = prompt("Update  title",postTitle.textContent);
    const newImgUrl = prompt("update Img Url",postImg.src);
    const newDesc = prompt("update description",postDesc.textContent);

    postTitle.textContent = newTitle;
    postImg.setAttribute('src',newImgUrl);
    postDesc.textContent = newDesc;

    updatePosts(id,newTitle,newImgUrl,newDesc);
}
//update Post 

const updatePosts = (id,newTitle,newImgUrl,newDesc) =>{
    const posts = getPostFromDom();
    const post = posts.find(post => post.id == id);
    if(post !== null && post.trim !== ""){
        post.title = newTitle;
        post.img = newImgUrl;
        post.desc = newDesc;
        localStorage.setItem("posts", JSON.stringify(posts));
    }
    
    
}

 //handle Delete 

 const handleDelete = (id,li) =>{
    let posts = getPostFromDom();
    posts = posts.filter(post => post.id != id);

    localStorage.setItem("posts", JSON.stringify(posts));
    li.remove();
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