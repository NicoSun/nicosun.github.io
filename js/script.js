
$("#Cryo").mouseenter( () => {
    $("#details").text("My most popular 5-year old website. It features daily updates on sea ice, snow cover and many more interesting aspects about our Cryosphere. It is a static website, hosted with Github pages and my home server.");
});

$("#CryoShop").mouseenter( () => {
    $("#details").text("A full-stack webapp for a fictional Cryosphere Computing Shop. It uses a react/redux frontend, nodeJS/express backend and a postgres database. For shopping included are basic account features like authentication, authorization, user details updates/ user deletion and order viewer.");
});

$("#Prussian").mouseenter( () => {
    $("#details").text("A 2-year old website for social research addressing our societies modern issues like new superstitions and group trust. It is build with Django");
});

$("#Flask").mouseenter( () => {
    $("#details").text("A Simple Flask web app. Feel free to leave a comment.");
});

$("#AI_ART").mouseenter( () => {
    $("#details").text("Showcase for AI Art. Currently just a static website");
});

$(".projectItem").mouseleave( () => {
    $("#details").text("(hover over a project)");
});
