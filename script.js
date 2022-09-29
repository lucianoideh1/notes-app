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
    popupBox.classList.remove("show");
})

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
    }
})