sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createTableModel2: function() {
			var oModel = new JSONModel();
			var json = {
				columns: [{
					columnId: "col1"
				}, {
					columnId: "col2"
				}, {
					columnId: "col3"
				}, {
					columnId: "col4"
				}, {
					columnId: "col5"
				}],
				rows: [{
					col1: "Row 1 col 1",
					col2: "Row 1 col 2",
					col3: "Row 1 col 3",
					col4: "Row 1 col 4",
					col5: "Row 1 col 5"
				}, {
					col1: "Row 2 col 1",
					col2: "Row 2 col 2",
					col3: "Row 2 col 3",
					col4: "Row 2 col 4",
					col5: "Row 2 col 5"
				}]
			};
			
			oModel.setData(json);
			return oModel;
		},

		createTableModel2: function() {
			var oModel = new JSONModel();
			var json = {
				Columns: [{
					Label: "Trainee"
				}, {
					Year: "2014",
					Kw: "20"
				}, {
					Year: "2014",
					Kw: "21"
				}, {
					Year: "2014",
					Kw: "22"
				}, {
					Year: "2014",
					Kw: "23"
				}, {
					Year: "2014",
					Kw: "38"
				}, {
					Year: "2014",
					Kw: "39"
				}, {
					Year: "2014",
					Kw: "40"
				}, {
					Year: "2014",
					Kw: "41"
				}, {
					Year: "2014",
					Kw: "42"
				}, {
					Year: "2014",
					Kw: "43"
				}, {
					Year: "2014",
					Kw: "44"
				}, {
					Year: "2015",
					Kw: "1"
				}, {
					Year: "2015",
					Kw: "2"
				}, {
					Year: "2015",
					Kw: "3"
				}, {
					Year: "2015",
					Kw: "19"
				}, {
					Year: "2015",
					Kw: "20"
				}, {
					Year: "2015",
					Kw: "21"
				}, {
					Year: "2015",
					Kw: "39"
				}, {
					Year: "2015",
					Kw: "40"
				}, {
					Year: "2015",
					Kw: "41"
				}, {
					Year: "2015",
					Kw: "42"
				}, {
					Year: "2015",
					Kw: "43"
				}, {
					Year: "2015",
					Kw: "44"
				}, {
					Year: "2015",
					Kw: "45"
				}, {
					Year: "2015",
					Kw: "46"
				}],
				Years: [{
					Year: "2014",
					Count: "11"
				}, {
					Year: "2015",
					Count: "14"
				}]
			};

			oModel.setData(json);
			return oModel;
		},

		createDataModel2: function() {
			var oModel = new JSONModel();
			var json = {
				Trainees: [{
					Name: "Tobias",
					Reports: [{
						Name: "Tobias"
					}, {
						ReportId: "R1.1"
					}, {
						ReportId: "R1.2"
					}, {
						ReportId: "R1.3"
					}]
				}, {
					Name: "Florian",
					Reports: [{
						Name: "Florian"
					}, {
						ReportId: "R2.1"
					}, {
						ReportId: "R2.2"
					}, {
						ReportId: "R2.3"
					}]
				}]
			};

			oModel.setData(json);
			return oModel;
		},
		
		createTableModel: function() {
			var oModel = new JSONModel();
			var json = {
				Columns: [{
					Label: "Trainee"
				}, {
					Year: "2014",
					Kw: "20"
				}, {
					Year: "2014",
					Kw: "21"
				}, {
					Year: "2014",
					Kw: "22"
				}, {
					Year: "2014",
					Kw: "23"
				}, {
					Year: "2014",
					Kw: "30"
				}, {
					Year: "2014",
					Kw: "31"
				}, {
					Year: "2015",
					Kw: "1"
				}],
				Years: [{
					Year: "2014",
					Count: "6"
				}, {
					Year: "2015",
					Count: "1"
				}]
			};

			oModel.setData(json);
			return oModel;
		},
		
		createDataModel: function() {
			var oModel = new JSONModel();
			var json = {
				Trainees: [{
					Name: "Tobias",
					Reports: {
						2014: {
							20: "R1.20",
							21: "R1.21",
							22: "R1.22",
							23: "R1.23"
						},
						2015: {
							1: "R2.1"
						}
					}
				}, {
					Name: "Florian",
					Reports: {
						2014: {
							30: "R1.20",
							31: "R1.23"
						},
						2015: {
							1: "R2.1"
						}
					}
				}]
			};

			oModel.setData(json);
			return oModel;
		}

	};

});