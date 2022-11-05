import { FormGroupInput, Card, DropDown, Button } from "../components/index";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install: (app, options) => {
    app.component("fg-input", FormGroupInput);
    app.component("drop-down", DropDown);
    app.component("card", Card);
    app.component("p-button", Button);
  }
};

export default GlobalComponents;
