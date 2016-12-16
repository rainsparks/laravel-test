$(document).ready(function(){ 

    var $menu = $('mnav#menu'),
        $html = $('html, body')
        baseURL = $('.baseUrl').attr('rel');

    $menu.mmenu({
        dragOpen: true
    });

    $('.subs-btn').on('click', function(e) {
  
        $('.overlay-bg').show();
      
        e.preventDefault();

    });


    $('.signinss').click( function(e){

        if($('.sign-in').is(':visible')){
            $('.sign-in').slideToggle();    
        }else{
            $('.sign-in').slideToggle();    
        }

        e.preventDefault();

    });

    $(document).on('mouseup', function (e)
    { 

            if($(".sign-in").is(':visible')){

                var container = $(".sign-in");
                if(!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length == "0") // ... nor a descendant of the container
                {
                    $('.sign-in').slideUp();
                }
            
            }
        
            e.stopPropagation();
    });

    // pop up close when clicked outside the container
    $(document).on('mouseup', function (e)
    { 
        if($("#subscribe").is(':visible')){
             var container = $(".newsletterbox");
            if(!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length == "0") // ... nor a descendant of the container
            {
                $('#subscribe').modal('hide');
                $('.overlay-bg').hide();
            }
        
        }
        e.stopPropagation();
    });


    $( "#mc-embedded-subscribe" ).click(function() {
        // for closing the newsletter popup automatically
        $("#mc-embedded-subscribe-form").submit();
        $('#subscribe').modal('hide');
        $('.overlay-bg').hide();
    });


    $('.close').on('click', function(e) {
  
        $('.overlay-bg').hide();

        e.preventDefault();
    });


    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);

    $(".caticon a").each(function(){

    if($(this).attr("rel") == pgurl ){
        $(this).addClass("active");
    }

    });

    $('body').on('click','#product-list .more', function(e){

        var ctr, id,cat, p, $moreBtn, $loader = $('.more img');
            cat = $('.caticon .active').attr('rel');
            id = $('.thumb').last().attr('rel');
            $moreBtn = $(this);
            p   = $moreBtn.attr('rel');

     


        $.ajax({
            url: baseURL+'/product/loadmore/'+cat+'/'+id+'/'+p,
            type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $loader.show();
            },  
            success: function(data){
                //console.log(data.products[0]);
                if(data.status == "success"){

                    if(data.productHasSale !== 'undefined') {
                        var addPriceHeight = 'price-height';
                    }
                    else{
                        var addPriceHeight = '';
                    }



             
                
                    $.each(data.products, function(i, product){
                        
                        if(typeof data.productHasSale !== 'undefined')
                        {
                            var saleWrapper = '';
                            var oldPriceClass = '';
                            var discount = '';
                            var discountClass = '';
                            var oldPricePClass = '';
                            var newPrice = '';
                           
                            $.each(data.productHasSale, function(i, promoProduct)
                            {
                                if(product.id == i)
                                {
                                    
                                    var saleAmount = promoProduct.split('|');
                                    
                                    if(saleAmount[0] != 0){
                                        discount = '<span class="discount"> '+saleAmount[0]+'%</span>';
                                        newPrice = product.price - product.price * (saleAmount[0]/100);
                                    }

                                    if(saleAmount[1] != 0){
                                        discount = '<span class="discount">-'+saleAmount[1]+'</span>';
                                        newPrice = product.price - saleAmount[1];

                                    }

                                    oldPriceClass = 'old-price';
                                    oldPricePClass = 'old-p-wrapper';
                                    saleWrapper = '<p class="new-price">P <span class="price">'+ newPrice +'</span> </p>';
                                    return false; 
                                }
                            
                            });
                           
                        }
                       
        
                        //console.log(product.promo[0].discount_value);
                        var $data =  $('<div class="thumb pdata" rel="'+product.id+'|'+product.converted_kg+'">' +
                                '<a href="'+baseURL+'/product/'+product.overallcategory.slug+'/'+product.slug+'"><img src="'+baseURL+'/uploads/admin/product/'+product.image_th+'"/></a>'+
                                '<p class="title" rel="'+product.product_category.title+'">'+product.title+' <span style="text-transform:lowercase;font-size:14px;">'+product.volume[0]+''+product.volume[1]+'</span></p>'+
                                '<div class="'+addPriceHeight+'">'+
                                saleWrapper +
                                '<p class="'+oldPricePClass+'"> <span >P</span> <span class="price '+oldPriceClass+'"> '+product.price+' </span>'+discount+'</p></div>'+   
                                '<div class="form-group col-lg-12">'+
                                '<input type="number" name="order_qty[]" value="" class="form-control order-qty" data-bv-field="order_qty[]">'+
                                '<a href="#" class="btnc">Add To Cart</a></div></div>');

                        $('.thumb').last().after($data).hide().fadeIn();

                        $('#product-list').bootstrapValidator('addField', $data.find('[name="order_qty[]"]'));  

                        $('.price').number( true, 2 );

                        ctr = i;

                    });

                    // hide more btn
                    if(ctr < 11){
                        $moreBtn.hide();
                    }

                }    
                else{
                    return false;
                }
            },

            complete: function(){
                $loader.hide();
                $moreBtn.attr('rel', parseInt(p)+1);
            }
        });

        e.preventDefault();

    });

 $('body').on('click','#home-product-list .more', function(e){

        var ctr, id,cat, p, $moreBtn, $loader = $('.more img');
           // cat = $('.caticon .active').attr('rel');
            id = $('.thumb').last().attr('rel');
            $moreBtn = $(this);
            p   = $moreBtn.attr('rel');

     


        $.ajax({
            url: baseURL+'/loadmore/'+id+'/'+p,
            type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $loader.show();
            },  
            success: function(data){
                //console.log(data.products[0]);
                if(data.status == "success"){

                    if(data.productHasSale !== 'undefined') {
                        var addPriceHeight = 'price-height';
                    }
                    else{
                        var addPriceHeight = '';
                    }



             
                
                    $.each(data.products2, function(i, product){
                        
                        if(typeof data.productHasSale !== 'undefined')
                        {
                            console.log(product);
                            var saleWrapper = '';
                            var oldPriceClass = '';
                            var discount = '';
                            var discountClass = '';
                            var oldPricePClass = '';
                            var newPrice = '';
                           
                            $.each(data.productHasSale, function(i, promoProduct)
                            {
                                if(product.id == i)
                                {
                                    
                                    var saleAmount = promoProduct.split('|');
                                    
                                    if(saleAmount[0] != 0){
                                        discount = '<span class="discount"> '+saleAmount[0]+'%</span>';
                                        newPrice = product.price - product.price * (saleAmount[0]/100);
                                    }

                                    if(saleAmount[1] != 0){
                                        discount = '<span class="discount">-'+saleAmount[1]+'</span>';
                                        newPrice = product.price - saleAmount[1];

                                    }

                                    oldPriceClass = 'old-price';
                                    oldPricePClass = 'old-p-wrapper';
                                    saleWrapper = '<p class="new-price">P <span class="price">'+ newPrice +'</span> </p>';
                                    return false; 
                                }
                            
                            });
                           
                        }
                       
        
                        //console.log(product.promo[0].discount_value);
                        var $data =  $('<div class="thumb pdata" rel="'+product.id+'|'+product.converted_kg+'">' +
                                '<a href="'+baseURL+'/product/'+product.overallcategory.slug+'/'+product.slug+'"><img src="'+
                                baseURL+'/uploads/admin/product/'+product.image_th+'"/></a>'+
                                '<p class="title" rel="'+product.product_category.title+'">'+product.title+
                                '<div class="'+addPriceHeight+'">'+
                                saleWrapper +
                                '<p class="'+oldPricePClass+'"> <span >P</span> <span class="price '+oldPriceClass+'"> '+product.price+'</span>'
                                +discount+'</p></div>');  
                              

                        $('.thumb').last().after($data).hide().fadeIn();

                        $('.price').number( true, 2 );

                        ctr = i;

                    });

                    // hide more btn
                    if(ctr < 11){
                        $moreBtn.hide();
                    }

                }    
                else{
                    return false;
                }
            },

            complete: function(){
                $loader.hide();
                $moreBtn.attr('rel', parseInt(p)+1);
            }
        });

        e.preventDefault();

    });
    $(document).on('click','.link a', function(e){
        alert('asd');
        var $loader = $('.ajax-overlay'),
            cat = $(this).attr('rel');

            $('.link a').removeClass('active');

            $(this).addClass('active');

        $.ajax({
            url: baseURL+'/ajax/load/'+cat,
            type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $loader.show();
            },  
            success: function(data){
                //console.log(data.products[0]);
                if(data.status == "success"){

                    $('.thumb').remove();
                        var slug;
                        $.each(data.products, function(i, product){
                        
                                var data =  '<div class="thumb pdata" rel="'+product.id+'">' +
                                    '<a href="#"><img src="'+baseURL+'/uploads/admin/product/'+product.image_th+'"/></a>'+
                                    '<p class="title">'+product.title+'</p>'+
                                    '<p>P <span class="price">'+product.price+' </span></p>'+   
                                    '<div class="form-group col-lg-12">'+
                                    '<input type="number" name="order_qty[]" value="" class="form-control order-qty" data-bv-field="order_qty[]">'+
                                    '<a href="#" class="btnc">Add To Cart</a></div></div>';

                                $('.init-thumb').after(data).hide().fadeIn();

                                slug = product.overallcategory.slug;

                        });

                        if(cat == "0"){
                            $('#home .more').attr('href', baseURL +'/product/'+ slug);
                        }
                        else{
                             $('#home .more').attr('href', baseURL +'/product/'+ slug);
                        }
                       
                   
                    //return false;
                }    
                else
                {
                    return false;
                }
            },

            complete: function(){
                $loader.hide();
               
            }
        });

       e.preventDefault();

    });


    $(document).on('change','select[name="prod_cat"]', function(e){
     
        var $loader = $('.ajax-overlay'),
            cat = $(this).val();

            $('.link a').removeClass('active');

            $(this).addClass('active');

        $.ajax({
            url: baseURL+'/ajax/load/'+cat,
            type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $loader.show();
            },  
            success: function(data){
                //console.log(data.products[0]);
                if(data.status == "success"){
                    $('[name="price"]').number( true, 2 );
                    $('.price').number( true, 2 );
                    $('.thumb').remove();

                        $.each(data.products, function(i, product){
                        
                            var data =  '<div class="thumb pdata" rel="'+product.id+'">' +
                                        '<a href="#"><img src="'+baseURL+'/uploads/admin/product/'+product.image_th+'"/></a>'+
                                        '<p class="title">'+product.title+'</p>'+
                                        '<p class="price">P '+product.price+'.00</p>'+   
                                        '<div class="form-group col-lg-12">'+
                                        '<input type="number" name="order_qty[]" value="" class="form-control order-qty" data-bv-field="order_qty[]">'+
                                        '<a href="#" class="btnc">Add To Cart</a></div></div>';

                                $('.init-thumb').after(data).hide().fadeIn();

                        });

                    //return false;
                }    
                else
                {
                    return false;
                }
            },

            complete: function(){
                $loader.hide();
               
            }
        });

       e.preventDefault();

    });



    $('#reset-password')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled', // need for enabled for disabling other validation
            fields: {
            
                email: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
    
                    }
                },
                password: {
                    validators: {
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The password must be between 6 and 30 characters long'
                        },
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                password_confirmation: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        identical: {
                            field: 'password',
                            message: 'The passwords do not match'
                        }
                    }
                },


            }
        })

          .on('error.field.bv', function(e, data){

             data.bv.disableSubmitButtons(false);
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);          

        });



    // Sign up 
    $('[name="province"] option:first').val('');
    $('[name="area"] option:first').val('');
    var btn = $(this);

    $('.signup-form')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled', // need for enabled for disabling other validation
            fields: {
                last_name: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                first_name: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
                        remote: {
                            url: baseURL+'/ajax/validate/email',
                                data: function(validator, $field, value) {
                                    return {
                                        email: value
                                    };
                            },
                            type: 'POST',
                            delay: 500,
                            message: 'This Email already exists.'
                        }
               
            
                    }
                },
                password: {
                    validators: {
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The password must be between 6 and 30 characters long'
                        },
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                cpassword: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        identical: {
                            field: 'password',
                            message: 'The passwords do not match'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                address1: {
                    validators: {
                        callback: {
                            message: 'This field is required',
                            callback: function(value, validator, $field) {
                                
                                if(!$('.branch-select').is(':visible')){
                                     return (value == '') ? false : (value !== '');
                                }
                            }
                        },
                    }
                },
                address2: {
                    validators: {
                        callback: {
                            message: 'This field is required',
                            callback: function(value, validator, $field) {
                                
                                if(!$('.branch-select').is(':visible')){
                                     return (value == '') ? false : (value !== '');
                                }
                            }
                        },
                    }
                },
                province: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    },
                    callback: {
                        message: 'This field is required',
                        callback: function (value, validator, $field) {
                            
                            return (value == 0) ? false : (value !== '');

                        }
                    }
                },
                city2: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                barangay: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },

                barangay_text: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },

                zip_code: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                area:{
                    validators:{
                        notEmpty :{
                            message: 'This field is required',
                        }
                    }
                },

                branch:{
                    validators:{
                        notEmpty :{
                            message: 'This field is required',
                        }
                    }
                },

                phone_number: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },

            }
        })

        .on('change', '[name="province"]', function(){

            var $dropdown = $(this),
                selVal = $(this).val();

            if(selVal != 0 && selVal != '' )
            {
                $.ajax({ 
                    url :baseURL+"/ajax/getcity/"+selVal,
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){
                
                          $('[name="city2"] option:not(":first")').remove();
                        $('[name="barangay"] option:not(":first")').remove();
                        $('[name="barangay"]').closest('.row').show();
                        $('[name="barangay"]').prop('disabled', true);

                        $('.branch-select').hide();
                    },  
                    success: function(data){

                        if(data.city == ''){
                            return false;
                        }

                        $.each(data.city, function(index, val) {
                            $('[name="city2"]').prop('disabled', false);
                            $('[name="city2"]').append('<option value="'+val.region+'|'+val.city+'">'+val.city+'</option>');
                        });                      
                           
                       
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }
                });

              

            }

        })


        .on('change', '[name="city2"]', function(e){

            var $dropdown = $(this),
                selVal = $(this).val(),
                province = $('[name="province"] option:selected').text();
                $dropdown.find('option:first').attr('selected', false);
                $dropdown.find('option[value="'+ selVal +'"]').attr('selected', true);
                $('.signup-form').bootstrapValidator('addField', $('[name="barangay_text"]'));
            if(selVal != 0 && selVal != '' )
            {
                $('.branch-select').hide();
                var area = selVal.split('|');
               
                $.ajax({ 
                    url :baseURL+"/ajax/getbarangay/"+area[1]+"|"+province,   
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){
                        //$dropdown.attr('disabled', true);
                        $('[name="barangay"] option:not(":first")').remove();
                        $('.signup-form').bootstrapValidator('addField', $('[name="address1"]'));
                        $('.signup-form').bootstrapValidator('addField', $('[name="address2"]'));
                        $('.signup-form').bootstrapValidator('addField', $('[name="province"]'));
                        $('.signup-form').bootstrapValidator('addField', $('[name="city2"]'));
                        //$('.signup-form').bootstrapValidator('addField', $('[name="zip_code]'));
                        $('.signup-form').bootstrapValidator('addField', $('[name="barangay"]'));
                        
                    },  
                    success: function(data){
                        console.log(data);
                        if(data.barangay == 'ALL S' || data.barangay == 'ALL OTD' ){
                            $('[name="barangay_text"]').removeClass('hide');
                            $('[name="barangay"]').addClass('hide');
                            $('[name="delivery_code"]').val(data.delivery_code);
                            $('.signup-form').bootstrapValidator('addField', $('[name="barangay_text"]'));

                        }
                        else{
                            $('.signup-form').bootstrapValidator('addField', $('[name="barangay_text"]'));
                            $('[name="barangay_text"]').addClass('hide');
                            $('[name="barangay"]').removeClass('hide');
                            $('.branch-select').hide();
                          
                        }

                        if(data.barangay == 'PIC'){

                            $('.signup-form').bootstrapValidator('removeField', $('[name="address1"]'));
                            $('.signup-form').bootstrapValidator('removeField', $('[name="address2"]'));
                            $('.signup-form').bootstrapValidator('removeField', $('[name="province"]'));
                            $('.signup-form').bootstrapValidator('removeField', $('[name="city2"]'));
                            //$('.signup-form').bootstrapValidator('removeField', $('[name="zip_code]'));
                            $('.signup-form').bootstrapValidator('removeField', $('[name="barangay_text"]'));

                            $('html,body').animate({
                                scrollTop: $('[name="province"]').offset().top},
                            'fast');

                            $('.no-servicable-msg').closest('.form-group').show();

                            $('[name="barangay"]').closest('.row').hide();

                            $('.branch-select').show();
                            console.log('hide barangay and zipcode');
                

                        }

                        else{

                            $('.no-servicable-msg').closest('.form-group').hide();
                            $('[name="barangay"]').closest('.row').show();
                            $('[name="barangay"]').prop('disabled', false);

                            $('#cart-delivery').bootstrapValidator('addField', $('[name="address1"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="address2"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="province"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="city2"]'));
                            //$('#cart-delivery').bootstrapValidator('addField', $('[name="zip_code"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="barangay_text"]'));
                        }

                        $.each(data.barangay, function(index, val) {
                            if(val.barangay != 'BGY CLASS'){
                                $('[name="barangay"]').prop('disabled', false);
                                $('[name="barangay"]').append('<option rel="'+val.delivery_code+'" value="'+val.barangay+'">'+val.barangay+'</option>');

                                $('.branch-select').hide();
                            }
                            
                        });  

                                          
                        
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }

                });

                return false;         

            }


        })

        .on('change', '[name="barangay"]', function(e){

            var deliveryCode = $(this).find(':selected').attr('rel');

            $(this).closest('.form-group').find('[name="delivery_code"]').val(deliveryCode);

             $('.branch-select').hide();    

            e.preventDefault();
        })

        .on('change', '[name="area"]', function(){

            var $dropdown = $(this),
                selVal = $(this).val();

            if(selVal != 0 && selVal != '' )
            {
                $.ajax({ 
                    url :baseURL+"/ajax/getbranch/"+selVal,
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){
                        $dropdown.attr('disabled', true);
                        $('[name="branch"] option:not(":first")').remove();
                    },  
                    success: function(data){

                        if(data.barangay == ''){
                            return false;
                        }

                        $.each(data.branch, function(index, val) {
                            $('[name="branch"]').prop('disabled', false);
                            $('[name="branch"]').append('<option value="'+val.region+'|'+val.branch_outlet+'">'+val.branch_outlet+'</option>');
                        });                      
                        
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }
                });

                return false;

            }

        })

          .on('click', '.list-branch', function(e){

            $('html,body').animate({
                scrollTop: $('[name="barangay"]').offset().top},
            'fast');

            $('.barangay-group').hide();

            $('#branch-select').show();

            e.preventDefault();

           

        })

        .on('change', '[name="branch"]', function(e){

            if($(this).val() == ''){
                $('.signup-form').bootstrapValidator('removeField', $('[name="address1"]'));
                $('.signup-form').bootstrapValidator('removeField', $('[name="address2"]'));
                $('.signup-form').bootstrapValidator('removeField', $('[name="province"]'));
                $('.signup-form').bootstrapValidator('removeField', $('[name="city2"]'));
                $('.signup-form').bootstrapValidator('removeField', $('[name="zip_code"]'));
                $('.signup-form').bootstrapValidator('removeField', $('[name="barangay"]'));
                $('.signup-form').bootstrapValidator('removeField', $('[name="barangay_text"]'));
                 
            }
            else{
                $('.signup-form').bootstrapValidator('addField', $('[name="address1"]'));
                $('.signup-form').bootstrapValidator('addField', $('[name="address2"]'));
                $('.signup-form').bootstrapValidator('addField', $('[name="province"]'));
                $('.signup-form').bootstrapValidator('addField', $('[name="city2"]'));
                //$('.signup-form').bootstrapValidator('addField', $('[name="zip_code"]'));
                $('.signup-form').bootstrapValidator('addField', $('[name="barangay"]'));
                $('.signup-form').bootstrapValidator('addField', $('[name="barangay_text"]'));

                 var deliveryCode =   $(this).val().split('|');
                 $('[name="delivery_code"]').val(deliveryCode[0]); 

            }
            

        })


        .on('click', '.close-btn', function(e){

            $('.branch-select').hide();
            $('.barangay-group').show();

            $('html,body').animate({
                scrollTop: $('[name="province"]').offset().top},
            'fast');

            e.preventDefault();

        })

        .on('error.field.bv', function(e, data){

             data.bv.disableSubmitButtons(false);
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);          

        });



    // Sign up 
    $('[name="province"] option:first').val('');
    $('[name="area"] option:first').val('');
    var btn = $(this);

 

    $('#cart-delivery')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled',
            fields: {
               
                address1: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                address2: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                province: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    },
                    callback: {
                        message: 'This field is required',
                        callback: function (value, validator, $field) {
                            
                            return (value == 0) ? false : (value !== '');

                        }
                    }
                },
                city2: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                barangay: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                zip_code: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                area:{
                    validators:{
                        notEmpty :{
                            message: 'This field is required',
                        }
                    }
                },

                branch:{
                    validators:{
                        notEmpty :{
                            message: 'This field is required',
                        }
                    }
                },

                barangay_text:{
                    validators:{
                        notEmpty :{
                            message: 'This field is required',
                        }
                    }
                },

                phone_number: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },

                other_recipient_name :  {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },

            }
        })

        .on('change', '[name="province"]', function(){

            var $dropdown = $(this),
                selVal = $(this).val();

            if(selVal != 0 && selVal != '' )
            {
                $.ajax({ 
                    url :baseURL+"/ajax/getcity/"+selVal,
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){
                        $dropdown.attr('disabled', true);
                        $('[name="city2"] option:not(":first")').remove();
                        $('[name="barangay"] option:not(":first")').remove();
                        $('[name="barangay"]').closest('.row').show();
                        $('[name="barangay"]').prop('disabled', true);

                        $('.branch-select').hide();
                    },  
                    success: function(data){

                        if(data.city == ''){
                            return false;
                        }

                        $.each(data.city, function(index, val) {
                            $('[name="city2"]').prop('disabled', false);
                            $('[name="city2"]').append('<option value="'+val.region+'|'+val.city+'">'+val.city+'</option>');
                        });                      
                           
                       
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }
                });

                return false;

            }

        })

        .on('change', '[name="city2"]', function(){

            var $dropdown = $(this),
                selVal = $(this).val(),
                province = $('[name="province"] option:selected').text();

            if(selVal != 0 && selVal != '' )
            {

                var area = selVal.split('|');
                console.log(area);
                $.ajax({ 
                    url :baseURL+"/ajax/getbarangay/"+area[1]+'|'+province,
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){

                        $('[name="barangay"] option:not(":first")').remove();
                        $('#cart-deliver').bootstrapValidator('addField', $('[name="address1"]'));
                        $('#cart-deliver').bootstrapValidator('addField', $('[name="address2"]'));
                        $('#cart-deliver').bootstrapValidator('addField', $('[name="province"]'));
                        $('#cart-deliver').bootstrapValidator('addField', $('[name="city2"]'));
                        //$('#cart-deliver').bootstrapValidator('addField', $('[name="zip_code"]'));
                        $('#cart-deliver').bootstrapValidator('addField', $('[name="barangay"]'));
                        $('#cart-deliver').bootstrapValidator('addField', $('[name="barangay_text"]'));
                    },  
                    success: function(data){

                        if(data.barangay == 'ALL S' || data.barangay == 'ALL OTD' ){
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="barangay_text"]'));
                            $('[name="barangay_text"]').removeClass('hide');
                            $('[name="barangay"]').addClass('hide');
                            $('[name="delivery_code"]').val(data.delivery_code);
                          
                        }
                        else{
                            $('[name="barangay_text"]').addClass('hide');
                            $('[name="barangay"]').removeClass('hide');
                        }

                        if(data.barangay == 'PIC'){
                            
                            $('html,body').animate({
                                scrollTop: $('[name="province"]').offset().top},
                            'fast');

                            $('.no-servicable-msg').closest('.form-group').show();
                            $('[name="barangay"]').closest('.row').hide();

                            $('.branch-select').show();

                            $('#cart-delivery').bootstrapValidator('removeField', $('[name="address1"]'));
                            $('#cart-delivery').bootstrapValidator('removeField', $('[name="address2"]'));
                            $('#cart-delivery').bootstrapValidator('removeField', $('[name="province"]'));
                            $('#cart-delivery').bootstrapValidator('removeField', $('[name="city2"]'));
                            $('#cart-delivery').bootstrapValidator('removeField', $('[name="zip_code"]'));
                             $('#cart-delivery').bootstrapValidator('removeField', $('[name="barangay_text"]'));



                            return false;

                        }
                        else{

                            $('.no-servicable-msg').closest('.form-group').hide();
                            $('[name="barangay"]').closest('.row').show();
                            $('[name="barangay"]').prop('disabled', false);

                            $('#cart-delivery').bootstrapValidator('addField', $('[name="address1"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="address2"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="province"]'));
                            $('#cart-delivery').bootstrapValidator('addField', $('[name="city2"]'));
                            //$('#cart-delivery').bootstrapValidator('addField', $('[name="zip_code"]'));
                             $('#cart-delivery').bootstrapValidator('addField', $('[name="barangay"]'));
                             $('#cart-delivery').bootstrapValidator('addField', $('[name="barangay_text"]'));

                        }

                        $.each(data.barangay, function(index, val) {
                            if(val.barangay != 'BGY CLASS'){
                                $('[name="barangay"]').prop('disabled', false);
                                $('[name="barangay"]').append('<option rel="'+val.delivery_code+'" value="'+val.barangay+'">'+val.barangay+'</option>');

                                $('.branch-select').hide();
                            }
                            
                        });  
 
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }
                });

                return false;

            }

        })

        .on('change', '[name="barangay"]', function(e){

            var deliveryCode = $(this).find(':selected').attr('rel');
            $(this).closest('.form-group').find('[name="delivery_code"]').val(deliveryCode);


            e.preventDefault();
        })

        .on('change', '[name="area"]', function(){

            var $dropdown = $(this),
                selVal = $(this).val();

            if(selVal != 0 && selVal != '' )
            {
                $.ajax({ 
                    url :baseURL+"/ajax/getbranch/"+selVal,
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){
                        $dropdown.attr('disabled', true);
                        $('[name="branch"] option:not(":first")').remove();
                    },  
                    success: function(data){

                        if(data.barangay == ''){
                            return false;
                        }

                        $.each(data.branch, function(index, val) {
                            $('[name="branch"]').prop('disabled', false);
                            $('[name="branch"]').append('<option value="'+val.region+'|'+val.branch_outlet+'">'+val.branch_outlet+'</option>');
                        });     

                        
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }
                });

                return false;

            }

        })

        .on('click', '.list-branch', function(e){

            $('html,body').animate({
                scrollTop: $('[name="barangay"]').offset().top},
            'fast');


            $('.barangay-group').hide();

            $('#branch-select').show();

            e.preventDefault();

           

        })

        .on('change', '[name="branch"]', function(e){

            if($(this).val() != ''){
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="address1"]'));
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="address2"]'));
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="province"]'));
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="city2"]'));
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="zip_code"]'));
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="barangay"]'));
                $('#cart-delivery').bootstrapValidator('removeField', $('[name="barangay_text"]'));

                var deliveryCode =   $(this).val().split('|');
                $('[name="delivery_code"]').val(deliveryCode[0]); 
            }
            else{
                $('#cart-delivery').bootstrapValidator('addField', $('[name="address1"]'));
                $('#cart-delivery').bootstrapValidator('addField', $('[name="address2"]'));
                $('#cart-delivery').bootstrapValidator('addField', $('[name="province"]'));
                 $('#cart-delivery').bootstrapValidator('addField', $('[name="city2"]'));
                // $('#cart-delivery').bootstrapValidator('addField', $('[name="zip_code"]'));
                  $('#cart-delivery').bootstrapValidator('addField', $('[name="barangay"]'));
                 $('#cart-delivery').bootstrapValidator('addField', $('[name="barangay_text"]'));
            }
            

        })

        .on('click', '.close-btn', function(e){

            $('.branch-select').hide();
            $('.barangay-group').hide();

            e.preventDefault();

        })

        .on('change', '[name="delivery_address"]', function(e){

            var $dropdown = $(this);

            if($(this).val() == 'add'){

               // $('.other').fadeIn();

                window.location.href = baseURL+'/myaccount/shipping-address/create'; 

            }
            else{

                var selVal = $(this).val();

                $.ajax({ 
                    url :baseURL+"/ajax/delivery-address/update/"+selVal,
                    method: "GET",
                    dataType: 'json',
                    beforeSend: function(){
                        $dropdown.attr('disabled', true);
                    },  
                    success: function(data){

                        if(data.success){

                            location.reload();

                        }
                        
                    },

                    complete: function(){
                        $dropdown.attr('disabled', false);
                    }
                });


            }

            e.preventDefault();

        })

        .on('change', '[name="other_recipient"]', function(e){

            if($(this).val() == '0'){

                $('.other_recipient_contact').fadeIn();

            }
            else{
                $('.other_recipient_contact').fadeOut();
            }

            e.preventDefault();

        })

      
        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);          

        });



    $('#cart-payment')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled',
            fields: {
               
                payment_method: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                

            }
        })
      
        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);          

        });



    // Contact formm
     
    var form = $('.contact-form');
    
    $(form)
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled',
            fields: {
                first_name: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                last_name: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
        
            
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        emailAddress: {
                            message: 'Not a valid email addressz'
                        },      
            
                    }
                },

                subject: {
                    svalidators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
        
                    }

                },


                others: {
                    svalidators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
        
                    }

                },

                message: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                     
                    }
                }


            }
        })


        .on('error.form.bv', function(e) {
            // var v = grecaptcha.getResponse();
            // console.log(v.length;
            // if(v.length == 0)
            // {
            //     $('.g-recaptcha').closest('.form-group').addClass('has-error');
            //     $('.g-recaptcha div div').css('border','1px solid red');

            // }

        })

        .on('success.form.bv', function(e) {
            
          
            var $btn = $('[name="send"]'),
                $form = $(this);

            $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: $form.serialize(),
                dataType: 'json',
                beforeSend: function(){
                    $btn.attr('disabled', true);
                    $btn.attr('value','Loading...');
                    form.find('.form-group').removeClass('has-success');
                },  
                success: function(data){
                    //console.log(data.status);
                    if(data.status == "success"){
                        $btn.attr('disabled', false);
                        //$form[0].reset();

                        $form.bootstrapValidator('resetForm', true);
                        alert('Sent Successfully.');
                    }    
                    else{
                        $btn.attr('disabled', false);
                        if(data.status == "email"){
                            console.log($('input[name="email"]'));
                            $('input[name="email"]').closest('.form-group').addClass('has-error');
                        }
                        return false;
                    }
                },
                complete: function(){
                    $btn.attr('value','submit');
                    $btn.attr('disabled', false);
                }
            });

              e.preventDefault();


        });


     $(window).resize( function(){
        clearTimeout(oc_timer);
        var oc_timer = setTimeout(function () {
            if($(this).width() <= 768){ 
                $('#prd-cat').removeClass('in');
            }else{
                $('#prd-cat').addClass('in');
            }
        }, 300);    
     });

    if($(window).width() <= 768)
    { 
        $('#prd-cat').removeClass('in');
    }
    else
    {
        $('#prd-cat').addClass('in');
    }


    $('[name="price"]').number( true, 2 );
    $('.price').number( true, 2 );


    // Add to Validation

    $('#product-list')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled',

            fields: {
                'order_qty[]': {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        callback: {
                            message: 'Qty must be greater than zero',
                            callback: function (value, validator, $field) {
                                
                                return (value <= 0) ? false : (value !== '');

                            }
                        }
                    }
                },
            }
        })
        .on('click', '.btnc', function(e){

            $('#product-list').bootstrapValidator('revalidateField', $(this).prev());

            var totalQty,
                pid = $(this).closest('.pdata').attr('rel'),
                pcat = $(this).closest('.pdata').find('.title').attr('rel');
                pname = $(this).closest('.pdata').find('.title').text(),
                price = $(this).closest('.pdata').find('.price').text(),
                qty = parseInt($(this).prev().val()),
                imgSrc = $(this).closest('.pdata').find('img').attr('src'),
                currentQty = parseInt($('.current-qty').text());
                totalQty = qty + currentQty;
                console.log(imgSrc); 

                if(typeof imgSrc == 'undefined'){
                    imgSrc = $('.prodimg img').attr('src');
                }

                if(!$(this).closest('.form-group').hasClass('has-error')){

                    $.ajax({
                        url: baseURL+'/ajax/addtocart',
                        type: 'POST',
                        data: '&pcat='+pcat+'&pid='+pid+'&pname='+pname+'&price='+price+'&qty='+qty+'&image_src='+imgSrc,
                        dataType: 'json',
                        beforeSend: function(){
                            //$loader.show();
                        },  
                        success: function(data){
            
                            if(data.status == "success"){

                                $('.current-qty').html(totalQty);

                                $('#cartalert-content p').html('<strong>'+qty+'</strong> Added to your Cart');

                                $('#cartalert').popover('show');


                                // setTimeout( function(){

                                //      $('#cartalert').popover('hide');
                                
                                // }, 2000);
                            }    
                            else
                            {
                                return false;
                            }
                        },

                        complete: function(){
                            //$loader.hide();
                           
                        }
                    });

                 
                }
                else{
                    $('#cartalert').popover('hide');
                }

           
            e.preventDefault();

        })

        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

             $('#cartalert').popover('hide');
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });

        $("#cartalert").popover({
            html : true, 
            placement: 'bottom',
            trigger: 'click',
            content: function() {
              return $("#cartalert-content").html();
            },
           
        });


        $('#cart')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'disbled',

            fields: {
                'order_qty[]': {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        callback: {
                            message: 'Value must be greater than zero',
                            callback: function (value, validator, $field) {
                                
                                return (value <= 0) ? false : (value !== '');

                            }
                        }
                    }
                },
            }
        })
        .on('change', '[name="order_qty[]"]', function(e){                  
               
            e.preventDefault();

        })

        .on('click', '.remove', function(e){                  
            
            if(confirm('Are you sure want to remove this product?')){
                return true;
            }
            else{
                return false;
            }


        })


        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

             $('#cartalert').popover('hide');
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });

        $('#login')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'disabled',

            fields: {
                email: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                    }
                },
            }
        })

        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });


        $('#my-account')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'disabled',
            fields: {
                last_name: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                first_name: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
                        remote: {
                            url: baseURL+'/ajax/myaccout/vaidate/email',
                                data: function(validator, $field, value) {
                                    return {
                                          
                                        current_email: validator.getFieldElements('email').attr('rel'),
                                        email: value
                                            
                                    };
                            },
                            type: 'POST',
                            delay: 500,
                            message: 'This Email already exists.'
                        }
               
            
                    }
                },
                password: {
                    validators: {
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The password must be between 6 and 30 characters long'
                        },
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
                cpassword: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        identical: {
                            field: 'password',
                            message: 'The passwords do not match'
                        }
                    }
                },
                
        
            }
        })


        .on('click', '.btnchangepass', function(e){                  
            
            $(".password").slideToggle();

            if($(".password").is(':visible')){

                $('[name="password"]').val('');
                $('[name="cpassword"]').val('');

            }

        })

        .on('click', '.btncancel', function(e){                  
            
            $(".password").slideToggle();

            if($(".password").is(':visible')){

                $('[name="password"]').val('');
                $('[name="cpassword"]').val('');

            }

        })


        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

             $('#cartalert').popover('hide');
        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });

        $('#login')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'disbled',

            fields: {
                email: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                             message: 'This field is required',
                        },
                    }
                },
            }
        })

        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });



        $('#search-formx')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'disabled',

            fields: {
                keyword: {
                    validators: {
                        stringLength: {
                            min: 3,
                            message: 'Keyword must not be less than 3 characters'
                        },
                        notEmpty: {
                             message: 'This field is required',
                        }
                    }
                },
               
            }
        })

        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });

        var e = jQuery.Event("keydown");
        e.which = 50; // # Some key code value
        $('[name="submit"]').trigger(e);
        

        // Promo code Validation
        $('#promo-form')
        .bootstrapValidator({
            framework: 'bootstrap',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            live: 'enabled',

            fields: {
                promo_code: {
                    validators: {
                        notEmpty: {
                             message: 'Invalid promo code',
                        },
                        remote: {
                            url: baseURL+'/ajax/verify/promocode',
                                data: function(validator, $field, value) {
                                    return {
                                        promo_code: value
                                    };
                            },
                            type: 'POST',
                            delay: 500,
                            message: 'Invalid promo code.'
                        }
                    }
                },

               
            }
        })

        .on('error.field.bv', function(e, data){
            
             data.bv.disableSubmitButtons(false);

        })

        .on('success.field.bv', function(e, data) {

            data.bv.disableSubmitButtons(false);       

        });



});


