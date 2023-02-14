$(document).ready(function () {
    var animeItem = $("#anime-item").clone();
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
                clonedAnimeItem.find(".anime-title").text(trimmedTitle)
                //push
                $("#anime-list").append(clonedAnimeItem);

            }
        });
    };
    getData();
});


