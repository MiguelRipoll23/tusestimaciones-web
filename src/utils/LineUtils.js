export const getColors = (label, custom) => {
  let color1 = getColor(label, custom, 'array');
  let color2 = getColor(label, custom, 'array');

  color2[0] = Math.min(255, color2[0] * 1.25);
  color2[1] = Math.min(255, color2[1] * 1.25);
  color2[2] = Math.min(255, color2[2] * 1.25);

  return ['rgb(' + color1.join(',') + ')', 'rgb(' + color2.join(',') + ')'];
}

export const getColor = (label, custom, type, bright) => {
  let value = null;

  switch (label) {
    case 'LC':
      value = [172, 68, 73];
      break;
      
    case '1':
      value = [229, 57, 53];
      break;

    case '2':
      value = [186, 104, 200];
      break;

    case '3':
      value = [255, 183, 77];
      break;

    case '4':
      value = [79, 195, 247];
      break;

    case '5C1': case '5C2':
      value = [73, 73, 73];
      break;

    case '6C1': case '6C2':
      value = [76, 175, 80];
      break;

    case '7C1': case '7C2':
      value = [255, 112, 67];
      break;

    case '11':
      value = [63, 81, 181];
      break;

    case '12':
      value = [139, 195, 74];
      break;

    case '13':
      value = [149, 117, 205];
      break;

    case '14':
      value = [52, 119, 219];
      break;

    case '15':
      value = [249, 149, 127];
      break;

    case '16':
      value = [140, 34, 59];
      break;

    case '17':
      value = [255, 118, 154];
      break;

    case '18':
      value = [0, 164, 166];
      break;

    case '19':
      value = [0, 85, 85];
      break;

    case '20':
      value = [0, 132, 148];
      break;

    case '21':
      value = [90, 120, 29];
      break;

    case '23':
      value = [119, 119, 119];
      break;

    case 'N1': case 'N2': case 'N3':
      value = [30, 29, 24];
      break;

    default:
      value = [0, 122, 255];
      break;
  }

  if (custom != null) {
    const result = custom.split(' ');
    
    if (result.length === 3) {
      result[0] = parseInt(result[0]);
      result[1] = parseInt(result[1]);
      result[2] = parseInt(result[2]);

      value = result;
    }
  }

  if (bright) {
    value[0] = Math.min(255, value[0] * 1.25);
    value[1] = Math.min(255, value[1] * 1.25);
    value[2] = Math.min(255, value[2] * 1.25);
  }

  if (type === 'string') {
    value = `rgb(${value.join(',')})`;
  }

  return value;
}