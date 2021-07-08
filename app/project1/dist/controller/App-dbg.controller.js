sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("project1.controller.App", {
            onInit: function () {
                this.oDataModel = this.getOwnerComponent().getModel("oDataModel");
                this.EquipmentModel = this.getOwnerComponent().getModel("EquipmentModel");
                this.fnGetEquipmentDetails();
            },

            fnGetEquipmentDetails: function () {
                var self = this;
                sap.ui.core.BusyIndicator.show();
                var fnSuccess = function (oData) {
                    sap.ui.core.BusyIndicator.hide();
                    self.EquipmentModel.setProperty("/Equipment", oData.getEquipmentData.data);
                    self.EquipmentModel.refresh();
                    self.EquipmentModel.updateBindings();
                };
                var fnError = function (err) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error(err);
                };
                this.oDataModel.callFunction("/getEquipmentData", {
                    method: "GET",
                    success: fnSuccess,
                    error: fnError
                });
            },
            onFilterPressed: function () {
                   var self = this;
                   sap.ui.core.BusyIndicator.show();
                var fnSuccess = function (oData) {
                    sap.ui.core.BusyIndicator.hide();
                    self.EquipmentModel.setProperty("/Equipment", oData.getEquipmentPartner.data);
                    self.EquipmentModel.refresh();
                    self.EquipmentModel.updateBindings();
                };
                var fnError = function (err) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error(err);
                };
                this.oDataModel.callFunction("/getEquipmentPartner", {
                    method: "GET",
                    success: fnSuccess,
                    error: fnError,
                    urlParameters: {
							Partner: "C123"
						}
                });
            }

        });
    });
