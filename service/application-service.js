const {AbroadInfo} = require("../models");
const isAllAbroadEmpty=(obj)=>{
    for(const key in obj){
       if (obj[key] !== "") {
           return false;
       }
    }
    return true;
}


const updateAbroad = async (id, obj)=>{

    const isEmpty=  isAllAbroadEmpty(obj)
    if(!isEmpty){
        await AbroadInfo.upsert({...obj, applId: id});
    }

}

module.exports = updateAbroad