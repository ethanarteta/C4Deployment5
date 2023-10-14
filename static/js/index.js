$(document).ready(function() {

    setTimeout(function() {
        $('.alert').fadeOut('slow');
    }, 5000); // <-- time in milliseconds

    $('#showPass').click(function(){
        var x = $("#passwordInput")[0]
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });

    $('.reset_btn').click(function(event){
        event.preventDefault();
        $("#cust_ssn_id")[0].value = "";
        $("#name")[0].value = "";
        $("#address")[0].value = "";
        $("#age")[0].value = "";
        $("#state")[0].value = "";
        $("#city")[0].value = "";
    });

    $('#cust_ssn_id, #age, #cust_id, #acc_id, #amount').keypress(function(event){
        if(event.which = 8 && isNaN(String.fromCharCode(event.which))){
            event.preventDefault(); //stop character from entering input
        }
    })

    $('#name, #state, #city').keypress(function(event){
        if(!((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode==32)){
            event.preventDefault(); //stop character from entering input
        }
    })

    $('#view_cust').validate({
        rules: {
            cust_id: {
                required: '#cust_ssn_id:blank'
            },
            cust_ssn_id: {
                required: '#cust_id:blank'
            }
          }
    })

    $('#view_acc').validate({
        rules: {
            cust_id: {
                required: '#acc_id:blank'
            },
            acc_id: {
                required: '#cust_id:blank'
            }
          }
    })

    $('select.sel_type').change(function () {
        if (this.value == 'current')
            $('select.sel_type').not(this).val('savings');
        if (this.value == 'savings')
            $('select.sel_type').not(this).val('current');
    });

    $('.refresh_cust').click(function(event){
        event.preventDefault()
        target = event.target
        cust_id = parseInt(target.dataset.cust_id)
        var data = {"cust_id": cust_id}
        $.ajax({
            type: "POST",
            url: "/api/v1/customerlog",
            dataType: 'json',
            data: JSON.stringify(data),
            contentType:"application/json; charset=UTF-8"
        }).done(function(result){
            console.log(result)
            parrent_ele = target.parentElement.parentElement
            parrent_ele.children[2].innerHTML = result.message
            parrent_ele.children[3].innerHTML = result.date
        }).fail(function(error){
            console.log(error)
        })
    })

    $('.refresh_acc').click(function(event){
        event.preventDefault()
        target = event.target
        acc_id = parseInt(target.dataset.acc_id)
        var data = {"acc_id": acc_id}
        $.ajax({
            type: "POST",
            url: "/api/v1/accountlog",
            dataType: 'json',
            data: JSON.stringify(data),
            contentType:"application/json; charset=UTF-8"
        }).done(function(result){
            console.log(result)
            parrent_ele = target.parentElement.parentElement
            parrent_ele.children[3].innerHTML = result.status
            parrent_ele.children[4].innerHTML = result.message
            parrent_ele.children[5].innerHTML = result.date
        }).fail(function(error){
            console.log(error)
        })
    })
});