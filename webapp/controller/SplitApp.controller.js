sap.ui.define([
		"my/namespace/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("my.namespace.controller.SplitApp", {

			onInit : function () {
				// apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}
		});

	}
);