# DANIKI — Manual del proyecto

## 1. Descripción general

**DANIKI** es un catálogo digital de tenis que permite a los clientes explorar modelos disponibles, consultar sus características y contactar directamente por WhatsApp para preguntar por un producto.

### Identidad de marca

- **Marca:** DANIKI
- **Eslogan:** MUÉVETE A TU ESTILO.
- **Estética:** urbana, moderna, minimalista.
- **Colores principales:** negro, blanco y naranja.
- **Color de acento:** `#F37021`

### Objetivo del proyecto

DANIKI funciona como un escaparate digital, no como una tienda con pagos en línea.

Su propósito es:

- Mostrar los productos disponibles.
- Facilitar la búsqueda por modelo, talla y filtros.
- Destacar productos seleccionados.
- Mostrar fotografías de cada producto.
- Facilitar consultas y posibles compras mediante WhatsApp.
- Administrar productos y ventas desde un panel privado.

### Funcionamiento general

El cliente entra al catálogo público, explora los tenis disponibles, selecciona un modelo y utiliza el botón de WhatsApp para consultar sobre el producto.

La administración se realiza desde un panel que permite gestionar el inventario y registrar ventas.

---

## 2. Estructura de archivos

| Archivo | Función |
|---|---|
| `index.html` | Catálogo público de DANIKI. |
| `panel.html` | Panel de administración e inventario. |
| `admin.html` | Inicio de sesión y acceso administrativo. |
| `supabase-config.js` | Configuración de conexión con Supabase. |
| `hero-daniki.png` | Imagen principal de la tienda. |
| `index-respaldo.html` | Versión antigua del catálogo. |
| `panel-respaldo` | Versión antigua del panel. |

Los archivos de respaldo deben conservarse y no modificarse durante el desarrollo normal.

---

## 3. Catálogo público — `index.html`

El catálogo público es la página que utilizan los clientes para descubrir y consultar los tenis disponibles.

### Funciones principales

- Mostrar productos disponibles.
- Mostrar fotografías de los productos.
- Mostrar productos destacados.
- Buscar productos por nombre o modelo.
- Filtrar por talla y género.
- Mostrar información del producto.
- Abrir un visor de fotografías ampliadas.
- Permitir ampliar y reducir imágenes.
- Navegar entre fotografías.
- Facilitar consultas mediante WhatsApp.

### Disponibilidad de productos

El catálogo obtiene los productos desde Supabase.

Se muestran los productos que se encuentran activos y que tienen una cantidad disponible mayor que cero.

Cuando un producto deja de tener stock, ya no debe aparecer en el catálogo público.

### Productos destacados

Los productos marcados como destacados desde el panel pueden aparecer en una sección especial del catálogo.

Si no existen productos destacados, la sección se oculta.

### Consultas por WhatsApp

Cada producto cuenta con una opción para consultar mediante WhatsApp.

El mensaje de consulta incluye información para identificar el producto:

- Modelo.
- Talla.
- Medida en centímetros, cuando está registrada.
- Precio.
- Enlace a la fotografía del producto, cuando está disponible.

El catálogo facilita la comunicación con el cliente, pero la confirmación de disponibilidad y la venta se gestionan directamente.

### Diseño

El catálogo utiliza un diseño oscuro, con detalles en naranja, y está pensado principalmente para dispositivos móviles.

---

## 4. Panel administrativo — `panel.html`

El panel administrativo permite gestionar los productos, el inventario y las ventas de DANIKI.

El acceso está protegido mediante autenticación de Supabase y verificación de permisos de administrador.

### Gestión de productos

Desde el panel es posible:

- Registrar nuevos productos.
- Editar productos existentes.
- Gestionar fotografías.
- Establecer tallas y medidas.
- Definir precios y cantidades disponibles.
- Activar o desactivar productos.
- Marcar productos como destacados.
- Archivar productos que ya no se desean mantener activos.

### Inventario

El inventario permite conocer las cantidades disponibles de cada producto.

Las cantidades se actualizan mediante las operaciones de administración y registro de ventas.

### Registro de ventas

El panel permite registrar ventas y actualizar las cantidades disponibles.

Cuando un producto se queda sin stock, deja de mostrarse en el catálogo público.

### Productos destacados

Desde el panel se puede seleccionar qué productos se mostrarán en la sección de destacados del catálogo público.

### Archivado de productos

Los productos archivados se marcan como eliminados y desactivados para que no se muestren en el catálogo ni en la gestión normal de productos.

El archivado no elimina las fotografías almacenadas en Supabase Storage.

### Fotografías

Las fotografías se almacenan en Supabase Storage.

Registrar una venta o archivar un producto no elimina automáticamente sus fotografías almacenadas.

---

## 5. Acceso administrativo — `admin.html`

El archivo `admin.html` gestiona el inicio de sesión del administrador.

### Autenticación

Utiliza Supabase Auth para iniciar sesión mediante:

- Correo electrónico.
- Contraseña.

### Verificación de administrador

Después de iniciar sesión, el sistema ejecuta la función de Supabase:

`es_administrador()`

Esta función comprueba si el usuario tiene permisos administrativos.

Si el usuario no está autorizado, el sistema cierra su sesión y no permite continuar con el acceso al panel.

### Protección del panel

`panel.html` verifica:

1. Que exista una sesión válida.
2. Que el usuario esté autorizado como administrador.
3. Que la comprobación de permisos se realice correctamente.

Si alguna comprobación falla, el usuario es redirigido a `admin.html`.

### Cerrar sesión

El panel dispone de un mecanismo para cerrar la sesión administrativa.

Al cerrar sesión, el usuario deberá volver a autenticarse para acceder al panel, siempre que no exista otra sesión válida.

---

## 6. Supabase — Base de datos y almacenamiento

DANIKI utiliza Supabase como servicio de backend para gestionar los datos, la autenticación y las fotografías de los productos.

### Conexión

El archivo `supabase-config.js` contiene la configuración necesaria para conectar las páginas de DANIKI con Supabase.

El proyecto utiliza `createClient()` para establecer la conexión.

### Base de datos

La tabla principal de productos es:

`productos`

Esta tabla almacena información utilizada por el catálogo y el panel administrativo, como datos del producto, precio, talla, cantidad, estado, fotografías y condición de destacado.

### Fotografías

Las fotografías se almacenan en Supabase Storage, dentro del bucket:

`productos`

El catálogo utiliza las URL de las imágenes para mostrar las fotografías de cada tenis.

### Seguridad

La tabla `productos` tiene habilitado Row Level Security (RLS).

Existen políticas de acceso para las operaciones de lectura, inserción, actualización y eliminación.

La administración también utiliza autenticación y comprobación de permisos mediante la función `es_administrador()`.

### Ventas

El sistema utiliza funciones de Supabase para gestionar operaciones relacionadas con las ventas y el inventario, incluyendo el registro y la anulación de ventas.

---

## 7. Cómo registrar un nuevo producto

Para agregar un nuevo par al catálogo de DANIKI:

1. Abrir el panel administrativo.
2. Acceder a la sección de registro de productos.
3. Completar la información solicitada del producto.
4. Registrar el precio y la cantidad disponible.
5. Seleccionar la talla y, cuando corresponda, la medida en centímetros.
6. Añadir las fotografías del producto.
7. Revisar que los datos sean correctos.
8. Guardar el producto.

### Recomendaciones

- Utilizar fotografías claras del producto.
- Verificar que la talla sea correcta.
- Registrar correctamente el precio.
- Comprobar la cantidad disponible.
- Revisar las fotografías antes de guardar.
- Marcar como destacado únicamente los productos que se quieran promocionar.

### Comprobación final

Después de registrar el producto:

- Verificar que aparezca en el panel.
- Comprobar que aparezca en el catálogo público si está activo y tiene stock.
- Revisar que las fotografías carguen correctamente.
- Comprobar que el botón de WhatsApp genere el mensaje correspondiente.

---

## 8. Registro de ventas y control de inventario

El panel administrativo permite registrar ventas y actualizar las cantidades disponibles de los productos.

### Registrar una venta

1. Abrir el panel administrativo.
2. Localizar el producto que se vendió.
3. Utilizar la función de registro de venta.
4. Confirmar los datos de la operación.
5. Verificar que el inventario se haya actualizado correctamente.

### Qué ocurre cuando se registra una venta

- Se registra la operación de venta.
- Se actualiza la cantidad disponible del producto.
- El sistema mantiene el historial de ventas.
- Si el producto se queda sin stock, deja de aparecer en el catálogo público.
- Las fotografías del producto permanecen almacenadas en Supabase Storage.

### Anulación de una venta

El panel dispone de una función para anular ventas registradas.

Al anular una venta, se utiliza el procedimiento correspondiente de Supabase para gestionar la operación y el inventario.

Después de una anulación, se debe comprobar que las cantidades disponibles sean correctas.

### Recomendaciones

- Registrar las ventas cuando se confirmen.
- Verificar el producto correcto antes de registrar la operación.
- Evitar registrar dos veces la misma venta.
- Revisar el stock después de una venta anulada.
- Comprobar el catálogo si el producto vuelve a estar disponible.

---

## 9. Solución de problemas frecuentes

### El catálogo no muestra productos

Comprobar:

- Que los productos estén activos.
- Que tengan cantidad disponible mayor que cero.
- Que la conexión con Supabase funcione.
- Que no existan errores en la consola del navegador.

### Las fotografías no aparecen

Comprobar:

- Que las fotografías estén almacenadas correctamente en Supabase Storage.
- Que las URL de las imágenes sean válidas.
- Que el bucket `productos` permita el acceso que necesita el catálogo.
- Que la conexión a Supabase esté funcionando.

### No puedo entrar al panel

Comprobar:

- Que el correo y la contraseña sean correctos.
- Que exista una sesión válida.
- Que el usuario tenga permisos de administrador.
- Que la función `es_administrador()` esté funcionando.
- Que Supabase Auth esté disponible.

### Un producto no aparece después de registrarlo

Comprobar:

- Que se haya guardado correctamente.
- Que esté activo.
- Que tenga stock disponible.
- Que los datos de talla y demás filtros no estén excluyendo el producto.

### WhatsApp no abre correctamente

Comprobar:

- Que el número de WhatsApp esté configurado correctamente.
- Que incluya el código de país.
- Que el enlace generado tenga los datos del producto.
- Que el navegador o dispositivo permita abrir WhatsApp.

### Recomendación general

Antes de modificar código por un error, identificar dónde ocurre, revisar la consola del navegador y realizar una copia de seguridad de la versión funcional.

Evitar cambiar varias funciones al mismo tiempo, para poder identificar qué modificación produjo un problema.

---

## 10. Respaldos, recuperación y mantenimiento

### Copias de seguridad

DANIKI cuenta con copias de respaldo de sus archivos y una copia completa del proyecto.

Los respaldos permiten recuperar una versión anterior en caso de que una modificación provoque errores.

### Antes de modificar código

Siempre que se realice un cambio importante:

1. Guardar una copia de la versión funcional.
2. Identificar el archivo que se va a modificar.
3. Realizar cambios pequeños y controlados.
4. Probar el funcionamiento después de cada cambio.
5. Conservar el respaldo hasta confirmar que todo funciona correctamente.

### Recuperación

Si una modificación provoca un error:

1. No continuar realizando cambios sobre el código afectado.
2. Identificar qué archivo se modificó.
3. Comparar con la copia de respaldo.
4. Restaurar la versión funcional si es necesario.
5. Volver a probar las funciones principales.

### Mantenimiento

Se recomienda:

- Mantener los archivos de respaldo.
- No borrar archivos sin comprobar su función.
- No modificar las políticas de seguridad de Supabase sin revisar sus consecuencias.
- Comprobar periódicamente el catálogo y el panel.
- Verificar las fotografías y el almacenamiento.
- Mantener una copia local de los archivos del proyecto.

### Regla principal de DANIKI

**Si algo funciona correctamente, no modificarlo sin una razón clara, una copia de respaldo y una comprobación posterior.**

