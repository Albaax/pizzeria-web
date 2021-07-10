const qs = (elem)=>document.querySelector(elem);
const qsa = (elem)=>document.querySelectorAll(elem);

pizzaJson.map( (item, index)=>{
    // A clone is create for each pizza
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); // id
    // Pizza info
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        
        // Key - take the closest class off tag <a> that is '.pizza-item' and get attribute data-key    
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        // When clicked, use pisszaJson[index=key] to find the respective clicked pizza to set info
        qs('.pizzaBig img').src = pizzaJson[key].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            qs('.pizzaWindowArea').style.opacity = 1;    
        }, 200)    
    });


    // Add each clone in pizza-area
    qs('.pizza-area').append(pizzaItem);
})