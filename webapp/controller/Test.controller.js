sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/model/formatter",
	"sap/m/List",
	"sap/m/StandardListItem"
], function(BaseController, JSONModel, formatter, List, StandardListItem) {
	"use strict";

	return BaseController.extend("my.namespace.controller.Test", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var page = this.getView().byId("page");
			
			var oList = new List({
				items: {
					path: "data>/Items",
					template: this.getTemplate()
				}
			});

			page.addContent(oList);
		},
		
		getTemplate: function() {
			return new StandardListItem({
				title: {
					path: "data>Title", 
					formatter: formatter.formatTest
				}
			});
		}

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

	});
});