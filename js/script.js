'use strict';


const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    // console.log('clickedElement:', clickedElement);
    // console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    // const hrefer = clickedElement.href;
    // console.log("to ten href: " + hrefer);
    const clickedElementHref = clickedElement.getAttribute("href");
    console.log("getElement href: " + clickedElementHref);
    // Podświetlenia rozwiązane za pomocą CSS

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const selectedArticle = document.body.querySelector(clickedElementHref);
    // [PYTANIE] jak zrobić selector z wyszukanim id, ktore jest zawarte w zmiennej???
    // document.querySelector(".post [id=`${clickedElementHref}`]"); tutaj nie działa `${xyz}`
    
    /* [DONE] add class 'active' to the correct article */
    selectedArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}