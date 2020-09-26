import $, { data } from 'jquery';
import logic from './logic';
export default {
    renderList,
    renderAddnew,
    render,
} 

function addNewTemplate() {
    return `<h1>Add New Bookmark</h1>
    <form>
        <label for="link">Link:</label><br>
        <input type="url" id="link" name="link" required><br>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title" required>
        <hr>
        <label for="addnewrating">Choose a rating:</label>
        <select id="addnewrating" name="addnewrating" size="1" required>
            <option value="" hidden>Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
        </select>
        <hr>
        <textarea placeholder="Description" id="text" name="description" rows="10" cols="30" required></textarea>
        <br>
        <div>
        <button type="submit">Submit</button>
        <button id='btn' type="button">Cancel</button>    
        </div>
    </form>`
}

function getStars(item){
    let string = ``;
    for(let i=1;i<=5;i++){
       let myclass = `star-icon`;
       if(item.rating >= i){
        myclass+= ' full';
       } 
       string+= `<span id="${i}" class="${myclass}">☆</span>`;
    }
    return string;
                            
}

function listItemTemplate(item) {
    return `
        
            <li id='${item.id}' style="height: auto;" class="reason">
                ${item.title}
                
                            <div class="${item.title}" id="position">
                            
                            ${getStars(item)} 
                            </div>
                            <div class='${item.expanded?'expandedbookmark':'hiddenbookmark'}'>
            <span style="float: right;" class="trash"><i class="fa fa-trash" aria-hidden="true"></i></span>
                        
                    
                    <div class="reasonText"><hr><button onclick="window.location.href='${item.url}';">Link to website</button>
                        <div style="float: right"><div class="star">${item.rating}</div></div>
                    </div>
                    <textarea
                        class="reasonText">${item.desc}</textarea>
                        </div>
                    
               
    `
}

//check store.filter
//render from filter

function renderAddnew() {
    $('main').on('click', '.btn-js', function (event) {

        $('main').html(addNewTemplate);
    });
}



function render() {
    $('main').html(`  <h1>Bookmark List</h1>
    <div class="group">
        <div class="item"><button class='btn-js'>Add</button></div>
        <div class="item">
            <select id="rating" name="rating" size="1" required>
                <option value="" hidden>Filter</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
            </select>
        </div>
    </div>

    
        <ul class="js-list">
            
        </ul>`)
    renderList(logic.filterStars());
}

function generateBookmarksString(bookmarks) {
    const items = bookmarks.map((item) => listItemTemplate(item));
    return items.join('');
}



function renderList(x) {
    if(x===1)
    {
    let ditem = [...logic.store.bookmarks];

    //// render the bookmark list in the DOM
    const bookmarksItemsString = generateBookmarksString(ditem);

    //// insert that HTML into the DOM
    $('.js-list').html(bookmarksItemsString);
    }
    else
    {
    const bookmarksItemsString = generateBookmarksString(x);

    //// insert that HTML into the DOM
    $('.js-list').html(bookmarksItemsString);
    }
    
}

