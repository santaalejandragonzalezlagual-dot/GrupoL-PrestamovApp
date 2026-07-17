# GrupoL-PrestamovApp
Aplicación móvil desarrollada con Ionic + Angular + Capacitor para la gestión de préstamos, desarrollada como proyecto académico, de la Asignatura Programación de dispositivos Móviles, impartida por el Facilitador Joan Manuel Gregorio Pérez, de la Universidad Abierta para Adultos (UAPA).

Integrantes del equipo – GRUPO L

ANDRY ZARZUELA MORA - 100055418
ABRAHAN PINEDA SÁNCHEZ - 100025457
JUAN DE JESÚS GERMÁN RODRÍGUEZ - 100073037
SANTA ALEJANDRA GONZÁLEZ LAGUAL – 100031546

Objetivo: Desarrollar una aplicación móvil que permita gestionar solicitudes de préstamos, funcionando tanto en modo online como offline, aplicando buenas prácticas de desarrollo colaborativo mediante Git y GitHub.

Tecnologías utilizadas:
- Ionic Framework
- Angular
- Capacitor
- TypeScript
- HTML
- SCSS
- Git
- GitHub
-Visual Studio Code
<img width="1920" height="1080" alt="Presentación Mockup Aplicación Móvil Elegante Azul" src="https://github.com/user-attachments/assets/0d037327-4a0c-451f-b248-37d02d27570e" />

Estructura de ramas:
| Rama | Descripción |
| main | Versión estable del proyecto |
| develop | Integración de funcionalidades |
| feature/ | Desarrollo individual de cada integrante |

Flujo de trabajo - Cada integrante trabajará en su propia rama:
Ningún integrante realizará cambios directamente sobre la rama main, hasta que se haya verificado que funciona correctamente.

¿CÓMO EJECUTAR EL PROYECTO?
-Clonar el repositorio
bash
git clone https://github.com/santaalejandragonzalezlagual-dot/GrupoL-PrestamovApp.git

-Entrar al proyecto
bash
cd prestamov

-Instalar dependencias
bash
npm install

-Ejecutar la aplicación
bash
ionic serve

📌 REGLAS DEL EQUIPO:

- Trabajar únicamente en la rama asignada.
- Realizar commits descriptivos.
- Actualizar la rama antes de comenzar a trabajar.
- No realizar cambios directamente sobre main.
- Informar al líder antes de integrar cambios en develop.

Distribución optimizada de los módulos:
Santa Alejandra González Lagual – Arquitectura y Navegación
Responsabilidad exclusiva
•	Crear el proyecto Ionic. 
•	Configurar Angular. 
•	Configurar Capacitor. 
•	Tabs. 
•	Routing. 
•	Menú. 
•	Tema (colores, estilos). 
•	Pantalla Inicio. 
•	API REST. 
📁 Trabaja principalmente en:
•	app.routes.ts 
•	app.component.* 
•	tabs/ 
•	home/ 
•	services/api.service.ts 
ANDRY ZARZUELA MORA – Simulador Financiero
Responsabilidad exclusiva
•	Pantalla "Simular préstamo". 
•	Fórmulas financieras. 
•	Tabla de amortización. 
•	Historial. 
•	SQLite o Ionic Storage. 
📁 Trabaja principalmente en:
•	pages/simulador 
•	pages/historial 
•	services/prestamo.service.ts 
•	services/storage.service.ts 
JUAN DE JESÚS GERMÁN RODRÍGUEZ – Ubicación y Conectividad
Responsabilidad exclusiva
•	Página "Mapa". 
•	Leaflet. 
•	GPS. 
•	Bancos cercanos. 
•	Estado Online/Offline. 
📁 Trabaja principalmente en:
•	pages/mapa 
•	services/geolocation.service.ts 
•	services/network.service.ts 
ABRAHAN PINEDA SÁNCHEZ – Herramientas del dispositivo
Responsabilidad exclusiva
•	Cámara. 
•	Bluetooth BLE. 
•	Multimedia. 
•	Configuración del usuario. 
📁 Trabaja principalmente en:
•	pages/herramientas 
•	pages/configuracion 
•	services/camera.service.ts 
•	services/bluetooth.service.ts 
