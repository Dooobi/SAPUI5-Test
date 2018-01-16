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
			this.setupPieChart();
			// this.getModel().metadataLoaded().then(this.afterMetadataLoaded.bind(this));

			//			var customTooltip = new CustomTooltip();
			//			customTooltip.setView(this.getView());
			//			this.getView().byId("myIcon").setTooltip(customTooltip)
		},

		setupPieChart: function() {
			//      1.Get the id of the VizFrame		
			var oVizFrame = this.getView().byId("idpiechart");

			//      2.Create a JSON Model and set the data
			var oModel = new sap.ui.model.json.JSONModel();
			var data = {
				"Methods": [{
					"Method": "Greenfield",
					"Tendency": "46"
				}, {
					"Method": "Brownfield",
					"Tendency": "54"
				}]
			};
			oModel.setData(data);

			//      3. Create Viz dataset to feed to the data to the graph
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Method",
					value: "{Method}"
				}],

				measures: [{
					name: "Tendency",
					value: "{Tendency}"
				}],

				data: {
					path: "/Methods"
				}
			});
			oVizFrame.setDataset(oDataset);
			oVizFrame.setModel(oModel);

			//      4.Set Viz properties
			oVizFrame.setVizProperties({
				title: {
					text: "Methode"
				}
				// ,plotArea: {
				// 	colorPalette: d3.scale.category20().range(),
				// 	drawingEffect: "glossy"
				// }
			});

			var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "size",
					'type': "Measure",
					'values': ["Tendency"]
				}),
				feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["Method"]
				});
			oVizFrame.addFeed(feedSize);
			oVizFrame.addFeed(feedColor);
		}
	});
});