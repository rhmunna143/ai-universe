const allCards = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/ai/tools");
        const data = await response.json();

        const allTools = data?.data?.tools;

        console.log(allTools);

        const cardsContainer = document.getElementById("cards-section");

        allTools.forEach(element => {
            const div = document.createElement('div');
            
            div.className = "card w-96 bg-base-100 rounded-md border border-slate-200 p-5"; // Setting the class names

            const description = element?.description ? element?.description : 'Description unavailable';

            div.innerHTML = `
                <figure class="rounded-md"><img class="rounded-md" src="${element?.image}" alt="${element?.name}" /></figure>
                <div class="card-body">
                    <h2 class="card-title">
                        ${element?.name}
                    </h2>
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
                            <h2 class="text-xl font-semibold">${element.name}</h2>
                            <div class="flex gap-2 items-center">
                                <i class="fa-regular fa-calendar-days"></i>
                                <p>${element.published_in}</p>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-circle">
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