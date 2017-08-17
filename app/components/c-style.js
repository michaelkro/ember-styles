import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'style',
  didInsertElement() {
    console.log('inserted');
    // console.log(this);
    console.dir(this.element);
    console.dir(this.element.sheet.cssRules);
    // Object.keys(this.element.sheet.cssRules).forEach((cssRuleKey) => {
    //   let cssRule = this.element.sheet.cssRules[cssRuleKey];
    //   console.log(cssRule);
    // })
    // console.log(this.parentView);
    let parentElementId = document.getElementById(this.parentView.elementId);
    let styleId = `${parentElementId}-styles`;
    document.head.appendChild(this.element);

  },
  willDestroyElement() {
    this.element.remove();
  }
});
