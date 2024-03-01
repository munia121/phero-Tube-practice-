const btnContainer = document.getElementById('btn-container')
const cardContainer = document.getElementById('card-container')
const errorContent = document.getElementById('error-content')



const loadData =async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json()
    const data = allData.data
    displayShowing(data)
}

const displayShowing = (data,) =>{
    data.forEach(btn => {
        const newBtn = document.createElement('button')
        newBtn.innerText = btn.category
        newBtn.className ='category-btn btn'
        newBtn.addEventListener('click', () =>{
            const categoryBtn = document.querySelectorAll('.category-btn')
            
            for(let allBtn of categoryBtn){
                allBtn.classList.remove('bg-red-500')
            }
            newBtn.classList.add('bg-red-500')


            const categoryId = btn.category_id;
            // console.log(categoryId)
            const cardInfo =async (cardId) =>{
                const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${cardId}`)
                const data = await res.json();
                const cards = data.data;

                cardContainer.innerHTML = '';
                
                for(const card of cards){
                    // **********************************
                    if(card.length === 0){
                        errorContent.classList.remove('hidden')
                        console.log(card)
                    }
                    else{
                        errorContent.classList.add('hidden')
                    }
                    // *************************************

                    let verifyImage = '';
                    if(card.authors[0].verified){
                        verifyImage = ` <img class="w-10" src="image/verify.jpeg" alt="">`
                    }


                    const div = document.createElement('div');
                    div.className = 'card w-96 bg-base-100 shadow-xl'
                    div.innerHTML = `
                    <figure><img class='h-[200px]' src="${card.thumbnail}" alt="Shoes" /></figure>
                    <div class="flex gap-4 p-4">
                        <img class="w-12 h-12 rounded-full" src="${card.authors[0].profile_picture}" alt="">
                        <div class="">
                            <h2 class="card-title">${card.title}</h2>
                            <div class='flex gap-5'>
                                <p>${card.authors[0].profile_name}</p>
                                ${verifyImage}
                            </div>
                            <p>${card.others.views
                            }</p>
                          </div>
                    </div>
                    `;
                    cardContainer.appendChild(div)
                }
                console.log(cards)
            } 
            cardInfo(categoryId)

        })
        btnContainer.appendChild(newBtn)
        // console.log(newBtn)
        
    });
    console.log(data)
    
}

loadData('1000')


const blogBtn = () =>{
    const arrowIcon = document.getElementById('arrow-icon')
    arrowIcon.classList.remove('hidden')
    const blogSection = document.getElementById('blog-section');
    blogSection.classList.remove('hidden')

    const main = document.getElementById('main');
    main.classList.add('hidden')

}
const arrow = () =>{
    const blogSection = document.getElementById('blog-section');
    blogSection.classList.add('hidden')

    const main = document.getElementById('main');
    main.classList.remove('hidden')
}
