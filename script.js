const myLibrary = [];


function Book(title,author,pages,read,id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id   = id;

    

}

let got = new Book("Game of Thrones","Georges R R Martin", 500, true,120);

myLibrary.push(got);



function remove(id){        
        for(let i = 0; i < myLibrary.length ; i++){
            if(id = myLibrary[i].id){
                myLibrary.splice(i,1);
            }

        }
}

function modify(id,read){        
    for(let i = 0; i < myLibrary.length ; i++){
        if(id = myLibrary[i].id){
            myLibrary[i].read = read;
        }

    }
}





const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show-dialog");
const closeButton = document.querySelector(".close-dialog");


showButton.addEventListener("click", () => {
    dialog.showModal();
});
  

closeButton.addEventListener("click", () => {
    dialog.close();
});


let form = document.querySelector("form");
let bookTitleField = document.querySelector("#title");
let bookAuthorField = document.querySelector("#author");
let bookPageField = document.querySelector("#pages");
let bookReadField = document.querySelector("#read");


form.addEventListener("submit",(event)=>{
    if(form.checkValidity() === true){
        event.preventDefault();
        dialog.close();

        let title = bookTitleField.value;
        let author = bookAuthorField.value;
        let pages = bookPageField.value;
        let read = bookReadField.checked;
        let id = `b-${Math.round(Math.random()*100000)}-${Math.round(Math.random()*100000)}`;

        let bookAdded = new Book(title,author,pages,read,id);
        myLibrary.push(bookAdded);
        refresh();
    }
})

function refresh(){
    let allBooks =  document.querySelectorAll(".book-block");
    allBooks.forEach((book)=>{
        book.remove();
    })
    generateCard();

}

function generateCard(){
    let booksContainer = document.querySelector(".books-container");
    myLibrary.forEach((book)=>{
        let container = document.createElement("div");
        container.classList.add("book-block");
        container.id = book.id;

        let bookTitle = document.createElement("p");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;
        container.append(bookTitle);

        let bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = book.author;
        container.append(bookAuthor);

        let bookPages = document.createElement("p");
        bookPages.classList.add("book-pages");
        bookPages.textContent = `Number of Pages: ${book.pages}`;
        container.append(bookPages);

        let bookReadContainer = document.createElement("div");
        container.append(bookReadContainer);

        let label = document.createElement("label");
        label.htmlFor = "read";
        label.textContent = `Read the Book?`;
        bookReadContainer.append(label);

        let bookRead = document.createElement("input");
        bookRead.id = "read";
        bookRead.type = "checkbox";
        bookRead.checked = book.read;
        bookReadContainer.append(bookRead);

        bookRead.addEventListener("click",(event)=>{
            let read = bookRead.checked;
            modify(book.id,read);
        })

        let bookDelete = document.createElement("button");
        bookDelete.classList.add("book-delete");
        bookDelete.textContent = `Delete`;
        container.append(bookDelete);

        bookDelete.addEventListener("click",()=>{
            remove(book.id);
            bookDelete.parentElement.remove();
        })






        booksContainer.append(container);

    })
}

generateCard();
refresh();