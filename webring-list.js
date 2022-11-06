class WebRingList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.hasAttribute("source")) {
            fetch(this.getAttribute("source"))
            .then(response => response.json())
            .then(value => {
                this.data=value;
                this.make()
            });
        }
    }

    make() {
        const shadow = this.attachShadow({mode: "open"});

        const page = createElement('div','wl-page');

        const title = createElement('h1','wl-title');
        title.innerText = this.data.title;

        const description = createElement('div','.wl-description');
        description.innerText = this.data.description;

        const list = createElement('ol','wl-list');

        this.data.sites.forEach(site => {
            const listItem = createElement('li','wl-item');
            const itemLink = createElement('a','wl-link',{href:site.href});
            itemLink.innerText = site.title;
            listItem.append(itemLink);
            list.append(listItem);
        });

        const style = createElement('link',{rel: 'stylesheet',href:this.getAttribute('css') || this.data.style});

        page.append(title,description,list);
        shadow.append(page,style);
    }
}

function createElement(element, styles=null, props=null) {
    if (arguments.length == 2 && typeof styles == "object") props = styles;
    const newElement = document.createElement(element);
    if (styles && props != styles) newElement.classList.add(styles.split(' '));
    if (props) {
        for (let [key,value] of Object.entries(props)) {
            newElement.setAttribute(key,value);
        }
    }
    return newElement;
}


customElements.define("web-ring-list",WebRingList);