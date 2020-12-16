const Preview = require("ro-crate-html-js").Preview;
const ROCrate = require("ro-crate").ROCrate;

const _ = require('lodash');

async function subcrate(subgraph, rootId) {
    const graph = _.clone(subgraph);
    graph.push({
        "@type": "CreativeWork",
        "@id": "ro-crate-metadata.json",
        "conformsTo": {"@id": "https://w3id.org/ro/crate/1.1"},
        "about": {"@id": rootId }
    });

    const crate = new ROCrate({
        "@context": [],
        "@graph": graph
    });
    preview = await new Preview(crate, {}, rootId);
    return preview.completeDataset(rootId);
};
 





const SubDocSubgraph = async function (data) {
  try {
    const subgraph = JSON.parse(data.value);
    const html = await subcrate(subgraph, subgraph[0]['@id']);
    return html;
  } catch (e) {
    console.log("Error rendering subgraph");
    console.log(e);
    return `<p>error rendering element:</p><p>${e}</p>`;
  }
}


module.exports = SubDocSubgraph;
