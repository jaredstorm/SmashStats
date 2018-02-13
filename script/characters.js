$(document).ready(function(){
  //get all character data and place into list
  //footerAlign();
  var charDataURL = "http://beta-api-kuroganehammer.azurewebsites.net/api/characters";

  $.ajax({
    url: charDataURL,
    dataType: "json",
    success: function(json) {
      console.log(json);
      var structure = "<ul class='char_select'>";
      json.forEach(function(character){
        structure += "<li class='char_option' id='" + character.OwnerId + "'><button>" + character.DisplayName + "</button></li>";
      });
      structure += "</ul>";
      $(".left").append(structure);


      //make a click handler for all characters in list;
      $("li").on("click",function() {
        var id = this.id-1;
        $("#char_pic").attr("src",json[id].MainImageUrl);
        $("#character_name").text(json[id].DisplayName);
        var movesURL = json[id].Links[1].Href;
        var attrURL = json[id].Links[2].Href;
        ///*
        $.ajax({
          url: movesURL,
          dataType: "json",
          success: function(movesJson) {
            console.log(movesJson);

            structure = "<h2 id='attack_title'>Attacks</h2>";

            structure += "<table id='attack_table'>";
              structure += "<tr>";
                structure += "<th>Attack</th>";
                structure += "<th>Base Damage</th>";
              structure += "</tr>";
              movesJson.forEach(function(move) {
                structure += "<tr>";
                  structure += "<td>" + move.Name + "</td>";
                  structure += "<td>" + move.BaseDamage + "</td>";
                structure += "</td>";
              });
            structure += "</table>";

            $("#attacks_box").empty();
            $("#attacks_box").append(structure);
          }
        }); //set up moves list

        $.ajax({
          url: attrURL,
          dataType: "json",
          success: function(attrJson) {
            console.log(attrJson);

            structure = "<h2 id='attribute_title'>Attributes</h2>";
            structure += "<table id='attribute_table'>";
              structure += "<tr>";
                structure += "<th>Attribute</th>";
                structure += "<th>Value</th>";
              structure += "</tr>";
              attrJson.forEach(function(attr){
                structure += "<tr>";
                  structure += "<td>" + attr.Name + "</td>";
                  structure += "<td>" + attr.Values[0].Value + "</td>";
                structure += "</tr>";
              });
            structure += "</table>";
            $("#attributes_box").empty();
            $("#attributes_box").append(structure); //put attributes after attacks
          }
        }); //set up attributes list
        //*/
      }); //on "click"



    } //success function
  }); //ajax();

}); //ready();