
var Library = function(){
  this.myBookArr = new Array();
}; //create constructor

Library.prototype.init = function(){
  //this.$container = $("myContainer"); cache selectors
  this._bindEvents();
  this._checkLocalStorage();
  this._populateBooks();
};


Library.prototype._bindEvents = function(){
  //this is where all event binding happens
  $("button.get-my-name").on("click", $.proxy(this._handleGetMyName, this));
  $("#add-book-button").on("click", $.proxy(this.injectFormOne, this));
  $("#submit_one").on("click", $.proxy(this._putBook, this));
  $("#add-books-button").on("click", $.proxy(this.injectFormTwo, this));
  $("#remove-title-button").on("click", $.proxy(this.injectFormThree, this));
  $("#remove-author-button").on("click", $.proxy(this.injectFormFour, this));
  $("#get-title-button").on("click", $.proxy(this.injectFormFive, this));
  $("#get-author-button").on("click", $.proxy(this.injectFormSix, this));
  $("#author-list-button").on("click", $.proxy(this.injectFormSeven, this));
  $("#random-book-button").on("click", $.proxy(this.injectFormEight, this));
  $("#random-author-button").on("click", $.proxy(this.injectFormNine, this));
};

Library.prototype._checkLocalStorage = function(){
  //call function to populate book array if local storage has our book array
  var check = JSON.parse(localStorage.getItem("key")) || this.storeData();
  this.myBookArr = check;
};

Library.prototype._handleGetMyName = function(){
  var inputVal = $("input.my-name").val();
  alert(inputVal);
};

Library.prototype._populateBooks = function(){
  var bookList = $("#bookList");
  for(i=0; i < this.myBookArr.length; i++){
    var newRow = $("<tr>");
    var putTitle = $("<td>").html(this.myBookArr[i].title);
    var putAuthor = $("<td>").html(this.myBookArr[i].author);
    var putPages = $("<td>").html(this.myBookArr[i].numPages);
    var putDate = $("<td>").html(this.myBookArr[i].pubDate);

    bookList.append(newRow);
    newRow.append(putTitle);
    newRow.append(putAuthor);
    newRow.append(putPages);
    newRow.append(putDate);
  }
};

Library.prototype._putBook = function(){
  var bookList = $("#bookList");
  var newRow = $("<tr>");
  var putTitle = $("<td>").html($("#titleOne").val());
  var putAuthor = $("<td>").html($("#authorOne").val());
  var putPages = $("<td>").html($("#pagesOne").val());
  var putDate = $("<td>").html($("#dateOne").val());

  bookList.append(newRow);
  newRow.append(putTitle);
  newRow.append(putAuthor);
  newRow.append(putPages);
  newRow.append(putDate);
}

Library.prototype.injectFormOne = function(){
  var height = "150px";
  $("#inject-form-one").height(height).slideToggle("slow");
};

Library.prototype.injectFormTwo = function(){
  var height = "30px";
  $("#inject-form-two").height(height).slideToggle("slow");
};

Library.prototype.injectFormThree = function(){
  var height = "30px";
  $("#inject-form-three").height(height).slideToggle("slow");
};
//
// Library.prototype.injectFormFour = function(){
//   var height = "30px";
//   $("#inject-form-four").height(height).slideDown("slow");
// };
//
// Library.prototype.injectFormFive = function(){
//   var height = "30px";
//   $("#inject-form-five").height(height).slideDown("slow");
// };
//
// Library.prototype.injectFormSix = function(){
//   var height = "30px";
//   $("#inject-form-six").height(height).slideDown("slow");
// };
//
// Library.prototype.injectFormSeven = function(){
//   var height = "30px";
//   $("#inject-form-seven").height(height).slideDown("slow");
// };
//
// Library.prototype.injectFormEight = function(){
//   var height = "30px";
//   $("#inject-form-eight").height(height).slideDown("slow");
// };
//
// Library.prototype.injectFormNine = function(){
//   var height = "30px";
//   $("#inject-form-nine").height(height).slideDown("slow");
// };

Library.prototype.addBook = function(book){
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == book.title){
      return false;
    }
  }
  this.myBookArr.push(book);
  return true;
  //return Remove Book ? book[] == book[] : run .addBook //check for dupliactes?
};

Library.prototype.removeBookByTitle = function(title){
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == title){
    this.myBookArr.splice(i,1);
    alert("Book Removed");
    return true;
    }
  }
  return false;
};

// Library.prototype.removeBookByAuthor = function(author){
// var bool = false;
// for(i=0; i < this.myBookArr.length; i++) {
//   console.log([i]);
//   if(this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author){
//     console.log(author);
//     console.log(this.myBookArr[i].author);
//     this.myBookArr.splice(i,1);
//     alert("Book(s) Removed");
//     bool = true;
//     }
//   }
//   return bool;
// };

Library.prototype.removeBookByAuthor = function(author) {
var bool = false;
// var reg = new RegExp(author, "gi")
for(i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author) {
    this.myBookArr.splice(i,1);
    bool = true;
    }
  }
  return bool;
};

Library.prototype.getRandomBook = function(){
      var randomBook = Math.floor(Math.random() * this.myBookArr.length);
      return this.myBookArr.length <= 0 ? null : this.myBookArr[randomBook];
};

Library.prototype.getBookByTitle = function(title){
  var nArray = [];
  // var reg = new RegExp(title, "gi");
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title){
      nArray.push(this.myBookArr[i]);
    }
  }
    return nArray;
};

Library.prototype.getBooksByAuthor = function(author){
  var aArray = [];
  // var reg = new RegExp(author, "gi");
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author){
      aArray.push(this.myBookArr[i]);
    }
  }
  return aArray;
};

Library.prototype.addBooks = function(multiArray) {
  var num = 0;
  for(j=0; j < multiArray.length; j++){
    if(this.addBook(multiArray[j])){
    num++
    }
  }
  return num;
};

// var authors = ["Steven King", "JK Rowling", "Steven King", "JK Rowling"];
// var result = myBookArr.filter(function(value, index, array){return array.indexOf(value) == index;});
// document.write(result);
//
// Library.prototype.getAuthors = function(author){
//   var output = Array.prototype.slice.call(author, 0);
//   return arr.filter(function getAuthors(value){
//     return output.indexOf(value) < 0
//   });
// };

Library.prototype.getAuthors = function(){
  var bookAuthors = [];
  for(i=0; i < this.myBookArr.length; i++)
  loop:
  {
    for(j=0; j < bookAuthors.length; j++){
      if(this.myBookArr[i].author == bookAuthors[j]){
        break loop;
      }
    }
    bookAuthors.push(this.myBookArr[i].author);
  }
  return bookAuthors;
};

Library.prototype.getRandomAuthorName = function(){
  return this.getRandomBook().author;

    // return this.myBookArr.length <= 0 ? null : this.myBookArr[Math.floor(Math.random() * this.myBookArr.length)].author;
};


////////////////////////////////////////////////////////////////////////////////

var Book = function(oArgs){
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pubDate = new Date(oArgs.date);
  // this.pubDate = new Date(this.date[], this.date[], this.date[]);
};//create book object

////////////////////////////////////////////////////////////////////////////////

  window.gBookOne = new Book({title: "IT", author: "Steven King", numPages: 390, date: "10/02/2003"});
  window.gBookTwo = new Book({title: "The Shining", author: "Steven King", numPages: 400, date:"10/12/1995"});
  window.gBookThree = new Book({title: "Harry Potter and the Sorcere's Stone", author: "JK Rowling", numPages: 600, date:"03/20/1987"});
  window.gBookFour = new Book({title: "Harry Potter and the Chamber of Secrets", author: "JK Rowling", numPages: 600, date:"03/20/1987"});
  window.gBookFive = new Book({title: "Sisterhood of the Traveling Pants", author: "Ann Brashares", numPages: 250, date:"04/17/2003"});

$(function(){
  window.gLib = new Library();
  window.gLib.init();//calls function
});


Library.prototype.storeData = function(){
  this.addBooks([gBookOne, gBookTwo, gBookThree, gBookFour, gBookFive]);
  var libJSON = JSON.stringify(this.myBookArr);
  localStorage.setItem("key", libJSON);
};
