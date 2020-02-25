document.getElementById("wordSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  let wordInput = document.getElementById("wordInput").value;

  fetch("https://lingua-robot.p.rapidapi.com/language/v1/entries/en/" + wordInput, {
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "lingua-robot.p.rapidapi.com",
  		"x-rapidapi-key": "6ef7b9024amshadcadda11f5fe91p154fe6jsne2c3659c6e1a"
  	}
  })
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";

      results += '<h2>' + wordInput + "<span class='bigger'> [" + json.entries[0].pronunciations[0].transcriptions[0].transcription + "]</span>" + '</h2>';
      for (i = 0; i < json.entries[0].lexemes.length; i++){
        for (j = 0; j < json.entries[0].lexemes[i].senses.length; j++){
          results += "<p><ul><li>(" + json.entries[0].lexemes[i].partOfSpeech + ") ";
          results += json.entries[0].lexemes[i].senses[j].definition + "</li></ul></p>";
        }
      }
      results += "<h3>Synonym(s): " + json.entries[0].lexemes[0].synonymSets[0].synonyms + " </h3>";
      results += "<h2>" + " " + "</h2>";
      document.getElementById("dictionary").innerHTML = results;
    });
});
