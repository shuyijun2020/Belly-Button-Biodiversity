//Fetch data from json File
function createchart(sample) {
    d3.json("samples.json").then (sampledata =>{
        var filter = sampledata.samples.filter(s => s.id==sample)
        var result = filter[0]
        console.log(result)
        var barplot = [
        {
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_ids.slice(0, 10).map(o=>"OTU " + o).reverse(),
            // Or use map(o=>`OTU + ${o}`)
            text:result.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }
        ]
        var barlayout = {
            title: "Top 10 Finds"
        }
        Plotly.newPlot("bar",  barplot, barlayout)
        var bubbleplot = [
            {
                x: result.otu_ids,
                y: result.sample_values,
                text:result.otu_labels,
                mode: "markers",
                marker: {
                    size: result.sample_values,
                    color: result.otu_ids,
                }

            }
        ]
        var bubblelayout = {
            title: "Bacterial Cultures per Sample"
        }
        Plotly.newPlot("bubble",  bubbleplot, bubblelayout)
        
        var metafilter = sampledata.metadata.filter(s => s.id==sample)
        var metaresult = metafilter[0]
        pannel = d3.select("#sample-metadata") 
        pannel.html("")
        Object.entries(metaresult).forEach(([key, value])=>{
            pannel.append("h5").text(`${key}: ${value}`)

        }
        )
    })    
}
//Read samples.json
    d3.json("samples.json").then (sampledata =>{
        var dropdown = d3.select("#selDataset")
        sampledata.names.forEach((name) => {
            dropdown.append("option").text(name).property('value', name)

        }
    )

    createchart(sampledata.names[0])
        console.log(sampledata)
    })

    function optionChanged(sample) {
        createchart(sample)

    }
