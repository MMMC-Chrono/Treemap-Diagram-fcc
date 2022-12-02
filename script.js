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

    const description = d3.select('body')
                          .append('h3')
                          .text('Top 100 Most Sold Video Games Grouped by Platform')
                          .attr('id', 'description')

   const hierarchy = d3.hierarchy(data)
                       .sum((d) => d.value)
                       .sort((a, b) => b.value - a.value)

   const treemap = d3.treemap()
                     .size([1200, 800])
                     .padding(3)

   const root = treemap(hierarchy)
   const rootData = root.leaves();

   const svg = d3.select('body')
                 .append('svg')
                 .attr('id', 'chart')
                 .attr('width', 1200)
                 .attr('height', 800)

   const colors = ['#ffcccc', '#ffe6cc', '#ffffcc', '	#e6ffcc', '	#d9ffcc', '#ccffe6', '#ccffff', '#cce6ff', '	#ccd9ff', '	#d9ccff', '#f2ccff', '	#ffccf2', '#ffccd9', '#ff99b3', '#b399ff', '#99ffff', '#ffff99', '#ff9999']

   const tooltip = d3.select('body')
                     .append('div')
                     .attr('id', 'tooltip')
                     .style('top', 0)
                     .style('left', 0)
                     .style('opacity', 0)

   const categories = data.children.map((d)=>d.name)
   const scale = d3.scaleOrdinal()
                   .domain(categories)
                   .range(colors)
   const g = svg.selectAll('g')
                   .data(rootData)
                   .enter()
                   .append('g')
                   .attr('transform', (d)=> 'translate(' + d.x0 + ',' + d.y0 + ')')
   const rect = g.append('rect')
                   .attr('class', 'tile')
                   .attr('width', (d) => d.x1 - d.x0)
                   .attr('height', (d) => d.y1 - d.y0)
                   .attr('fill', (d) => scale(d.data.category))
                   .style('padding', 10)
                   .attr('data-name', (d) => d.data.name)
                   .attr('data-category', (d) => d.data.category)
                   .attr('data-value', (d) => d.data.value)
                   .on('mouseover', (event, d) => {
                     tooltip.style('opacity', 1)
                            .style('top', (event.pageY + 20) + 'px')
                            .style('left', (event.pageX + 10) + 'px')
                            .html('Name: ' + d.data.name + '<br/> Category: ' + d.data.category + '<br/> Value: ' + d.data.value)
                     document.querySelector('#tooltip').setAttribute('data-value', d.data.value)
                   })
                   .on('mouseout', (d, i) => {
                     tooltip.style('opacity', 0)
                   })
  function gameTitle(name) {
    let firstName = name.split(':')
    const splitNames = firstName[0].split(' ');
    for (let i = 0; i < splitNames.length; i++) {
      if (splitNames[i].length <= 2) {
        splitNames[i - 1] = splitNames[i-1]+ ' ' + splitNames[i]
        splitNames.splice(i, 1)
      }
    }
    return splitNames;
  }
  const text = g.append('text')
                .attr('x', 18)
                .attr('y', 13)
                .selectAll('tspan')
                .data((d)=>gameTitle(d.data.name))
                .enter()
                .append('tspan')
                .attr('x', 4)
                .attr('y', (d, i)=> {//console.log(d, i)
                  return i === 0 ? 13 : (13 + (i * 10))
                })
                .html((d)=>d)
   const legend = d3.select('body')
                    .append('svg')
                    .attr('width', 500)
                    .attr('height', 155)
                    .attr('id', 'legend')
                    .append('g')
                    .attr('transform', 'translate(60,10)')

   let categoryArr = rootData.map((d) => d.data.category);

   categoryArr = categoryArr.filter((d, i) => {
   if(categoryArr.indexOf(d) === i) return d;
   })

   function location(value, i) {
      let x = 150;
      let y = 25;
      return i >= 0 && i < 3 ? 'translate(' + (x * i) + ', 0)' : 
      i >= 3 && i < 6 ? 'translate(' + x * (i - 3) + ',' + y +')' :
      i >= 6 && i < 9 ? 'translate(' + x * (i - 6) + ',' + (y * 2) +')' : 
      i >= 9 && i < 12 ? 'translate(' + x * (i - 9) + ',' + (y * 3) +')' : 
      i >= 12 && i < 15 ? 'translate(' + x * (i - 12) + ',' + (y * 4) +')' : 'translate(' + x * (i - 15) + ',' + (y * 5) +')';

   }
   
   const legendItem = legend.selectAll('g')
                            .data(categoryArr)
                            .enter()
                            .append('g')
                            .attr('transform', (d, i) => location(d, i))
   const legendRect = legendItem.append('rect')
                                .attr('class', 'legend-item')
                                .attr('width',15)
                                .attr('height', 15)
                                .attr('fill', (d) => scale(d))
   const legendText = legendItem.append('text')
                                .text((d) => d)
                                .attr('x', 18)
                                .attr('y', 13)
}
