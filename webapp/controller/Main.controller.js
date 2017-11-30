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

	var _dateFormat = DateFormat.getDateInstance();

	var _settingsController = null;
	
	var gridIds = ["grid"];

	function _rerender() {
		for (var i = 0; i < gridIds.length; i++) {
			this.getView().byId(gridIds[i]).rerender();
		}
	}

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
			var router = this.getRouter();
			var viewModel = this._createViewModel();
			
			viewModel.attachPropertyChange(this.propertyChanged, this);
			this.setModel(viewModel, "main");
			
			router.getRoute("fullscreen").attachPatternMatched(this.onRouteMatched, this);

			for (var i = 0; i < gridIds.length; i++) {
				this.getView().byId(gridIds[i]).addEventDelegate({ onAfterRendering: this.onAfterRendering }, this);
			}
			//			var customTooltip = new CustomTooltip();
			//			customTooltip.setView(this.getView());
			//			this.getView().byId("myIcon").setTooltip(customTooltip)
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onRouteMatched: function(event) {
			//this.restyleGrid();
		},
		
		onAfterRendering: function() {
			this.restyleGrid();
		},

		restyleGrid: function() {
			if (!this.getModel("main").getProperty("/restyleGrid")) {
				return;
			}
			
			var gridIndex, cellIndex;
			var grids = [], cells;
			var grid, cell;
			
			// Find all sap.ui.layout.Grid controls
			// for (var i = 0; i < gridIds.length; i++) {
			// 	grids = $("#" + gridIds[i]);
			// }
			grids = $(".sapUiRespGrid");
			
			// Go through every grid and every cell
			for (gridIndex = 0; gridIndex < grids.length-1; gridIndex++) {
				// Add the class 'myGridStyle' to every grid
				grid = $(grids[gridIndex]);
				grid.addClass("myGridStyle");
				
				cells = grid.children();
				for (cellIndex = 0; cellIndex < cells.length; cellIndex++) {
					// Add the class 'myGridCellStyle' to every cell
					cell = $(cells[cellIndex]);
					cell.css("border-top-width", cell.css("margin-top"));
					cell.css("border-bottom-width", cell.css("margin-bottom"));
					cell.css("border-left-width", cell.css("margin-left"));
					cell.css("border-right-width", cell.css("margin-right"));
					cell.addClass("myGridCellStyle");
				}
			}
		},

		propertyChanged: function(event) {
			var viewModel = this.getModel("main");
			var path = event.getParameter("path");
			var value = event.getParameter("value");
			var floatTypePaths = ["/grid/vSpacing", "/grid/hSpacing"];
			var boolTypePaths = ["/grid/containerQuery"];
			
			if (floatTypePaths.indexOf(path) >= 0) {
				viewModel.setProperty(path, parseFloat(value));
			}
			
			if (boolTypePaths.indexOf(path) >= 0) {
				viewModel.setProperty(path, value === "true");
			}
			
			_rerender.apply(this);
		},

		openFilterDialog: function() {
			_settingsController.getDialog().open();
		},
		
		onContainerQueryChange: function(event) {
			var selected = event.getParameter("selected");
			this.getModel("main").setProperty("/grid/containerQuery", selected);
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */
		_createViewModel: function() {
			return new JSONModel({
				restyleGrid: true,
				grid: {
					width: "100%",					// string
					vSpacing: 2.0,					// float
					hSpacing: 2.0,					// float
					position: "Left",				// string
					defaultSpan: "XL3 L3 M6 S12",	// string
					defaultIndent: "XL0 L0 M0 S0",	// string
					containerQuery: false			// boolean
				}
			});
		}
	});
});