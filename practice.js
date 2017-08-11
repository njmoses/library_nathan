alert("hey");
var authors = ["Steven King", "JK Rowling", "Steven King", "JK Rowling"]
var authorList = authors.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})
