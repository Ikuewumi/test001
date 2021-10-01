const menuToggle = document.getElementById('menu_toggle');
const menu = document.querySelector('.menu');
const header = document.querySelector('header h1');
const main = document.querySelector('main');
const menuList = menu.querySelector('ul');
const redColr = '--red';
const blueColr = '--blue';
const greenColr = '--green';
let textClass = localStorage.getItem('textClass');
console.log(textClass);



// color setter
function colorSetter () {
    var red = Math.floor((Math.random() * 250))
    var green = Math.floor((Math.random() * 200))
    var blue = Math.floor((Math.random() * 250))
    document.documentElement.style.setProperty(redColr, `${red}`);
    document.documentElement.style.setProperty(greenColr, `${green}`);
    document.documentElement.style.setProperty(blueColr, `${blue}`);
}

menuToggle.addEventListener('click', e => {
    e.preventDefault();
    if(menu.classList.contains('closed')) {
        menu.classList.remove('closed');
        menu.classList.add('open');
    } else {
        menu.classList.remove('open');
        menu.classList.add('closed');
    }
});

function getTxt(resource) {
    colorSetter();
    fetch('/json/dummmy.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        main.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            if(data[i].topic.includes(resource)){
                document.title = data[i].heading;
                header.innerHTML= data[i].heading;
                data[i].sections.forEach(section => {
                    var sect = document.createElement('section');
                    sect.innerHTML= 
                    `<div class="mt">
                        <h2>${section.mh}</h2>
                    </div>
                    <div class="mb">
                        <p>${section.mb}</p>
                    </div>`;
                    main.appendChild(sect);
                });
            } else {
                
            }
            window.scrollTo(0, 0)
        }
    })
    .catch((err) => {
        console.log(err);
        alert("Could not find the resource");
    })
    
}
if(textClass === null){
    getTxt('home');

}else {
    getTxt(textClass);
}



menuList.addEventListener('click', e => {
    if(e.target.nodeName === 'LI') {
        // let linkName = e.target.className;
        getTxt(e.target.className);
        let textClass = localStorage.setItem('textClass', e.target.className);
        return textClass;
    };
});
