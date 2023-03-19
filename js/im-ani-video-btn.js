$(document).ready(function () {
    $.fx.off = false;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    let urlGetToken = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.karyl.live/v1/get_token',
        headers: {}
    };

    axios.request(urlGetToken)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            let data = JSON.stringify({
                query: `query {
                    episode(id: "${id}") {
                  animeId
                  episodeNumber
                  sources {
                      id
                      mediaId
                      serverId
                      providerId
                  }
                  
                  createdAt
                  updatedAt
                }
          }`,
                variables: {}
            });

            let getEpisode = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.karyl.live/graphql',
                headers: {
                    'Authorization': `Bearer ${response.data}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(getEpisode)
                .then((getEpisodebyID) => {
                    if(getEpisodebyID.data.data.episode.length){
                       videoHtml = `<a href="" class="watch-btn" id="ani-Video">` + `<i class="fa fa-play">` + `</i>` + `Xem Phim` + `<i class="">` + `</i>` + `</a>`
                       document.getElementById("ani-vid").innerHTML = videoHtml
                       var link = document.getElementById("ani-Video")
                       link.href =  "video.html?id=" + id + "?ep=" + getEpisodebyID.data.data.episode[0].episodeNumber
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });


})