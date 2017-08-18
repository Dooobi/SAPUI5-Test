sap.ui.define([
	"fis/tgh/grade/trainer/model/formatter"
], function(formatter) {
	"use strict";
	
	var i18n = new sap.ui.model.resource.ResourceModel({
		bundleUrl: "../../i18n/i18n.properties"
	});
	var resourceBundle = i18n.getResourceBundle();
	
	QUnit.module("Formatter", {

		beforeEach: function() {},

		afterEach: function() {}
	});

	QUnit.test("Should build a tooltip for the trainee", function(assert) {
		var result = formatter.getTraineeTooltip.call(i18n, "max.mustermann@somewhere.com", "Fachinformatiker Anwendungsentwicklung");
		var expected = resourceBundle.getText("traineeTooltipEmail") + ": max.mustermann@somewhere.com\n" + resourceBundle.getText("traineeTooltipProfession") + ": Fachinformatiker Anwendungsentwicklung";
		assert.strictEqual(result, expected, "The tooltip was generated correctly");
	});

});