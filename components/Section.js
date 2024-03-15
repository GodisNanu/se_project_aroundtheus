export class Section {
  constructor({ items, renderer }, Card) {
    renderItems = () => {
      items.forEach((item) => {
        renderer();
      });
    };

    addItem = () => {};
  }
}
