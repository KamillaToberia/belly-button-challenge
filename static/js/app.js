//URL constant variable
const url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//JSON data and console log
d3.json(url).then(function(data) {
    console.log(data);
});

//Initialize the dashboard
function init() {

    //D3 to use dropdwon menu
    let dropdownMenu=d3.select("#selDataset");

    //D3 to get for sample names and show in the dropdown
    d3.json(url).then((data)=> {

        //Set variable for sample names
        let names=data.names;

        //ADD dample to dropdown 
        names.forEach((id)=>{
            //ID for iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value", id);
        });
    
        //Set up the first sample
        let sample_one=names[0];

        //sample one
        console.log(sample_one);

        //Plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);
    });

};

//Populate the data
function buildMetadata(sample) {

    //D3 to gather all data
    d3.json(url).then((data)=>{
    
        //All metadata
        let metadata=data.metadata;

        //Filter based on the value
        let value=metadata.filter(results=>results.id==sample);

        //Log the value
        console.log(value)

        //First inex
        let valueData=value[0];

        //Clear metadata
        d3.select("#sample-metadata").html("");

        // Object.entries to add key/value
        Object.entries(valueData).forEach(([key, value])=>{
        
            //metadata panel
            console.log(key,value);
            d3.select("#sample-metadata").append("h6").text(`${key}:${value}`);
        });
    });

};

//Build the bar chart
function buildBarChart(sample){

    //D3 to collect all data
    d3.json(url).then((data)=>{

        //All data sample
        let sampleInfo=data.samples;

        //Filter based on the value
        let value=sampleInfo.filter(result=>result.id==sample);

        //First index
        let valueData=value[0];

        //sample_values, out_ids, otu_labels
        let sample_values=valueData.sample_values;
        let otu_ids=valueData.otu_ids;
        let otu_labels=valueData.otu_labels;

        //Log data
        console.log(sample_values,otu_ids,otu_labels);
        
        //Set top 10
        let yticks=otu_ids.slice(0,10).map(id=>`OTU ${id}`).reverse();
        let xticks=sample_values.slice(0,10).reverse();
        let labels=otu_labels.slice(0,10).reverse();

        //Set up bar chart
        let trace1={
            x:xticks,
            y:yticks,
            text:labels,
            type:"bar",
            orientation:"h"
        };

        //Set up layout
        let layout={
            title:"Top 10 OTUs"
        };

        //Plot
        Plotly.newPlot("bar",[trace1], layout)
    });
};

//Bubvle chart
function buildBubbleChart(sample) {

    //Use D3 collect all data
    d3.json(url).then((data)=> {

        //collect all sample data
        let sampleInfo=data.samples;

        //filter base on the value
        let value=sampleInfo.filter(result=>result.id==sample);

        //Get first index
        let valueData=value[0];

        //out_ids,sample_values,labels
        let otu_ids=valueData.otu_ids;
        let sample_values=valueData.sample_values;
        let otu_labels=valueData.otu_labels;

        //Log the data
        console.log(otu_ids,sample_values,otu_labels);

        //Set up bubble chart
        let trace2={
            x:otu_ids,
            y:sample_values,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids,
                colorscale:"Earth"
            }
        };
        //Layout
        let layout={
            title:"OTU ID",
            hovermode:"closest",
            xaxis:{title:"OTU ID"},
        };

        //Plot the bubble chart
        Plotly.newPlot("bubble",[trace2],layout)
    });
};

//Gauge chart
function buildGaugeChart(sample) {

    //Use D3 to collect all data
    d3.json(url).then((data)=>{

        //Collect all data
        let metadata=data.metadata;

        //Filter base on the value
        let value=metadata.filter(result=> result.id==sample);

        //log metadata
        console.log(value)

        //Get first index
        let valueData=value[0];

        //Object.entries get key/value
        let washFrequency=Object.values(valueData)[6];

        //Set up gauge chart

        let trace3={
            value:washFrequency,
            domain:{x:[0,1], y:[0,1]},
            title:{
                text:"<b>Belly Button Washing frequency</b><br>Scrubs per week",
                font:{color:"black", size:16}
            },
            type:"indicator",
            mode:"gauge+number",
            gauge:{
                axis:{range:[0,10], tickmode:"linear",ticko:2, dtick:2},
                bar:{color:"blue"},
                steps:[
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
                ]
            }
        };

        //Set up Layout
        let layout={
            width:500,
            height:500,
            margin:{t:0, b:0}
        };

        //Plotly
        Plotly.newPlot("gauge", [trace3],layout)
    });
}
//function to update the dashborad
function optionChanged(value){
    
    //Log new value
    console.log(value);

    //functions
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

//Initialize function
init();
