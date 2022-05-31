
const container = document.querySelector('.notes-container');
const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.add');

const notes = JSON.parse(localStorage.getItem('notes'));     // gets the key values from the key called 'notes'

if (notes) {
    notes.forEach( (text) => {
        addNewNote(text);     // iterate through the notes array and add the stored text into the notes
    })
}

addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = ' ') { 
    const note = document.createElement('div');
    note.classList.add('notes');

    note.innerHTML = `
            <div class="tools">
                <button class="add" id="add-note"><i class="fas fa-plus"></i></button>
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main hidden"></div>
                <textarea ></textarea>   
        `;
    const addNoteBtn = note.querySelector('.add');
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked.parse(text);

    addNoteBtn.addEventListener('click', () => {     // allows you to add new note from the notepad itself instead of using  the Add note button
        addNewNote();
    });
        
    editBtn.addEventListener('click', () => {
         main.classList.toggle('hidden');     // hides/unhides markdown text
         textArea.classList.toggle('hidden');     // hides/unhides markdown text
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();     // deltes the parent "note" element and everything inside it
        updateLS();
    });
        
    textArea.addEventListener('input', (e) => {     // anything typed into textarea is converted to markdown syntax
        const { value }= e.target;     // assign 'value' to the object e
        
        main.innerHTML = marked.parse(value);     // converts text to markdown text

        updateLS();
    });

    container.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach( (text) => {     // iterate through each 'textarea'/note and push all the text in each note into the notes array
        notes.push(text.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));     // stringify the notes array and store it in a storage/key called 'notes'
}



