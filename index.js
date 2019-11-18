const XLSX = require('xlsx');

function ec(r, c){
  return XLSX.utils.encode_cell({r:r,c:c});
}
function delete_row(ws, row_index){
  var variable = XLSX.utils.decode_range(ws["!ref"])
  for(var R = row_index; R < variable.e.r; ++R){
    for(var C = variable.s.c; C <= variable.e.c; ++C){
      ws[ec(R,C)] = ws[ec(R+1,C)];
    }
  }
  variable.e.r--
  ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
}

var workbook = XLSX.readFile('relatorio-transacoes-nov-19.xlsx');
var worksheet = workbook.Sheets['Relatorio de Transações'];
delete_row(worksheet, 0);
const converted = XLSX.utils.sheet_to_json(worksheet);

console.log(converted);

