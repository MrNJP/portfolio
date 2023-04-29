const template = document.createElement("template");
//Makes the header style
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
    
    <header class="hero is-small is-primary is-bold p-2">
    <div class="hero-body">
        <div class="container">
            <h1 class="title"><slot name="my-title"></slot></h1>
            <h2 class="subtitle"><slot name="my-subtitle"></slot></h2>
        </div>
    </div>
    </header>
`;

class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
//Creates new Element
customElements.define('my-header', MyHeader);
export {MyHeader};
