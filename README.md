# Piggy Wallet Frontend Mobile

Este es el repositorio del código de la aplicación móvil de Piggy Wallet.

La aplicación está escrita en typescript y utiliza Expo.

## Requisitos

Se necesita tener instalado [node](https://nodejs.org/en) `v20.x`.

## Ejecución

Antes de ejecutar la aplicación, se deben instalar las dependencias con

```sh
npm install
```

Existen múltiples maneras de ejecutar la aplicación, siendo las más comunes

```sh
# Execute
npm start # Starts the application
# Or
npm run start:prod # Starts the application in production mode
# Or
npm run tunnel # Starts the application with a tunnel, useful when running in wsl
# Or
npm run tunnel:prod # Starts the application with a tunnel in production mode
```

También se puede iniciar la aplicación indicando un sistema operativo con
```sh
npm run ios # Starts the application for ios
# Or
npm run android # Starts the application for android
# Or
npm run web # Starts the application for the web
```

### Comandos Útiles

Otros comandos útiles son los siguientes:
* `npm run lint` / `npm run lint:fix`: ejecuta el chequeo del linter; si se agrega `:fix` arregla todos los errores que puede automáticamente.
* `npm run format` / `npm run format:check`: ejecuta el formatter; si se agrega `:check` entonces solo hace una revisión.
* `npm run test`: ejecuta los tests.
* `npm run json-server`: levanta el `json-server` que simula las respuestas del *backend*.
* `npm run prebuild` / `npm run pebuild:ios` / `npm run prebuild:android`: hace un [prebuild](https://docs.expo.dev/workflow/prebuild/) de la aplicación.

## Información Adicional

Para más información, se puede leer las siguientes documentaciones:
* [Expo](https://docs.expo.dev/)
* [React Native](https://reactnative.dev/docs/getting-started)
* [TypeScript](https://www.typescriptlang.org/docs/)
