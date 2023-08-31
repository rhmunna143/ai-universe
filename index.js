const allCards = async (showMore = false) => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/ai/tools");
        const data = await response.json();

        let allTools = data?.data?.tools; 

        let flag = false;
        if (!showMore) {
            allTools = allTools.slice(0, 6);
            flag = true;
        } else {
            allTools = allTools;
            flag = false;
        }

        const showMoreSection = document.getElementById("show-more-section");
        if(flag) {
            showMoreSection.classList.remove("hidden")
        } else{
            showMoreSection.classList.add("hidden")
        }
        

        const cardsContainer = document.getElementById("cards-section");
        cardsContainer.textContent = '';

        allTools.forEach(element => {
            const id = element.id;
            const strId = String(id);
            const div = document.createElement('div');
            
            div.className = "card bg-base-100 rounded-md border border-slate-200 p-5 my-2"; // Setting the class names

            const description = element?.description ? element?.description : 'Description unavailable';

            div.innerHTML = `
                <figure class="rounded-md"><img class="rounded-md" src="${element?.image}" alt="${element?.name}" /></figure>
                <div class="card-body">
                    <p>
                        <!-- Description -->
                        ${description.slice(0, 50)}
                        
                        <h2 class="text-xl font-semibold">Features</h2>
                        <ol id="features">
                            ${element?.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ol>
                    </p>
        
                    <hr>
                    <div class="flex justify-between mt-4">
                        <div>
                            <h2 class="text-xl font-semibold mb-2">${element.name}</h2>
                            <div class="flex gap-2 items-center">
                                <i class="fa-regular fa-calendar-days"></i>
                                <p>${element.published_in}</p>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-circle" onclick="my_modal_3.showModal(); singleCardModal('${strId}');">
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>`;

            cardsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

allCards();

const singleCardModal = async(singleId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${singleId}`);
    const data = await response.json();

    console.log(data.data);

}

const showMore = () => {
    allCards(true);
}