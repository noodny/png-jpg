var fs = require('fs'),
    PNG = require('png-stream'),
    JPG = require('jpg-stream'),
    ColorTransform = require('color-transform');

function getType(path) {
    if(path.indexOf('.png') === path.length - 4) {
        return 'png';
    }
    if(path.indexOf('.jpg') === path.length - 4 || path.indexOf('.jpeg') === path.length - 5) {
        return 'jpg';
    }
    throw new Error('File type not supported.')
}

module.exports = function(params, callback) {
    var inputType = getType(params.input),
        outputType = getType(params.output);

    if(inputType != outputType) {
        if(inputType === 'png') {
            fs.createReadStream(params.input)
                .pipe(new PNG.Decoder)
                .pipe(new ColorTransform('rgb'))
                .pipe(new JPG.Encoder(params.options || {}))
                .pipe(fs.createWriteStream(params.output))
                .on('close', callback);
        } else {
            fs.createReadStream(params.input)
                .pipe(new JPG.Decoder)
                .pipe(new PNG.Encoder(params.options || {}))
                .pipe(fs.createWriteStream(params.output))
                .on('close', callback);
        }
    }
};
