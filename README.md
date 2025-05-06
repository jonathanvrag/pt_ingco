# Lista de Usuarios - Documentación Frontend

## Índice del proyecto

- [Alcance](#alcance)
- [Requisitos del Proyecto](#requisitos-del-proyecto)
- [Autores](#autores)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Herramientas de Desarrollo](#herramientas-de-desarrollo)
  - [Pasos para desplegar el proyecto](#pasos-para-desplegar-el-proyecto)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
  - [Services](#services)
- [Descripción del Proyecto](#descripción-del-proyecto)
  - [Funcionalidades principales](#funcionalidades-principales)
  - [Tecnologías utilizadas](#tecnologías-utilizadas)

## Alcance

Este proyecto es una solución a una prueba técnica para INGCO, es una herramienta que permite gestionar una lista de usuarios. Los usuarios pueden ser creados, eliminados y visualizados en una tabla interactiva. La aplicación está diseñada para ser intuitiva y fácil de usar, con soporte para paginación y modales para la creación de nuevos usuarios.

## Requisitos del Proyecto

Los requisitos para esta herramienta fueron definidos para facilitar la gestión de usuarios en un entorno web, asegurando una experiencia de usuario fluida y eficiente.

## Autores

- **Jonathan Raúl Vera Gómez** - Desarrollo Frontend - **Github:** [@jonathanvrag](https://github.com/jonathanvrag)

Este proyecto es un desarrollo personal con fines educativos y de demostración.

#### Contacto: [jonathan.vra@gmail.com](mailto:jonathan.vra@gmail.com)

## Requisitos del Sistema

### Requisitos de Hardware

- Procesador: CPU de 64 bits (x86_64)
- Núcleos: Mínimo 4 núcleos (recomendado 8 núcleos)
- Memoria RAM: Mínimo 8 GB (recomendado 16 GB)
- Espacio en Disco: Mínimo 4 GB de espacio libre (recomendado 20 GB)
- Resolución de Pantalla: WXGA (1366 x 768) mínimo, FHD (1920 x 1080) recomendado

### Requisitos de Software

#### Windows

- Sistema Operativo: Windows 10 de 64 bits o posterior
- PowerShell: Versión 5.0 o posterior
- Git para Windows: Versión 2.27 o posterior
- Visual Studio Code: Con extensiones para React y Tailwind CSS instaladas

#### macOS

- Sistema Operativo: macOS 10.14 Mojave o posterior
- Homebrew: Para instalar dependencias adicionales
- Git: Para gestionar el código fuente

#### Linux

- Sistema Operativo: Distribución de 64 bits (Ubuntu 20.04, Fedora 32, etc.)
- Git: Para gestionar el código fuente

### Herramientas de Desarrollo

- Editor de Texto o IDE: Visual Studio Code.

### Configuración Adicional

**Variables de Entorno:** Asegúrate de configurar la variable `VITE_USERS_URL` en un archivo `.env` con la URL de la API de usuarios.

### Pasos para Desplegar el Proyecto

1. **Clonar el repositorio:**

```bash
git clone https://github.com/jonathanvrag/pt_ingco.git
cd pt_ingco
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar el proyecto:**

```bash
npm run dev
```

## Arquitectura del Proyecto

Este utiliza TypeScript, React y Tailwind CSS para la interfaz de usuario. La arquitectura está basada en componentes reutilizables y servicios para la interacción con la API.

![Diagrama de Arquitectura](./src/assets/architecture.png 'Diagrama de Arquitectura del Proyecto')

### Services

Entre los servicios disponibles en la aplicación están:

#### `src/services/fakeapi.services.tsx`

- **fetchUsers():** Obtiene la lista de usuarios activos desde la API.
- **createUser():** Crea un nuevo usuario enviando los datos a la API.
- **deleteUser():** Elimina un usuario específico de la API.
- **updateUser():** Actualiza los datos de un usuario existente en la API.

## Descripción del Proyecto

### Funcionalidades principales

#### Pantalla principal

- **Lista de Usuarios:** Muestra una tabla con los usuarios registrados, incluyendo su nombre, apellido y correo electrónico. Permite eliminar usuarios directamente desde la tabla.
- **Paginación:** Divide la lista de usuarios en páginas para facilitar la navegación.
- **Modal de Creación/Edición:** Permite agregar nuevos usuarios o editar uno existente mediante un formulario interactivo.
- **Modal de Detalles:** Permite visualizar información detallada de un usuario seleccionado.

### Tecnologías utilizadas

Para el desarrollo de esta herramienta se utilizó Vite como bundler y React 18 como biblioteca principal.

Además, se utilizaron las siguientes librerías:

- **react-icons:** Para los íconos utilizados en la interfaz.
- **tailwindcss:** Para el diseño y estilos responsivos.
- **@vitejs/plugin-react:** Para optimizar el desarrollo con React.
