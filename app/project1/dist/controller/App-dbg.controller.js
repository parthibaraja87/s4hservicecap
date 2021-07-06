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
                var fnSuccess = function (oData) {
                    console.log(oData.getEquipmentData.data);
                    self.EquipmentModel.setProperty("/Equipment", oData.getEquipmentData.data);
                    self.EquipmentModel.refresh();
                    self.EquipmentModel.updateBindings();
                };
                var fnError = function (err) {
                    MessageBox.error(err);
                };
                this.oDataModel.callFunction("/getEquipmentData", {
                    method: "GET",
                    success: fnSuccess,
                    error: fnError
                });
            }

        });
    });
