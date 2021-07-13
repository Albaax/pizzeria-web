let modalQt = 1;
let modalKey = 0;
let cart = [];

const qs = (elem)=>document.querySelector(elem);
const qsa = (elem)=>document.querySelectorAll(elem);

pizzaJson.map( (item, index)=>{
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); // id
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        
        // Key - take the closest class off tag <a> that is '.pizza-item' and get attribute data-key    
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        // When clicked, use pisszaJson[index=key] to find the respective clicked pizza to set info
        qs('.pizzaBig img').src = pizzaJson[key].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        qs('.pizzaInfo--size.selected').classList.remove('selected'); // remove prev selected to ensure that the biggest is always selected

        // For each size span show its respective
        qsa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        qs('.pizzaInfo--qt').innerHTML = modalQt;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            qs('.pizzaWindowArea').style.opacity = 1;    
        }, 200)    
    });

    // Add each clone in pizza-area
    qs('.pizza-area').append(pizzaItem);
})

// Modal'

function closeModal(){
    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        qs('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    qs('.pizzaInfo--qt').innerHTML = modalQt;
});

qsa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    
    size.addEventListener('click', ()=>{
        qs('.pizzaInfo--size.selected').classList.remove('selected'); 
        size.classList.add('selected');
    });
});

qs('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex( (item) => item.identifier == identifier);

    if(key > -1){
        cart[key].quantity += modalQt;
    } else {    
        cart.push({
        identifier,
        id: pizzaJson[modalKey].id,
        size,
        quantity: modalQt
        });
    }
    updateCart();
    closeModal();
});

qs('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        qs('aside').style.left = '0';
    }
});

qs('.menu-closer').addEventListener('click', () => {
    qs('aside').style.left = '100vh';
});

function updateCart(){
    qs('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0){
        qs('aside').classList.add('show');
        qs('.cart').innerHTML = '';

        let subTotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find( (item) => item.id == cart[i].id );  // When catalog item == cart item, do
            subTotal += pizzaItem.price * cart[i].quantity;
           
            let cartItem = qs('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantity;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].quantity > 1){
                    cart[i].quantity--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].quantity++;
                updateCart();
            });

            qs('.cart').append(cartItem);
        }

        discount = subTotal * 0.1;
        total = subTotal - discount;
        qs('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        qs('.discount span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        qs('aside').classList.remove('show');
        qs('aside').style.left = '100vh';
    }
}


