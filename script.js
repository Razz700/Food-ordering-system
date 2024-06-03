document.addEventListener('DOMContentLoaded',()=>{
    console.log('Redirecting to Menu page after 3 seconds');
    setTimeout(()=>{
        window.location.href="menu.html";
    },3000);
});

//responsive aside
document.getElementById('btn').addEventListener('click',()=>{
document.querySelector('aside').classList.toggle('responsiveAside');
});