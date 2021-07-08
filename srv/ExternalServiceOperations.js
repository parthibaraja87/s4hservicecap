const core = require('@sap-cloud-sdk/core');

let getEquipment = async () => {
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


let getEquipmentPartner = async (req) => {
    console.log(req.data.Partner);
    let sUrl = "/sap/opu/odata/sap/API_EQUIPMENT/EquipmentPartner?$filter=Partner eq '" + req.data.Partner + "'" ;
    let response = await core.executeHttpRequest({ destinationName: "Customerportal" }, {
        method: 'GET',
        url: sUrl,
        headers: {
            "content-type": "application/json",
            'x-csrf-token': 'fetch'
        }
    });

    let result = response.data.d.results;
    console.log(result);
    return result;
}

module.exports = { getEquipment, getEquipmentPartner };