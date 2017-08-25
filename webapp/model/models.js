sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function (JSONModel, Device) {
		"use strict";

		return {

			createDeviceModel : function() {
				var oModel = new JSONModel(Device);
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			},
			
			createDataModel: function() {
				var oModel = new JSONModel();
				var json = 
				{ 
					Items: [
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test8"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"},
						{Title: "test1"},
						{Title: "test2"},
						{Title: "test3"},
						{Title: "test4"},
						{Title: "test5"},
						{Title: "test6"},
						{Title: "test7"}
					]
				};
					
				oModel.setData(json);
				return oModel;
			}

		};

	}
);