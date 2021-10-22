{
  ("use strict");

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log(this);
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
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list",
    optArticleAuthorSelector = ".post-author";

  const generateTitleLinks = function (customSelector = "") {
    // console.log(customSelector);
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearContent(content) {
      content.innerHTML = "";
    }
    clearContent(titleList);
    /* [DONE] for each article */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    // console.log(articles);
    let html = "";
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute("id");
      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */
      const linkHTML =
        "<li><a href=#" +
        articleId +
        "><span>" +
        articleTitle +
        "</span></a></li>";
      /* [DONE] insert link into titleList */
      html = html + linkHTML;
      // [ALTERNATIVE VERSION] titleList.insertAdjacentHTML('beforebegin', linkHTML);
    }
    titleList.innerHTML = html;
    // console.log(titleList);
  };

  generateTitleLinks();

  const generateTags = function () {
    /* DONE: find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    // console.log(articles);

    /* DONE: START LOOP: for every article: */
    for (let article of articles) {
      /* DONE: find tags wrapper */
      // console.log(article);
      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
      // console.log(articleTagsWrapper);
      /* DONE: make html variable with empty string */
      let html = "";
      /* DONE: get tags from data-tags attribute */
      const articleTags = article.getAttribute("data-tags");
      // console.log(articleTags);
      /* DONE: split tags into array */
      const articleTagsArray = articleTags.split(" ");
      // console.log(articleTagsArray);
      /* DONE: for each tag */
      for (let tag of articleTagsArray) {
        /* DONE: generate HTML of the link */
        const linkHtml =
          "<li><a href=#tag-" + tag + "><span>" + tag + "</span></a></li> ";
        // console.log(linkHtml);
        /* DONE: add generated code to HTML variable */
        html = html + linkHtml;
        // console.log(html);
        /* DONE: END LOOP: for each tag */
      }
      /* DONE: insert HTML of all the links into the tags wrapper */
      articleTagsWrapper.innerHTML = html;
      // console.log(articleTagsWrapper);
      /* DONE: END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function (event) {
    /* DONE: prevent default action for this event */
    event.preventDefault();
    /* DONE: make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    // console.log(this);
    /* DONE: make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    // console.log(href);
    /* DONE: make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace("#tag-", "");
    // console.log(tag);
    /* DONE: find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);
    /* DONE: START LOOP: for each active tag link */
    for (let activeTag of activeTagLinks) {
      /* DONE: remove class active */
      activeTag.classList.remove("active");
      console.log(activeTag);
      /* DONE: END LOOP: for each active tag link */
    }
    console.log(activeTagLinks);
    /* DONE: find all tag links with "href" attribute equal to the "href" constant */
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    // console.log(foundTagLinks);
    /* DONE: START LOOP: for each found tag link */
    for (let foundTagLink of foundTagLinks) {
      /* DONE: add class active */
      foundTagLink.classList.add("active");
      // console.log(foundTagLink);
      /* DONE: END LOOP: for each found tag link */
    }

    /* DONE: execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
    addClickListenersToTitleLinks();
  };

  const addClickListenersToTags = function () {
    /* DONE: find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* DONE: START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* DONE: add tagClickHandler as event listener for that link */
      tagLink.addEventListener("click", tagClickHandler);
      /* DONE: END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  /*
  1. DONE: w każdym artykule dodaj autora w atrybucie data-author (usuń autora z wrappera .post-author),
  */

  /*
  2. DONE: wyświetl autora jako link we wrapperze post-author, pod tytułem artykułu,
  const generateAuthors = function () {};
  */

  const generateAuthors = function () {
    /* DONE:: find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* DONE: START LOOP: for every article: */
    for (let article of articles) {
      /* DONE: make html variable with empty string */
      let html = "";
      /* DONE: get tags from data-tags attribute */
      const articleAuthorAtt = article.getAttribute("data-author");
      // console.log(articleAuthorAtt);
      /* DONE: generate HTML of the link */
      const linkHtml =
        "<li><a href=#author-" +
        articleAuthorAtt +
        "><span>by " +
        articleAuthorAtt +
        "</span></a></li>";
      /* DONE: add generated code to HTML variable */
      html = html + linkHtml;
      // console.log(html);
      /* DONE: insert HTML of all the links into the tags wrapper */
      const articleAuthor = article.querySelector(optArticleAuthorSelector);
      articleAuthor.innerHTML = html;
    }
  };

  generateAuthors();

  /*
  3. DONE: powiąż kliknięcie w link do autora z wygenerowaniem przefiltrowanej listy artykułów.



  optArticleAuthorSelector
  */
  const authorClickHandler = function (event) {
    /* DONE: prevent default action for this event */
    event.preventDefault();
    /* DONE: make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* DONE: make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* DONE: make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace("#author-", "");
    // console.log(author);
    /* DONE: find all tag links with class active */
    const activeAuthorLinks = document.querySelectorAll(
      'a.active[href^="#author-"]'
    );
    /* DONE: START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks) {
      /* DONE: remove class active */
      activeAuthorLink.classList.remove("active");
      /* DONE: END LOOP: for each active tag link */
    }
    /* DONE: find all tag links with "href" attribute equal to the "href" constant */
    const foundAuthorLinks = document.querySelectorAll(
      'a[href="' + href + '"]'
    );
    /* DONE: START LOOP: for each found tag link */
    for (let foundAuthorLink of foundAuthorLinks) {
      /* DONE: add class active */
      foundAuthorLink.classList.add("active");
      /* DONE: END LOOP: for each found tag link */
    }
    generateTitleLinks('[data-author~="' + author + '"]');
    addClickListenersToTitleLinks();
  };

  const addClickListenersToAuthors = function () {
    /* DONE: find all links to tags */
    const authorsLinks = document.querySelectorAll('[href^="#author-"]');
    /* DONE: START LOOP: for each link */
    for (let authorLink of authorsLinks) {
      /* DONE: add tagClickHandler as evenlistener for that link */
      authorLink.addEventListener("click", authorClickHandler);
      /* DONE: END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();

  const addClickListenersToTitleLinks = function () {
    const links = document.querySelectorAll(".titles li a");
    console.log(links);

    for (let link of links) {
      console.log(link);
      link.addEventListener("click", titleClickHandler);
    }
  };
  addClickListenersToTitleLinks();
}
