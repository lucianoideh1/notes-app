const addBox =  document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector(".closeIcon"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");


const months = ["January","February","March","April","June","July","August","September","October","NovemberRain","December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]")

addBox.addEventListener("click",()=>{
    popupBox.classList.add("show");
})

closeIcon.addEventListener("click",()=>{
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
})

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note)=>{
        let liTag =
         
        `
        <li class="note">
            <div class="details">
            <p>${note.title}</p>  
            <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <iconify-icon icon="akar-icons:settings-horizontal"></iconify-icon>
                    <ul class="menu">
                        <li><iconify-icon icon="bi:pen"></iconify-icon>Edit</li>
                        <li><iconify-icon icon="bi:trash-fill"></iconify-icon>Delete</li>
                    </ul>
                </div>
            </div>
        </li> 
        `;
        addBox.insertAdjacentHTML("afterend",liTag)
    })
}

showNotes();


addBtn.addEventListener("click", e =>{
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    
    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()-1],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();


        let noteInfo = {
            title: noteTitle,description: noteDesc,
            date:`${month} ${day}, ${year}`
        }

        
        notes.push(noteInfo);

        
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
})