
var Library = function(){
  this.myBookArr = new Array();
}; //create constructor

Library.prototype.init = function(){
  // this.container = $("myContainer"); cache selectors
  this._checkLocalStorage();
  this._bindEvents();
};

// _____________________________ALL EVENT LISTENERS______________________________

Library.prototype._bindEvents = function(){
  //this is where all event binding happens
  $("button.get-my-name").on("click", $.proxy(this._handleGetMyName, this));
  $("#submit_one").on("click", $.proxy(this._putBook, this));
  $("#submit_three").on("click", $.proxy(this.removeBookByTitle, this));
  $("#submit_four").on("click", $.proxy(this.removeBookByAuthor, this));
  $("#getRandomBook").on("click", $.proxy(this.getRandomBook, this));
  $("#getRandomAuthor").on("click", $.proxy(this.getRandomAuthorName, this));
  $("#getAuthorList").on("click", $.proxy(this.getAuthors, this));
  $("#getTitleButton").on("click", $.proxy(this.getBookByTitle, this));
  $("#getAuthorButton").on("click", $.proxy(this.getBooksByAuthor, this));
  $("#add-book-button").on("click", $.proxy(this.injectFormOne, this));
  $("#add-books-button").on("click", $.proxy(this.injectFormTwo, this));
  $("#submit_two").on("click", $.proxy(this.addBooksToJumbo, this));
  $("#remove-title-button").on("click", $.proxy(this.injectFormThree, this));
  $("#remove-author-button").on("click", $.proxy(this.injectFormFour, this));
  $("#add-another-form").on("click", $.proxy(this.addMoreForms, this));
};

//_____________________________POPULATES JUMBOTRON ON PAGE LOAD_________________

Library.prototype._populateBooks = function(){
  var bookList = $("<table>");
  var newHeaderRow = $("<tr>");
  var newTitleHead = $("<th class='header-padding'>Title</th>");
  var newAuthorHead = $("<th class='header-padding'>Author</th>");
  var newPagesHead = $("<th class='header-padding'>Number of Pages</th>");
  var newDateHead = $("<th class='header-padding'>Publish Date</th>");

  newHeaderRow.append(newTitleHead);
  newHeaderRow.append(newAuthorHead);
  newHeaderRow.append(newPagesHead);
  newHeaderRow.append(newDateHead);
  bookList.append(newHeaderRow);
  for(i=0; i < this.myBookArr.length; i++){
    var newRow = $("<tr>");
    var putTitle = $("<td>").html(this.myBookArr[i].title);
    var putAuthor = $("<td>").html(this.myBookArr[i].author);
    var putPages = $("<td>").html(this.myBookArr[i].numPages);
    var putDate = $("<td>").html(this.myBookArr[i].pubDate);

    newRow.append(putTitle);
    newRow.append(putAuthor);
    newRow.append(putPages);
    newRow.append(putDate);
    bookList.append(newRow);
  }
  $("#bookList").html(bookList);
};



//_____________________________SHOULD CHANGE THIS ONE___________________________

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
};

//_____________________________TOGGLE FEATURE FOR INPUTS________________________

Library.prototype.injectFormOne = function(){
  var height = "65px";
  $("#inject-form-one").height(height).slideToggle("slow");
};

Library.prototype.injectFormTwo = function(){
  var height = "200px";
  $(".add-more-books-toggle").height(height).slideToggle("slow");
};

Library.prototype.injectFormThree = function(){
  var height = "60px";
  $("#inject-form-three").height(height).slideToggle("slow");
};

Library.prototype.injectFormFour = function(){
  var height = "60px";
  $("#inject-form-four").height(height).slideToggle("slow");
};

Library.prototype.addMoreForms = function(){
  var newListItem = $("<li>");
  var newForm = $('<form class="form-inline row">');

  var titleInput = $('<input id="titleTwo" class="form-control input-spacing" type="text" name="title" value="title"/>');
  var authorInput = $('<input id="authorTwo" class="form-control input-spacing" type="text" name="author" value="author"/>');
  var pagesInput = $('<input id="pagesTwo" class="form-control input-spacing" type="text" name="pages" value="pages"/>');
  var dateInput = $('<input id="dateTwo" class="form-control input-spacing" type="text" name="date" value="publish date"/>');

  newForm.append(titleInput);
  newForm.append(authorInput);
  newForm.append(pagesInput);
  newForm.append(dateInput);
  newListItem.append(newForm);
  $("#add-more-books").append(newListItem);
};

Library.prototype.addBooksToJumbo = function(){
  var newBookArr = [];
  $("ul.add-more-books li").each(function(){
    var newBookObj = new buildMultiBook(this);
    newBookArr.push(newBookObj);
  });
  this.addBooks(newBookArr);
};

var buildMultiBook = function(jLi){
    this.title = $(jLi).find("input:nth-child(1)").val()
    this.author = $(jLi).find("input:nth-child(2)").val()
    this.numPages = $(jLi).find("input:nth-child(3)").val()
    this.pubDate = $(jLi).find("input:nth-child(4)").val()
};

// //____________________________________EXTRAS____________________________________
//
//
// //________________________________ARRAY ACTIONS_________________________________
//
Library.prototype.addBook = function(book){
  var bool = false
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == book.title){
    }
  }
  this.myBookArr.push(book);
 this._storeData();
 this._checkLocalStorage();
  bool = true
  //return Remove Book ? book[] == book[] : run .addBook //check for dupliactes?
};
//
Library.prototype.removeBookByTitle = function(){
  var removeValue = $("#titleThree").val();
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title == removeValue){
    this.myBookArr.splice(i,1);
    $("#bookList").empty();
    this._storeData();
    this._populateBooks();
    return true;
    }
  }
  return false;
};

Library.prototype.removeBookByAuthor = function() {
var removeAuthor = $("#authorFour").val();
var bool = false;
for(i = 0; i < this.myBookArr.length; i++) {
  if(this.myBookArr[i].author == removeAuthor) {
    this.myBookArr.splice(i,1);
    $("#bookList").empty();
    this._storeData();
    this._populateBooks();
    bool = true;
    }
  }
  return bool;
};

Library.prototype.getRandomBook = function(){
  var randomBook = this.myBookArr[Math.floor(Math.random() * this.myBookArr.length)];
  var wellTable = $("#wellTable");
  var newRow = $("<tr>");
  var putTitle = $("<td>").html(randomBook.title);
  var putAuthor = $("<td>").html(randomBook.author);
  var putPages = $("<td>").html(randomBook.numPages);
  var putDate = $("<td>").html(randomBook.pubDate);

  newRow.append(putTitle);
  newRow.append(putAuthor);
  newRow.append(putPages);
  newRow.append(putDate);
  wellTable.append(newRow);
  // return this.myBookArr.length <= 0 ? null : ;
};

Library.prototype.getBookByTitle = function(){
  var bookByTitle = $("#byTitleForm").val();
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].title.toLowerCase().indexOf(bookByTitle.toLowerCase()) > -1){
      var wellTable = $("#wellTable");
      wellTable.empty();
      var newRow = $("<tr>");
      var putTitle = $("<td>").html(this.myBookArr[i].title);
      var putAuthor = $("<td>").html(this.myBookArr[i].author);
      var putPages = $("<td>").html(this.myBookArr[i].numPages);
      var putDate = $("<td>").html(this.myBookArr[i].pubDate);

      newRow.append(putTitle);
      newRow.append(putAuthor);
      newRow.append(putPages);
      newRow.append(putDate);
      wellTable.append(newRow);
    }
  }
};

Library.prototype.getBooksByAuthor = function(){
  var bookByAuthor = $("#byAuthorForm").val();
  for(i=0; i < this.myBookArr.length; i++){
    if(this.myBookArr[i].author.toLowerCase().indexOf(bookByAuthor.toLowerCase()) > -1){
      var wellTable = $("#wellTable");
      var newRow = $("<tr>");
      var putTitle = $("<td>").html(this.myBookArr[i].title);
      var putAuthor = $("<td>").html(this.myBookArr[i].author);
      var putPages = $ ("<td>").html(this.myBookArr[i].numPages);
      var putDate = $ ("<td>").html(this.myBookArr[i].pubDate);

      newRow.append(putTitle);
      newRow.append(putAuthor);
      newRow.append(putPages);
      newRow.append(putDate);
      wellTable.append(newRow);
    }
  }
};

Library.prototype.addBooks = function(multiArray) {
  var num = 0;
  for(j=0; j < multiArray.length; j++){
    this.addBook(multiArray[j])
  }
};

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
  var wellTable = $("#wellTable");
  var newRow = $("<tr>");
  $("#removedRow").remove();
  newRow.append(bookAuthors);
  wellTable.append(newRow);
};

Library.prototype.getRandomAuthorName = function(){
  var randomAuthor = this.myBookArr[Math.floor(Math.random()*this.myBookArr.length)].author;
  var wellTable = $("#wellTable");
  var newRow = $("<tr>");
  var authorName = $("<td>").html(randomAuthor);
  $("#removedRow").remove();
  newRow.append(authorName);
  wellTable.append(newRow);
  // return this.getRandomBook().author;

    // return this.myBookArr.length <= 0 ? null : this.myBookArr[Math.floor(Math.random() * this.myBookArr.length)].author;
};


//_____________________________OBJECTS AND CONSTRUCTORS________________________

var Book = function(oArgs){
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pubDate = new Date(oArgs.date);
  // this.pubDate = new Date(this.date[], this.date[], this.date[]);
};//create book object

  window.gBookOne = new Book({title: "IT", author: "Steven King", numPages: 390, date: "10/02/2003"});
  window.gBookTwo = new Book({title: "The Shining", author: "Steven King", numPages: 400, date:"10/12/1995"});
  window.gBookThree = new Book({title: "Harry Potter and the Sorcere's Stone", author: "JK Rowling", numPages: 600, date:"03/20/1987"});
  window.gBookFour = new Book({title: "Harry Potter and the Chamber of Secrets", author: "JK Rowling", numPages: 600, date:"03/20/1987"});
  window.gBookFive = new Book({title: "Sisterhood of the Traveling Pants", author: "Ann Brashares", numPages: 250, date:"04/17/2003"});

//________________________________NOT SURE_____________________________________

$(function(){
  window.gLib = new Library();
  window.gLib.init();//calls function
});

//_____________________________LOCAL STORAGE FUNCTIONS__________________________

Library.prototype._checkLocalStorage = function(){
  //call function to populate book array if local storage has our book array
  var check = JSON.parse(localStorage.getItem("key")) || this.ifNoStorage();
  this.myBookArr = check;
  this._populateBooks();
};

Library.prototype.setDefaults = function(){
  this.addBooks([gBookOne, gBookTwo, gBookThree, gBookFour, gBookFive]);
};

Library.prototype._storeData = function(){
  var libJSON = JSON.stringify(this.myBookArr);
  localStorage.setItem("key", libJSON);
};

Library.prototype.ifNoStorage = function(){
  this.setDefaults();
  this._storeData();
  return this.myBookArr;
};
