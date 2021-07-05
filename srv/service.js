const core = require('@sap-cloud-sdk/core');
const cds = require('@sap/cds');
const { getEquipment} = require('./ExternalServiceOperations');

module.exports = cds.service.impl(async function(){
   this.on("getEquipmentData", async(req)=>{
            let response = await getEquipment(req);
            return response;
   });

});