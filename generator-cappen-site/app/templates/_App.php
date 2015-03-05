<?php

class App {

	protected $languages = array('en', 'es');
	protected $lang      = 'pt';
	protected $page      = 'home/home';
	protected $param     = '';

	public function __construct()
	{
		$url = array_filter($this->parseUrl());
		$this->getIdioma(@$url[0]);

		if ( @$url[0] != $this->lang ) array_unshift($url, $this->lang);

		$this->checaPagina($url);
	}

	public function getMenu()
	{
		$menu = dirname(dirname(__FILE__)) . '/lang/' . $this->lang . '/menu/menu.php';
		if ( file_exists($menu) )
		{
			require_once $menu;
		}
	}

	public function getPagina()
	{
		$textos = dirname(dirname(__FILE__)) . '/lang/' . $this->lang . '/' . $this->page . '.php';
		$file = dirname(dirname(__FILE__)) . '/paginas/' . $this->page . '.php';
		if ( file_exists($textos) )
		{
			require_once $textos;
		}
		if ( isset($pagina) )
		{
			$pagina = json_decode(json_encode($pagina));
		}

		if ( file_exists($file) )
		{
			require_once $file;
		}
	}

	public function checaPagina($pagina = array())
	{
		$this->param = $pagina;
		if ( isset($pagina[0]) ) unset($pagina[0]);
		if ( count($pagina) == 1 ) $pagina[0] = $pagina[1];

		$page = implode('/', $pagina);
		if ( $page ) $this->page = $page;
	}

	public function getImageUrl($nome = '', $caminho = '')
	{
		$url = $this->getBaseUrl() . 'img/' . $caminho . $nome;
		echo $url;
	}

	public function getLink($link = '')
	{
		$lang = ($this->lang == 'pt') ? '' : $this->lang . '/';
		echo $this->getBaseUrl() . $lang . $link;
	}

	public function isHome()
	{
		$url = array_filter($this->parseUrl());
		$this->getIdioma(@$url[0]);

		if ( @$url[0] != $this->lang ) array_unshift($url, $this->lang);

		return $url;
	}

	public function getBaseUrl()
	{
		$path = str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
		$url = 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . $path;

		echo $url;
	}

	public function getIdioma($idioma = '')
	{
		if ( in_array($idioma, $this->languages) )
			$this->lang = $idioma;
	}

	public function parseUrl()
	{
		if ( isset($_GET['url']) )
			return explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
		else
			return array();
	}

}
