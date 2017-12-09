import yavl from "yavljs";
import fetchJSON from "fetch_json";

yavl.registerRule("userAvailable", (errMsgDb, validate, invalidate, event, error_selector, value, expected)=>{
    const encoded_value = encodeURI(value);
    fetchJSON(`/api/userAvailable/${encoded_value}`, jsonData=>{
        if(jsonData[0] === expected)
            validate(error_selector);
        else
            return invalidate(event, error_selector, errMsgDb["userAvailable"]);
    });
});

export {yavl};