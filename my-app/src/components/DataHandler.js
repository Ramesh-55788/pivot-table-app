import Papa from 'papaparse';

const DataHandler = {
    handleFileUpload: (file, setCsvData, setColumns, setNumericColumns) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data;
                const columns = Object.keys(data[0] || {});
                const numericCols = columns.filter(col =>
                    data.some(row => !isNaN(parseFloat(row[col])) && isFinite(row[col]))
                );
                setCsvData(data);
                setColumns(columns);
                setNumericColumns(numericCols);
            },
        });
    },

    generatePivotData: (csvData, rowFields, colFields, valueField, aggregation = 'sum') => {
        const pivotMap = new Map();
        const colKeySet = new Set();

        const aggFuncs = {
            sum: arr => arr.reduce((a, b) => a + b, 0),
            avg: arr => arr.reduce((a, b) => a + b, 0) / arr.length,
            min: arr => Math.min(...arr),
            max: arr => Math.max(...arr),
            count: arr => arr.length
        };

        csvData.forEach(row => {
            const rowKey = rowFields.map(f => row[f] || '').join(' | ');
            const colKey = colFields.map(f => row[f] || '').join(' | ');
            const val = parseFloat(row[valueField]);

            const finalKey = colKey + ` (${aggregation})`;
            colKeySet.add(finalKey);

            if (!pivotMap.has(rowKey)) pivotMap.set(rowKey, {});
            const rowMap = pivotMap.get(rowKey);

            if (!rowMap[finalKey]) rowMap[finalKey] = [];

            if (aggregation === 'count' || !isNaN(val)) {
                rowMap[finalKey].push(val);
            }
        });

        for (let rowMap of pivotMap.values()) {
            for (let key in rowMap) {
                rowMap[key] = aggFuncs[aggregation](rowMap[key]);
            }
        }

        return {
            pivotMap,
            colKeys: Array.from(colKeySet).sort()
        };
    }
};

export default DataHandler;
