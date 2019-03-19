export default class Canvas {
  public readonly element: HTMLCanvasElement;
  public readonly context: CanvasRenderingContext2D;
  public onResize: (self: Canvas) => void;

  get width() {
    return this.element.width;
  }
  set width(value: number) {
    this.element.width = value;
  }

  get height() {
    return this.element.height;
  }
  set height(value: number) {
    this.element.height = value;
  }

  constructor(public readonly selector: string, { fillScreen = true } = {}) {
    this.element = document.querySelector(selector);
    this.context = this.element.getContext('2d');
    this.fillScreenSize = this.fillScreenSize.bind(this);

    if (fillScreen) {
      this.fillScreen();
    }
  }

  fillScreen({ watchResize = true } = {}) {
    this.fillScreenSize();

    if (watchResize) {
      window.addEventListener('resize', this.fillScreenSize);
    }
  }

  private fillScreenSize() {
    let hasChanged = false;

    if (this.element.width !== window.innerWidth) {
      this.element.width = window.innerWidth;
      hasChanged = true;
    }

    if (this.element.height !== window.innerHeight) {
      this.element.height = window.innerHeight;
      hasChanged = true;
    }

    if (hasChanged && this.onResize) {
      this.onResize(this);
    }
  }
}
