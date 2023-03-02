$(document).ready(function () {
    $.fx.off = false;
    var animeItem = $("#anime-item").clone();
    var currentIndex = 0;
    const url = "https://api.consumet.org/meta/anilist/trending?page=1&perPage=51";
    const getData = () => {
        axios.get(url).then(response => {
            for (var i = 0; i < response.data.results.length; i++) {
                var clonedAnimeItem = animeItem.clone();
                var bgElement = document.getElementById("anime-bg")
                console.log(response.data.results[i]["title"]["romaji"]);
                console.log(response.data.results[i]["image"]);
                console.log(response.data)
                var url = response.data.results[i + 1]["image"]
                //animeID
                var animeId0 = response.data.results[0]["id"]
                var animeId = response.data.results[i + 1]["id"];


                //cloned

                //genres
                var genresHtml = response.data.results[i + 1]["genres"].map(genre => {
                    return `<li>${genre}</li>`;
                }).join("");
                var genresHtml0 = response.data.results[0]["genres"].map(genre => {
                    return `<li>${genre}</li>`;
                }).join("");
                var titleGenres = $("#anime-genres");
                titleGenres.html(genresHtml0);
                var clonedAnimeItem = animeItem.clone();
                clonedAnimeItem.find(".anime-genres").html(genresHtml);
                //background
                bgElement.style.backgroundImage = `url("${response.data.results[0]["image"]}")`
                //title
                var title0 = response.data.results[0]["title"]["romaji"];
                var maxLength = 30;
                var trimmedTitle0 = title0.length > maxLength ? title0.slice(0, maxLength) + "..." : title0;
                document.getElementById("anime-title").innerHTML = trimmedTitle0
                var title = response.data.results[i + 1]["title"]["romaji"];
                var maxLength = 30;
                var trimmedTitle = title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
                clonedAnimeItem.find("#anime-bg").css("background-image", "url(" + url + ")");
                clonedAnimeItem.find("#anime-title").text(trimmedTitle)
                clonedAnimeItem.find("a").attr("href", "details.html?id=" + animeId);
                //first mother fucker
                var link = document.getElementById("anime-title")
                link.href = "details.html?id=" + animeId0

                var bgHref = document.getElementById("ani-href")
                bgHref.href = "details.html?id=" + animeId0
                //push
                $("#anime-list").append(clonedAnimeItem);
            }
            updateButtons();
        });

    };
    getData();
    $("#prev-btn").click(function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateButtons();
            $("#anime-list").stop(true).animate({
                left: `${currentIndex * -100}%`
            }, 500);
        }
    });
    $("#next-btn").click(function () {
        let currentTime = new Date().getTime();
        if (currentIndex < 16) {
            currentIndex++;
            updateButtons();
            $("#anime-list").stop(true).animate({
                left: `${currentIndex * -100}%`
            }, 500);
        } else {
            currentIndex = 0;
            updateButtons();
            $("#anime-list").stop(true).animate({
                left: 0
            }, 500);
        }
    });

    function updateButtons() {
        $("#prev-btn").prop("disabled", currentIndex === 0);
        $("#next-btn").prop("disabled", currentIndex === 15);
        $("#anime-list").animate({ left: `${-currentIndex * 100}%` }, 500);

    }
});



