type response {
    data : array of  String
};
 
service equipment {
    function getEquipmentData() returns response ;
};