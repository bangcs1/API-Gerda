module.exports = function(type, data){
    switch (type) {
        case 'api': 
            console.log(`<< API - ${data} >>`);
            break;
        case 'success':
            console.log(`[ SUCCESS ] • ${data}`);
            break;
        case 'error': 
            console.log(`[ ERROR ] • ${data}`);
            break;
        default:
            console.log(data);
    }
};
