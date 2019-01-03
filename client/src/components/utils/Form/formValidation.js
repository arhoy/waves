export const validate = (element, formdata = [])=>{
    let error = [true,''];

    if (element.validation.required){
        const valid = element.value.trim() !== '';     // valid criteria
        let message;
        if(!valid){
            message = 'This field is required';
        }
         error = [valid,message];
    }
    // if it did not catch error message from above, do this step to validate email.
    if(error[0]){
        if(element.validation.email){
            // regex email validation
            const valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(element.value);
         
            let message;
            if(!valid){
                message = 'Must be a valid email!';
            }
             error = [valid,message]; 
        }
    }
    // password at least 5 characters only enter if no error message.
    if(error[0]){
        if(element.validation.password){
            const valid = element.value.trim().length >= 5;
            let message;
            if(!valid){
                message = 'password not strong enough';
            }
            error = [valid,message];
        }
    }


    if(element.validation.confirm){
          // confirm 
          const valid = element.value.trim() === formdata[element.validation.confirm].value;
         
          let message;
          if(!valid){
              message = `${element.validation.confirm} does not match!` ;
          }
           error = [valid,message];
        
    }


    return error
}