let converter = new showdown.Converter();
// used showdown cdn to render the makrdown items to show them in the body of the blog;

const fetchUrl = `http://localhost:1337/api/blogs?populate=*`; //use can customize this url when you deploy your strapi app

const fetchBlogs = async () => {
  const res = await fetch(fetchUrl);
  const data = await res.json();

  const mapData = data.data
    .map((post) => {
      const { Title, Body, topic, shortDesc, image } = post.attributes;
      let md = Body; //set to Body to render the markdown

      let theHtml = converter.makeHtml(md); // use this to set the innerHTML for one html element(div) to show your content with markdown

      // you can view the rendering cdn docs more at: https://dev.to/sh20raj/convert-markdown-or-md-url-to-html-markdowntohtml-using-javascript-ft-showdownjs-1med

      // use the 'Body' to get the body of the post and show it when the user click on it;
      // use 'shortDesc' parameter for setting the short description for the blog that would be displayed on the resources page that would end up in "...";
      // use the 'topic' parameter to indicate your topic like 'Developement'..

      const { url } = image.data[0].attributes;

      // I set the href of the link for the adress to '#' b/c its difficult implementing dynamic routing easily in this vanilla js and html pages..

      // handle this to show the post in other page..however you can get the data through the api.

      const blogMarkup = `<a href="#">  
      <div class="blogItem" data-topic=${topic}>
      <div class="imageDiv" style="background-image: url('http://localhost:1337${url}')"></div>
        <div class="text">
          <p class="itemTopic">${topic}</p>
          <p class="blog Header">
          ${Title}
          </p>
          <p class="blogText">
           ${shortDesc}...
          </p>  
          </div>
        </div>
      </div>
    </a>`;

      return blogMarkup;
    })
    .join("");
  document.querySelector(".leftCol").innerHTML = mapData;
};

fetchBlogs();
