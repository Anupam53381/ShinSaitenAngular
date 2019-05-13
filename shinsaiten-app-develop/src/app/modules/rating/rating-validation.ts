// NOTE: currently this file is not in use, This file later use for checkpoint validations.
import {AbstractControl} from '@angular/forms';
/*export class RatingValidation {*/

     export function validateCheckpoints(AC: AbstractControl) {
        console.log('inside validate checkpoint method.');
        
        if(AC.get('unitAnswerScore') != null && Object.keys(AC.get('unitAnswerScore').value.contextWiseSelectedCheckpoint).length !== 0){
            console.log(AC.get('unitAnswerScore').value.contextWiseSelectedCheckpoint);
           // let contextWiseSelectedCheckpoint = AC.get('unitAnswerScore').value;
            /*for (let checkpoint of contextWiseSelectedCheckpoint) {
                console.log(">>>>: "+checkpoint);
            }*/
            for (var element in AC.get('unitAnswerScore').value.contextWiseSelectedCheckpoint) {
                console.log(">>>>: "+AC.get('unitAnswerScore').value.contextWiseSelectedCheckpoint[element]);
                }
            console.log(">>>>>>>>  return false");
            return { notValid: false };
        }else{
            console.log(">>>>>>>>  return true");
            return { notValid: true };
        }
      // console.log(unitAnswerScore.contextWiseSelectedCheckpoint);
        
       
        //AC.get('comment').setErrors( {validateCheckpoints: true} );
        
       /*let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }*/
    }
/*}*/