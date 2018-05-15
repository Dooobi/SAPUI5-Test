sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/controller/fragment/SettingsController",
	"my/namespace/model/formatter",
	"my/namespace/helper/util",
	"my/namespace/customcontrol/CustomTooltip",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, SettingsController, formatter, util, CustomTooltip, DateFormat, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("my.namespace.controller.Main", {

		formatter: formatter,
		util: util,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var odata = this.getModel(),
				table = this.getView().byId("table");

			odata.attachEventOnce("requestCompleted", function() {
				table.getBinding("rows").attachChange(this.onBindingChange, this);
			}, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		showRowInfo: function(event) {
			var rowBindingContext = event.getParameter("rowBindingContext") || event.getParameter("rowContext");
			var rowIndex = event.getParameter("rowIndex");
			var that = this,
				table = this.getView().byId("table"),
				binding = table.getBinding("rows"),
				odata = this.getModel();
			var rows = table.getRows();

			for (var r = 0; r < rows.length; r++) {
				var row = rows[r];
				row.addCell(new sap.m.Text({
					text: row.getBindingContext().getProperty("Firstname") + " " + row.getBindingContext().getProperty("Lastname")
				}));
			}

			sap.m.MessageToast.show(rowBindingContext.getProperty("Firstname") + " " + rowBindingContext.getProperty("Lastname"));
		},

		onBindingChange: function(event) {
			var that = this,
				table = this.getView().byId("table"),
				binding = table.getBinding("rows"),
				odata = this.getModel(),
				rows = table.getRows();

			// for (var r = 0; r < rows.length; r++) {
			// 	var row = rows[r];
			// 	row.addCell(new sap.m.Text({
			// 		text: "test"
			// 	}));
			// }

			console.log("BindingChange -- Params:", event.getParameters());
		}

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */


	});
});
