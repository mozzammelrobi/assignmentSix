const loadDataAllPost = async (category = 'comedy') => {
    loadingSpenner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    const data = await res.json()
    const posts = data.posts

    displayAllPost(posts)
}

const displayAllPost = (posts) => {

    const allPostContainer = document.getElementById('all-posts-container')
    allPostContainer.textContent = ''
    posts.forEach((post) => {
        
        const postCard = document.createElement('div')
        postCard.classList = 'card-body bg-[#F3F3F5]';

        postCard.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-3">
        <!-- img profile -->
        <div class="relative">
            <i class="absolute left-14 fa-solid fa-circle ${post.isActive ? 'text-green-400' : 'text-red-500'} "></i>
            <img class="w-16 rounded-lg"src="${post.image}" alt="">
        </div>

        <!--information part  -->
        <div class="informaiton">
            <div class="flex gap-3 mb-4">
                <div>
                    <p> # <span>${post.category}</span></p>
                </div>
                <div>
                    <p>Author: <span>${post.author.name}</span></p>
                </div>
            </div>
            <div class="mb-4">
                <h1 class="font-bold mb-4">10 kids Unawared fo Their Halloween Customar
                </h1>
                <p>${post.description}</p>

            </div>
            <hr>
            <div class="icons flex  justify-between mt-4">
                <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-message"></i>
                    <p>${post.comment_count}</p>
                </div>
                <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-eye"></i>
                    <p>${post.view_count}</p>
                </div>
                <div class="flex gap-2 items-center">
                    <i class="fa-regular fa-clock"></i>
                    <p> <span>${post.posted_time}</span> min</p>
                </div>
                <div class="flex gap-2 items-center  text-green-500">
                    <button onclick="readMark('${post.title}','${post.view_count}')" calss="btn"> <i class="fa-solid fa-check-double"></i></button>
                </div>
                
            </div>
        </div>
    </div>
        `;
        allPostContainer.appendChild(postCard)
    })
    loadingSpenner(false)

}

const loadLatestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const data = await res.json();
    // console.log(data)

    const latestPostContainer = document.getElementById('latest-post-container')
    data.forEach((post) => {
        // console.log(post)
        const postLatestCard = document.createElement('div')
        postLatestCard.classList = ''

        postLatestCard.innerHTML = `
            
            <div class="card  bg-base-100 shadow-xl">
                <div class="card-body">
                    <img class="rounded-lg" src="${post.cover_image}" alt="Shoes" />
                  <div class="flex gap-4 items-center">
                  <i class="fa-regular fa-calendar"></i>
                 <p>${post.author?.posted_date ? post.author?.posted_date : 'No Publish Date'}</p>
               </div>

              <div class="mb-5">
                 <p class="font-bold mb-3">${post.title}</p>
                 <p>${post.description}</p>

              </div>
              <div class="card-actions">
                <div>
                    <img class="w-11 rounded-full"
                        src="${post.profile_image}" alt="">
                </div>
                <div class="">
                    <h1 class="font-extrabold">${post.author.name}</h1>
                    <p class="text-gray-300">${post.author.designation ? post.author.designation : 'unknown'}</p>
                </div>
            </div>
        </div>
    </div>

        `;
        latestPostContainer.appendChild(postLatestCard)
    })
}


const markAsReadContainer = document.getElementById('mark-as-read-container')
let count = 0;
const readMark = (title, view) => {
    count++

    const clickCount = document.getElementById('click-count')
    clickCount.innerText = count

    const markAsReadCard = document.createElement('div')
    markAsReadCard.classList = 'flex gap-3 justify-between items-center mb-2 bg-white p-2'
    markAsReadCard.innerHTML = `
         <div>
            <p>${title}</p>
         </div> 
         <div>
             <p><i class="fa-regular fa-eye"></i>  <span>${view}</span></p>
         </div>
    `;
    markAsReadContainer.appendChild(markAsReadCard)
}


const loadingSpenner = (isLoading) => {
    const loadding = document.getElementById('hoading-apeanner')
    if (isLoading) {
        loadding.classList.remove('hidden')

    } else {
        loadding.classList.add('hidden')
    }
}

const categoryCheckBySearch = () => {
    const searchCategory = document.getElementById('search-category').value
    loadDataAllPost(searchCategory)
}



loadLatestPost()
loadDataAllPost()