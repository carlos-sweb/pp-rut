/*!!
 * Power Panel pp-rut <https://github.com/carlos-sweb/pp-rut>
 * @author Carlos Illesca
 * @version 1.0.0 (2025/06/08 23:43 PM)
 * Released under the MIT License
 */ 

import isString from "./../node_modules/pp-is/dist/main/isString.js"
import isUndefined from "./../node_modules/pp-is/dist/main/isUndefined.js"
/**
 * @name clean
 * @description - removes everything that is not a digit 0-9
 * @param rut { String } - value 
 * @return {String}
 **/
const clean=(rut)=>rut.replaceAll(/[^\d]/g,""),
/**
 * @name calculate
 * @description - Mathematical operation to obtain the remainder of the tax identification number
 * @example 
   total = 194
   parte_entera = (total / 11) // 17.63636364 used Math.floor
   resto = 194 - ( 11 * 17 ) = 7
   verificador = 11 -7 = 4
 * */
calculate = (t)=>(11-(t-(11*(Math.floor(t/11))))),
/**
 * @name dClean
 * @description - removes everything that is not a digit 0-9 or letter k
 * @param digit {String}
 * @return {String} 
 * */
dClean=(digit)=>digit.replaceAll(/[^\d,k]/g,""),
/**
 * @name numberToDigitV
 * @description - Converts a number to a valid check digit. If the number is equal to 10, it returns a k, and if the number is 11, it returns a 0.
 * @params d {Number}
 * @return {String}
 **/
numberToDigitV=(d)=>d == 11 ? "0" : d == 10 ? "k" : d.toString(),
// Reference
isInt=(n)=>Number.isInteger(n),
/**
 * @name ppRut
 * @description - Object that helps obtain and verify a Chilean R.U.T.
 * @param rut {String|Number} - R.U.T. number with or without verifier separated by a space or hyphen 
 * @param digitV{String|Number} - check digit: if it is 11, it will be verified by k, and if it is 10, it will be verified by 0.
 * */
ppRut = function(rut="0",digitV=undefined){
	var self = this;
	if(!(self instanceof ppRut)){ return new ppRut(rut,digitV)}
	// We assign the verification number if applicable.
	self.digit = 
    isString(digitV) ? 
    	dClean(digitV.toLowerCase()) : 
    	isInt(digitV) ? 
    	numberToDigitV(digitV) : ""
	
	self.body = isString(rut) ? ((r,d)=>{

		const tmpSplit = r.split(/[\s,-]{1}(?=[^\s,-]*$)/g)

		if( !isUndefined(tmpSplit.at(1)) && self.digit === "" ){			
			self.digit = dClean(tmpSplit.at(1).toLowerCase())
		}		
		return clean(tmpSplit.at(0))

	})(rut) : isInt(rut) ? rut.toString() : "0"

	
	self.format=(separate_miles=".",separate_digit="-")=>self.body.split("").reverse().map((n_string,indice)=>n_string+( isInt( (indice+1)/3 ) ? separate_miles:"")).join("").split("").reverse().concat([separate_digit,self.getDigit()]).join("")	
	self.checkDigit=(digit=undefined)=>self.getDigit() === (isUndefined(digit) ? self.digit : (isInt(digit) ? numberToDigitV(digit) : digit ) )	
	self.getDigit=()=>{		
		let multiplier = 2,initialValue=0,
		total = self.body		
		.split("")
		.reverse()
		.map((n_string,indice)=>{
			const sub_total =Number.parseInt(n_string,10)*multiplier
			if(multiplier==7){multiplier=2}else{multiplier++}
			return sub_total
		})
		.reduce( (accumulator, currentValue) => accumulator + currentValue,initialValue)
		
		return numberToDigitV(calculate(total))
	}	
}
export { ppRut as default }