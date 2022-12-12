# Safety Stock web app
Safety stock web app es un sistema de control de stock adaptable a cualquier depósito. 

## Primeros pasos

Primero, dirigirse a [Safety Stock](https://safetystock.ml/) para iniciar sesión o crear una cuenta nueva <br/><br/>
Existen tres posbiles escenarios:
- No iniciar sesión y ser invitado: solo podrá buscar herramientas y ver dónde se encuentran.
- Iniciar sesión siendo no administrador: podrá buscar herramientas, ver qué herramientas tiene en uso y cuales usó a lo largo del tiempo.
- Iniciar sesión siendo administrador: podrá buscar, agregar, eliminar, modificar e imprimir códigos de herramientas, administrar profesores, escanear códigos de barras, cargar y modificar historiales de uso y ver faltantes a comprar. <br/>

## Crear usuario administrador
Para crear un nuevo usuario con privilegios de administrador, se debe crear un usuario primero desde [Signup](https://safetystock.ml/signup).  
Una vez el usuario esté creado, dirigirse a Firebase, ingresar al proyecto de Safety Stock, ingresar al apartado de **Firestore Database**, buscar el campo de **Usuarios** y buscar el usuario a modificar. Una vez encontrado, se deberá modifical el parámetro ***admin*** y cambiarlo a verdadero.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205232609-549df1e2-b121-4f1f-9e5b-f3af6db1eff6.png)<br/><br/>

# Usuarios administradores
## Agregar herramientas e insumos
Para agregar herramientas e insumos, un administrador debe dirigirse a [Administrar herramientas](https://safetystock.ml/herramientas).  
Una vez allí, tendrá la posibilidad de completar los campos solicitados y precionar cargar. Una vez apretado el botón, la herramienta queda agregada.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205237370-eed950e3-7422-4ce1-9909-901e38279a12.png)<br/>

## Modificar herramientas o insumos
Para modificar herramientas o insumos, debemos dirigirnos a la página del elemento a modificar. Para hacer esto debemos ir a [Administrar herramientas](https://safetystock.ml/herramientas) o [Buscar herramientas](https://safetystock.ml/buscar) y buscar el elemento en cuestion. Una vez encontrado, haremos click sobre el nombre, lo que nos llevará a la página del producto. Desde aquí, podemos ver en detalle toda la información de la herramienta y con el botón de **Editar herramienta**, se desplegará un menú de selección desde el cual podemos seleccionar el campo a modificar e ingresar su nuevo valor. <br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205239893-01831f23-fda5-42ab-8759-b3201a623536.png)<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205240007-cf8847f0-7ffc-43e6-befd-db590a51ae71.png)<br/><br/>

## Imprimir códgios de barras o eliminar herramientas e insumos
Para eliminar e imprimir códigos de herramientas e insumos, dirigirse a [Administrar herramientas](https://safetystock.ml/herramientas). Una vez aquí, buscar la herramienta o insumo en cuestión y apretar los botones de **imprimir códgio de barras** o **Eliminar herramienta** según se desee.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205544060-b68c3b3f-1293-435f-be0e-4f74027c675f.png)

## Administrar usuarios
Desde la sección [Profesores](https://safetystock.ml/profesores) se pueden visualizar todos los usuarios habilitados a usar el sistema. 
Para eliminar uno de ellos, primero se debe presionar el botón **Eliminar usuario**.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205932300-5afc0f6f-f406-434d-aaca-2d6b4cb7a529.png)<br/><br/>

Una vez hecho esto, se debe eliminar la información del usuario en Firebase. Para ello, dirigirse al proyecto de Safety Stock, ingresar al apartado de **Authentication**, buscar el usuario a eliminar, presionar los tres puntos de **Ver más opciones** que aparecen al poner el cursor sobre el nombre del usuario y seleccionar la opción de **Borrar cuenta**. Al hacer esto, un mensaje de confirmación aparecerá en pantalla, en el cual debemos presioanr **Borrar**. 
![image](https://user-images.githubusercontent.com/70355656/205945849-7d12a9a9-d4d8-4b03-9382-2677a9bdd0bd.png)

## Lista de faltantes
Desde la sección de [Faltantes](https://safetystock.ml/faltantes) se puede saber qué materiales o herramientas falta comprar. Estos se calculan en base al parámetro de cantidad mínima, cantidad ideal y cantidad actual, establecidos al momento de agregar una nueva herramienta. Para que un elemento deje de aparecer en esta lista, debe editarse el valor de **cantidad** cada vez que se agrega un insumo o herramienta al deposito.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205947948-38fd7289-d940-441d-be48-7bfb291537da.png)<br/><br/>

## Utilización del lector de códigos de barras
Para comenzar a utilizar el lector de códigos de barras, se debe encontrar la página abierta, en la sección de [Inicio](https://safetystock.ml/). Una vez aquí, cada vez que un código de barras se escanee, aparecerá en pantalla la información asociada a ese código. Junto a este, aparecerá un selector para elegir el usuario que tomará las herramientas e insumos, un botón de + y - para sumar o restar la cantidad a tomar y un botón de **Eliminar selección** para eliminar la herramienta o insumoe scaneado por completo.  
Una vez que se hayan escaneado todas las herramientas e insumos, y seleccionado las cantidades deseadas, se debe presionar el botón de **Confirmar selección** para agregar estas herramientas al historial, quitar la cantidad tomada de la cantidad disponible y actualizar el historial de uso.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205953815-a797a76f-5b91-4d28-aef7-0ee7ccc1659d.png)<br/><br/>

## Historial y devolución de herramientas e insumos
Para devolver herramientas e insumos, se debe ir a la sección de [Historial](https://safetystock.ml/historial). Allí, aparecerán bajo el nombre del usuario todas las herramientas que se encuentran en uso por él. Junto a cada herramienta, aparecen un botón de +, -  y **Devolver parcialmente** para devolver una parte de lo tomado, y un botón de **Devolver todo** Para devolver toda la cantidad tomada. <br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205956445-babf47ac-732f-425f-bf69-1b7f40c7e082.png)

# Usuarios no administradores
## Ver herramientas en uso
Desde la sección de [Mis herramientas](https://safetystock.ml/mis-herramientas), se pueden ver todas las herramientas que el usuiario saca y tiene pendientes para devolver. Una vez que son devueltas por el usuario administrador, estas desaparecen de esta sección. <br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205958013-f0d549cd-60a9-440a-af9b-3098e63856e1.png)<br/><br/>

## Ver todo mi historial de uso
Desde la sección de [Mi historial](https://safetystock.ml/mi-historial) se pueden ver todas las herramientas e insumos usados por el usuario a lo largo del tiempo.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205959845-5ca9c013-a1f6-4353-ab61-3375b78a2bee.png)<br/><br/>


### Para los próximos desarrolladores
## Cambios pendientes
- Añadir el stock a la base de datos
- Añadir estado de carga de las páginas
- Añadir seguridad con 2FA, envío de mails de confirmación para crear cuentas y permitir que solo personas específicas puedan crear cuentas
- Mejorar el estilo de la página con la incorporación de módulos y CSS
- Linkear [Safety Stock Access Control](https://github.com/NicoBaranow/SafetyStockAccessControl), haciendo que cada vez que un usuario ingresa al depósito con un tag RFID, sea este el único capaz de retirar herramientas e insumos, para evitar extracciones equivocas o maliciosas.
- Mejorar la efectividad del historial de uso, buscando la manera de facilitar el proceso de devolución.
- Incorporar cámaras y crear API para tomar el video de estas.
- Añadir interfaz a [Safety Stock Access Control](https://github.com/NicoBaranow/SafetyStockAccessControl) para poder agregar y eliminar usuarios con rapidez.


## Tecnología a utilizar
Dado que el proyecto debe ser escalable, optamos por la utilización de Firebase como base de datos, ya que es mantenido por Google, posee una gran documentación y es fácil de comenzar a utilizar. Para el desarrollo de la web, optamos por React JS, dado que nos da la posibilidad de crear progressive web apps, estar al día con la última tecnología, posee una gran comunidad y hay mucha información y cursos al respecto. Para el desarrollo del control de acceso, utilizamos el chip ESP32 ya que cuenta con WIFI en caso de querer utilizarse a futuro y es programable en MicroPython, lo que aporta sencillez.
En resumen:
Los lenguajes y tecnologías a aprender para la continuación del proyecto son:
- HTML
- CSS
- JavaScript
- React Js
- Node.js
- TypeScript
- Micropython 


