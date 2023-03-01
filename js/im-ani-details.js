$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
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
        var aniTrailer = anime.trailer.id
        //url
        var url = "https://www.youtube.com/watch?v="
        //type
        var aniType = anime.type
        //total ep
        var aniTotalEp = anime.totalEpisodes
        //current ep
        var aniCurrEp = anime.currentEpisode
        //des
        var aniDes = anime.description
        //enddate
        var aniEndDate = anime.endDate.day
        var aniEndMonth = anime.endDate.month
        var aniEndYear = anime.endDate.year

        var genresHtml = "";
        //background-cover
        var aniCover = anime.cover
        var bgElementcover = document.getElementById("ani-cover")
        //image
        var aniImage = anime.image
        var bgImage = document.getElementById("ani-image")



        for (var i = 0; i < genresList.length; i++) {
            genresHtml = ["<li>" + "Tập: " + aniCurrEp + "/" + aniTotalEp + "</li>", "<li>" + "Format: " + aniType + "</li>", "<li>" + "Tình trạng: " + aniStatus + "</li>", "<li>" + "Phát sóng: " + aniStartDate + "/" + aniStartMonth + "/" + aniStartYear + "</li>", "<li>" + "End vào: " + aniEndDate + "/" + aniEndMonth + "/" + aniEndYear + "</li>", "<li>" + "Studios: " + aniStudio + "</li>", "<li>" + "Thể loại: " + genresList + "</li>"]
        }
        document.getElementById("ani-details").innerHTML = genresHtml.join('');
        document.getElementById("ani-des").innerHTML = aniDes
        var link = document.getElementById("ani-Trailer")
        link.href = url + aniTrailer
        bgImage.style.backgroundImage = `url("${aniImage}")`
        bgElementcover.style.backgroundImage = `url("${aniCover}")`
    })

    // kiểm tra xem id có tồn tại hay không
    if (!id) {
        // nếu không có, chuyển hướng người dùng đến trang khác
        window.location.href = 'https://karyl.live';
    }

})

