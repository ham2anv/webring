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
        // const currentIndex = this.data.sites.indexOf(this.data.sites.find(({url}) => url == window.location.url))
        const currentIndex = this.data.sites.indexOf(this.data.sites.find(({url}) => url == "https://www.nothingventuredgames.com/coding"))
        let previousURL,nextUrl;
        if (currentIndex == 0) {
            previousURL = this.data.sites[this.data.sites.length - 1].url;
            nextUrl = this.data.sites[currentIndex + 1].url;
        } else if (currentIndex == this.data.sites.length - 1) {
            previousURL = this.data.sites[currentIndex - 1].url;
            nextUrl = this.data.sites[0].url;
        } else {
            previousURL = this.data.sites[currentIndex - 1].url;
            nextUrl = this.data.sites[currentIndex + 1].url;
        }

        
        const shadow = this.attachShadow({mode: "open"});

        const ring = createElement('div','wr-ring');

        const title = createElement('div','wr-title');
        title.innerText = this.data.title;

        const current = createElement('div','wr-current');
        current.innerText = `You are on: ${document.title}`;

        const transfer = createElement('nav','wr-transfer');
        
        
        const previous = createElement('div','wr-previous');
        const prevLink = createElement('a','wr-link',{href: previousURL})
        prevLink.innerText = "Previous";
        previous.append(prevLink);

        const next = createElement('div','wr-next');

        const nextLink = createElement('a','wr-link',{href: nextUrl})
        nextLink.innerText = "Next";
        next.append(nextLink);

        const list = createElement('div','wr-list');
        const listLink = createElement('a','wr-link',{href: this.data.list})
        listLink.innerText = "List";
        list.append(listLink);

        transfer.append(previous,next,list);
        ring.append(title,current,transfer);
        shadow.append(ring);

        const style = createElement('link',{rel:'stylesheet',href:(this.getAttribute('css')||this.data.style)});
        
        shadow.append(style);
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
