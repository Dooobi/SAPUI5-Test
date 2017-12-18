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
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		onCreateApp: function() {
			var data = "{\"name\": \"filebrowser\",\"status\": \"STOPPED\",\"repository\":\"\"}";

			$.post(
				"https://account.hana.ondemand.com/ajax/createHtml5Application/a3bb64753",
				data
			);
		}

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */
		
	});
});