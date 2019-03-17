export const Filter = (filters, data) => {
  if (!filters || !data) {
    return data;
  }

  if(filters[0]['field'] === 'all') {
    let searchValue = filters[0]['value'];
    let keys = Object.keys(data[0]);
    let matches = [];
    data.forEach(function(obj, index){
      let isMatch = false;
      keys.forEach( key => {
        if(obj[key] && obj[key].toString().toUpperCase().includes(searchValue.toUpperCase())) {
          isMatch = true;
        }
      });
      if(isMatch) {
        matches.push(index);
      }
    });

    data = data.filter((item, index) => matches.indexOf(index) > -1);
  }

  else {
    filters.forEach( filter => {
      if(filter['value'] !== '' && filter['value'] != null) {
        // if(filter['fieldType'] === 'date-time') {
        //   let date = moment.unix(filter['value'] / 1000).format('YYYY-MM-DD');
        //   data = data.filter(item => moment.unix(item[filter['field']] / 1000).format('YYYY-MM-DD') === date);
        // }
        if(filter['fieldType'] === 'array') {
          let arrayFilter = function(item){
            let isMatch = false;
            if(item[filter['field']]) {
              item[filter['field']].forEach(str => {
                if(str['name'].toUpperCase() === filter['value'].toUpperCase()) {
                  isMatch = true;
                }
              });
            }
            return isMatch;
          };
          data = data.filter(arrayFilter);
        }
        else if(filter['fieldType'] === 'string') {
          let stringFilter = function(item) {
            if(item[filter['field']] && item[filter['field']].toUpperCase() === filter['value'].toUpperCase()) {
              return true;
            }
            else {
              return false;
            }
          }

          data = data.filter(stringFilter);
        }
        else {
          data = data.filter(item => item[filter['field']] === filter['value']);
        }
      }
    });
  }

  return data;
}
