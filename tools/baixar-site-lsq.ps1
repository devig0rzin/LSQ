<#
  baixar-site-lsq.ps1 — baixa do site atual da LSQ (lsq-coupling.com.br) o que o site novo precisa:
    - página de cada um dos 127 produtos (HTML) + imagens técnicas da descrição (desenhos, tabelas)
    - certificados (16 imagens)
    - fotos da página Produção (12 imagens)
    - páginas Conversor de medida, Empresa, Certificados e Produção (HTML)
  Uso (PowerShell 5+ no Windows):
    powershell -ExecutionPolicy Bypass -File .\baixar-site-lsq.ps1
  Resultado: lsq-site-dump.zip na Área de Trabalho. Envie esse zip.
#>
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ProgressPreference = 'SilentlyContinue'
$UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
$Root = Join-Path ([Environment]::GetFolderPath('Desktop')) 'lsq-site-dump'
New-Item -ItemType Directory -Force -Path $Root | Out-Null
$Log = Join-Path $Root 'log.txt'
'' | Set-Content $Log

function Get-File([string]$Url, [string]$Path) {
  if (Test-Path $Path) { return $true }
  try {
    Invoke-WebRequest -Uri $Url -OutFile $Path -UserAgent $UA -UseBasicParsing -TimeoutSec 60
    Start-Sleep -Milliseconds 250
    return $true
  } catch {
    Add-Content $Log "FALHOU $Url -> $($_.Exception.Message)"
    return $false
  }
}

function Get-RteImages([string]$HtmlPath, [string]$Dir) {
  $html = [IO.File]::ReadAllText($HtmlPath, [Text.Encoding]::UTF8)
  $found = [regex]::Matches($html, '(?:src|data-src|href)="((?:https?:)?//[^"]+/rte/[^"?]+\.(?:jpe?g|png|gif|webp|pdf))', 'IgnoreCase')
  $seen = @{}
  $i = 0
  foreach ($m in $found) {
    $u = $m.Groups[1].Value
    if ($u.StartsWith('//')) { $u = 'https:' + $u }
    if ($seen.ContainsKey($u)) { continue }
    $seen[$u] = 1
    $i++
    $name = '{0:D2}_{1}' -f $i, ([IO.Path]::GetFileName($u))
    Get-File $u (Join-Path $Dir $name) | Out-Null
  }
}

# 1) Páginas institucionais
$pages = @{
  'conversor-de-medida' = 'https://lsq-coupling.com.br/conversor-de-medida/'
  'empresa'             = 'https://lsq-coupling.com.br/empresa/'
  'certificados'        = 'https://lsq-coupling.com.br/certificados/'
  'producao'            = 'https://lsq-coupling.com.br/producao/'
}
$pagesDir = Join-Path $Root 'paginas'
New-Item -ItemType Directory -Force -Path $pagesDir | Out-Null
foreach ($k in $pages.Keys) { Get-File $pages[$k] (Join-Path $pagesDir "$k.html") | Out-Null }

# 2) Certificados
$certDir = Join-Path $Root 'certificados'
New-Item -ItemType Directory -Force -Path $certDir | Out-Null
1..16 | ForEach-Object { Get-File "https://d2r9epyceweg5n.cloudfront.net/stores/004/756/972/rte/$_.jpg" (Join-Path $certDir ('{0:D2}.jpg' -f $_)) | Out-Null }
Get-RteImages (Join-Path $pagesDir 'certificados.html') $certDir

# 3) Produção
$prodDir = Join-Path $Root 'producao'
New-Item -ItemType Directory -Force -Path $prodDir | Out-Null
1..12 | ForEach-Object { Get-File "https://www.lsq-coupling.ru/images/proizvodstvo/$_.gif" (Join-Path $prodDir ('{0:D2}.gif' -f $_)) | Out-Null }

# 4) Produtos
$products = @(
  @('kj-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/kj-engate-rapido-hidraulico-tipo-fechado/'),
  @('kzd-engate-rapido-hidraulico-e-pneumatico-iso-7241-b','https://lsq-coupling.com.br/produtos/kzd-engate-rapido-hidraulico-e-pneumatico-iso-7241-b/'),
  @('kzd-2-engate-rapido-hidraulico-e-pneumatico','https://lsq-coupling.com.br/produtos/kzd-2-engate-rapido-hidraulico-e-pneumatico/'),
  @('kze-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/kze-engate-rapido-hidraulico-tipo-fechado/'),
  @('kze-b-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/kze-b-engate-rapido-hidraulico-tipo-fechado/'),
  @('kze-ba-engate-rapido-hidraulico-com-rosca','https://lsq-coupling.com.br/produtos/kze-ba-engate-rapido-hidraulico-com-rosca/'),
  @('kze-bb-engate-rapido-hidraulico-tipo-rosca','https://lsq-coupling.com.br/produtos/kze-bb-engate-rapido-hidraulico-tipo-rosca/'),
  @('kze-bc-engate-rapido-hidraulico','https://lsq-coupling.com.br/produtos/kze-bc-engate-rapido-hidraulico/'),
  @('kze-bd-engate-rapido-hidraulico-com-rosca','https://lsq-coupling.com.br/produtos/kze-bd-engate-rapido-hidraulico-com-rosca/'),
  @('kze-be-engate-rapido-hidraulico-com-rosca','https://lsq-coupling.com.br/produtos/kze-be-engate-rapido-hidraulico-com-rosca/'),
  @('kzf-engate-rapido-hidraulico-tipo-fechado-iso-7241-b','https://lsq-coupling.com.br/produtos/kzf-engate-rapido-hidraulico-tipo-fechado-iso-7241-b/'),
  @('lam-engate-rapido-de-desligamento-unico-tipo-americano','https://lsq-coupling.com.br/produtos/lam-engate-rapido-de-desligamento-unico-tipo-americano/'),
  @('lao-engate-rapido-tipo-monomanual-e-semiautomatica','https://lsq-coupling.com.br/produtos/lao-engate-rapido-tipo-monomanual-e-semiautomatica/'),
  @('lkji-engate-rapido-de-super-alta-pressao','https://lsq-coupling.com.br/produtos/lkji-engate-rapido-de-super-alta-pressao/'),
  @('lsq-1141-engate-rapido-hidraulico-com-rosca','https://lsq-coupling.com.br/produtos/lsq-1141-engate-rapido-hidraulico-com-rosca/'),
  @('lsq-a-engate-rapido-tipo-siglehanded-e-semiautomatico','https://lsq-coupling.com.br/produtos/lsq-a-engate-rapido-tipo-siglehanded-e-semiautomatico/'),
  @('lsq-aa-engate-rapido-tipo-monomanual-e-semiautomatico','https://lsq-coupling.com.br/produtos/lsq-aa-engate-rapido-tipo-monomanual-e-semiautomatico/'),
  @('lsq-ab-acoplamento-rapido-tipo-semiautomatico-e-de-mao-unica1','https://lsq-coupling.com.br/produtos/lsq-ab-acoplamento-rapido-tipo-semiautomatico-e-de-mao-unica1/'),
  @('lsq-an-engate-rapido-semiautimatico-tipo-botao-de-pressao','https://lsq-coupling.com.br/produtos/lsq-an-engate-rapido-semiautimatico-tipo-botao-de-pressao/'),
  @('lsq-cc20-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-cc20-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-cpi-engates-rapidos-hidraulicos-de-instrumentacao-ss316','https://lsq-coupling.com.br/produtos/lsq-cpi-engates-rapidos-hidraulicos-de-instrumentacao-ss316/'),
  @('lsq-cvv-engate-rapido-hidraulico-com-rosca','https://lsq-coupling.com.br/produtos/lsq-cvv-engate-rapido-hidraulico-com-rosca/'),
  @('lsq-dg-engate-rapido-tipo-monomanual-e-semiautomatico','https://lsq-coupling.com.br/produtos/lsq-dg-engate-rapido-tipo-monomanual-e-semiautomatico/'),
  @('lsq-djy-engate-rapido-hidraulico-tipo-fechado-ss304','https://lsq-coupling.com.br/produtos/lsq-djy-engate-rapido-hidraulico-tipo-fechado-ss304/'),
  @('lsq-dl-dld-multi-engates','https://lsq-coupling.com.br/produtos/lsq-dl-dld-multi-engates/'),
  @('lsq-ff-engate-rapido-hidraulico-iso-16028','https://lsq-coupling.com.br/produtos/lsq-ff-engate-rapido-hidraulico-iso-16028/'),
  @('lsq-ffy-engate-rapido-hidraulico-iso-16028','https://lsq-coupling.com.br/produtos/lsq-ffy-engate-rapido-hidraulico-iso-16028/'),
  @('lsq-irn-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-irn-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-isoa-engate-rapido-hidraulico-tipo-fechado-iso-7241-a','https://lsq-coupling.com.br/produtos/lsq-isoa-engate-rapido-hidraulico-tipo-fechado-iso-7241-a/'),
  @('lsq-k-engate-rapido-para-molde','https://lsq-coupling.com.br/produtos/lsq-k-engate-rapido-para-molde/'),
  @('lsq-o2-kr-estrutura-basica-de-engate-rapido-de-alta-pressao','https://lsq-coupling.com.br/produtos/lsq-o2-kr-estrutura-basica-de-engate-rapido-de-alta-pressao/'),
  @('lsq-pcvb1-2-3-engate-rapido-sob-pressao-tipo-ajustavel','https://lsq-coupling.com.br/produtos/lsq-pcvb1-2-3-engate-rapido-sob-pressao-tipo-ajustavel/'),
  @('lsq-pd-engate-rapido-hidraulico-tipo-fechado-novo','https://lsq-coupling.com.br/produtos/lsq-pd-engate-rapido-hidraulico-tipo-fechado-novo/'),
  @('lsq-pk-engate-rapido-hidraulico-tipo-fechado-iso-5675','https://lsq-coupling.com.br/produtos/lsq-pk-engate-rapido-hidraulico-tipo-fechado-iso-5675/'),
  @('lsq-ptf-engate-rapido-hidraulico-iso-16028','https://lsq-coupling.com.br/produtos/lsq-ptf-engate-rapido-hidraulico-iso-16028/'),
  @('lsq-ptr-engate-rapido-hidraulico-tipo-face-plana','https://lsq-coupling.com.br/produtos/lsq-ptr-engate-rapido-hidraulico-tipo-face-plana/'),
  @('lsq-q1-engate-rapido-para-molde-pequeno','https://lsq-coupling.com.br/produtos/lsq-q1-engate-rapido-para-molde-pequeno/'),
  @('lsq-q2-engate-rapido-para-molde','https://lsq-coupling.com.br/produtos/lsq-q2-engate-rapido-para-molde/'),
  @('lsq-q3-engate-rapido-para-molde','https://lsq-coupling.com.br/produtos/lsq-q3-engate-rapido-para-molde/'),
  @('lsq-rd-engate-rapido-hidraulico-tipo-japones','https://lsq-coupling.com.br/produtos/lsq-rd-engate-rapido-hidraulico-tipo-japones/'),
  @('lsq-rk-engate-rapido-hidraulico-com-rosca','https://lsq-coupling.com.br/produtos/lsq-rk-engate-rapido-hidraulico-com-rosca/'),
  @('lsq-s1-engate-rapido-hidraulico-tipo-fechado-iso-7241-a','https://lsq-coupling.com.br/produtos/lsq-s1-engate-rapido-hidraulico-tipo-fechado-iso-7241-a/'),
  @('lsq-s1-ss-engate-rapido-hidraulico-tipo-fechado-iso-7241-a','https://lsq-coupling.com.br/produtos/lsq-s1-ss-engate-rapido-hidraulico-tipo-fechado-iso-7241-a/'),
  @('lsq-s10-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-s10-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-s2-engate-rapido-hidraulico-tipo-fechado-iso-7241-b','https://lsq-coupling.com.br/produtos/lsq-s2-engate-rapido-hidraulico-tipo-fechado-iso-7241-b/'),
  @('lsq-s2-ss-engate-rapido-hidraulico-tipo-fechado-iso-7241-b','https://lsq-coupling.com.br/produtos/lsq-s2-ss-engate-rapido-hidraulico-tipo-fechado-iso-7241-b/'),
  @('lsq-s3-engate-rapido-hidraulico-tipo-fechado-iso-7241-a','https://lsq-coupling.com.br/produtos/lsq-s3-engate-rapido-hidraulico-tipo-fechado-iso-7241-a/'),
  @('lsq-s4-engate-rapido-hidraulico-tipo-valvula-de-esfera-iso-5675','https://lsq-coupling.com.br/produtos/lsq-s4-engate-rapido-hidraulico-tipo-valvula-de-esfera-iso-5675/'),
  @('lsq-s5-lsq-s5c-engate-rapido-hidraulico-tipo-push-pull-iso-5675','https://lsq-coupling.com.br/produtos/lsq-s5-lsq-s5c-engate-rapido-hidraulico-tipo-push-pull-iso-5675/'),
  @('lsq-s6-engate-rapido-hidraulico-tipo-fechado-iso-7241-a','https://lsq-coupling.com.br/produtos/lsq-s6-engate-rapido-hidraulico-tipo-fechado-iso-7241-a/'),
  @('lsq-s7-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-s7-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-s8-engate-rapido-hidraulico-e-pneumatico-iso-7241-b','https://lsq-coupling.com.br/produtos/lsq-s8-engate-rapido-hidraulico-e-pneumatico-iso-7241-b/'),
  @('lsq-s9-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-s9-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-tc-engate-rapido-hidraulico-de-alta-pressao-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-tc-engate-rapido-hidraulico-de-alta-pressao-tipo-fechado/'),
  @('lsq-te-engate-rapido-hidraulico-de-alta-pressao-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-te-engate-rapido-hidraulico-de-alta-pressao-tipo-fechado/'),
  @('lsq-tf-engate-rapido-hidraulico-de-alta-pressao','https://lsq-coupling.com.br/produtos/lsq-tf-engate-rapido-hidraulico-de-alta-pressao/'),
  @('lsq-tg-engate-rapido-hidraulico-tipo-fechado-iso-7241-a','https://lsq-coupling.com.br/produtos/lsq-tg-engate-rapido-hidraulico-tipo-fechado-iso-7241-a/'),
  @('lsq-tm-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-tm-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-tnv-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-tnv-engate-rapido-hidraulico-tipo-fechado/'),
  @('lsq-vep-engate-rapido-hidraulico','https://lsq-coupling.com.br/produtos/lsq-vep-engate-rapido-hidraulico/'),
  @('lst-engate-rapido-hidraulico-tipo-americano','https://lsq-coupling.com.br/produtos/lst-engate-rapido-hidraulico-tipo-americano/'),
  @('pcv-japones-fck-italiano-zzp-u-k-engate-rapido','https://lsq-coupling.com.br/produtos/pcv-japones-fck-italiano-zzp-u-k-engate-rapido/'),
  @('q-zb275-77-engate-rapido-hidraulico-tipo-fechado','https://lsq-coupling.com.br/produtos/q-zb275-77-engate-rapido-hidraulico-tipo-fechado/'),
  @('tpl-engate-rapido-hidraulico-direto','https://lsq-coupling.com.br/produtos/tpl-engate-rapido-hidraulico-direto/'),
  @('plugue-metalico-para-engates-rapidos-da-serie-lsq-s1','https://lsq-coupling.com.br/produtos/plugue-metalico-para-engates-rapidos-da-serie-lsq-s1/'),
  @('lsq-17-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-17-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-19-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-19-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-23-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-23-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-25-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-25-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-26-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-26-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-300-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/lsq-300-engate-rapido-pneumatico/'),
  @('lsq-310-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/lsq-310-engate-rapido-pneumatico/'),
  @('lsq-315-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/lsq-315-engate-rapido-pneumatico/'),
  @('lsq-320-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/lsq-320-engate-rapido-pneumatico/'),
  @('lsq-430-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/lsq-430-engate-rapido-pneumatico/'),
  @('lsq-550-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/lsq-550-engate-rapido-pneumatico/'),
  @('lsq-c-engate-rapido-pneumatico-de-desligamento-unico','https://lsq-coupling.com.br/produtos/lsq-c-engate-rapido-pneumatico-de-desligamento-unico/'),
  @('lsq-cc-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-cc-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-cc50-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-cc50-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-dd-engate-rapido-pneumatico-tipo-fechado','https://lsq-coupling.com.br/produtos/lsq-dd-engate-rapido-pneumatico-tipo-fechado/'),
  @('lsq-hx-engate-rapido-pneumatico-tipo-valvula-de-bloqueio','https://lsq-coupling.com.br/produtos/lsq-hx-engate-rapido-pneumatico-tipo-valvula-de-bloqueio/'),
  @('qkd-t-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/qkd-t-engate-rapido-pneumatico/'),
  @('qkd-x-mini-engate-rapido-pneumatico-tipo-monomanual-semiautomatico','https://lsq-coupling.com.br/produtos/qkd-x-mini-engate-rapido-pneumatico-tipo-monomanual-semiautomatico/'),
  @('qkd-z-engate-rapido-pneumatico-tipo-monomanual-e-semiautomatica','https://lsq-coupling.com.br/produtos/qkd-z-engate-rapido-pneumatico-tipo-monomanual-e-semiautomatica/'),
  @('qkd153-engate-rapido-pneumatico','https://lsq-coupling.com.br/produtos/qkd153-engate-rapido-pneumatico/'),
  @('qkd156-engate-rapido-pneumatico-de-desligamento-unico','https://lsq-coupling.com.br/produtos/qkd156-engate-rapido-pneumatico-de-desligamento-unico/'),
  @('qkd158-engate-rapido-pneumatico-de-desligamento-unico','https://lsq-coupling.com.br/produtos/qkd158-engate-rapido-pneumatico-de-desligamento-unico/'),
  @('kz1-2-3-engate-de-refrigeracao-tipo-bracadeira','https://lsq-coupling.com.br/produtos/kz1-2-3-engate-de-refrigeracao-tipo-bracadeira/'),
  @('nzkd1-2-3-engate-de-refrigeracao-de-alta-estanqueidade','https://lsq-coupling.com.br/produtos/nzkd1-2-3-engate-de-refrigeracao-de-alta-estanqueidade/'),
  @('engate-rapido-manual-de-refrigeracao-tipo-valvula-giratoria','https://lsq-coupling.com.br/produtos/engate-rapido-manual-de-refrigeracao-tipo-valvula-giratoria/'),
  @('gas-rapido-montagem-da-serie-da-pistola','https://lsq-coupling.com.br/produtos/gas-rapido-montagem-da-serie-da-pistola/'),
  @('khb-valvula-de-esfera-de-2-vias','https://lsq-coupling.com.br/produtos/khb-valvula-de-esfera-de-2-vias/'),
  @('khb3k-valvula-de-esfera-de-tres-vias','https://lsq-coupling.com.br/produtos/khb3k-valvula-de-esfera-de-tres-vias/'),
  @('lsq-cv-valvula-de-retencao-hidraulica','https://lsq-coupling.com.br/produtos/lsq-cv-valvula-de-retencao-hidraulica/'),
  @('lsq-hdb-valvula-modular','https://lsq-coupling.com.br/produtos/lsq-hdb-valvula-modular/'),
  @('serie-da-valvula-de-enchimento-rapido','https://lsq-coupling.com.br/produtos/serie-da-valvula-de-enchimento-rapido/'),
  @('l-acelerador-bidirecional','https://lsq-coupling.com.br/produtos/l-acelerador-bidirecional/'),
  @('la-acelerador-com-valvula-de-retencao','https://lsq-coupling.com.br/produtos/la-acelerador-com-valvula-de-retencao/'),
  @('vbpse-fechadura-hidraulica-unilateral','https://lsq-coupling.com.br/produtos/vbpse-fechadura-hidraulica-unilateral/'),
  @('jkg-encaixe-de-tubo-de-virola-de-corte-com-alta-resistencia','https://lsq-coupling.com.br/produtos/jkg-encaixe-de-tubo-de-virola-de-corte-com-alta-resistencia/'),
  @('jkh-encaixe-de-tubo-tipo-push-in','https://lsq-coupling.com.br/produtos/jkh-encaixe-de-tubo-tipo-push-in/'),
  @('jky-encaixe-de-tubo-tipo-virola-de-corte','https://lsq-coupling.com.br/produtos/jky-encaixe-de-tubo-tipo-virola-de-corte/'),
  @('jts-junta-do-tubo-de-regulacao-da-velocidade-da-serie','https://lsq-coupling.com.br/produtos/jts-junta-do-tubo-de-regulacao-da-velocidade-da-serie/'),
  @('knl-junta-de-tubo-tipo-mae-com-trava-de-porca-recartilhada','https://lsq-coupling.com.br/produtos/knl-junta-de-tubo-tipo-mae-com-trava-de-porca-recartilhada/'),
  @('lsq-nzk1-2-3-ampliacao-interna','https://lsq-coupling.com.br/produtos/lsq-nzk1-2-3-ampliacao-interna/'),
  @('serie-jsm-de-juntas-de-trava','https://lsq-coupling.com.br/produtos/serie-jsm-de-juntas-de-trava/'),
  @('vbpde-echadura-hidraulica-dupla-face','https://lsq-coupling.com.br/produtos/vbpde-echadura-hidraulica-dupla-face/'),
  @('junta-de-manometro-reta-de-serie-integrada','https://lsq-coupling.com.br/produtos/junta-de-manometro-reta-de-serie-integrada/'),
  @('junta-de-tubo-de-combinacao-da-serie-jzh','https://lsq-coupling.com.br/produtos/junta-de-tubo-de-combinacao-da-serie-jzh/'),
  @('junta-de-tubo-de-extrapolacao-da-serie-jwr','https://lsq-coupling.com.br/produtos/junta-de-tubo-de-extrapolacao-da-serie-jwr/'),
  @('junta-de-tubo-de-insercao-da-serie-kh','https://lsq-coupling.com.br/produtos/junta-de-tubo-de-insercao-da-serie-kh/'),
  @('protetor-metalico-para-engates-rapidos-da-serie-lsq-s5','https://lsq-coupling.com.br/produtos/protetor-metalico-para-engates-rapidos-da-serie-lsq-s5/'),
  @('protetor-metalico-para-engates-rapidos-da-serie-lsq-s10','https://lsq-coupling.com.br/produtos/protetor-metalico-para-engates-rapidos-da-serie-lsq-s10/'),
  @('tampa-de-plastico-contra-poeira-femea','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-femea/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-b','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-b/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-ff','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-ff/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-pk','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-pk/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s1','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s1/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s2','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s2/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s4','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s4/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s5','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-s5/'),
  @('tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-tf','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-tf/'),
  @('tampa-de-plastico-contra-poeira-para-engates-rapidos-da-serie-lsq-pd','https://lsq-coupling.com.br/produtos/tampa-de-plastico-contra-poeira-para-engates-rapidos-da-serie-lsq-pd/'),
  @('tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-b','https://lsq-coupling.com.br/produtos/tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-b/'),
  @('tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-ba','https://lsq-coupling.com.br/produtos/tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-ba/'),
  @('tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-bc','https://lsq-coupling.com.br/produtos/tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-bc/'),
  @('tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-vep','https://lsq-coupling.com.br/produtos/tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-lsq-vep/')
)
$prodPages = Join-Path $Root 'produtos'
New-Item -ItemType Directory -Force -Path $prodPages | Out-Null
$n = 0
foreach ($p in $products) {
  $n++
  $slug = $p[0]; $url = $p[1]
  Write-Host ("[{0}/{1}] {2}" -f $n, $products.Count, $slug)
  $dir = Join-Path $prodPages $slug
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $html = Join-Path $dir 'pagina.html'
  if (Get-File $url $html) { Get-RteImages $html $dir }
}

# 5) Zip
$zip = Join-Path ([Environment]::GetFolderPath('Desktop')) 'lsq-site-dump.zip'
if (Test-Path $zip) { Remove-Item $zip }
Compress-Archive -Path (Join-Path $Root '*') -DestinationPath $zip
Write-Host ""
Write-Host "Pronto: $zip"
Write-Host "Falhas (se houver) em: $Log"
