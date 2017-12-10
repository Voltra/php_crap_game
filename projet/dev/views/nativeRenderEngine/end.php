<!-- Author : Ludwig GUERIN -->
<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <!--@@ PAGE INFO @@-->
    <meta charset="utf-8" data-whatIdo="Adapter le jeu de caractère au maximum"/>
    <meta lang="fr"/>
    <title>End</title>
    <link rel="icon" href="" data-whatIdo="Icône de la page"/>
    <meta name="keywords" content="" data-whatIdo="Mots-clés"/>

    <!--@@ IMPORTANT META @@-->
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, shrink-to-fit=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" data-whatIdo="Adaptation à tous les supports"/>

    <!--@@ STYLESHEETS @@-->
    <!-- Author : Ludwig GUERIN -->
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/reset.css"; ?>" data-whatIdo="Élimination des styles par défaut du navigateur"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/clear_float.css"; ?>" data-whatIdo="Styles pour élément rétablissant le flot"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/font-loader.css"; ?>" data-whatIdo="Préparation des polices de caractères"/>

    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/common.css"; ?>" data-whatIdo="Styles commun pour tous les appareils"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/main.css"; ?>" media="all and (min-width: 768px)" data-whatIdo="Styles par défaut"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/mobile.css"; ?>" media="all and (max-width: 768px)" data-whatIdo="Styles pour les petits écrans"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/mobile.css"; ?>" media="all and (orientation:portrait)" data-whatIdo="Styles pour l'orientation portrait"/>

    <?php if($debug): ?>
        <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/debug.css"; ?>" data-whatIdo="Styles de debug pour développeurs"/>
    <?php else: ?>
        <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/definitive_colors.css"; ?>" data-whatIdo="Styles de debug pour développeurs"/>
    <?php endif; ?>

    <!-- Author : Ludwig GUERIN -->
    <?php if($pageName): ?>
        <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/{$pageName}/common.css"; ?>" data-whatIdo="Styles commun pour tous les appareils"/>
        <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/{$pageName}/main.css"; ?>" media="all and (min-width: 768px)" data-whatIdo="Styles par défaut"/>
        <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/{$pageName}/mobile.css"; ?>" media="all and (max-width: 768px)" data-whatIdo="Styles pour les petits écrans"/>
        <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/{$pageName}/mobile.css"; ?>" media="(orientation:portrait)" data-whatIdo="Styles pour l'orientation portrait"/>

        <?php if($debug): ?>
            <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/{$pageName}/debug.css"; ?>" data-whatIdo="Styles de debug pour développeurs"/>
        <?php else: ?>
            <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/{$pageName}/definitive_colors.css"; ?>" data-whatIdo="Styles de debug pour développeurs"/>
        <?php endif; ?>
    <?php endif; ?>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/flash.css"; ?>" data-whatIdo="Styles pour les messages flash"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/spinner-lord/spinner-lord.css"; ?>" data-whatIdo="Styles par défaut de l'icône de chargement"/>
    <link rel="stylesheet" href="<?= BASE_URL . "/assets/css/globals/spinner-lord/variants/voltra.css"; ?>" data-whatIdo="Styles par défaut de l'icône de chargement"/>

    <!--@@ CUSTOM SCRIPTS @@-->
    <?php $pageName = str_replace("/", "_", $pageName); ?>
    <script>
        Object.defineProperty(window, "BASE_URL", {
            value: "<?= BASE_URL; ?>",
            configurable: false,
            writable: false,
            enumerable: true
        });
    </script>
    <script src="<?= BASE_URL . "/assets/js/{$pageName}.bundle.js"; ?>" type="application/javascript"></script>
</head>

<body>
<div id="spinner-lord" class="active">
    <span></span>
</div>

<!-- Author : Ludwig GUERIN -->
<?php if(is_array($flash)): ?>
    <?php if(isset($flash["success"])): ?>
        <div class="flash flash-success flash-folded">
            <p><?= $flash["success"]; ?></p>
            <button class="flash-close">&#x2716;</button>
        </div>
    <?php elseif(isset($flash["failure"])): ?>
        <div class="flash flash-failure flash-folded">
            <p><?= $flash["failure"]; ?></p>
            <button class="flash-close">&#x2716;</button>
        </div>
    <?php endif; ?>
<?php endif; ?>

<?php if(is_callable([$flash, "has"]) && is_callable([$flash, "get"])): ?>
    <?php if($flash->has("success")): ?>
        <div class="flash flash-success flash-folded">
            <p><?= $flash->get("success"); ?></p>
            <button class="flash-close">&#x2716;</button>
        </div>
    <?php elseif($flash->has("failure")): ?>
        <div class="flash flash-failure flash-folded">
            <p><?= $flash->get("failure"); ?></p>
            <button class="flash-close">&#x2716;</button>
        </div>
    <?php endif; ?>
<?php endif; ?>

<div id="content">
    <!-- TODO: create the view -->
    <h1 id="title"><?php if($won): ?>You won !<?php else: ?>You lost !<?php endif; ?> <a href="<?= BASE_URL . "/game/play"; ?>">Play again</a>, <a href="<?= BASE_URL . "/auth/logout"; ?>">Quit</a> </h1>

    <div id="chart" data-pie='<?= $chartData; ?>'> <!-- style="width: 80vw; height: 80vh;" -->
    </div>

    <div id="stats">
        <div id="player">
            <h2>Victory/Defeat ratio: <?= number_format($winRatio, 1, '.', ','); ?>%</h2>
            <p>
                Amount of victory: <?= number_format($winAmount, 1, '.', ','); ?>
            </p>
            <p>
                Amount of defeat: <?= number_format($lossAmount, 1, '.', ','); ?>
            </p>
        </div>

        <table id="bests">
            <caption>Best three players</caption>
            <thead>
            <tr>
                <?php foreach($statsKeys as $key): ?><td><?= $key; ?></td><?php endforeach; ?>
            </tr>
            </thead>
            <tbody>
            <?php foreach($statsForThreeBests as $statsPlayer): ?>
            <tr><?php foreach($statsKeys as $key): ?><td><?= $statsPlayer[$key]; ?></td><?php endforeach; ?></tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>