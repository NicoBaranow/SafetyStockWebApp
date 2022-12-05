# Safety Stock 
Safety stock es un sistema de control de stock adaptable a cualquier depósito. 

## Primeros pasos

Primero, dirigirse a [Safety Stock](https://safetystock.io/) para iniciar sesión o crear una cuenta nueva <br/><br/>
Existen tres posbiles escenarios:
- No iniciar sesión y ser invitado: solo podrá buscar herramientas y ver dónde se encuentran.
- Iniciar sesión siendo no administrador: podrá buscar herramientas, ver qué herramientas tiene en uso y cuales usó a lo largo del tiempo.
- Iniciar sesión siendo administrador: podrá buscar, agregar, eliminar, modificar e imprimir códigos de herramientas, administrar profesores, escanear códigos de barras, cargar y modificar historiales de uso y ver faltantes a comprar. <br/>

## Crear usuario administrador
Para crear un nuevo usuario con privilegios de administrador, se debe crear un usuario primero desde [Signup](https://safetystock.io/signup).  
Una vez el usuario esté creado, dirigirse a Firebase, ingresar al proyecto de Safety Stock, ingresar al apartado de **Firestore Database**, buscar el campo de **Usuarios** y buscar el usuario a modificar. Una vez encontrado, se deberá modifical el parámetro ***admin*** y cambiarlo a verdadero.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205232609-549df1e2-b121-4f1f-9e5b-f3af6db1eff6.png)<br/><br/>

## Agregar herramientas e insumos
Para agregar herramientas e insumos, un administrador debe dirigirse a [Administrar herramientas](https://safetystock.io/herramientas).  
Una vez allí, tendrá la posibilidad de completar los campos solicitados y precionar cargar. Una vez apretado el botón, la herramienta queda agregada.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205237370-eed950e3-7422-4ce1-9909-901e38279a12.png)<br/>

## Modificar herramientas o insumos
Para modificar herramientas o insumos, debemos dirigirnos a la página del elemento a modificar. Para hacer esto debemos ir a [Administrar herramientas](https://safetystock.io/herramientas) o [Buscar herramientas](https://safetystock.io/buscar) y buscar el elemento en cuestion. Una vez encontrado, haremos click sobre el nombre, lo que nos llevará a la página del producto. Desde aquí, podemos ver en detalle toda la información de la herramienta y con el botón de **Editar herramienta**, se desplegará un menú de selección desde el cual podemos seleccionar el campo a modificar e ingresar su nuevo valor. <br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205239893-01831f23-fda5-42ab-8759-b3201a623536.png)<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205240007-cf8847f0-7ffc-43e6-befd-db590a51ae71.png)<br/><br/>

## Imprimir códgios de barras o eliminar herramientas e insumos
Para eliminar e imprimir códigos de herramientas e insumos, dirigirse a [Administrar herramientas](https://safetystock.io/herramientas). Una vez aquí, buscar la herramienta o insumo en cuestión y apretar los botones de **imprimir códgio de barras** o **Eliminar herramienta** según se desee.<br/><br/>
![image](https://user-images.githubusercontent.com/70355656/205544060-b68c3b3f-1293-435f-be0e-4f74027c675f.png)
