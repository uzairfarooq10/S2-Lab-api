$(function() {
    loadRecipies();
    $("#recipies").on("click", ".btn-danger", handledelete);
    $("#recipies").on("click", ".btn-warning", handleUpdate);

    $("#updateSave").click(function(){

        var id = $("#UpdateId").val();
        var name = $("#UpdateName").val();
        var price = $("#UpdatePrice").val();
        var color = $("#UpdateColor").val();
        var department = $("#UpdateDepartment").val();
        var description = $("#UpdateDescription").val();
        $.ajax( {
        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        data : {name, price, color, department, description},
        method : "PUT",
        success : function () {
            loadRecipies();
            $("#updateModel").modal("hide");
        }
        });
    });

    
    $(".addbtn").click(addproduct);
    $("#formadd").click(addRecipies);

});

function addproduct(){
    $("#AddModel").modal("show");
}

function addRecipies(){
    var name = $("#name").val();
    var price = $("#price").val();
    var color = $("#color").val();
    var department = $("#department").val();
    var description = $("#description").val();
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/products",
        method : "POST",
        data : {name, price, color, department, description},
        success: function(response){
            console.log(response);
            loadRecipies();
            $("#AddModel").modal("hide");
        }
    });
}

function handleUpdate(){
    
    var btn = $(this);
    var parentDiv = btn.closest(".recipie");
    let id = parentDiv.attr("data-id");

    $.get("https://usman-recipes.herokuapp.com/api/products/" + id,
    function(response){
        $("#UpdateId").val(response._id);
        $("#UpdateName").val(response.name);
        $("#UpdatePrice").val(response.price);
        $("#UpdateColor").val(response.color);
        $("#UpdateDepartment").val(response.department);
        $("#UpdateDescription").val(response.description);

        $("#updateModel").modal("show");
    }
    );
}

function handledelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipie");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "DELETE",
        success: function(){
            loadRecipies();
        }
    });
}

function loadRecipies() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET", 

        error : function(){
            var recip = $("#recipies");
            recip.html("An error has occured");
        },

        success: function(response){
            console.log(response);

            var recip = $("#recipies");
            recip.empty();

            for (var i=0; i<response.length; i++)
            {
                var rec = response[i];
                recip.append( `<div class= "container recipie " data-id="${rec._id}">
                <h3> ${rec.name} </h3>
                <p> Price : ${rec.price} </p>
                <p> Color : ${rec.color} </p>
                <p> Department : ${rec.department} </p>
                <p> Despcription : ${rec.description} </p>

                <button class=" btn btn-warning bt-sm"> Edit </button>
                <button class=" btn btn-danger bt-sm"> Delete </button>
                <span id = "space"></span>
                </div>`);
            }
            
        }
    });
}