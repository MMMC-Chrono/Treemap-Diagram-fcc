fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
 .then(response => response.json())
 .then(response => {
    const { children } = response;
    collectedData(children)
 })

function collectedData(data) {
    const title = d3.select('body')
                    .append('h1')
                    .text('Video Game Sales')
                    .attr('id', 'title')

                    console.log(data)
    const description = d3.select('body')
                          .append('h2')
                          .text('Top 100 Most Sold Video Games Grouped by Platform')
                          .attr('id', 'description')
}
