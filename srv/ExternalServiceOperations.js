const core = require('@sap-cloud-sdk/core');

async function getToken() {
    let response = await core.executeHttpRequest({ destinationName: "Customerportal" }, {
        method: 'GET',
        url: "sap/opu/odata/sap/API_SALES_ORDER_SRV/$metadata",
        headers: {
            "content-type": "application/json",
            'x-csrf-token': 'fetch'
        }
    });

    let xcsrfToken = response.headers['x-csrf-token'];
    let cookies = response.headers['set-cookie'];
    let cookie = '';
    if (cookies.length > 0) {
        cookies.map(item => {
            cookie = cookie.concat(item + "; ");
        });
    }
    return { xcsrfToken, cookie }
}

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
    let sUrl = "/sap/opu/odata/sap/API_EQUIPMENT/EquipmentPartner?$filter=Partner eq '" + req.data.Partner + "'";
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

let createSalesOrder = async () => {
    let { xcsrfToken, cookie } = await getToken();
    let payload = {
        "SalesOrderType": "ZAOR",
        "SalesOrganization": "ES01",
        "DistributionChannel": "10",
        "OrganizationDivision": "10",
        "SoldToParty": "100001",
        "PurchaseOrderByCustomer": "Created via OData Service",
        "to_Partner": [
            {
                "PartnerFunction": "SH",
                "Customer": "100001"
            }
        ],
        "to_Item": [
            {
                "Material": "FING_0507",
                "RequestedQuantity": "2",
            },
            {
                "Material": "FING_0506",
                "RequestedQuantity": "10",
            }
        ]
    }

    let sUrl = "sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder";
    let response = await core.executeHttpRequest({ destinationName: "Customerportal" }, {
        method: 'POST',
        url: sUrl,
        headers: {
            "content-type": "application/json",
            'x-csrf-token': xcsrfToken,
            'Cookie': cookie,
        },
        data: payload
    });
    let result = [{
        "status": response.status,
        "statusText": response.statusText
    }];
    console.log(result);
    return result;
}

module.exports = { getEquipment, getEquipmentPartner, createSalesOrder };