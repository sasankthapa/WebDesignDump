var isPrime=function(numberToCheck){
    for (var divisor=2; divisor <= Math.sqrt(numberToCheck); divisor ++) {
        if (numberToCheck % divisor == 0) {
            return false;
        }
    }
    return true;
}

var numberOfPrimesSoFar = 0;
var lastPrimeFound = 1;		// Yes, I know that isn't prime
console.log("The first 100 primes are:");
var insidehtml=''
while (numberOfPrimesSoFar < 100) {
	var p=lastPrimeFound+1;
	while ( !isPrime(p) ) {
		p++;
	}
	lastPrimeFound = p;
	insidehtml+=p + ", ";
	numberOfPrimesSoFar++;
	if (numberOfPrimesSoFar % 10 == 0) {
		insidehtml+='<br><br>'
	}
}

document.getElementById('primes').innerHTML=insidehtml;