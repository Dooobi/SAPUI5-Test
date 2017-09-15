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
		
		createColumnModel: function() {
			var oModel = new JSONModel();
			var currentDate = new Date();
			var json = {
				Columns: [{
					isTraineeColumn: true
				}, {
					Year: "2014",
					Kw: "20",
					Date: currentDate
				}, {
					Year: "2014",
					Kw: "21",
					Date: currentDate
				}, {
					Year: "2015",
					Kw: "1",
					Date: currentDate
				}],
				Years: [{
					Year: "2014",
					Count: "2"
				}, {
					Year: "2015",
					Count: "1"
				}]
			};

			oModel.setData(json);
			return oModel;
		},
		
		createColumnModelNoRelevantReports: function() {
			var oModel = new JSONModel();
			var currentDate = new Date();
			var json = {
				Columns: [{
					isTraineeColumn: true
				}, {
					noRelevantReports: true
				}]
			};

			oModel.setData(json);
			return oModel;
		},
		
		createRowModel: function() {
			var oModel = new JSONModel();
			var json = {
				Trainees: [{
					Trainee: {
						Firstname: "Tobias"
						// other properties of Trainee context
					},
					Reports: {
						2014: {
							20: {
								ReportId: 1,
								StatusId: "NEW"
								// other properties of Report context
							},
							21: {
								ReportId: 2,
								StatusId: "APPROVED"
								// other properties of Report context
							},
							22: {
								ReportId: 3,
								StatusId: "REJECTED"
								// other properties of Report context
							},
							23: {
								ReportId: 4,
								StatusId: "TRAINER"
								// other properties of Report context
							}
						},
						2015: {
							1: {
								ReportId: 5,
								StatusId: "HEAD"
								// other properties of Report context
							}
						}
					}
				}, {
					Trainee: {
						Firstname: "Florian"
						// other properties of Trainee context
					},
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