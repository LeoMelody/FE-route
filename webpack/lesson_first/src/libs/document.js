export class $ {
  constructor() {

  }

  static getEle(str) {
    return document.querySelector(`${str}`)
  }

  static getEles(str) {
    return document.querySelectorAll(`${str}`)
  }
}