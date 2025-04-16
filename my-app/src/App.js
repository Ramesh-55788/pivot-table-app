import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import Dropdowns from './components/Dropdowns';
import PivotTable from './components/PivotTable';
import DataHandler from './components/DataHandler';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [numericColumns, setNumericColumns] = useState([]);
  const [rowFields, setRowFields] = useState([]);
  const [colFields, setColFields] = useState([]);
  const [valueField, setValueField] = useState('');
  const [aggregation, setAggregation] = useState('sum');

  return (
    <div>
      <FileUploader
        onUpload={(file) =>
          DataHandler.handleFileUpload(file, setCsvData, setColumns, setNumericColumns)
        }
      />

      <Dropdowns
        columns={columns}
        numericColumns={numericColumns}
        rowFields={rowFields}
        colFields={colFields}
        valueField={valueField}
        aggregation={aggregation}
        setRowFields={setRowFields}
        setColFields={setColFields}
        setValueField={setValueField}
        setAggregation={setAggregation}
      />

      {csvData.length > 0 && valueField && (
        (rowFields.length > 0 || colFields.length > 0) && (
          <PivotTable
            pivotData={DataHandler.generatePivotData(csvData, rowFields, colFields, valueField, aggregation)}
            rowFields={rowFields}
            colFields={colFields}
            valueField={valueField}
            aggregation={aggregation}
          />
        )
      )}
    </div>
  );
}

export default App;
