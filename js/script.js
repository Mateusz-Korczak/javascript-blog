{
  ("use strict");
  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector("#template-article-link").innerHTML
    ),
    articleTag: Handlebars.compile(
      document.querySelector("#template-article-tag").innerHTML
    ),
    articleAuthor: Handlebars.compile(
      document.querySelector("#template-article-author").innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector("#template-tag-cloud-link").innerHTML
    ),
    authorCloudLink: Handlebars.compile(
      document.querySelector("#template-author-cloud-link").innerHTML
    ),
  };

  const opts = {
    article: {
      ArticleSelector: ".post",
      ArticlesSelector: ".posts .post",
      TitleSelector: ".post-title",
      ArticleAuthorSelector: ".post-author",
      ArticleTagsSelector: ".post-tags .list",
    },
    titleLists: {
      ActiveTitlesSelector: ".titles a.active",
      TitlesSelector: ".titles li a",
      TitleListSelector: ".titles",
    },
    tagsList: {
      TagsListSelector: ".tags",
      href: 'a[href^="#tag-"]',
    },
    authorsList: {
      AuthorsListSelector: ".authors",
      href: '[href^="#author-"]',
    },
    cloudOpts: {
      CloudClassCount: 4,
      CloudClassPrefix: "tag-size-",
    },
  };

  const titleClickHandler = function (event) {
    event.preventDefault();
    const activeLinks = document.querySelectorAll(
      opts.titleLists.ActiveTitlesSelector
    );
    const activeArticles = document.querySelectorAll(
      opts.article.ArticlesSelector
    );
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
    const titleList = document.querySelector(opts.titleLists.TitleListSelector);
    const articles = document.querySelectorAll(
      opts.article.ArticleSelector + customSelector
    );

    let html = "";
    titleList.innerHTML = "";

    for (let article of articles) {
      const articleId = article.getAttribute("id");
      const articleTitle = article.querySelector(
        opts.article.TitleSelector
      ).innerHTML;
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

      html += linkHTML;
    }

    titleList.innerHTML = html;
  };

  const addClickListenersToUnit = function (selector, fun) {
    const unitsSelection = document.querySelectorAll(selector);

    for (let unit of unitsSelection) {
      unit.addEventListener("click", fun);
    }
  };

  const calculateParams = function (attributes) {
    const params = {
      max: 0,
      min: 1000,
    };

    for (let attribute in attributes) {
      params.max = Math.max(attributes[attribute], params.max);
      params.min = Math.min(attributes[attribute], params.min);
    }

    return params;
  };

  const calculateClass = function (count, params) {
    const classNumber = Math.floor(
      ((count - params.min) / (params.max - params.min)) *
        opts.cloudOpts.CloudClassCount +
        1
    );

    return opts.cloudOpts.CloudClassPrefix + classNumber;
  };

  const generateCountingList = function (unitList, unitAttribute) {
    if (!unitList[unitAttribute]) {
      unitList[unitAttribute] = 1;
    } else {
      unitList[unitAttribute]++;
    }
  };

  const generateTags = function () {
    const articles = document.querySelectorAll(opts.article.ArticleSelector);
    let allTags = {};

    for (let article of articles) {
      const articleTagsWrapper = article.querySelector(
        opts.article.ArticleTagsSelector
      );
      const articleTags = article.getAttribute("data-tags");
      const articleTagsArray = articleTags.split(" ");
      let html = "";

      for (let tag of articleTagsArray) {
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.articleTag(linkHTMLData);

        html = html + linkHTML;

        generateCountingList(allTags, tag);
      }

      articleTagsWrapper.innerHTML = html;
    }

    const tagList = document.querySelector(opts.tagsList.TagsListSelector);
    const tagsParams = calculateParams(allTags);
    const allTagsData = { tags: [] };
    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateClass(allTags[tag], tagsParams),
      });
    }

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };

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
    addClickListenersToUnit(opts.titleLists.TitlesSelector, titleClickHandler);
  };

  const generateAuthors = function () {
    const articles = document.querySelectorAll(opts.article.ArticleSelector);
    let allAuthors = {};
    let articleAuthor = "";

    for (let article of articles) {
      let html = "";
      const articleAuthorAtt = article.getAttribute("data-author");
      const articleAuthorDashRemoved = articleAuthorAtt.replace("-", " ");
      const linkHTMLData = {
        id: articleAuthorAtt,
        title: articleAuthorDashRemoved,
      };

      const linkHTML = templates.articleAuthor(linkHTMLData);

      generateCountingList(allAuthors, articleAuthorAtt);

      html += linkHTML;
      articleAuthor = article.querySelector(opts.article.ArticleAuthorSelector);
      articleAuthor.innerHTML = html;
    }

    const AuthorsList = document.querySelector(
      opts.authorsList.AuthorsListSelector
    );
    const AuthorsParams = calculateParams(allAuthors);
    const allAuthorsData = { authors: [] };

    for (let author in allAuthors) {
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateClass(allAuthors[author], AuthorsParams),
      });
    }

    AuthorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
  };

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
    addClickListenersToUnit(opts.titleLists.TitlesSelector, titleClickHandler);
  };

  generateTitleLinks();
  generateTags();
  generateAuthors();

  addClickListenersToUnit(opts.tagsList.href, tagClickHandler);
  addClickListenersToUnit(opts.authorsList.href, authorClickHandler);
  addClickListenersToUnit(opts.titleLists.TitlesSelector, titleClickHandler);
}
