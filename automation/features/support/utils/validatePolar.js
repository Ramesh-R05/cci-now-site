function validatePolar(listOfItems , rows, count) {
    for (var i = 0; i < count; ++i) {
        var row = rows[i];
        // Validates position of standard page base on Index including their url
        console.log(row['pos']);
        console.log(listOfItems[row['pos']-1]);
        expect(listOfItems[row['pos']-1]).toContain('polar');
    }
}

module.exports = validatePolar;
