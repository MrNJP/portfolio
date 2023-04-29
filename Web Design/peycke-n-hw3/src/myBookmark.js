const template = document.createElement("template");
//Makes the template styles
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
        :host{
            display: inline-block;
            height: 3rem;
            line-height: 3rem;
        }
        #link{
            display: inline-block;
            width: 8rem;
        }
        #buttons{
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
        }
        a{
            display: inline-block;
            vertical-align: middle;
            line-height;
        }
        </style>
        <div class="has-background-link pl-1 pr-1">
            <span id="link" class="is-family-sans-serif">
                <a href="" class="has-text-light" target="_blank">???</a>
            </span>
            <span id="buttons">
                <button class="button is-success is-small" disabled>
                    <span class="icon is-small">
                        <i class="fas fa-check"></i>
                    </span>
                    <span>Favorite</span>
                </button>
                <button id="delete" class="button is-warning is-small">
                    <span>Delete</span>
                    <span class="icon is-small">
                        <i class="fas fa-times"></i>
                    <span>
                </button>
            </span>
        </div>
    `;
class MyBookmark extends HTMLElement {
  //Creates a default bookmark that shows RIT
    constructor() {
        super();
        this._text = "RIT";
        this._url = "https://www.rit.edu/";
        this._comments = "No comments found";

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // tells what variables to look out for
    static get observedAttributes() {
        return ["data-text", "data-url", "data-comments", "data-fid"];
    }

    // called when the component is inserted into the DOM
    connectedCallback() {
        const defaultCallback = () => console.log(`this._callback is not defined for ${this.tagName}`);
        this.callback = this.callback || defaultCallback;
        this.shadowRoot.querySelector("#delete").onclick = () => this.callback(this._fid);
        this.render();
    }

    //Changes variables if they are different from the older values
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (attributeName == "data-text") {
            this._text = newValue;
        }
        if (attributeName == "data-url") {
            this._url = newValue;
        }
        if (attributeName == "data-comments") {
            this._comments = newValue;
        }
        if (attributeName == "data-fid"){
            this._fid = newValue;
        }
        this.render();
    }

    render() {
        let a = this.shadowRoot.querySelector("a");
        if (a) {
            a.href = this._url;
            a.textContent = this._text;
            a.title = this._comments;
        }
    }
}

//Makes a new element
customElements.define('my-bookmark', MyBookmark);

export { MyBookmark };