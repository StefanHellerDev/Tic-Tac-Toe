let fields = [
    null,
    'cross',
    null,
    'circle',
    null,
    null,
    null,
    null,
    null,
];

function init() {
    render();
}

function render() {
    let tableHTML = '<table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const field = fields[index];
            let cellContent = '';
            
            if (field === 'circle') {
                cellContent = 'O';
            } else if (field === 'cross') {
                cellContent = 'X';
        'circle'}
            
            tableHTML += `<td>${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    document.getElementById('content').innerHTML = tableHTML;
}
