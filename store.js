
var cartItems = document.getElementsByClassName("add-item");
for (let i = 0; i < cartItems.length; i++ ){
    buttonItem=cartItems[i];
    buttonItem.addEventListener("click", checkItem);
}

var total = document.getElementsByClassName("total-cost")[0];
var purchase =  document.getElementsByClassName("purchase")[0];
purchase.addEventListener("click",doPurchase)

function checkItem(event){
    let btn = event.target;
    let shopItem= btn.parentElement.parentElement;
    let itemName = shopItem.getElementsByClassName("item-name")[0].innerText;
    let items = document.getElementsByClassName("row-name");
    for (let i=0;i < items.length; i++){
        if (items[i].innerText == itemName){
            alert("The item is already in the cart");
            return;
        }
    }
    addItem (shopItem,itemName);
   
}





function addItem (shopItem,itemName) {
    
    let image = shopItem.getElementsByClassName("item-img")[0].src;
    let price = shopItem.getElementsByClassName("item-price")[0].innerText;
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.classList.add('row-item');
    let content = `
        <img class="cart-img" src=${image} alt="product" width="100" height="100">
        <div class="item-name row-name">${itemName}</div>
        <div class="item-price">${price}</div>
        <div class="column-quantity">
            <input class="item-quantity" type="number" value="1">
            <button class="remove-item">Remove</button>
        </div>`
    let shopItems=document.getElementsByClassName("cart-items")[0];
    cartRow.innerHTML= content;
    shopItems.append(cartRow);
    let btnRemove = cartRow.getElementsByClassName("remove-item")[0];
    btnRemove.addEventListener("click", removeItem);
    let newQuantity = cartRow.getElementsByClassName("item-quantity")[0];
    newQuantity.addEventListener("change", updateTotal);
    updateTotal()
       
}

function updateTotal (event) {
    let items = document.getElementsByClassName("row-item");
    let newTotal = 0;
    for (let i = 0; i < items.length; i++ ){
        let itemRow=items[i];
        let price = itemRow.getElementsByClassName("item-price")[0].innerText;
        let quantityItem = itemRow.getElementsByClassName("item-quantity")[0];
        let quantity= quantityItem.value;
        if (quantity <= 0){
            quantity =1;
            quantityItem.value = 1;

        }
        price = parseFloat(price.replace("$", ""));
        quantity = parseFloat(quantity);
        newTotal = newTotal + (price*quantity);  

       
    }
    total.innerText =  "$"+(Math.round(newTotal * 100) / 100) ;
}




function removeItem(event) {
    let btn= event.target;
    let item = btn.parentElement.parentElement;
    item.remove();
    updateTotal()

}

function doPurchase () {
    let items = document.getElementsByClassName("row-item");
    while( items.length > 0){
        items[0].remove();   
    }
    updateTotal();
    alert("Thanks for your purchase");


}