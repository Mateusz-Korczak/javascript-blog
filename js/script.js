{
  ("use strict");

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add("active");

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts .post");
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const clickedElementHref = clickedElement.getAttribute("href");

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const selectedArticle = document.body.querySelector(clickedElementHref);

    /* [DONE] add class 'active' to the correct article */
    selectedArticle.classList.add("active");
  };

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";
  console.log("lala");

  const generateTitleLinks = function () {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearContent(content) {
      content.innerHTML = "";
    }
    clearContent(titleList);
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = "";
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute("id");
      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";
      /* [DONE] insert link into titleList */
      html = html + linkHTML;
      // [ALTERNATIVE VERSION] titleList.insertAdjacentHTML('beforebegin', linkHTML);
    }
    titleList.innerHTML = html;
  };

  generateTitleLinks();

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
