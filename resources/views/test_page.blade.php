<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Страница для тестирования загрузки виджета</title>
</head>

<body>
<script>
    (function (d, w) {
        var n = d.getElementsByTagName("script")[0], s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "/widget/pixel.js?ref=" + d.referrer + "&page=" + encodeURIComponent(w.location.href);
        n.parentNode.insertBefore(s, n); })(document, window);
</script>
</body>

</html>
