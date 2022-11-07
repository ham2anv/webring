class Webring extends HTMLElement {
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
        const currentIndex = Math.max(this.data.sites.indexOf(this.data.sites.find(({url}) => url == window.location.url)),0);
        let previousIndex,nextIndex;
        if (currentIndex == 0) {
            previousIndex = this.data.sites.length - 1;
            nextIndex = 1;
        } else if (currentIndex == this.data.sites.length - 1) {
            previousIndex = currentIndex - 1;
            nextIndex = 0;
        } else {
            previousIndex = currentIndex - 1;
            nextIndex = currentIndex + 1;
        }

        const shadow = this.attachShadow({mode: "open"});

        const ring = createElement('div','wr-ring');

        const title = createElement('div','wr-title');
        title.innerText = this.data.title;

        const current = createElement('div','wr-description');
        current.innerText = this.data.description || "";

        const transfer = createElement('nav','wr-transfer');
        
        const previous = createElement('div','wr-previous');
        const prevLink = createElement('a','wr-link',{href: this.data.sites[previousIndex].url})
        prevLink.innerText = "Previous";
        previous.append(prevLink);

        const next = createElement('div','wr-next');

        const nextLink = createElement('a','wr-link',{href: this.data.sites[nextIndex].url})
        nextLink.innerText = "Next";
        next.append(nextLink);

        const list = createElement('div','wr-list');
        const listLink = createElement('a','wr-link',{href: this.data.list})
        listLink.innerText = "List";
        list.append(listLink);

        const style = createElement('link',{rel:'stylesheet',href:(this.getAttribute('css')||this.data.style)});

        transfer.append(previous,next,list);
        ring.append(title,current,transfer);
        shadow.append(ring,style);
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

customElements.define("web-ring", Webring);