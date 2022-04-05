import { acceptance, query } from "discourse/tests/helpers/qunit-helpers";
import { visit } from "@ember/test-helpers";
import { test } from "qunit";

acceptance("Gated Category - Anonymous", function (needs) {
  needs.hooks.beforeEach(() => {
    settings.enabled_categories = "2";
  });

  needs.hooks.afterEach(() => {
    settings.enabled_categories = "";
  });

  test("Viewing Topic in gated category", async function (assert) {
    await visit("/t/internationalization-localization/280");

    assert.ok(
      query(".topic-in-gated-category .custom-gated-topic-content"),
      "gated category prompt shown for anons on selected category"
    );
  });

  test("Viewing Topic in non-gated category", async function (assert) {
    await visit("/t/34");

    assert.notOk(
      query(".topic-in-gated-category .custom-gated-topic-content"),
      "gated category prompt shown for anons on selected category"
    );
  });
});

acceptance("Gated Category - Logged In", function (needs) {
  needs.user();
  needs.hooks.beforeEach(() => {
    settings.enabled_categories = "2";
  });

  needs.hooks.afterEach(() => {
    settings.enabled_categories = "";
  });

  test("Viewing Topic in gated category", async function (assert) {
    await visit("/t/internationalization-localization/280");

    assert.notOk(
      query(".topic-in-gated-category .custom-gated-topic-content"),
      "gated category prompt not shown on selected category"
    );
  });
});
