const rocrate_html = require("ro-crate-html-js");
const rocrate = require("ro-crate");

const _ = require('lodash');

async function subcrate(subgraph, rootId) {
    const graph = _.clone(subgraph);
    graph.push({
        "@type": "CreativeWork",
        "@id": "ro-crate-metadata.json",
        "conformsTo": {"@id": "https://w3id.org/ro/crate/1.1"},
        "about": {"@id": rootId }
    });

    const crate = new rocrate.ROCrate({
        "@context": [],
        "@graph": graph
    });
    preview = await new rocrate_html.Preview(crate, {}, rootId);
    console.log(preview.completeDataset);
    return preview.completeDataset(rootId);
};
 





const SubDocSubgraph = async function (data) {
  try {
    const subgraph = JSON.parse(data.value);
    const html = await subcrate(subgraph, subgraph[0]['@id']);
    console.log(`got subcrate html: ${html.substr(0, 40)}`);
    return html;
  } catch (e) {
    console.log("Error rendering subgraph");
    console.log(e);
    return `<p>error rendering element:</p><p>${e}</p>`;
  }
}







// browserify version starts VVVVVV

// const subcrate = require('subcrate');


// const SubDocSubgraph = async function (data) {
//   try {
//      console.log("at start: " + JSON.stringify(data));
//     const subgraph = JSON.parse(data.value);
//     const html = await subcrate(subgraph, subgraph[0]['@id']);
//     console.log(`got subcrate html: ${html.substr(0, 40)}`);
//     return html;
//   } catch (e) {
//     console.log("Error rendering subgraph");
//     console.log(e);
//     return `<p>error rendering element</p><pre>${e}</pre>`;
//   }

// };

// browserify version ends ^^^^^



module.exports = SubDocSubgraph;
