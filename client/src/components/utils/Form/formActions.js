import {validate} from './formValidation';

// update FORMFIELDS
export const update = (element,formdata,formName)=>{
    const newFormdata = {...formdata}; // create a copy of the formdata
    const newElement = {...newFormdata[element.id]} // create copy of the formdata elements, ie. element,value,config. 
    // can now mutate newElement (ie. formdata fields)
    newElement.value = element.event.target.value; //user input value
    
   

    // check to see if user has moved away then validate
         // if element, validates on user input
    if(element.blur || element){
        let validData = validate(newElement,formdata); // validation error to check user input based on element.id
        newElement.valid = validData[0];             // grab values from error array.
        newElement.validationMessage = validData[1];  
    }
    newElement.touched = element.blur;
    // finished with newElementModifications. Udpdate newFormdata.
    newFormdata[element.id] = newElement;

    return newFormdata;
}

// generate formdata (ie loop through and get values from formdata);
export const generateData = (formdata,formName) => {
    let dataToSubmit = {};
    for(let key in formdata){
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return dataToSubmit;
}

// loop through formdata and determine if all values are valid.
export const isFormValid = (formdata,formName) => {
    let valid = true;
    for (let key in formdata){
        if(formdata[key].valid === false){
            valid = false;
        }
    }
    return valid;
}
