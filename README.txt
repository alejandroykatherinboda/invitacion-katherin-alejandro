INVITACIÓN ALEJANDRO & KATHERIN - GITHUB PAGES
================================================

ESTRUCTURA PARA SUBIR
Sube/reemplaza estos archivos en la RAÍZ de tu repositorio:

index.html
style.css
script.js
generador-enlaces.html
database/invitados.json
Lista_Invitados_Boda.xlsx (opcional, solo como respaldo)

IMPORTANTE:
NO borres tu carpeta assets/ ni otros archivos originales de la invitación.
Este paquete no contiene las fotos, música ni demás recursos porque deben conservarse los que ya tienes en tu repositorio.

PRUEBA:
https://alejandroykatherinboda.github.io/invitacion-katherin-alejandro/?invitado=2

Debe mostrar:
ERIBAN VALLADARES Y ESPOSA
2 Personas

Otra prueba:
...?invitado=3
Debe mostrar:
NIDIA RODRÍGUEZ
1 Persona

Si visitas la página sin ?invitado=ID, se muestra "Invitado Especial" y "2 Personas", tal como estaba programado.

RUTA DEL JSON:
database/invitados.json

El script principal utiliza exactamente esa ruta y el ID del parámetro "invitado".
