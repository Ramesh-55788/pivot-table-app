import React from 'react';

const Dropdowns = ({
    columns,
    numericColumns,
    rowFields,
    colFields,
    valueField,
    aggregation,
    setRowFields,
    setColFields,
    setValueField,
    setAggregation
}) => {
    const handleMultiSelect = (e, setFunction) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        setFunction(selected);
    };

    return (
        <div className="dropdown-container">
            <div>
                <label>Rows:</label><br />
                <select multiple value={rowFields} onChange={(e) => handleMultiSelect(e, setRowFields)}>
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
            </div>

            <div>
                <label>Columns:</label><br />
                <select multiple value={colFields} onChange={(e) => handleMultiSelect(e, setColFields)}>
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
            </div>

            <div>
                <label>Value Field:</label><br />
                <select value={valueField} onChange={(e) => setValueField(e.target.value)}>
                    <option value="">Select</option>
                    {numericColumns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
            </div>

            <div>
                <label>Aggregation:</label><br />
                <select value={aggregation} onChange={(e) => setAggregation(e.target.value)}>
                    <option value="sum">Sum</option>
                    <option value="avg">Average</option>
                    <option value="min">Min</option>
                    <option value="max">Max</option>
                    <option value="count">Count</option>
                </select>
            </div>
        </div>
    );
};

export default Dropdowns;
