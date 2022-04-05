import Component from "@ember/component";
import I18n from "I18n";
import discourseComputed from "discourse-common/utils/decorators";
import { default as getURL } from "discourse-common/lib/get-url";
// import cookie from "discourse/lib/cookie";

export default Component.extend({
  tagName: "",
  hidden: true,

  didInsertElement() {
    this._super(...arguments);
    this.appEvents.on("cta:shown", this, this._triggerPrompt);
  },

  willDestroyElement() {
    this.appEvents.off("cta:shown", this, this._triggerPrompt);
  },

  _triggerPrompt() {
    this.set("hidden", false)
  },

  @discourseComputed("hidden")
  shouldShow(hidden) {
    return !hidden;
  },

  // @action
  // dismissBanner() {
  //   this.keyValueStore.setItem("anon-cta-never", "t");
  //   this.session.set("showSignupCta", false);
  //   this.set("hidden", true);
  // },

  // @action
  // showBannerLater() {
  //   this.keyValueStore.setItem("anon-cta-hidden", Date.now());
  //   this.set("hidden", true)
  // },
});
