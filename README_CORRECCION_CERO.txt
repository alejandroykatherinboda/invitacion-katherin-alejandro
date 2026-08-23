CORRECCION: CANTIDAD 0 SIN PASE

Esta versión corrige el problema de que "Pase para 1 Persona" o el pase predeterminado aparezca cuando el invitado tiene cantidad 0.

IMPORTANTE PARA GITHUB PAGES:
1. Reemplaza script.js en tu repositorio.
2. Reemplaza database/invitados.json con el generado desde tu Excel.
3. Si el navegador sigue mostrando la versión anterior, usa Ctrl+F5.

La versión también agrega un parámetro de caché al JSON para evitar que GitHub/navegador use un listado antiguo.

Ejemplo:
?invitado=1 con personas=0 -> NO muestra "Pase para".
?invitado=2 con personas=2 -> muestra "Pase para 2 Personas".
?invitado=3 con personas=1 -> muestra "Pase para 1 Persona".
