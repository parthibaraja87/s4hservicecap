const core = require('@sap-cloud-sdk/core');

let getEquipment = async  () => {
    let response = await core.executeHttpRequest({ destinationName: "Customerportal" }, {
        method: 'GET',
        url: "/sap/opu/odata/sap/API_EQUIPMENT/EquipmentPartner",
        headers: {
            "content-type": "application/json",
            'x-csrf-token': 'fetch'
        }
    });
    
    let result = response.data.d.results;
    return result;
}

module.exports = {getEquipment};