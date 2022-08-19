import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";

const enabledCategories = settings.enabled_categories
  .split("|")
  .map((id) => parseInt(id, 10))
  .filter((id) => id);

export default Component.extend({
  tagName: "",
  hidden: true,

  didInsertElement() {
    this._super(...arguments);
    this.recalculate();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.recalculate();
  },

  willDestroyElement() {
    document.body.classList.remove("topic-in-gated-category");
  },

  recalculate() {
    console.log(this);
    console.log("user for gated category", this.currentUser);
    // do nothing if:
    // a) topic does not have a category
    // b) component setting is empty
    // c) user is logged in
    if (
      !this.categoryId ||
      enabledCategories.length === 0 ||
      this.currentUser.groups.any(g => g.name === "Member_Directory")
    ) {
      return;
    }

    if (enabledCategories.includes(this.categoryId)) {
      document.body.classList.add("topic-in-gated-category");
      this.set("hidden", false);
    }
  },

  @discourseComputed("hidden")
  shouldShow(hidden) {
    return !hidden;
  },
});
