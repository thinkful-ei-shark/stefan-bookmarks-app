import $ from 'jquery';
import logic from './logic';
import view from './view';

    //Add New Item and Render
    //
    function handleAddNewItem(){
    $('main').on('submit','form',function(event){
        event.preventDefault();
        const newItemTitle = $('#title').val();
        const newItemLink = $('#link').val(); 
        const newItemRating = $('#addnewrating').val();
        const newItemDescription = $('#text').val();
        
        logic.createData(newItemTitle,newItemRating,newItemLink,newItemDescription)
        .then(res=>res.json())
        .then((newItem)=>{
            logic.addData(newItem);
            view.render();
        });
        
    })
    }
    
    //Delete Item and Render
    //
    function deleteItem(){
    
        $('main').on('click','.trash',function(event){
            let id = $(this).closest('li').attr('id');
          
             fetch(`${logic.BASE_URL}/${id}`,{
                method:'DELETE'
            }).then(res=>{
                logic.deleteItem(id);
                view.render();
            }).catch(error=>console.log(error));
            
        });
       
    }
    //Expand list item
    //
    function handleExpand(){
       
        $('main').on('click','.reason', function (event) {

            let id = $(this).attr('id');
            logic.toggleExpand(id);
            view.render();
    
    
        })
    }
    //Filter list
    //
    function handleFilter(){
        $('main').on('change','#rating',function(){
            
            logic.store.filter = this.options[this.selectedIndex].value;
            logic.filterStars();
            view.render();
        })
    }
    //Render List Screen
    //
    function handleCancel(){
        $('main').on('click','#btn',function(){
            view.render();
        })
    }

export default{
    handleAddNewItem,
    deleteItem,
    handleExpand,
    handleFilter,
    handleCancel
}