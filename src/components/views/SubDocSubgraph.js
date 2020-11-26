const $ = require('jquery');




const SubDocSubgraph = async function (data) {
  try {
     console.log("at start: " + JSON.stringify(data));
    const subgraph = JSON.parse(data.value);
    const html = await subcrate(subgraph, subgraph[0]['@id']);
    console.log(`got subcrate html: ${html.substr(0, 40)}`);
    return html;
  } catch (e) {
    console.log("Error rendering subgraph");
    console.log(e);
    return `<p>error rendering element</p><pre>${e}</pre>`;
  }

};










// first draft of recursive subgraph rendering



const SubDocSubgraphOld = function (data) {
  try {
    const subgraph = JSON.parse(data.value);
    renderItem({}, data.element, subgraph, subgraph[0], 2);
  } catch (e) {
    console.log("Error displaying recursive subgraph");
    console.log(e);
    data.element.append($('<p>').html('error displaying element'));
    data.element.append($('<pre>').html(e));
    return data.element;
  }

};


function renderItem(rendered, element, subgraph, item, indent) {
  rendered[item['@id']] = 1;
  for( let field in item ) {
    const value = item[field];
    const refs = isReflist(value);
    if( refs ) {
      for( let ref of refs ) {
        if( !rendered[ref['@id']] ) {
          console.log(`Following id ${ref['@id']}`);
          const subItem = findRef(subgraph, ref['@id']);
          if( subItem ) {
            element.append(renderItem(rendered, element, subgraph, subItem, indent + 1));
          } else {
            console.log("no match");
          }
        }
      }
    } else {
      let strvalue = value;
      if( typeof(value) === 'object' ) {
        strvalue = value['name'];
      }
      if( isFacet(cf, item, field) ) {

      } else {
        const row = $('<div class="row">');
        row.append($(`<div class="col-sm-${indent}">`).html(field));
        row.append($(`<div class="col-sm-${8 - indent}">`).html(strvalue));
        element.append(row);
      }
    }
  }
}

function isFacet(cf, item, field) {
  //look for ${item}_${field_facet(multi)? in the config
}


function isReflist(value) {
  console.log(`isReflist ${JSON.stringify(value)}`);
  if( Array.isArray(value) && value.length > 0 ) {
    if( isRef(value[0]) ) {
      console.log('yes');
      return value;
    }
  } else {
    if( isRef(value) ) {
      console.log('yes');
      return [ value ];
    }
  }
  console.log('no');
  return false;
}

function isRef(obj) {
  console.log(`isRef ${JSON.stringify(obj)}`);
  if( typeof(obj) === 'object') {
    if( obj['@id'] ) {
      return true;
    }
  }
  return false;
}


function findRef(subgraph, id) {
  const matches = subgraph.filter((i) => i['@id'] === id);
  if( matches && matches.length > 0 ) {
    return matches[0];
  } else {
    return undefined;
  }
}



module.exports = SubDocSubgraph;
