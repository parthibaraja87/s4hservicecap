type response {
    data : array of  String
};

 
service equipment {
    function getEquipmentData() returns response;
    function getEquipmentPartner(Partner : String) returns response;
    function createSalesOrder() returns response;
};