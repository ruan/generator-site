window.Parsley
.addValidator('date', function (value) {
    return moment(value, "DD-MM-YYYY").isValid() ?  true : false;
})
.addValidator('cpf', function (value, requirement) {
    var   cpf        = value.replace(/[^0-9]/g, '')
        , compareCPF = cpf.substring(0, 9)
        , add        = 0
        , i, u
        , invalidCPF = [
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999'
        ]
        ;

    if ( cpf.length < 11 || $.inArray(cpf, invalidCPF) !== -1 ) {
        return false;
    }

    for (i = 8, u = 2; i >= 0; i--, u++) {
        add = add + parseInt(cpf.substring(i, i+1)) * u;
    }

    compareCPF = compareCPF + ( (add % 11) < 2 ? 0 : 11 - (add % 11));
    add = 0

    for (i = 9, u = 2; i >= 0; i--, u++) {
        add = add + parseInt(cpf.substring(i, i+1)) * u;
    }

    compareCPF = compareCPF + ( (add % 11) < 2 ? 0 : 11 - (add % 11));

    if (compareCPF !== cpf) {
        return false;
    }

    return true;
});
