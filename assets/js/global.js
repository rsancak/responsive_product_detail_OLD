/* global.js */ 

$(() => {

    /* Loading */
    $("body").before('<div class="spinner-container"><div class="spinner-border text-warning" role="status"><span class="sr-only"></span></div></div>');
    setTimeout(function(){
        $(".spinner-container").remove();
    },1000);

    /* Currency */
    let curreny = {
        eur: "€",
        usd: "$",
        ytl: "₺"
    }    

    /* Data */
    let data = {
        currency: "EUR",
        title: "Everyday items, we have something to suit every occasion.",
        description: "At suspendisse augue lectus arcu, accumsan ut sit posuere vitae sit tincidunt semper eu proin leo gravida cursus.",
        categoryImage: "bg-1.jpg",
        categoryButton: {
            buttonName: "Shop all everyday items",
            buttonLink: "javascript:;"
        },
        products: [{
            name: "365 Signature Hoodie",
            price: "33.95",
            link: "javascript:;",
            colors: ["#22c75f","#1ac5c6","#c53149","#ab2cc8"],
            images: ["product-image-1-1.jpg","product-image-1-2.jpg","product-image-1-3.jpg","product-image-1-4.jpg"]
        },
        {
            name: "Organic Skinny High Waist Jeans",
            price: "12.43",
            link: "javascript:;",
            colors: ["#e9e5b8","#b5b9e8"],
            images: ["product-image-2-1.jpg","product-image-2-2.jpg"]
        },{
            name: "Organic Skinny High Waist Jeans",
            price: "44.23",
            link: "javascript:;",
            colors: ["#99C4CC","#5f887f"],
            images: ["product-image-3-1.jpg","product-image-3-2.jpg"]
        }]
    }

    /* Template */
    if(typeof data != null && typeof data != undefined && data != ""){

        /* Left Image */
        $(".left-container").attr("style","background:url('assets/img/category-images/"+data.categoryImage+"') no-repeat;");

        /* Currency */
        let currencyType = "";
        for(let i in curreny){
            if(i == data.currency.toLowerCase()){
                currencyType = curreny[i];
            }
        }

        /* Category Info */
        let infos = `
        <h1 class="wow animated fadeInUp" data-wow-delay="0.2s">${data.title}</h1>
        <p class="wow animated fadeInUp" data-wow-delay="0.5s">${data.description}</p>
        <a  class="wow animated fadeInUp" data-wow-delay="0.8s" href="${data.categoryButton.buttonLink}" title="${data.categoryButton.buttonName}">${data.categoryButton.buttonName}</a>`;
        $(".product-page-infos").html(infos);

        /* Slider Items */
        let itemSliderTemplate = "";
        for(let i=0; i < data.products.length; i++){
            itemSliderTemplate += `<div class="item wow animated fadeInUp" data-wow-delay="${i + 4 / 5}s">
            <a class="product-item" href="${data.products[i].link}">
            <div class="product-image">
                <img src="assets/img/product-images/${data.products[i].images[0]}" alt="${data.products[i].name}">
            </div>
            <div class="product-name">
                ${data.products[i].name}
            </div>
            <div class="product-price">
                <span>${currencyType}</span>${data.products[i].price}
            </div>
            <ul class="product-colors">`;
            for(let x=0; x < data.products[i].colors.length; x++){
                if(x == 0){
                    itemSliderTemplate += `<li class="active" data-image="${data.products[i].images[x]}" style="background: ${data.products[i].colors[x]}; border-color: ${data.products[i].colors[x]}; outline-color: ${data.products[i].colors[x]};"><span href="javascript;" title="${data.products[i].name}"></span></li>`;
                }else{
                    itemSliderTemplate += `<li data-image="${data.products[i].images[x]}" style="background: ${data.products[i].colors[x]}; border-color: ${data.products[i].colors[x]}; outline-color: ${data.products[i].colors[x]};"><span href="javascript;" title="${data.products[i].name}"></span></li>`;
                }            
            }
            itemSliderTemplate += `</ul>
                </a>
            </div>`;
        }
        $(".products-slider").html(itemSliderTemplate);
    }

    /* Color Hover */
    $(".product-colors li").on("mouseenter", function(){
        $(this).parents(".item").find("li").removeClass("active");
        $(this).addClass("active");
        let colorImage = $(this).attr("data-image");
        $(this).parents(".item").find(".product-image img").attr("src","assets/img/product-images/"+colorImage);
    });

    /* Product Slider */
    let windowWidth = $(window).width();
    let margin = "";
    let items = "";
    if(windowWidth <= 800){
        margin = 20;
        items = 2.5;
    }else if(windowWidth <= 1500){
        margin = 40;
        items = 2.6;
    }else{
        margin = 40;
        items = 2.2;
    }
    $('.products-slider').owlCarousel({
        margin:margin,
        items:items,
        loop: true,
        dots: false,
        nav: true,
        mouseDrag: false,
        navText: ["<img src='assets/img/icons/slider-arrow.svg'>","<img src='assets/img/icons/slider-arrow.svg'>"]
    });

    /* Arrow show/hide */
    $('button.owl-prev').hide();
    $('.owl-carousel').on('changed.owl.carousel', function(e) { 
        if (e.item.index > e.item.count) {
            $('button.owl-next').hide();
        } else {
            $('button.owl-next').show();
        }
        if (e.item.index <= 3){
            $('button.owl-prev').hide();
        } else {
            $('button.owl-prev').show();
        }
    });

    /* Arrow position */
    let arrowPosition = function(){
        setTimeout(function(){
            let arrowH = $(".owl-next").outerHeight();
            let arrowW = $(".owl-next").outerWidth();
            let imgH = $(".owl-item:eq(0) .item").outerHeight() / 2 - arrowH ;
            $(".owl-next, .owl-prev").css({"top":imgH});
            /* Next Arrow */
            let arrowNextLeft = document.querySelector('.owl-stage .owl-item:nth-child(3)').offsetLeft - (arrowW/2);
            $(".owl-next").css({"left":arrowNextLeft});
            $(".owl-next").show();
            /* Prev Arrow */
            let arrowNextRight = document.querySelector('.owl-stage .owl-item:nth-child(1)').offsetLeft - (arrowW/2);
            $(".owl-prev").css({"left":arrowNextRight});
        },500)        
    }

    arrowPosition();

    $(window).on('resize',function() {
        if(windowWidth >= 800){
            location.reload();
        }else{
            arrowPosition();
        }        
    });

    /* Wow */
    wow = new WOW({
        animateClass: 'animated'
    });
    wow.init();
});
  
  