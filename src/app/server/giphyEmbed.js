export default function giphyEmbed(req, res) {
    const { id } = req.query;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Giphy Embed</title>
            <meta name="robots" value="NOINDEX,NOFOLLOW"/>
            <style>html { overflow: hidden; } iframe, .ui-loader { display: none; } img { display: block; width: 100%!important; } div { margin: 0 auto, text-align: center; width: 100%!important; }</style>
        </head>
        <body style="margin: 0; padding: 0">
            <div id="_giphy_${id}"></div>
            <script> 
            var _giphy = _giphy || []; 
            _giphy.push({ 
                id: "${id}",
                clickthrough_url: 'http://giphy.com/gifs/${id}'
            });
            var g = document.createElement("script"); 
            g.type = "text/javascript"; 
            g.async = true;
            g.src = ("https:" == document.location.protocol ? "https://" : "http://") + "giphy.com/static/js/widgets/embed.js";
            var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(g, s);
            </script>
        </body>
        </html>
    `);
}
