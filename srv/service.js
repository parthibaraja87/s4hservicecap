const cds = require('@sap/cds');
const { getEquipment, getEquipmentPartner, createSalesOrder} = require('./ExternalServiceOperations');

module.exports = cds.service.impl(async function(){
   this.on("getEquipmentData", async(req)=>{
            let response = await getEquipment(req);
            let resultData = {data : response};
            return resultData;
   });

    this.on("getEquipmentPartner", async(req)=>{
            let response = await getEquipmentPartner(req);
            let resultData = {data : response};
            return resultData;
   });

   this.on("createSalesOrder", async(req)=>{
            let response = await createSalesOrder(req);
             let resultData = {data : response};
            return resultData;
   });

});