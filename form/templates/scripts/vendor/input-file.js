$(document).ready(function () {
    var inputsFile = $('.input-file');
    inputsFile.each(function (i, inputFile) {
        var labelFile = $(inputFile).find('input').next(),
            labelValFile = $(labelFile).html();

        $(inputFile).on('change', function (e) {
            var inputFileName = '';

            if (this.files && this.files.length > 1) {
                inputFileName = (this.attr('data-multiple-caption') || '').replace('{count}', this.files.length);
            } else {
                inputFileName = e.target.value.split('\\').pop();
            }
            if (inputFileName) {
                labelFile.html(inputFileName);
            } else {
                labelFile.html(labelValFile);
            }
        });
    });
});