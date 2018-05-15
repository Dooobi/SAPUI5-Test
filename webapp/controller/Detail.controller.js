sap.ui.define([
	"my/namespace/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"my/namespace/model/formatter",
	"my/namespace/helper/util",
	"my/namespace/model/Constant"
], function(BaseController, JSONModel, formatter, util, Constant) {
	"use strict";

	return BaseController.extend("my.namespace.controller.Detail", {

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

		}

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */



		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */


	});
});
