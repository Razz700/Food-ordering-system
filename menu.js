document.addEventListener('DOMContentLoaded',()=>{
    getMenu().then((data)=>{
        console.log('getMenu() has started!');
        let items=data;
        document.querySelector('menu').innerHTML=`
        <section>
<p class="title">Menu</p>
<div id="menu" class="items">                               
</div>
</section>`;
        document.querySelector('#menu').innerHTML="";
        items.forEach((elem) => {
           document.querySelector('#menu').innerHTML+=`
           <div class="item">
    <img src="${elem.imgSrc}">
    <div class="details">
        <div>
            <p class="name">${elem.name}</p> 
            <p class="price">$${elem.price}/-</p> 
        </div>
       <img src="resources/plus.png" alt="add image">
    </div>
    </div>`; 
        });
       console.log("Menu",data);
        return TakeOrder(data);
    }).then((resolvedata)=>{
        console.log("Your Order",resolvedata);
        return orderPrep();
    }).then((resolvedata)=>{
        console.log(resolvedata);
        return payOrder();
    }).then((resolvedata)=>{
        console.log(resolvedata);
       thankyouFnc(resolvedata);
    }).catch((error)=>{
console.log('An Error has occured!!',error);
    });
});

function getMenu(){
   return fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json').then((res)=>{
        return res.json();
    });
}

function TakeOrder(menuItems){
    return new Promise((resolve)=>{
setTimeout(()=>{
    console.log('TakeOrder() has started!');
    let itemscount=menuItems.length;
let orderObject={item1:menuItems[Math.floor(Math.random()*itemscount)].name,
    item2:menuItems[Math.floor(Math.random()*itemscount)].name,
    item3:menuItems[Math.floor(Math.random()*itemscount)].name
};
let orderArray=[];
menuItems.forEach((item)=>{
if (orderObject.item1==item.name) {
orderArray.push(item);
}
if(orderObject.item2==item.name){
orderArray.push(item);
}
if(orderObject.item3==item.name){
orderArray.push(item)
}
});
document.querySelector('menu').innerHTML+=`
<section>
<p class="title">Your Order(After 2.5 seconds)</p>
<div id="order" class="items">                               
</div>
</section>`;
orderArray.forEach((item)=>{
    document.querySelector('#order').innerHTML+=`
    <div class="item">
     <img src="${item.imgSrc}">
     <div class="details">
         <div>
             <p class="name">${item.name}</p> 
                <p class="price">$${item.price}/-</p> 
            </div>
          <img src="resources/plus.png" alt="add image">
     </div>
                     </div> `;
});
resolve(orderObject);
},2500);
    });
}

function orderPrep(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("orderPrep() has started!");
            document.querySelector('menu').innerHTML+=`
            <section>
            <p class="title">orderPrep(After 1.5 seconds)</p>
            order_status:true,<br>
            paid:false
            <div id="order" class="items">                               
            </div>
            </section> `;
resolve( {order_status:true,
         paid:false});
        },1500);
    });  
}

function payOrder(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('payOrder() has started!');
            document.querySelector('menu').innerHTML+=`
            <section>
            <p class="title">payOrder(After 1 second)</p>
            order_status:true,<br>
            paid:true
            <div id="order" class="items">                               
            </div>
            </section> `;
resolve( {order_status:true,
         paid:true});
        },1000);
    });   
}

function thankyouFnc(order_status){
if (order_status.paid) {
    alert('thankyou for eating with us today!');
}
}

//responsive aside
document.getElementById('btn').addEventListener('click',()=>{
document.querySelector('aside').classList.toggle('responsiveAside');
});
