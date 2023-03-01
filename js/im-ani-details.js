$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const newUrl = `/details/${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    console.log(id)

    //data
    const url = `https://api.consumet.org/meta/anilist/info/${id}`;
    axios.get(url).then(response => {
        const anime = response.data;
        console.log(anime)
        //title
        document.getElementById("anime-title").innerHTML = anime.title.romaji
        //genres
        var genresList = anime.genres.join(", ")
        //studio
        var aniStudio = anime.studios.join(", ")
        //startdate
        var aniStartDate = anime.startDate.day
        var aniStartMonth = anime.startDate.month
        var aniStartYear = anime.startDate.year
        //status
        var aniStatus = anime.status
        //trailer link
        if (anime.trailer) {
            var aniTrailer = anime.trailer.id
            var url = "https://www.youtube.com/watch?v="
            trailerHtml = `<a href="" class="watch-btn" id="ani-Trailer">` + `<i class="fa fa-play">` + `</i>` + `Xem Trailer` + `<i class="">` + `</i>` + `</a>`
            document.getElementById("ani-cata").innerHTML = trailerHtml
            var link = document.getElementById("ani-Trailer")
            link.href = url + aniTrailer
        }
        //type
        var aniType = anime.type
        //total ep
        var aniTotalEp = anime.totalEpisodes
        //current ep
        var aniCurrEp = anime.currentEpisode
        //des
        var aniDes = anime.description

        var genresHtml = "";
        //background-cover
        var aniCover = anime.cover
        var bgElementcover = document.getElementById("ani-cover")
        //image
        var aniImage = anime.image
        var bgImage = document.getElementById("ani-image")



        for (var i = 0; i < genresList.length; i++) {
            genresHtml = ["<li>" + "Tập: " + aniCurrEp + "/" + aniTotalEp + "</li>", "<li>" + "Format: " + aniType + "</li>", "<li>" + "Tình trạng: " + aniStatus + "</li>", "<li>" + "Phát sóng: " + aniStartDate + "/" + aniStartMonth + "/" + aniStartYear + "</li>", "<li>" + "Studios: " + aniStudio + "</li>", "<li>" + "Thể loại: " + genresList + "</li>"]
        }
        document.getElementById("ani-details").innerHTML = genresHtml.join('');
        document.getElementById("ani-des").innerHTML = aniDes
        bgImage.style.backgroundImage = `url("${aniImage}")`
        bgElementcover.style.backgroundImage = `url("${aniCover}")`
    })

    // kiểm tra xem id có tồn tại hay không
    if (!id) {
        // nếu không có, chuyển hướng người dùng đến trang khác
        window.location.href = '/';
    }

})

