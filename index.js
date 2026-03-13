const container = document.querySelector('.container');
const addBookBtn = document.getElementById('addBook');
const dialog = document.getElementById('dialog');
const cancelBtn = document.getElementById('cancel');
const form = dialog.querySelector('form');
const bookmarkDialog = document.getElementById('bookmarkDialog');
const bookmarkForm = bookmarkDialog.querySelector('form');
const bookmarkInput = document.getElementById('bookmarkInput');
const bookmarkCancel = document.getElementById('bookmarkCancel');

let activeBookmarkBook = null;

let myLibrary = [];

class Book {
constructor(title, author, pages, bookmark = null, hasRead = false){
this.id = crypto.randomUUID();
this.title = title;
this.author = author;
this.pages = pages;
this.hasRead = hasRead;
this.bookmark = bookmark;
}
toggleRead() {
this.hasRead = !this.hasRead
};
}


function addBookToLibrary(title, author, pages, hasRead, bookmark = 1){
const book = new Book(title, author, pages, bookmark, hasRead);
myLibrary.push(book);
}

function removeBookFromLibrary(id){
myLibrary = myLibrary.filter(book => book.id !== id);
}

function renderLibrary(){
container.innerHTML = '';
myLibrary.forEach(book => {
container.appendChild(createBookCard(book))
});
}


function createBookCard(book){
const bookDiv = document.createElement('div');
bookDiv.classList.add('book');
bookDiv.dataset.id = book.id;

const title = document.createElement('p');
title.textContent = book.title;

const author = document.createElement('p');
author.textContent = `By: ${book.author}`;

const pages = document.createElement('p');
pages.textContent = `Pages: ${book.pages}`;

const bookmarkWrapper = document.createElement('div');
bookmarkWrapper.classList.add('bookmark');

const bookmarkBtn = document.createElement('button');
bookmarkBtn.textContent = 'Bookmarked page:';

const bookmarkNumber = document.createElement('span');
bookmarkNumber.textContent = book.bookmark;

bookmarkBtn.addEventListener('click', () => {
  activeBookmarkBook = book;
  bookmarkInput.value = book.bookmark;
  bookmarkDialog.showModal();
});

bookmarkWrapper.append(bookmarkBtn, bookmarkNumber);

const status = document.createElement('p');
status.textContent = book.hasRead ? 'Read' : 'Not read yet';

const toggleBtn = document.createElement('button');
toggleBtn.classList.add('toggle-read');
toggleBtn.textContent = book.hasRead ? 'Mark as unread' : 'Mark as read';

const removeBtn = document.createElement('button');
removeBtn.textContent = "Remove";

toggleBtn.addEventListener('click', () => {
book.toggleRead();
renderLibrary();
});

removeBtn.addEventListener('click', () => {
removeBookFromLibrary(book.id);
renderLibrary();});


bookDiv.append(title, author, pages);

if (!book.hasRead) {
  bookDiv.append(bookmarkWrapper);
}

bookDiv.append(status, toggleBtn, removeBtn);

return bookDiv;
}

addBookBtn.addEventListener('click', () => {
dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
dialog.close();
});

form.addEventListener('submit', (e) => {
 e.preventDefault();
 const title = form.bookTitle.value;
 const author = form.authorName.value;
 const pages = Number(form.numberOfPages.value);
 const hasRead = form.hasRead.value === 'true';
 
 addBookToLibrary(title, author, pages, hasRead);
 renderLibrary();
 
 form.reset();
 dialog.close();
});
bookmarkForm.addEventListener('submit', e => {
  e.preventDefault();

  activeBookmarkBook.bookmark = Number(bookmarkInput.value);
  renderLibrary();

  bookmarkDialog.close();
});

bookmarkCancel.addEventListener('click', () => {
  bookmarkDialog.close();
});


renderLibrary();
