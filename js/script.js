{
  ("use strict");

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list",
    optArticleAuthorSelector = ".post-author",
    optTagsListSelector = "tags.list",
    optCloudClassCount = 5,
    optCloudClassPrefix = "tag-size",

  const titleClickHandler = function (event) {
    event.preventDefault();
    const activeLinks = document.querySelectorAll(".titles a.active");
    const activeArticles = document.querySelectorAll(".posts .post");
    const selectedArticle = document.body.querySelector(
      this.getAttribute("href")
    );

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    this.classList.add("active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    selectedArticle.classList.add("active");
  };

  const generateTitleLinks = function (customSelector = "") {
    const titleList = document.querySelector(optTitleListSelector);
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    let html = "";

    titleList.innerHTML = "";

    for (let article of articles) {
      const articleId = article.getAttribute("id");
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML =
        "<li><a href=#" +
        articleId +
        "><span>" +
        articleTitle +
        "</span></a></li>";
      html += linkHTML;
    }

    titleList.innerHTML = html;
  };

  generateTitleLinks();

  const calculateTagsParams = function (tags) {
    const params = {
      max: 0,
      min: 1000,
    };
    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);

      // console.log(tag + " is used " + tags[tag] + " times");
    }
    console.log(params);
    return params;
  };

  const generateTags = function () {
    const articles = document.querySelectorAll(optArticleSelector);
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    for (let article of articles) {
      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
      let html = "";
      const articleTags = article.getAttribute("data-tags");
      const articleTagsArray = articleTags.split(" ");

      for (let tag of articleTagsArray) {
        const linkHTML =
          "<li><a href=#tag-" + tag + "><span>" + tag + "</span></a></li> ";
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }

      articleTagsWrapper.innerHTML = html;
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(".tags");
    const tagsParams = calculateTagsParams(allTags);
    console.log("tagsParams:", tagsParams);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = "";

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //<li><a href="#">design</a> <span>(6)</span></li>
      // allTagsHTML += tag + " (" + allTags[tag] + ") ";
      allTagsHTML +=
        '<li><a href="#tag-' +
        tag +
        '">' +
        tag +
        "</a> <span>" +
        " (" +
        allTags[tag] +
        ") " +
        "</span></li>";
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };

  generateTags();

  const tagClickHandler = function (event) {
    event.preventDefault();

    const href = this.getAttribute("href");
    const tag = href.replace("#tag-", "");
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let activeTag of activeTagLinks) {
      activeTag.classList.remove("active");
    }

    for (let foundTagLink of foundTagLinks) {
      foundTagLink.classList.add("active");
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
    addClickListenersToTitleLinks();
  };

  const addClickListenersToTags = function () {
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    for (let tagLink of tagLinks) {
      tagLink.addEventListener("click", tagClickHandler);
    }
  };

  addClickListenersToTags();

  const generateAuthors = function () {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      let html = "";
      const articleAuthorAtt = article.getAttribute("data-author");
      const linkHtml =
        "<li><a href=#author-" +
        articleAuthorAtt +
        "><span>by " +
        articleAuthorAtt +
        "</span></a></li>";
      html += linkHtml;
      const articleAuthor = article.querySelector(optArticleAuthorSelector);
      articleAuthor.innerHTML = html;
    }
  };
  generateAuthors();

  const authorClickHandler = function (event) {
    event.preventDefault();
    const href = this.getAttribute("href");
    const author = href.replace("#author-", "");
    const activeAuthorLinks = document.querySelectorAll(
      'a.active[href^="#author-"]'
    );
    const foundAuthorLinks = document.querySelectorAll(
      'a[href="' + href + '"]'
    );

    for (let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove("active");
    }

    for (let foundAuthorLink of foundAuthorLinks) {
      foundAuthorLink.classList.add("active");
    }

    generateTitleLinks('[data-author~="' + author + '"]');
    addClickListenersToTitleLinks();
  };

  const addClickListenersToAuthors = function () {
    const authorsLinks = document.querySelectorAll('[href^="#author-"]');

    for (let authorLink of authorsLinks) {
      authorLink.addEventListener("click", authorClickHandler);
    }
  };

  addClickListenersToAuthors();

  const addClickListenersToTitleLinks = function () {
    const links = document.querySelectorAll(".titles li a");

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  };

  addClickListenersToTitleLinks();
}
