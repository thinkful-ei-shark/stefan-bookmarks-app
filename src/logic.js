import view from './view'
//Data
const store = {
   bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };
  


const BASE_URL = 'https://thinkful-list-api.herokuapp.com/stefan/bookmarks';


  function deleteItem(id){
    store.bookmarks = store.bookmarks.filter(bookmark=>bookmark.id != id);
  }
  //Fetch data from API
 function getData(){
 
  return fetch(`${BASE_URL}`);
  
 }
 function createData(title,rating,url,desc){
  const newItem = JSON.stringify({
    title,
    url,
    desc,
    rating});
  return fetch(`${BASE_URL}`,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: newItem
  });
  
 }
function findById(id){
return store.bookmarks.find(bookmark=>bookmark.id === id);
}
function filterStars(){
  //store.bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  let newBookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  //view.renderList(newBookmarks);
  return newBookmarks;
}

function toggleExpand(id){
let bookmark = findById(id);
bookmark.expanded = !bookmark.expanded;
}
 
 //Add data to API
 function addData(item){
  store.bookmarks.push(item);
 }
 export default{
  store,
  getData,
  addData,
  createData,
  BASE_URL,
  deleteItem,
  toggleExpand,
  filterStars,
  
};