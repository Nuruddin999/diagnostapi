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

    const isEmpty = isAllAbroadEmpty(obj)
console.log(isEmpty)
    if (!isEmpty) {
        try {
            return await AbroadInfo.upsert({...obj, applId: id});
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = updateAbroad