$(document).ready(function () {
    var urlGetToken = "https://api.karyl.live/v1/get_token"
    axios.get(urlGetToken).then(token => {
        console.log(token)
        var data = JSON.stringify({
            query: `query {
    sourceById(id: "e676e5b9-4073-45e1-8e6b-12d265a5874e") {
        providerId
        id
        url
    }
       }`,
            variables: {}
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.karyl.live/graphql',
            headers: {
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    });
})