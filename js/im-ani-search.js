$(document).ready(function() {
    $('#searchInput').on('input', function() {
      var query = $(this).val();
      if (query.length > 0) {
        search(query, 1);
      } else {
        $('#searchResults').html('');
      }
    });
  });
  
  function search(query, page) {
    var url = `https://api.karyl.live/consumet/meta/anilist/advanced-search?&query=${query}`;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var results = data.results;
        var html = '';
        results.forEach(function(r) {
            console.log(r.image)
            html += `
            <div class="col-2 px-2 py-4" id="anime-item">
              <div class="product__item">
                <a href="details.html?id=${r.id}" id="ani-href">
                  <div class="product__item__pic set-bg" style="background-image: url('${r.image}');">
                  </div>
                </a>
                <div class="product__item__text">
                  <h5><a href="details.html?id=${r.id}" id="anime-title">${r.title.romaji}</a></h5>
                </div>
              </div>
            </div>
          </div>
          `;
        });
        $('#searchResults').html(html);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
 
