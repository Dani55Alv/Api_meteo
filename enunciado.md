# 22 · El tiempo en Mérida

Crea una **página web que consulte el estado del tiempo en Mérida** con Open-Meteo y muestre una descripción en pantalla. La consulta se realizará al abrir la página, de forma asíncrona y sin recargarla.

## Requisitos

1. Incluye el nombre de la localidad y un titulo para describir el tiempo. Mientras se realiza la consulta, muestra **«Consultando…»**.
2. Al abrir la página, consulta **una única localidad: Mérida**, con las coordenadas **38.91611, −6.34366**.
3. Utiliza `fetch` y una cadena de promesas con `.then()` y `.catch()`. Comprueba `response.ok` antes de convertir la respuesta con `response.json()`.
4. Actualiza el texto del título en base a los códigos, al menos pon los más comunes.
5. Captura los errores de la petición con `.catch()`, registra el problema con `console.error()` y muestra **«No se ha podido consultar el tiempo»** en pantalla.

## Consulta de la API

Endpoint: `https://api.open-meteo.com/v1/forecast`.

| Parámetro | Valor |
| --- | --- |
| `latitude` | `38.91611` |
| `longitude` | `-6.34366` |
| `current` | `weather_code` |
| `timezone` | `Europe/Madrid` |
| `forecast_days` | `1` |

Puedes abrir esta petición directamente en el navegador:

```text
https://api.open-meteo.com/v1/forecast?latitude=38.91611&longitude=-6.34366&current=weather_code&timezone=Europe%2FMadrid&forecast_days=1
```

 Puedes consultar la [documentación oficial](https://open-meteo.com/en/docs) o el [repositorio de Open-Meteo](https://github.com/open-meteo/open-meteo).