class Webring extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.hasAttribute("source")) {
            fetch(this.getAttribute("source"))
            .then(response => response.json())
            .then(value => {
                this.ringData=value;
                this.make()
            });
        }
    }

    make() {
        // const currentIndex = this.ringData.sites.indexOf(this.ringData.sites.find(({url}) => url == window.location.url))
        const currentIndex = this.ringData.sites.indexOf(this.ringData.sites.find(({url}) => url == "https://www.nothingventuredgames.com/coding"))
        let previousURL,nextUrl;
        if (currentIndex == 0) {
            previousURL = this.ringData.sites[this.ringData.sites.length - 1].url;
            nextUrl = this.ringData.sites[currentIndex + 1].url;
        } else if (currentIndex == this.ringData.sites.length - 1) {
            previousURL = this.ringData.sites[currentIndex - 1].url;
            nextUrl = this.ringData.sites[0].url;
        } else {
            previousURL = this.ringData.sites[currentIndex - 1].url;
            nextUrl = this.ringData.sites[currentIndex + 1].url;
        }

        
        const shadow = this.attachShadow({mode: "open"});

        const ring = createElement('div','wr-ring');

        const title = createElement('div','wr-title');
        title.innerText = this.ringData.title;

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
        const listLink = createElement('a','wr-link',{href: this.ringData.list})
        listLink.innerText = "List";
        list.append(listLink);

        transfer.append(previous,next,list);
        ring.append(title,current,transfer);
        shadow.append(ring);

        const style = createElement('style');
        style.textContent = `
        .wr-ring {
            max-width: max-content;
        }
        .wr-title {
            font-weight: bold;
            font-size: 1.2em;
            text-align: center;
        }
        .wr-current {

        }
        .wr-transfer {
            display: flex;
            justify-content: space-around;
        }
        .wr-previous {

        }
        .wr-next {

        }
        .wr-list {

        }`
        shadow.append(style);
    }
}

function createElement(element, styles=null, props=null) {
    const newElement = document.createElement(element);
    if (styles) newElement.classList.add(styles.split(' '));
    if (props) {
        for (let [key,value] of Object.entries(props)) {
            newElement.setAttribute(key,value);
        }
    }
    return newElement;
}

customElements.define("web-ring", Webring);
