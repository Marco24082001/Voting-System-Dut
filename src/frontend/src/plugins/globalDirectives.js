import { directive } from "vue3-click-away";

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install: (app, options) => {
    app.directive("ClickAway", directive);
  }
};

export default GlobalDirectives;
