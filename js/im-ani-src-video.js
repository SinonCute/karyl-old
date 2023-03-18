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
                  slug
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
                    for (i = 0; i < getEpisodebyID.data.data.episode[0].sources.length; i++) {
                        console.log(JSON.stringify(getEpisodebyID.data.data));
                        let getId = JSON.stringify({
                            query: `query {
                              source(mediaId: "${getEpisodebyID.data.data.episode[0].sources[i].mediaId}", providerId: "${getEpisodebyID.data.data.episode[0].sources[i].providerId}", serverId: "${getEpisodebyID.data.data.episode[0].sources[i].serverId}", location: "vn") {
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
                                console.log(JSON.stringify(source.data));
                            })
                            .catch((error) => {
                                console.log(error);
                            });
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