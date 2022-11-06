class Webring extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: "open"});

        const ring = createElement('div','wr-ring');

        const title = createElement('div','wr-title');
        title.innerText = "[Webring Title]";

        const current = createElement('div','wr-current');
        current.innerText = "You are on: [current page]";

        const transfer = createElement('nav','wr-transfer');
        
        const previous = createElement('div','wr-previous');
        const prevLink = createElement('a','wr-link',{href: '#'})
        prevLink.innerText = "Previous";
        previous.append(prevLink);

        const next = createElement('div','wr-next');
        const nextLink = createElement('a','wr-link',{href: '#'})
        nextLink.innerText = "Next";
        next.append(nextLink);

        const list = createElement('div','wr-list');
        const listLink = createElement('a','wr-link',{href: '#'})
        listLink.innerText = "List";
        list.append(listLink);

        transfer.append(previous,next,list);
        ring.append(title,current,transfer);
        shadow.append(ring);

        const style = createElement('style');
        style.textContent = `
        .wr-ring {
            width: max-content;
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
