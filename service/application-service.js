const {AbroadInfo} = require("../models");
const isAllAbroadEmpty = (obj) => {
    for (const key in obj) {
        if (obj[key] !== "") {
            return false;
        }
    }
    return true;
}


const updateAbroad = async (id, obj) => {
    console.log(id);
    console.log(obj);
    const isEmpty = isAllAbroadEmpty(obj)
    console.log(isEmpty)
    if (!isEmpty) {
        return await AbroadInfo.upsert({...obj, applId: id});
    }

}

module.exports = updateAbroad