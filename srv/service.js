const cds = require('@sap/cds');
const { getEquipment} = require('./ExternalServiceOperations');

module.exports = cds.service.impl(async function(){
   this.on("getEquipmentData", async(req)=>{
            let response = await getEquipment(req);
            let resultData = {data : response};
            return resultData;
   });

});