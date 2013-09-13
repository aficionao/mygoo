   var visualizationObject;
   var query, options, container, data, dataSourceUrl;

   function Inicio(hoja) {
   	 google.load('visualization', '1.1', {packages: ['controls']});
   	 dataSourceUrl = hoja;
   	 query = new google.visualization.Query(dataSourceUrl);
     query.send (manejaRespuesta)
   }

   function manejaRespuesta(response) {
   	 if (response.isError()) {
   	 	  alert('Error en la consulta: ' + response.getMessage() + ' ' + response.getDetailedMessage());
   	 	  return;
     }
      
     data = response.getDataTable();
     data.setColumnLabel(0,'NOMBRE');

        // Define category pickers for 'Country', 'Region/State' and 'City'
        var depSelector = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'control1',
          'options': {
            'filterColumnLabel': 'Departamento',
            'ui': {
            	'caption': 'Elige un Departamento',
              'labelStacking': 'vertical',
              'allowTyping': false,
              'allowMultiple': false
            }
          }
        });

     // Define a StringFilter control for the 'Name' column
     var txtFiltro = new google.visualization.ControlWrapper({
        'controlType': 'StringFilter',
        'containerId': 'control2',
        'options': {
          'filterColumnLabel': 'NOMBRE',
          'matchType': 'any',
          'ui': {'label': 'Nombre: '}
        }
     });
      
     // Define a table visualization
     var table = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'chart1',
        'options': {'height': '98%', 'width': '100%'}
     });
      
     // Create the dashboard.
       new google.visualization.Dashboard(document.getElementById('dashboard')).
        // Configure the string filter to affect the table contents
        bind(depSelector, txtFiltro).
        bind(txtFiltro, table).
        // Draw the dashboard
        draw(data);
      }
     
