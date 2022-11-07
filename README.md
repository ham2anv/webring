# &lt;web-ring&gt;
Recreating the old web ring experience as a modern, standards-based web component.

The `<web-ring>` component lets a member add a widget to their web page that
includes links to the previous and next pages in the ring as well as a central
list of ring pages.

## Creating a Ring
Creating your own web ring is easy. Just create a new GitHub repo using this one as a template. 
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

For your ring's list page, you can just use the `index.html` in your GitHub Pages. Or you can put the list
on any web page by including two things.

1. A `<script>` element that links to the `webring-list.js` file in your repo.
2. A `<web-ring-list>` element with a `source` attribute that points to your `source.json` file.

## Joining a Ring
Becoming a member of a ring can be as simple as contacting the ring's owner and having them add your
page to the ring. One easy way to contact the ring owner is to open an issue on the repo and use the Add
New Member template. This creates an issue that the ring owner can review and accept or reject as
necessary. Once they confirm you have been added, follow the directions below for "Using a Ring."

If both the prospective member _and_ the ring's owner are comfortable with GitHub, the member can fork
the ring's repository and create a pull request adding their information to the `source.json` file. The
owner can review these changes and merge them, adding the new member.

## Using a Ring
To add a web ring to your page, you must include a `<script>` element that links to
the ring's JavaScript file:

```html
<script src="https://RING_OWNER_USERNAME.github.io/REPO_NAME/webring.js"></script>
```

Then you put a `<web-ring>` element wherever you want the web ring widget to appear in your page.
This element must have a `source` attribute that points to the ring's `source.json` file:

```html
<web-ring source="https://RING_OWNER_USERNAME.github.io/REPO_NAME/source.json"></web-ring>
```

The widget expects to be found on a page with the exact address found in `source.json`. If you
include it on another page that isn't in the list, it will default to displaying controls for
the first page in the ring.

## Customizing Your Ring
If you are familiar with CSS, you can customize the appearance of your web ring widget as well
as the ring's list page by editing the `webring.css` file in your repo.

If you are a member putting the widget on your page, you can include your own CSS file to style
the widget as you see fit. In your `<web-ring>` element, include a `css` attribute that points to
your CSS file.

This component uses a number of CSS classes to style parts of the widget and the ring list:

- `.wr-ring` styles the container holding the entire widget.
- `.wr-title` styles the title line of the widget.
- `.wr-description` styles the description line of the widget.
- `.wr-transfer` styles the line that holds the ring links.
- `.wr-previous` styles the "Previous" link.
- `.wr-next` styles the "Next" link.
- `.wr-list` styles the "List" link.
- `.wl-page` styles the ring list page container.
- `.wl-title` styles the title of the ring list page.
- `.wl-description` styles the description line of the ring list page.
- `.wl-list` styles the ordered list that holds the links on the ring list page.
- `.wl-item` styles the list items for each link on the ring list page.
