sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/model/formatter",
	"my/namespace/helper/util",
	"my/namespace/model/Constant"
], function(BaseController, JSONModel, formatter, util, Constant) {
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
			this.getRouter().getRoute("fullscreen").attachPatternMatched(this.onPatternMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onPatternMatched: function(event) {
			// console.log("onPatternMatched");
			// setTimeout(function() {
			// 	this._loadViewModel();
			// }.bind(this), 4000);
			// setTimeout(function() {
			// 	this._parse();
			// }.bind(this), 6000);
			// setTimeout(function() {
			// 	this._createRadioButtons();
			// }.bind(this), 2000);
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		_loadViewModel: function() {
			console.log("_loadViewModel");
			var model = new JSONModel({
				selectedIndex: 2
			});
			
			this.setModel(model, "abcModel");
		},
		
		_createRadioButtons: function() {
			console.log("_createRadioButtons");
			
			var radioButtons = [];
			for (var i = 0; i < 7; i++) {
				radioButtons.push(new sap.m.RadioButton({
					text: "Radiobutton " + i
				}));
			}
			var radioButtonGroup = new sap.m.RadioButtonGroup({
				selectedIndex: "{abcModel>/selectedIndex}",
				buttons: radioButtons
			});
			
			this.getView().byId("container").addItem(radioButtonGroup);
		},
		
		_reset: function() {
			var container = this.getView().byId("container");
			container.removeAllItems();
			
			this.setModel(new JSONModel(), "abcModel");
		}
		
	});
});
