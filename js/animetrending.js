$(document).ready(function () {
    var animeItem = $("#anime-item").clone();
    const url = "https://api.consumet.org/meta/anilist/trending?page=1&perPage=18";
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
                //background
                bgElement.style.backgroundImage = `url("${response.data.results[0]["image"]}")`
                //title
                document.getElementById("anime-title").innerHTML = response.data.results[0]["title"]["romaji"]
                clonedAnimeItem.find("#anime-bg").css("background-image", "url(" + url + ")");
                clonedAnimeItem.find(".anime-title").text(response.data.results[i + 1]["title"]["romaji"])
                //push
                $("#anime-list").append(clonedAnimeItem);

            }
        });
    };
    getData();
});


