fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
 .then(response => response.json())
 .then(response => {
    collectedData(response)
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

   const hierarchy = d3.hierarchy(data)
                       .sum((d) => d.value)
                       .sort((a, b) => b.value - a.value)

   const treemap = d3.treemap()
                     .size([960, 570])
                     .padding(3)

   const root = treemap(hierarchy)
   const rootData = root.leaves();

   const svg = d3.select('body')
                 .append('svg')
                 .attr('width', 1000)
                 .attr('height', 600)

   const colors = ['#ffcccc', '#ffe6cc', '#ffffcc', '	#e6ffcc', '	#d9ffcc', '#ccffe6', '#ccffff', '#cce6ff', '	#ccd9ff', '	#d9ccff', '#f2ccff', '	#ffccf2', '#ffccd9', '#ff99b3', '#b399ff', '#99ffff', '#ffff99', '#ff9999']

   const categories = data.children.map((d)=>d.name)
   const scale = d3.scaleOrdinal()
                   .domain(categories)
                   .range(colors)
   const rect = svg.selectAll('rect')
                   .data(rootData)
                   .enter()
                   .append('rect')
                   .attr('class', 'tile')
                   .attr('x', (d) => d.x0)
                   .attr('y', (d) => d.y0)
                   .attr('width', (d) => d.x1 - d.x0)
                   .attr('height', (d) => d.y1 - d.y0)
                   .attr('fill', (d) => scale(d.data.category))
                   .attr('data-name', (d) => d.data.name)
                   .attr('data-category', (d) => d.data.category)
                   .attr('data-value', (d) => d.data.value)
   const legend = d3.select('body')
                    .append('svg')
                    .attr('width', 500)
                    .attr('height', 155)
                    .attr('id', 'legend')

   let categoryArr = rootData.map((d) => d.data.category);

   categoryArr = categoryArr.filter((d, i) => {
   if(categoryArr.indexOf(d) === i) return d;
   })
   
   const legendItem = legend.selectAll('g')
              .data(categoryArr)
              .enter()
              .append('g')
              .attr('x', 200)
              .append('rect')
              .attr('class', 'legend-item')
              .attr('x', 100)
              .attr('y', 100)
              .attr('width', 30)
              .attr('height', 30)
              .attr('fill', (d) => scale(categoryArr))
}
