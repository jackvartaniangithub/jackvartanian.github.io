// 27-04-2022
function _defineProperty(e, t, o) { return t in e ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = o, e }
var product360 = {
        mdInitials: "PS",
        clientPos: 0,
        frame: 1,
        delayFrame: 0,
        check360: null,
        checkResolution: function() { return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? (console.log("-- Product 360 mobile"), { device: "mobile", event: "touchmove" }) : (console.log("-- Product 360 desktop"), { device: "desktop", event: "mousemove" }) },
        getProduct: function(e) { var t = { url: "/api/dataentities/" + product360.mdInitials + "/search?_fields=id,idproduto,imagens&idproduto=" + e, method: "GET", timeout: 0, headers: { "Content-Type": "application/json", Accept: "application/vnd.vtex.ds.v10+json", "REST-Range": "resources=0-10" } }; return $.ajax(t) },
        generateUrlImgs: function(e, t) { var o = "https://jackvartanian.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=" + product360.mdInitials + "-" + t + "&fileName=" + e; return '<div style="background-image: url(' + o + '); position: absolute; top: 0; left: 0; background-size: cover; width: 100%; height: 100%; overflow: hidden"></div>' },
        generateUrlImgsNew360: function(e, t) { var o = "https://jackvartanian.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=" + product360.mdInitials + "-" + t + "&fileName=" + e; return '<img src="' + o + '"/>' },
        mouseAction: function(e) {
            document.getElementById("product360").addEventListener(e, function(t) {
                var o, i = $(this).find("div").length - 1;
                o = "mousemove" === e ? t.clientX : t.touches[0].clientX, 0 !== product360.clientPos && product360.clientPos < o ? (console.log("----------" + product360.frame + "--" + i), i && product360.frame >= i && (product360.frame = 0, product360.delayFrame = 0), product360.delayFrame += 1, product360.frame <= i && product360.delayFrame % 3 == 0 && (product360.frame += 1, $(this).find("div").hide(), $(this).find("div").eq(product360.frame).show()), console.log("-- mouseAction: Maior - FRAME: ", product360.frame, "")) : (product360.frame <= 0 && (product360.frame = i, product360.delayFrame = i), product360.delayFrame -= 1, product360.delayFrame % 3 == 0 && (product360.frame -= 1, $(this).find("div").hide(), $(this).find("div").eq(product360.frame).show()), console.log("-- mouseAction: Menor", product360.frame)), product360.clientPos = o
            })
        },
        openAction: function(e) {
            var t = $(".thumbs li a img").eq(0).attr("src");
            $(e.thumb).append('<div class="s-thumbs__item btproduct-360"><img src="' + t + '"><div class="flag360">360&#176;</div></div>'), $(".btproduct-360").on("click", function(e) { e.preventDefault(), "flex" == !$(".col-left .loading").css("display") ? console.log("----------------sdfd------------") : $(".col-left .loading").css("display", "flex"), "desktop" === product360.checkResolution().device && "block" === $(".product360").css("display") ? console.log("--------- Esconder") : ($(".product360").show(), console.log("--------- Exibir --")) })
        },
        init: function(e, t) {
            console.log("360-init"), product360.getProduct(e.productId).done(function(o) {
                if (o.length) {
                    product360.openAction({ image: e.elem, thumb: e.thumb });
                    var i, n = e.elem;
                    if ("desktop" === product360.checkResolution().device) i = "block", $(n).append('<li class="product360" id="product360" style="width: 450px; height: 450px; position: relative; overflow: hidden; background: #fff; display: ' + i + '"></li>');
                    else {
                        i = "block";
                        var s = o[0].imagens.split(",")[0],
                            r = o[0].id;
                        $("body").append('<div class="product360" id="product360">\t\t\t\t\t\t\t<span>x</span>\t\t\t\t\t\t</di>'), $(n).append('<li class="btproduct-360">' + product360.generateUrlImgsNew360(s, r) + "</li>"), $("li.btproduct-360").on("click", function(e) { e.preventDefault(), "flex" == !$(".col-left .loading").css("display") ? console.log("----------------sdfd------------") : $(".col-left .loading").css("display", "flex"), "desktop" === product360.checkResolution().device && "block" === $(".product360").css("display") ? console.log("--------- Esconder") : ($(".product360").show(), console.log("--------- Exibir --")) }), $("#product360 span").on("click", function() { $(".product360").hide() })
                    }
                    var c = o[0].imagens.split(","),
                        r = o[0].id;
                    console.log("-- Array de imagens: ", "ID:" + r, c), $.each(c, function(e, t) { $(".product360").append(product360.generateUrlImgs(t, r)), e > 22 ? setTimeout(function() { $(".col-left .loading").remove() }, 1e4) : 1 == e && $(".col-left").append('<div class="loading" style="position: absolute;top: 0;width: 100%;height: 100%;display: none;justify-content: center;align-items: center;z-index: 9998;background: #fff;"> <img src="/arquivos/ajax-loader.gif"></div>') }), t(), product360.mouseAction(product360.checkResolution().event), product360.check360 = !0
                } else t(), product360.check360 = !1
            })
        }
    },
    produto = {
        qtyProduct: function() {
            var e = $(".product-main-info-price-productQty"),
                t = parseInt(e.val(), 10);
            $(".product-main-info-price-buttonUp").click(function(o) { o.preventDefault(), t++, e.attr("value", t) }), $(".product-main-info-price-buttonDown").click(function(o) { o.preventDefault(), t > 1 && (t--, e.attr("value", t)) })
        },
        priceDescription: function() {
            var e = $(".price-installments"),
                t = e.text();
            t = t.replace("ou", "em até"), e.text(t), $(".buy-together-content table tbody > tr").each(function() {
                $(this).html();
                $(this).find("#lnkComprar").text("Comprar junto");
                var e = $(this).find("td.buy strong").eq(0).text(),
                    t = $(this).find("td.buy strong").eq(1).text(),
                    o = $(this).find("td.buy").text().split("total:")[1].split("Comprar")[0].trim();
                $(this).find("td.buy").prepend('<span class="priceTotal">' + o + '</span><span class="prodParcels">Em até ' + e + " de " + t + "</span>"), $(this).find(".buy").contents().filter(function() { return 3 == this.nodeType })[0].nodeValue = "", $(this).find(".buy").contents().filter(function() { return 3 == this.nodeType })[1].nodeValue = "", $(this).find(".buy").contents().filter(function() { return 3 == this.nodeType })[2].nodeValue = "", $(this).find(".buy strong").contents().filter(function() { return 3 == this.nodeType })[0].nodeValue = "", $(this).find(".buy strong").contents().filter(function() { return 3 == this.nodeType })[1].nodeValue = ""
            })
        },
        productSize: function() {
            var e = $(".sku-selector-container ul .item-dimension-Tamanho").length,
                t = $(".sku-selector-container").length;
            e > 0 ? $(".selecao-sku-guia .guia-box .x-tamanho-adequado").show() : $(".selecao-sku-guia").hide(), t > 0 && ($(".sku-selector-container").css("border", "none"), $(".selecao-sku-guia").show())
        },
        buyButton: function() {
            var e = $(".buy-button.buy-button-ref");
            e.click(function(t) {
                var o = $(".buy-button.buy-button-ref").attr("href");
                if (o.indexOf("Por favor, selecione o modelo desejado.") === -1) {
                    var i = $(".product-main-info-price-productQty").val(),
                        n = o.slice(o.indexOf("sku=") + 4, o.indexOf("&qty")),
                        s = "/checkout/cart/add?sku=" + n + "&qty=" + i + "&seller=1&redirect=true&sc=1";
                    e.attr("href", s)
                } else e.attr("href", "javascript:alert('Por favor, selecione o modelo desejado.');")
            })
        },
        tableSize: function() { $(".x-tamanho-adequado").click(function() { $(".x-table-medida").show() }), $(".x-table-medida .x-shadow, .x-table-medida .x-close").click(function() { $(".x-table-medida").hide() }) },
        preloading: { add: function(e) { $(e).append('<div class="preloading" id="preloading"><div class="preloading__icon"><div></div><div></div><div></div><div></div></div></div>') }, "delete": function(e) { setTimeout(function() { $(e).css("visibility", "visible"), $("#preloading").remove() }, 500) } },
        thumbsSlick: function() {
            var e = { url: "/api/catalog_system/pub/products/search/?fq=productId:" + skuJson.productId, method: "GET", timeout: 0, headers: { Accept: "application/json", "Content-Type": "application/json" } };
            $.ajax(e).done(function(e) {
                function t() { return "desktop" === product360.checkResolution().device ? produto.slickFunctionsDesktop() : produto.slickFunctionsMobile() }
                for (var o, i, n = 0; n < e[0].items[0].images.length; n++) "personalize" == e[0].items[0].images[n].imageLabel && (o = e[0].items[0].images[n].imageId, i = e[0].items[0].images[n].imageUrl, $(".customizeModal__img").css({ "background-image": "url('" + i + "')" }));
                if ($(".thumbs img").each(function() {
                        var e = $(this).attr("src").split("/ids/")[1].split("-110-110")[0];
                        e == o && $(this).parents("li").remove()
                    }), produto.preloading.add("#include"), $("#image, .x-thumbs, .s-thumbs").remove(), $("#show #include").append('<ul class="x-thumbs" style="visibility: hidden"></ul>'), $("#show #include").append('<div class="s-thumbs" style="visibility: hidden"></div>'), $("#show ul.thumbs li img").each(function(e) {
                        var t = $(this),
                            o = { src: t.attr("src"), srcthumb: t.attr("src").replace("110-110", "220-220"), srcMain: t.attr("src").replace("320-320", "750-750").replace("110-110", "750-750"), newSrc: function i() { var i = this.src.replace("110-110", "320-320"); return i = i.replace("320-320", "750-750"), i = i.replace("60-60", "450-450") }, zoomSrc: this.src.replace("110-110", "1000-1000") };
                        $("#show #include .x-thumbs").append('\n          <li class="x-thumbs__item"> \n            <a href="' + o.zoomSrc + '" class="image-zoom">\n              <img id="' + e + '" src="' + o.srcMain + '"/>\n            </a>\n          </li>\n        '), $("#show #include .s-thumbs").append('\n          <div class="s-thumbs__item"> \n              <img id="' + e + '" src="' + o.srcthumb + '"/>\n          </div>\n        ')
                    }), $(".thumbs").hide(), "desktop" === product360.checkResolution().device) {
                    var s;
                    $(".image-zoom").jqzoom((s = { zoomType: "standard", zoomWidth: 500, zoomHeight: 500, alwaysOn: !0, lens: !0, title: !1, preloadImages: !1 }, _defineProperty(s, "alwaysOn", !1), _defineProperty(s, "position", "top"), s))
                }
                $("#product360").length || product360.check360 === !1 ? t() : product360.init({ elem: "#include .x-thumbs", thumb: ".s-thumbs", productId: $("#___rc-p-id").attr("value") }, t)
            })
        },
        slickFunctionsDesktop: function() { produto.preloading["delete"](".x-thumbs, .s-thumbs"), $(".x-thumbs").not(".slick-initialized").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !0, asNavFor: ".s-thumbs" }), $(".s-thumbs").not(".slick-initialized").slick({ slidesToShow: 3, slidesToScroll: 1, asNavFor: ".x-thumbs", arrows: !0, focusOnSelect: !0 }) },
        slickFunctionsMobile: function() { produto.preloading["delete"](".x-thumbs, .s-thumbs"), $(".x-thumbs").not(".slick-initialized").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !0, swipe: !0, asNavFor: ".s-thumbs" }), $(".s-thumbs").not(".slick-initialized").slick({ slidesToShow: 3, slidesToScroll: 1, asNavFor: ".x-thumbs", arrows: !0, swipe: !0, focusOnSelect: !0 }) },
        desktopVerification: function() { var e = $(window).width(); return e >= 1024 || e },
        noProduct: function() {
            var e = $(".portal-notify-me-ref");
            e.length > 1 && ($(".product-main-info-price").hide(), $(".product-main-info-shippingdesc").hide(), $(".selecao-sku-guia").show())
        },
        flagExpressShipping: function() {
            var e = $(".flags-produto .flag.entrega-expressa-24hs");
            e.length && (e.clone().html('<img src="/arquivos/entrega-expressa-24hs_cut.png" />').prependTo(".product-main-info"), $(".product-main-info .flag:not(.exclusivos-online)").length && $(".productName, .productDescriptionShort, .skuReference").addClass("hasFlag"))
        },
        flagOnlineExclusive: function() {
            var e = $(".flags-produto .flag.exclusivos-online");
            e.length && $(".product-main-info .productName").before(e.clone().html("exclusivo online"))
        },
        unSpecify: function() {
            var e = $(".value-field.Unidade").text();
            e.length && $(".product-main-info-shippingdesc-top").append('<p style="margin-top:20px">*' + e + "</p>")
        },
        pingenteSpecify: function() {
            var e = $(".value-field.Pingente-sem-corrente").text();
            e.length && $(".product-main-info-shippingdesc-top").append('<p style="margin-top:20px">*' + e + "</p>")
        }
    },
    flashSaleProduto = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : $(".valor-por .skuBestPrice");
        var t = 25,
            o = $(".skuListPrice");
        if (o.length && e.length && $(".flag.flash-sale").length) {
            var i = o.text(),
                n = currencyToCents(i),
                s = n - centsPercent(n, t);
            console.log("antigo >>>>>", n), console.log("novo >>>>>", s), $(this).addClass("flashSale"), e.html(centsToCurrency(s))
        }
    };
$(document).ready(function() {
    window.isDesktop = produto.desktopVerification(), produto.pingenteSpecify(), produto.unSpecify(), produto.flagOnlineExclusive(), produto.flagExpressShipping(), produto.qtyProduct(), produto.priceDescription(), produto.productSize(), produto.buyButton(), produto.tableSize(), produto.thumbsSlick(), produto.noProduct(), flashSaleProduto(), $(".vitrine .helperComplement").remove();
    var e = $(".vitrine ul");
    e.length > 0 ? e.slick({ slidesToShow: 3, prevArrow: '<div class="slick-prev"></div>', nextArrow: '<div class="slick-next"></div>', responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }] }) : $("section.colecao").hide(), $(".helperComplement").remove(), $(".n1-shelf > ul").slick({ slidesToShow: 4, slidesToScroll: 1, speed: 600, prevArrow: '<span class="slick-arrow slick-prev"></span>', nextArrow: '<span class="slick-arrow slick-next"></span>', responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }] })
});
var skuSelectedtest;
$(window).on("skuSelected.vtex", function(e, t, o) { console.log("------>", e, t, o), $(".skuList .sku-picked").text() !== skuSelectedtest && (skuSelectedtest = $("label.sku-picked").text(), produto.thumbsSlick()) }), $(document).ajaxComplete(function(e, t, o) { 0 == o.url.indexOf("/comprejuntosku") && t.then(function(e) { e.length ? $(".compre-junto").parent().show() : $(".compre-junto").parent().hide() }), 0 == o.url.indexOf("/no-cache/AviseMe.aspx") && t.then(function(e) { "true" == e && $(".notifyme.sku-notifyme .success").append('<div class="sku-success-message"><span>Cadastrado com sucesso</span></div>') }) }), $(function() {
    var e = $(".productName").text();
    e.indexOf("Anel") == -1 && e.indexOf("Aliança") == -1 && $(".guia-box").hide()
});
