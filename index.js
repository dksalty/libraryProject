const container = document.querySelector('.container');
const theHobbitDiv = document.getElementById('theHobbit');
const duneDiv = document.getElementById('dune');
const removeButtons = document.querySelectorAll('.remove');
const dialog = document.getElementById('dialog');
const cancelButton = document.getElementById("cancel");
const addBook = document.getElementById('addBook');
const hasReadValue = dialog.querySelector('input[name="hasRead"]:checked').value;
const hasRead = hasReadValue === "true";

const myLibrary = [];

function Book(title, author, numberOfPages, hasRead = false) {
this.title = title;
this. author = author;
this.numberOfPages = numberOfPages;
this.hasRead = hasRead;

}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false)
const dune = new Book('Dune', 'Frank Herbert', 412, false)

myLibrary.push(theHobbit);
myLibrary.push(dune);

function addBookToLibrary() {
 crypto.randomUUID();

  // take params, create a book then store it in the array
}



addBook.addEventListener("click", () => {
  dialog.showModal();
  
});

cancelButton.addEventListener("click", () => {
  dialog.close();
 
});

removeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const bookDiv = e.target.closest('.book');
    bookDiv.remove();
  });
});

const form = dialog.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // optional since method="dialog" closes dialog automatically

  const title = dialog.querySelector("#bookTitle").value;
  const author = dialog.querySelector("#authorName").value;
  const numberOfPages = parseInt(dialog.querySelector("#numberOfPages").value);
  const hasRead = dialog.querySelector('input[name="hasRead"]:checked').value === "true";

  const newBook = new Book(title, author, numberOfPages, hasRead);

  myLibrary.push(newBook);
  addBookCard(newBook); // function to create & append a new div in the container

  form.reset();
  dialog.close();
});