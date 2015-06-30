var pngToJpg = require('./index.js');

pngToJpg({
    input: 'test/input2.png',
    output: 'test/output.jpg',
    options: {
        quality: 60
    }
}, function() {
    console.log('test/output.jpg saved');
});

pngToJpg({
    input: 'test/input.jpg',
    output: 'test/output.png',
    options: {}
}, function() {
    console.log('test/output.png saved');
});
