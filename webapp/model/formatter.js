sap.ui.define([
	"my/namespace/model/Constant",
	"my/namespace/helper/util"
], function(Constant, util) {
	"use strict";

	return {

		formatSelectedIndex: function(abc) {
			console.log("formatter: " + abc);
			return abc;
		}

	};
});
