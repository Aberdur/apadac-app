# Plan de reestructuración web APADAC

## 1. Punto de partida

La web actual de APADAC transmite mucho contenido útil, pero públicamente se percibe como un sitio antiguo:

- navegación cargada y poco jerárquica
- diseño visual desfasado
- fichas y llamadas a la acción poco claras
- mezcla de contenidos muy distintos en portada
- sensación de CMS antiguo en lugar de marca cuidada

Además, como no hay acceso al panel actual, la migración debe plantearse como una reconstrucción progresiva del sitio, no como una simple "actualización".

## 2. Objetivo del rediseño

Construir una web:

- más profesional
- más cercana y emocional
- más clara para adoptar, donar y colaborar
- más fácil de mantener
- más rápida en móvil

El objetivo real no es solo "verse moderna", sino mejorar conversión en tres acciones:

1. adoptar
2. donar o apadrinar
3. apuntarse como voluntario o casa de acogida

La primera versión puede salir solo en español. Eso simplifica mucho el MVP y evita duplicar trabajo de contenido al principio.

## 3. Qué conservar del sitio actual

Hay valor claro en estos bloques de contenido:

- animales en adopción
- casos especiales
- animales adoptados
- voluntariado
- casa de acogida
- apadrinamiento
- microdonaciones / Teaming
- noticias o publicaciones
- información de contacto
- páginas legales
- versión internacional básica, al menos para adopciones y contacto

## 4. Nueva arquitectura recomendada

## Navegación principal

- Inicio
- Adopta
- Cómo ayudar
- Historias
- Sobre APADAC
- Contacto

## Subestructura

### Inicio

- hero con mensaje claro y CTA dobles: `Adoptar` y `Ayudar`
- animales destacados
- casos urgentes
- cómo ayudar en 4 vías
- proceso de adopción
- cifras de impacto
- últimas noticias
- bloque final de contacto y donación

### Adopta

- listado general con filtros
- Perros
- Gatos
- Casos especiales
- Adoptados

Cada ficha debería incluir:

- fotos buenas
- nombre
- edad
- sexo
- tamaño
- carácter
- salud
- compatibilidades
- historia resumida
- CTA principal de adopción
- CTA secundaria de acogida o apadrinamiento si aplica

### Cómo ayudar

- Donar
- Teaming
- Apadrinar
- Ser casa de acogida
- Voluntariado
- Empresas colaboradoras

### Historias

- noticias
- rescates destacados
- finales felices

### Sobre APADAC

- quiénes sois
- misión
- cómo trabajáis
- transparencia básica
- partners y colaboraciones

### Contacto

- formularios simples
- emails por tipo de consulta
- redes sociales
- ubicación / zona de actuación
- preguntas frecuentes

## 5. Enfoque visual

La nueva web debería evitar el look genérico típico de plantilla de ONG.

Dirección visual recomendada:

- tono cálido, limpio y humano
- fotografías grandes y reales
- bloques de contenido más respirados
- tipografía con personalidad pero legible
- llamadas a la acción muy visibles
- iconografía simple y amable

Propuesta inicial de estilo:

- tipografía editorial para titulares: `Fraunces`
- tipografía de interfaz y lectura: `Manrope`
- paleta base: crema cálido, arena, verde oliva suave y acento coral
- tarjetas con bordes suaves y mucha imagen

## 6. Recomendación técnica para este repo

Como el repo está vacío, conviene empezar con una base moderna y fácil de mantener.

Recomendación principal:

- `Next.js`
- `TypeScript`
- `Tailwind CSS`
- `Payload CMS` desde el principio
- base de datos `PostgreSQL`
- despliegue en `Vercel` o entorno equivalente

### Por qué esta opción

- permite una web rápida y bien posicionada
- da un panel profesional para editar contenido sin tocar código
- encaja bien con fichas de animales, filtros y formularios
- permite usuarios, roles y permisos para el equipo
- mantiene frontend y panel en el mismo repo
- incluye borradores, historial y publicación
- deja margen para SEO local y crecimiento futuro

### Estrategia de contenido

Fase 1:

- textos, noticias y animales en CMS
- formularios conectados a email
- panel para que el equipo gestione adopciones

Fase 2:

- automatizaciones editoriales
- vistas internas para filtrar urgentes, reservados y adoptados

### Qué es un CMS

Un CMS es el panel interno donde una persona no técnica puede:

- crear una ficha nueva
- editar textos e imágenes
- cambiar estados
- publicar o despublicar contenido

En vuestro caso no es un extra opcional. Para adopciones es una pieza central.

### Por qué recomiendo `Payload`

Recomendación basada en documentación oficial actual:

- permite autenticación de usuarios dentro del propio CMS
- tiene control de acceso granular por operación y por rol
- soporta versiones, borradores e historial de cambios
- encaja muy bien si toda la solución debe vivir en este repo

Alternativa razonable:

- `Sanity` si priorizáis simplicidad editorial y aceptáis usar un servicio externo para el contenido

Para APADAC, con el requisito de que usuarios internos puedan crear y actualizar adopciones, `Payload` encaja mejor como base principal.

## 6.1. Modelo editorial para adopciones

La parte de adopciones no debería funcionar como páginas sueltas hechas a mano. Debe funcionar como contenido estructurado.

### Tipos de contenido mínimos

- `animal`
- `historia` o `caso_exito`
- `pagina`
- `ajustes_web`

### Esquema recomendado para `animal`

- nombre
- slug
- especie: perro / gato
- estado: en adopcion / reservado / adoptado / acogida / urgente
- fecha de entrada
- fecha de adopción
- sexo
- edad aproximada
- tamaño
- raza
- descripción corta
- historia completa
- salud
- carácter
- compatibilidad con perros
- compatibilidad con gatos
- compatibilidad con niños
- destacado en portada
- galería de fotos
- contacto de adopciones

### Flujo correcto

Cuando un animal sea adoptado, no conviene crear otra ficha aparte. Lo correcto es:

1. mantener el mismo registro
2. cambiar su `estado` a `adoptado`
3. rellenar la `fecha de adopción`
4. opcionalmente vincularlo a una `historia` o `caso_exito`

Así se evita duplicar información y la web puede mostrar automáticamente:

- `/adopta` con animales `en adopcion`
- `/casos-de-exito` con animales `adoptados` o historias relacionadas

### Usuarios y permisos

Roles mínimos recomendados:

- `admin`: configura todo
- `editor`: crea y publica contenido
- `adopciones`: crea y edita fichas de animales
- `colaborador`: acceso limitado si hiciera falta

## 7. Plan de ejecución

### Fase 0. Descubrimiento

- inventario manual de páginas actuales
- recopilar fotos, logos y textos
- decidir qué contenido migra y qué se descarta
- confirmar si se mantiene contenido en inglés

### Fase 1. Base del proyecto

- inicializar frontend
- definir sistema visual
- construir layout, navegación y footer
- crear esquemas de CMS para animales, páginas y noticias
- preparar estructura editorial de animales, noticias y páginas

### Fase 2. MVP público

- Home
- listado de adopción
- ficha de animal
- Cómo ayudar
- Sobre APADAC
- Contacto
- legales

### Fase 3. Conversión y confianza

- historias de adopción
- casos urgentes
- métricas de impacto
- partners
- mejor SEO
- accesibilidad

### Fase 4. Gestión de contenido

- panel CMS con usuarios y permisos
- flujo de publicación
- documentación para mantenimiento

## 8. Riesgos a tener en cuenta

- sin acceso al CMS actual, parte del contenido habrá que migrarlo manualmente
- si no hay banco de fotos bueno, el rediseño perderá mucha fuerza
- demasiadas secciones en portada volverían a reproducir el problema actual
- si varias personas deben editar animales con frecuencia, conviene planear el CMS pronto

## 9. Decisiones recomendadas ya

Para no bloquear el arranque, tomar estas decisiones primero:

1. mantener primera fase solo en español
2. montar CMS desde el principio
3. definir quién podrá editar adopciones y con qué permisos
4. decidir qué formularios necesita la primera versión
5. recopilar fotos y textos reales cuando estén disponibles

## 10. Siguiente paso razonable

Construir un primer MVP con estas 6 rutas:

- `/`
- `/adopta`
- `/adopta/[slug]`
- `/como-ayudar`
- `/sobre-apadac`
- `/contacto`

Con eso ya habría una base profesional, moderna y presentable sobre la que iterar.
