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
	
	var HELP_POPOVER_FRAGMENT_NAME = "my.namespace.view.fragment.HelpPopover";

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
			// this.getModel().metadataLoaded().then(this.afterMetadataLoaded.bind(this));

			//			var customTooltip = new CustomTooltip();
			//			customTooltip.setView(this.getView());
			//			this.getView().byId("myIcon").setTooltip(customTooltip)
			this.setModel(new JSONModel({
				helpText: ""
			}), "mainModel");
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onHintPressed: function(event) {
			var button = event.getSource();
			var customData = button.getCustomData();
			
			if (customData && customData.length > 0) {
				var text = customData[0].getProperty("value");
				if (text) {
					this.getModel("mainModel").setProperty("/helpText", text);
					this.openHelpPopover(button);
				}	
			}
		},
		
		openHelpPopover: function(source) {
			if (!this.helpPopover) {
				this.helpPopover = sap.ui.xmlfragment("helpPopoverId", HELP_POPOVER_FRAGMENT_NAME, this);
				this.getView().addDependent(this.helpPopover);
			}
			this.helpPopover.openBy(source);
		}
		
	});
});