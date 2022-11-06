# &lt;web-ring&gt;
Recreating the old web ring experience as a modern, standards-based web component.

The `<web-ring>` component lets a member add a widget to their web page that
includes links to the previous and next pages in the ring as well as a central
list of ring pages.

## Creating a Ring
Creating your own web ring is easy. Just create a new GitHub repo using this one as a template:
![image](https://user-images.githubusercontent.com/17101837/200187999-6bfedf4c-8a36-4ba8-bdbf-3cc5e4dbb24a.png)

Make sure your new repo is public, then [activate GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site) for it.

Once you have your repo set up, you need to edit the `source.json` file, adding your ring's title,
description, and each of the pages you want to have in your ring. And make sure you update the address
of your GitHub page in `list` and `style`.

```json
{
    "title": "YOUR RING TITLE",
    "list": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/index.html",
    "style": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/webring.css",
    "description": "YOUR RING DESCRIPTION",
    "sites": [
        {
            "title": "SITE 1 TITLE",
            "url": "SITE 1 URL"
        },
        {
            "title": "SITE 2 TITLE",
            "url": "SITE 2 URL"
        }
    ]
}
```

## Using a Ring
To add a web ring to your page, you must include a `script` element that links to
the ring's JavaScript file:

```html
<script src="https://RING_OWNER_USERNAME.github.io/REPO_NAME/webring.js"></script>
```

Then you put a `web-ring` element wherever you want the web ring widget to appear in your page.
This element must have a `source` attribute that points to the ring's `source.json` file:

```html
<web-ring sourc="https://RING_OWNER_USERNAME.github.io/REPO_NAME/source.json"></web-ring>
```

