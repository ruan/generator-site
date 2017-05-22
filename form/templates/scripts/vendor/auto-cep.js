$(document).ready(function () {
    var $autocep = $('.auto-cep');
    if ($autocep.length > 0) {
        var $endereco = $($autocep.data('endereco'));
        var $bairro = $($autocep.data('bairro'));
        var $uf = $($autocep.data('uf'));
        var $cidade = $($autocep.data('cidade'));
        $autocep.on('keyup', function () {
            var cep = $(this).val().replace(/\s/g, '').replace('-', '');
            if (cep.length != 8) {
                return false;
            }
            var url = "http://viacep.com.br/ws/" + cep + "/json/";
            $.getJSON(url, function (dadosRetorno) {
                try {
                    $endereco.val(dadosRetorno.logradouro);
                    $bairro.val(dadosRetorno.bairro);

                    if($uf.prop("tagName") != 'SELECT'){
                        $uf.val(dadosRetorno.uf);
                        $cidade.val(dadosRetorno.localidade);
                    }else{
                        $uf.val(dadosRetorno.uf).trigger("change");
                        timerAutoselectCidade = setInterval(function () {
                            if ( $cidade.find('option').length > 1 ) {
                                clearInterval(timerAutoselectCidade);
                                $cidade.find('option').each(function (i, option) {
                                    var cidade = $(option).text().toLowerCase();
                                    if (cidade == dadosRetorno.localidade.toLowerCase()) {
                                        var id = $(option).attr('value');
                                        $cidade.val(id).trigger("change")
                                        return false;
                                    }
                                });
                            }
                        }, 300)
                    }

                } catch (ex) { }
            });
        });
    }
});