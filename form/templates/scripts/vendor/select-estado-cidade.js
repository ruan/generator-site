$(document).ready(function () {
    if ($('.select-cidade').length > 0 && $('.select-estado').length > 0) {
        var baseUrl = 'https://www.cappen.com/dev/json-cidade-estado/';
        var cidades = null;

        function filterCidades(estado) {
            var d = [];
            for (var i = 0; i < cidades[estado].length; i++) {
                d.push({
                    id: cidades[estado][i].nome,
                    text: cidades[estado][i].nome
                });
            }
            return d;
        }

        function carregaCidades(estado) {
            if (estado.length > 0) {
                if (cidades) {
                    var d = filterCidades(estado);
                    $('.select-cidade').find('option').remove();
                    $('.select-cidade').select2({
                        minimumResultsForSearch: 10,
                        data: d
                    });
                } else {
                    $.getJSON(baseUrl + 'cidade.json', function (data) {
                        cidades = data;
                        var d = filterCidades(estado);
                        $('.select-cidade').find('option').remove();
                        $('.select-cidade').select2({
                            minimumResultsForSearch: 10,
                            data: d
                        });
                    })
                }
            }
        }

        function loadUfs() {
            $.getJSON(baseUrl + 'estado.json', function (data) {
                $('.select-estado').select2({
                    minimumResultsForSearch: 10,
                    data: data
                });
            })
        }

        $('.select-cidade').select2({
            minimumResultsForSearch: 10
        });
        $('.select-estado').select2({
            minimumResultsForSearch: 10
        });

        $(document).on('change', 'select[name="estado"]', function () {
            var estado = $(this).val();
            carregaCidades(estado);
        });
        loadUfs();
    }
});