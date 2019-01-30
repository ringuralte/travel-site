import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  hideInitially() {
    for(let i=0; i<this.itemsToReveal.length; i++) {
      let item = this.itemsToReveal[i];
      item.classList.add('reveal-item');
    }
  }

  createWaypoints() {
    let that = this;
    for(let i=0; i<this.itemsToReveal.length; i++) {
      let currentItem = this.itemsToReveal[i];
      new Waypoint({
        element: currentItem,
        handler: function() {
          currentItem.classList.add('reveal-item--is-visible');
        },
        offset: that.offsetPercentage
      });
    }
  }

}

export default RevealOnScroll;
