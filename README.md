# Travelin V1

Hola mi nombre es Marlon Santiago Henao Morera, les presento mi solución al reto.
Para comenzar, deben saber que el proyecto fue realizado con el framework angular, en su última versión.

Lo primero que deben hacer es clonar el repositorio o en su defecto descargar el archivo .zip que genera
el gestor de repositorio. Una vez clonado o descargado en la ruta determinada que hayan elegido deben tener
muy en cuenta que para que funcione el proyecto deben tener instalado el CLI ANGULAR y también node.js.

Se instala de la siguiente manera

npm install -g @angular/cli

Posteriormente ejecutar el comando a continuación para instalar los modulos de node

npm install

Una vez instalado el CLI. Procederemos a compilar y ejecutar el proyecto en servidor local que nos proporciona
ANGULAR con el siguiente comando

ng serve

Una vez compilado y ejecutado, en el terminal nos arrojará una dirección ip (Local), la cual nos permitirá
visualizar el aplicativo.

http://localhost:4200/

NOTA: en su defecto puede ser la dirección anterior o según el dispotivo puede cambiar el puerto.

---------------------------------------------------------------------------------------------------------------

FUNCIONALIDAD

-El aplicativo contiene un NAVBAR por diseño (SIN FUNCIONALIDAD)

-En el cuerpo, contiene dos "SELECT" que nos permitirán elegir los origenes disponibles sin estar repetidos,
lo mismo aplica para el destino.

-Al generar el evento con el boton "Consultar", el programa determinará si la ruta fue encontrada o no; en caso
de que se encuentre la ruta, se ilustrará. En caso de que no se encuentre la ruta, generará una alerta, indicando que esa ruta de viaje no existe.

-En caso de que se encuentre la Ruta, permitirá visualizar la información del origen, destino, precio, numero de vuelo y tranportista.

-También permite visualizar el precio del viaje en moneda colombiana(COP) y europea(EURO).


NO SE IMPLEMENTÓ-----

Algunos temas como testing, control de excepciones, entre las otras funcionalidades que se iban a valorar, no las logré implementar por tema de tiempo y alguna de ellas por no tener el Total Conocimiento. Aún así logré desarrollar el aplicativo con los requerimientos estipulados y con las buenas prácticas en el manejo de la información.





