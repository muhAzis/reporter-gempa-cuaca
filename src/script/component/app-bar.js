class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      nav {
        background: linear-gradient(175deg, #2ec4b6, #ddf8f6);
        padding: 15px 40px;
      }

      h3 {
        color: white;
        font-size: 70px;
        font-weight: 900;
        line-height: 0.8;
      }
      
      h4 {
        color: white;
      }
    </style>
    <nav>
        <h3>RGC</h3>
        <h4>Reporter Gempa & Cuaca</h4>
    </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
