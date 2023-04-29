const defaultData = {
  favorites: [
    {
      fid: "1234",
      text: "Pointer pointer", 
      url: "https://pointerpointer.com", 
      comments: "The best website."
    }
  ]
}
const storeName = "njp2378-hw3-data";

const readLocalStorage = () => {
  let allValues = null;
  try{
    allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
  }
  catch(err){
    console.log(`Problem with JSON.parse() and ${storeName} !`);
    throw err;
  }
  return allValues;
};

const writeLocalStorage = (allValues) => {
  localStorage.setItem(storeName, JSON.stringify(allValues));
};

const clearLocalStorage = () => writeLocalStorage(defaultData);

const getFavorites = () => readLocalStorage().favorites;

const setFavorites = (favoritesArray) => {
  const allValues = readLocalStorage();
  allValues.favorites = favoritesArray;
  writeLocalStorage(allValues);
};

const clearFavorites = () => {
  const allValues = readLocalStorage();
  allValues.favorites = [];
  writeLocalStorage(allValues);
};
export{clearFavorites,writeLocalStorage,clearLocalStorage,getFavorites,setFavorites}