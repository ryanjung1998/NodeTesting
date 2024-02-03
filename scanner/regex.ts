function findMaterials(inputString: string): boolean {
    const regex = /(100|\d{1,2})% *(\b\w+\b)/g; // Regular expression to get percentage and material
    var m;
    do {
        m = regex.exec(testString1);
        if (m){
            console.log(m[1],m[2]);
        }
    }while (m);
    return regex.test(inputString);
}


const regex = /(100|\d{1,2})% *(\b\w+\b)/g; // Regular expression to get percentage and material
// Example usage
var testString1 = "10%    Polyester \n 50% Cotton \n 40% Other";
const testString2 = "No percentage symbol here";
var m;
do {
    m = regex.exec(testString1);
    if (m){
        console.log(m[1],m[2]);
    }
}while (m);
// const arr = [testString1.matchAll(regex)];
// console.log(arr);
// console.log(testString1.match(regex));
// console.log(testString2.match(regex));
// console.log(findPercentageSymbol(testString1)); // Output: true
// console.log(findPercentageSymbol(testString2)); // Output: false