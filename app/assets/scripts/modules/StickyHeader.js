import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.siteHeader = document.getElementsByClassName('site-header');
    this.headerTriggerElement = document.getElementsByClassName('large-hero__title');
    this.createHeaderWayPoint();
  }

  createHeaderWayPoint() {
    let header = this.siteHeader[0];
    let trigger = this.headerTriggerElement[0];
    new Waypoint({
      element: trigger,
      handler: function(direction) {
        if(direction == "down") {
          header.classList.add('site-header--dark');
        } else {
          header.classList.remove('site-header--dark');
        }
      },
    });
  }

}

export default StickyHeader;
