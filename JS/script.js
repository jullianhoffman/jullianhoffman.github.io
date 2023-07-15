/*===En este espacio vamos a Darle funcionamiento a el boton de navegacion===*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".Navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*===En este espacio vamos a crear una funcion que modivique el active del nav, para que cambie el color del elfasis dependiendo de donde estes en la pagina===*/
let sections = document.querySelectorAll("section") /*aqui invocamos que sections son todos los espacios section del HTML*/
let navLinks = document.querySelectorAll("header nav a") /*aqui invocamos todos los a dentro del nav de heder, en el HTML, y los anidamos bajo el nombre de navLinks*/

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id")

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("Active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("Active");
            });
        };
    });

    let header = document.querySelector("header")
    header.classList.toggle("stick", window.scrollY > 100); 

    /*===En este espacio vamos a hacer que desaparezcan el boton de navegacion=== link(scrol)*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};


/*===aqui vamos a configurar el scroll para que los objetos aparezvan basado en scroll===*/
ScrollReveal({
    //reset: true,
    distance:"80px",
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-conteiner, .heding', { origin: "top" });
ScrollReveal().reveal('.Home-img, .service-conteiner, .porfolio-box, .Contacto form', { origin: "bottom"}) 
ScrollReveal().reveal('.home-conteiner h1, .about-img', { origin: "left"})
ScrollReveal().reveal('.home-conteiner p, .about-conteiner', { origin: "right"})
