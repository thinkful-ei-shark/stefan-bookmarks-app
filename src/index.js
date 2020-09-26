import $ from 'jquery';
import './style.css';
import view from './view';
import controler from './controler';
import logic from './logic';

function main(){
//console.log("Something");

logic.getData().then(res=>res.json()).then((items)=>{
    
    items.forEach((item)=>logic.addData(item));
   // console.log(model.bookmarks);
    view.renderList(1);
});

controler.handleExpand();
controler.deleteItem();
controler.handleAddNewItem();
view.renderAddnew();
controler.handleFilter();
logic.filterStars();
controler.handleCancel();
}

$(main);