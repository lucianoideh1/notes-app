const addBox =  document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector(".closeIcon"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");


const months = ["January","February","March","April","June","July","August","September","October","NovemberRain","December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]")

let isUpdate = false, updateId;


addBox.addEventListener("click",()=>{
    titleTag.focus();
    popupBox.classList.add("show");
})

closeIcon.addEventListener("click",()=>{
    isUpdate = false ;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
})

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index)=>{
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
                    <iconify-icon icon="akar-icons:settings-horizontal" onClick="showMenu(this)"></iconify-icon>
                    <ul class="menu">
                        <li onClick="updateNote(${index}, '${note.title}','${note.description}')"><iconify-icon icon="bi:pen"></iconify-icon>Edit</li>
                        <li onClick="deleteNote(${index})"><iconify-icon icon="bi:trash-fill" ></iconify-icon>Delete</li>
                    </ul>
                </div>
            </div>
        </li> 
        `;
        addBox.insertAdjacentHTML("afterend",liTag)
    })
}

showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "ICONIFY-ICON" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    })
}

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId,title,desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update note";
    popupTitle.innerText = "Update a Note";
    console.log( noteId,title,desc)
}


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
 
        if (!isUpdate){
            notes.push(noteInfo);

        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
})