$(document).ready(function () {
    $.fx.off = false;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idEpString = urlParams.get('id');
    const [id, ep] = idEpString.split('?ep=');

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
                    for (i = 0; i < getEpisodebyID.data.data.episode[ep - 1].sources.length; i++) {
                        console.log(JSON.stringify(getEpisodebyID.data.data));
                        let getId = JSON.stringify({
                            query: `query {
                              source(mediaId: "${getEpisodebyID.data.data.episode[ep - 1].sources[i].mediaId}", providerId: "${getEpisodebyID.data.data.episode[ep - 1].sources[i].providerId}", serverId: "20", location: "vn") {
                                  id
                                  serverId
                                  sourceId
                                  providerId
                                  url
                                  type
                                  subtitle
                                  isEmbed
                                  isProxy
                                  isPublished
                                  createdAt
                                  updatedAt
                                  
                              }
                          }`,
                            variables: {}
                        });
                        let getSource = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: 'https://api.karyl.live/graphql',
                            headers: {
                                'Authorization': `Bearer ${response.data} `,
                                'Content-Type': 'application/json'
                            },
                            data: getId
                        };

                        axios.request(getSource)
                            .then((source) => {
                                console.log(JSON.stringify(source.data.data.source.url));
                                window.parent.postMessage(JSON.stringify(source), '*');
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    for (j = 1; j < getEpisodebyID.data.data.episode.length + 1; j++) {
                        var link = document.createElement("a");
                        link.id = "flex-eps";
                        link.href = "video.html?id=" + id + "?ep=" + j;
                        link.textContent = j;
                        document.getElementById("flex-eps").appendChild(link);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });

    if (!id) {
        // nếu không có, chuyển hướng người dùng đến trang khác
        window.location.href = '/';
    }
})