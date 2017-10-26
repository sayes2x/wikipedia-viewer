$(function() {
    $('#search').click(function(e) {
      if(e.target.tagName !== 'INPUT') {
        toggleSearch();
      }  
    });
});

var searchOpen = false;

function toggleSearch() {
  $('#search').toggleClass('searchClose').toggleClass('searchOpen'); // Change width of search
  $('#handle').toggleClass('showHandle').toggleClass('hideHandle'); // Hide handle
  $('#close').toggleClass('hideClose').toggleClass('showClose'); // Show close
  $('#input').toggleClass('hideInput').toggleClass('showInput').val(''); // Show input box and give it focus
  $('#instruction').toggleClass('showInstruction').toggleClass('hideInstruction');
  $('#position').addClass('center').removeClass('top');
  $('#results').addClass('hideResults').removeClass('showResults').html('');
  
  if(searchOpen == false) {
    $('#input').focus();
    searchOpen = true;
  } else {
    $('#input').blur();
    searchOpen = false;
  }
}

$("#input").keyup(function(e){
  if($("#input").val() === "") {
    $("#results").html('');
    $('#position').addClass('center').removeClass('top');
    $('#results').addClass('hideResults').removeClass('showResults').html('');
  }
  var q = $("#input").val();
  $.ajax({
  url : 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=search&origin=*&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch=' + q + '&gsrnamespace=*&gsrlimit=10',
  type: 'GET',
  dataType: 'jsonp',
  success : function(data){
    var result = '';
      $.each(data.query.pages, function (i, item) {
        result += '<a class="link" href="' + item.fullurl + '" target="_blank"><div class="result"><p class="title">' + item.title + '</p><p class="snippet">' + item.extract + '</p></div></a>';
      });
      $('#position').removeClass('center').addClass('top');
      $("#results").html(result);
     $('#results').removeClass('hideResults').addClass('showResults');
    }
  });
});