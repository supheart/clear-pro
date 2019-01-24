export function getRenderProps(props, exclusive = []) {
  exclusive = exclusive.concat(['children', 'defaultValue', 'onChange']);
  const renderType = ['string', 'number', 'boolean', 'object', 'function'];
  const result = {};
  for(let i in props) {
    // console.log(i, props[i], typeof props[i])
    if(props.hasOwnProperty(i) && renderType.indexOf(typeof props[i]) > -1) {
      if(exclusive.indexOf(i) > -1) continue;
      if(typeof props[i] === 'object') {
        result[i] = {...props[i]};
        continue;
      } 
      if(typeof props[i] === 'function') {
        result[i] = props[i];
        continue;
      } 
      if(props[i] !== false) {
        result[i] = props[i] === true ? '' : String(props[i]);
      }
    }
  }
  // if('value' in result && 'defaultValue' in result) {
  //   delete result.defaultValue;
  // }
  return result;
}