import { $ } from "./document";

export class alert {
  constructor(str) {
    const doc = document.createElement('div')
    doc.innerHTML = `
      <div style="position: absolute; width: 100vw; height: 100vh; background: rgba(0,0,0,.5);">
        <div style="background: #fff; width: 10vw; height: 100px; line-height: 100px; margin: 40px auto; text-align: center;">
          ${str}
        </div>
      </div>
    `
    const body = $.getEle('body')
    body.appendChild(doc)
  }
}