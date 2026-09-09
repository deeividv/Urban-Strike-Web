# Urban Strike: SWAT Ops — sitio web

Página de presentación del juego **Urban Strike: SWAT Ops**, un run & gun 2D hecho en Godot 4.4.
El contenido (estadísticas, enemigos, jefes, niveles y notas técnicas) está sacado del GDD del proyecto.

Construida con **Next.js 16** (App Router, Turbopack), **React 19** y **Tailwind CSS 4**.

## Detalles de implementación

- Los sprites de personajes son las **hojas originales del juego**, animadas en CSS con `steps()`
  a partir de los tamaños de frame reales de las escenas `.tscn` (`app/lib/data.ts`).
- El fondo del hero usa las cinco capas de parallax nocturno del juego, cada una a su velocidad.
- La tipografía de los títulos es `antilles.ttf`, la misma que usa el HUD del juego,
  cargada con `next/font/local`.
- El logo alimenta también el favicon (`app/icon.png`), el icono de iOS (`app/apple-icon.png`)
  y la imagen para redes sociales (`app/opengraph-image.png`).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # sirve el build
npm run lint
```

## Despliegue en Vercel

El proyecto no necesita ninguna variable de entorno para funcionar.

1. Crea el repositorio en GitHub y súbelo:

   ```bash
   git remote add origin https://github.com/<tu-usuario>/urbanstrike.git
   git push -u origin main
   ```

2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
   Vercel detecta Next.js automáticamente: no hay que tocar el comando de build
   (`next build`), el directorio de salida ni el framework preset.

3. Pulsa **Deploy**. A partir de ahí, cada push a `main` genera un despliegue de producción
   y cada rama o pull request genera una preview.

### Variable opcional

| Variable               | Para qué sirve                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio (por ejemplo un dominio propio) para las etiquetas Open Graph y de Twitter. |

Si no la defines, en Vercel se usa automáticamente el dominio de producción del proyecto
(`VERCEL_PROJECT_PRODUCTION_URL`) y en local `http://localhost:3000`.
