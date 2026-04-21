
$("#Cryo").mouseenter( () => {
    $("#details").text("My most popular 5-year old website. It features daily updates on sea ice, snow cover and many more interesting aspects about our Cryosphere. It is a static website, hosted with Github pages and my home server.");
    const skilllist = ["html","css","js","jquery","bootstrap","python","git","github","nginx","linux", "aws","cloudflare"];
    skillHighlight(skilllist);
});

$("#CryoShop").mouseenter( () => {
    $("#details").text("A full-stack webapp for a fictional Cryosphere Computing Shop. It uses a react/redux frontend, nodeJS/express backend and a postgres database. For shopping included are basic account features like authentication, authorization, user details updates/ user deletion and order viewer.");
    const skilllist = ["html","css","js","bootstrap","react","nodejs","postgres","crud_rest","security","monitoring","docker","dbml","git","github","nginx","linux", "aws","cloudflare"];
    skillHighlight(skilllist);
});

$("#Prussian").mouseenter( () => {
    $("#details").text("A 2021  website for social research addressing our societies modern issues like new superstitions and group trust. It is build with Django.");
    const skilllist = ["html","css","js","bootstrap","python","django","nginx","git","linux", "aws","cloudflare"];
    skillHighlight(skilllist);
});

$("#NearMe").mouseenter( () => {
    $("#details").text("An AngularJS-Leaflet App. It queries the Wikipedia API for places near a latitude/longitude. Several German Cities are selectable. ");
    const skilllist = ["html","css","js","angularJS","leaflet", "git"];
    skillHighlight(skilllist);
});

$("#AI_ART").mouseenter( () => {
    $("#details").text("Showcase for AI Art. Currently just a static website.");
    const skilllist = ["html","css","js","bootstrap","git"];
    skillHighlight(skilllist);
});

$("#PHP_API").mouseenter( () => {
    $("#details").text("A demo to access the geonames API with an apache/PHP webserver.");
    const skilllist = ["html","css","js","jquery","php","apache","git","github"];
    skillHighlight(skilllist);
});

$(".projectItem li").mouseleave( () => {
    $("#details").text("(hover over a project)");
    const key1 = localStorage.getItem("apperance");
    if (lightMode() == "light"){
        $(".skillitem li").css("color","black");
    } else {
        $(".skillitem li").css("color","antiquewhite");
    }
    
});

const skillHighlight = (skillList) => {
    for (skill of skillList) {
        $('#' + skill).css("color","red");
    }
}

const lightMode = () => {
    return localStorage.getItem("apperance");
}

function darkmode() {
    var element = document.body;
    element.classList.toggle("light-mode");
    switchKey1();
 }

 function switchKey1() {
    const key1 = localStorage.getItem("apperance");
   if (key1 == "light"){
    localStorage.setItem("apperance", "dark");
    $(".skillitem li").css("color","antiquewhite");
    $("#dark").text("Light");
   } else {
    localStorage.setItem("apperance", "light");
    $(".skillitem li").css("color","black");
    $("#dark").text("Dark");
   }
  }

  function checkAppearance() {
    const key1 = lightMode();
    if (key1){
      if (lightMode() == "light"){
        document.body.classList.add("light-mode");
       }
    } else {
      localStorage.setItem("apperance", "dark");
    }
  
  }