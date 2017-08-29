import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'style',
  isGlobal: true,
  isNamespaced: true,
  isScoped: Ember.computed.not('isGlobal'),
  selfKeyword: ['this'],
  /**
   * Builds the prefix that will be prefixed to all CSS selectors. The prefix
   * will either be the parent element ID, the component's base class, or
   * both.
   */
  selectorPrefix: Ember.computed('isScoped', 'isNamespaced', function() {
    let prefix = '';
    let parentElementId = this.parentView.elementId;
    let parentType = this.parentView.constructor.prototype.classNames[0];

    // If the styles should be scoped, prefix the parent element id to selectors
    if (this.get('isScoped')) {
      prefix += `#${parentElementId}`;
    }

    // If the styles should be scoped, prefix the parent's base
    // class name (the first class in the className properties) to selectors
    if (this.get('isNamespaced') && parentType) {
      prefix += `.${parentType}`;
    }

    return prefix;
  }),

  /**
   * Applies a prefix to all given styles.
   */
  updatedStyles: Ember.computed('selectorPrefix', function () {
    let numberOfCssRules = this.element.sheet.cssRules.length;
    let newStyles = '';
    let prefix = this.get('selectorPrefix');

    for (var i = 0; i < numberOfCssRules; i++) {
      let cssRule = this.element.sheet.cssRules[i].cssText;
      let prefixedCssRule = `${prefix} ${cssRule}`;

      if (this.element.sheet.cssRules[i].selectorText === 'this') {
        prefixedCssRule = prefixedCssRule.replace('this', '')
      }

      newStyles += `${prefixedCssRule}\n`;
    }

    return newStyles;
  }),

  didInsertElement() {
    this.send('applyStyles');
  },

  willDestroyElement() {
    this.element.remove();
  },

  actions: {
    applyStyles() {
      this.element.innerHTML = this.get('updatedStyles');
      document.head.appendChild(this.element);
    }
  }
});
