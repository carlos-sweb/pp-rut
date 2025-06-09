# p-rut

For more information [Wikipedia Link](https://es.wikipedia.org/wiki/Rol_%C3%9Anico_Tributario)

## Try online

[pp-rut.netlify.app](https://pp-rut.netlify.app/)

## Getting Started

In the web project include pp-rut with:

```html
<!--no dependencies used nd file-->
<script src="https://cdn.jsdelivr.net/npm/pp-is/dist/pp-rut.nd.min.js" ></script>
```
Or 

```html
<script src="https://cdn.jsdelivr.net/npm/pp-is/dist/pp-is.min.js" ></script>
<script src="https://cdn.jsdelivr.net/npm/pp-is/dist/pp-rut.min.js" ></script>
```

Or
## Install
```console
npm i pp-rut --save
```
## How to use ?

formats that work:
```javascript
ppRut(30686957) //work
ppRut(30686957,"4") //work
ppRut("30686957","") //work
ppRut("30.686.957") //work
ppRut("30.686.957 4") //work
ppRut("30.686.957-4") //work
ppRut("30 686 957 4") //work
ppRut("30.686 957 5","4") //In this case, number 4 takes priority over number 5.
ppRut("*****30.....686.****957 5","4") //Other very unlikely formats to work
```

```javascript
const rut = ppRut(30918041,11)
console.log( rut.checkDigit("0") ) // true
console.log( rut.format() )// 30.918.041-0
```

```javascript
const rut = ppRut(30918050,10)
console.log( rut.checkDigit("k") ) //true
console.log( rut.format() ) // 30.918.050-k
```
```javascript
const rut = ppRut("30686957")
console.log( rut.checkDigit("4") ) //true
console.log( rut.format() ) // 30.686.957-4
```
```javascript
const rut = ppRut("30686957")
console.log( rut.checkDigit("4") ) //true
console.log( rut.format() ) // 30.686.957-4
```
```javascript
const rut = ppRut("30686957 5")
console.log( rut.checkDigit() ) //false
console.log( rut.format() ) // 30.686.957-4
```
```javascript
const rut = ppRut("30686957 4")
console.log( rut.checkDigit("5") ) //false
console.log( rut.format() ) // 30.686.957-4
```
```javascript
const rut = ppRut("30686957 5")
console.log( rut.checkDigit("4") ) //true
console.log( rut.format() ) // 30.686.957-4
```

## Properties

### body
R.U.T body clean 
### digit
R.U.T digit to check

## Methods 

### getDigit

Obtain the check digit

```javascript
const rut = ppRut("30686957 4")
console.log( rut.getDigit() ) // "4"
```

### checkDigit

Check the digit against the given value and if it does not exist, compare it with the value found.

```javascript
const rut = ppRut("30686957 5")
console.log( rut.checkDigit(4) ) // true
console.log( rut.checkDigit("4") ) // true
console.log( rut.checkDigit() ) // false
```

### format

Create an output format with two variables, one for the thousands separator and the second for the check digit separator.

```javascript
const rut = ppRut("30686957 4")
console.log( rut.format(""," ") ) // 30686957 4
console.log( rut.format("."," ") ) // 30.686.957 4
console.log( rut.format("","") ) // 306869574
```