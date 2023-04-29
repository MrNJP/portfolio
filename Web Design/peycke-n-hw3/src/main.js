import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";
import * as storage from "./storage.js";
import { MyHeader } from "./MyHead.js";

//Variables
let favorites = [];
let numOfFavorites;
let newFavorite;

//Creates new favorite if conditions are met
const submitClicked = (evt) => {
  evt.preventDefault();
  let text = document.querySelector("#fav-text").value;
  let url = document.querySelector("#fav-url").value;
  let comments = document.querySelector("#fav-comments").value;
  //Displays Error message if no message
  if (text.trim().length < 1 || url.trim().length < 1 || comments.trim().length < 1) {
    updateErrorField(true);
    return;
  }

  //Makes favorite and pushes it 
  favorites.push(newFavorite = new Favorite(crypto.randomUUID(),text,url,comments));
  createBookmarkComponent(newFavorite);
  clearFormFields(evt);
  updateErrorField(false);
  storage.setFavorites(favorites);
  return false;
}

//deletes favorite from the page
const deleteFavorite = (fid) => {
  let index = 0;
  for (let fav of favorites) {
    if (fav.fid == fid) {
      favorites.splice(index, 1);
      updateFavCount();
      for (let book of document.querySelectorAll('my-bookmark')) {
        if (book._fid == fid) {
          book.parentElement.remove();
        }
      }
    }
    index++;
  }
  storage.setFavorites(favorites);
}

//clears all the text fields
const clearFormFields = (evt) => {
  document.querySelector("#fav-text").value = "";
  document.querySelector("#fav-url").value = "";
  document.querySelector("#fav-comments").value = "";
  updateErrorField(false);

  //prevent from reloading
  evt.preventDefault();
  return false;
}

//makes a new bookmark
const createBookmarkComponent = (favorite) => {
  //Sets new element
  let li = document.createElement("li");
  let newBook = document.createElement('my-bookmark');
  newBook.setAttribute("data-text", favorite.text);
  newBook.setAttribute("data-url", favorite.url);
  newBook.setAttribute("data-comments", favorite.comments);
  newBook.setAttribute("data-fid", favorite.fid);
  newBook.callback = deleteFavorite;
  numOfFavorites++;

  //Puts new bookmark on the page
  li.appendChild(newBook);
  document.querySelector("#bookmarks").appendChild(li);
  document.querySelector("#num-favs").innerHTML = `Number of favorites: ${numOfFavorites}`;
}

//updates the favorite counter
const updateFavCount = () => {
  numOfFavorites = favorites.length;
  document.querySelector("#num-favs").innerHTML = `Number of favorites: ${numOfFavorites}`;
}

//Displays Error
const updateErrorField = (hasError) => {
  let errorField = document.querySelector("#error");
  if (hasError) {
    errorField.innerHTML = "Fill The Required Fields!";
  }
    else {
      errorField.innerHTML = "";
  }
}

//loads the local  storage
const loadFavoritesFromStorage = () => {
  favorites = storage.getFavorites();
  for (let fav of favorites) {
    createBookmarkComponent(fav);
  }
}
 //Assigns button to attribute
window.onload = () => {
  document.querySelector("#submit-button").onclick = submitClicked;
  document.querySelector("#cancel-button").onclick = clearFormFields;
  loadFavoritesFromStorage();
  updateFavCount();
};