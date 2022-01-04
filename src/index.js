const centralTableBody = document.querySelector(".central-table-body");
const btnNewBook = document.querySelector("#btnNewBook");
const frmNewBook = document.querySelector("#frmNewBook");
const btnAdd = document.querySelector("#btnAdd");
const txtAuthor = document.querySelector("#txtAuthor");
const txtTitle = document.querySelector("#txtTitle");
const txtNumberOfPages = document.querySelector("#txtNumberOfPages");
const chkRead = document.querySelector("#chkRead");
const resultAdd = document.querySelector("#resultAdd");

import "./styles.css";

let myLibrary = [];

function Book(author, title, numberofpages, read) {
  this.author = author;
  this.title = title;
  this.numberofpages = numberofpages;
  this.read = read
}

Book.prototype.toggleRead = function(){
  if (this.read){
    this.read = false;
  }else{
    this.read = true;
}

function addBookToLibrary(author, title, numberOfPages, read) {
  let  book = new Book(author, title, parseInt(numberofpages), read);
  myLibrary.push(book);
  refresher()
}

function refresher(){
  centralTableBody.innerHTML = "";
  if (myLibrary.length > 0) {
    for (let i = 0; i < myLibrary.length; i++) {
        let row = document.createElement("tr");
        let author = document.createElement("td");
        let title = document.createElement("td");
        let numberOfPages = document.createElement("td");
        let read = document.createElement("td");
        let markAsRead = document.createElement("td");
        let remove = document.createElement("td");
        let markbtn = document.createElement("button");
        let removebtn = document.createElement("button");
        removebtn.textContent = "Remove";
        removebtn.dataset.row = i;
        markbtn.dataset.row = i;
        markbtn.textContent = myLibrary[i].read ? "Mark as Not Read" : "Mark as Read";

        removebtn.addEventListener("click", (e) => {
                  let row = parseInt(e.target.dataset.row);
                  myLibrary.splice(row, 1);
                  refresher();
              });

        markbtnaddEventListener("click", (e) => {
          let row = parseInt(e.target.dataset.row);
          myLibrary[row].toggleRead();
          refresher();


        });

        remove.appendChild(removebtn);
        markAsRead.appendChild(markbtn);

        author.textContent = myLibrary[i].author;
        title.textContent = myLibrary[i].title;
        numberOfPages.textContent = myLibrary[i].numberOfPages;
        read.textContent = myLibrary[i].read ? "Read" : "Not Read";
        
        row.appendChild(author);
        row.appendChild(title);
        row.appendChild(numberOfPages);
        row.appendChild(read);
        row.appendChild(markAsRead);
        row.appendChild(remove);
        centralTableBody.appendChild(row);

        }
      }
      
    else {
        centralTableBody.innerHTML = "<td>N/A</td><td>N/A</td><td>N/A</td><td>N/A</td><td><button>Sin datos</button></td><td><button>Sin datos</button></td>";
    }
}

btnNewBook.addEventListener("click", (e) => {
  if (frmNewBook.classList.contains("hidden")) {
      frmNewBook.classList.remove("hidden");
      frmNewBook.classList.add("notHidden");
  }

  else {
      frmNewBook.classList.add("hidden");
      frmNewBook.classList.remove("notHidden");
  }

})

btnAdd.addEventListener("click", (e) => {
  if (txtAuthor.value === "" || txtTitle.value === "" || txtNumberOfPages.value === "") {
      resultAdd.textContent = "Fracaso: Debe de llenar todos los campos";
      resultAdd.style.color = "red";
  }
  else {
      addBookToLibrary(txtAuthor.value, txtTitle.value, txtNumberOfPages.value, chkRead.checked);
      txtAuthor.value = "";
      txtTitle.value = "";
      txtNumberOfPages.value = "";
      chkRead.checked = false;
      resultAdd.textContent = "Éxito: Se ha guardado el libro exitosamente.";
     
  }
})
