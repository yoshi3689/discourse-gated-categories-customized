import { withPluginApi } from "discourse/lib/plugin-api";
import discourseComputed from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";

const enabledCategories = settings.enabled_categories
  .split("|")
  .map((id) => parseInt(id, 10))
  .filter((id) => id);

const PLUGIN_ID = "discourse-gated-category";

export default {
  name: "require-signup-on-select-category",
  initialize() {
    withPluginApi("0.8.14", (api) => this.initWithApi(api));
  },

  initWithApi(api) {
    const site = api.container.lookup("site:main");

    api.modifyClass("component:topic-list-item", {
      pluginID: PLUGIN_ID,
      excerptsRouter: service("router"),

      @discourseComputed(
        "excerptsRouter.currentRouteName",
        "excerptsRouter.currentRoute.attributes.category.id"
      )
      requireSignUpCategoryId(currentRouteName, categoryId) {
        if (!currentRouteName.match(/^discovery\./)) return;
        return categoryId;
      },

      @discourseComputed("requireSignUpCategoryId")
      expandPinned(viewingCategory) {
        const overrideEverywhere =
          enabledCategories.length === 0;

        const overrideInCategory = enabledCategories.includes(viewingCategory);

        return overrideEverywhere || overrideInCategory
          ? true
          : this._super();
      },
    });
  },
};
  