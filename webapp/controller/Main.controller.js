sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/model/formatter"
], function(BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("my.namespace.controller.Main", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onAddPress: function(event) {
			var page = this.getView().byId("scroll");
			var table = this.getView().byId("table");
			var items = table.getItems();
			
			page.scrollToElement(items[items.length-1], 100);
		}

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

	});
});