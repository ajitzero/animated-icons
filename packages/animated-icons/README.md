# ng-animated-icons

Bautifully crafted animated icons for Angular.

> an open-source collection of smooth, animated icons for your projects. feel free to use them, share your feedback, and let's make this library awesome together!

A port of [Moving Icons](https://www.movingicons.dev/), inspired by [lucide-animated](https://lucide-animated.com/).

Demo: <https://icons.ajitpanigrahi.com/>

## Highlights

- ✅ Standalone Components, for Angular v19 and above. Tested on Node 22.x and Angular v21, but should work on previous versions.
- ✅ Zoneless & signals-first. RxJs is not required.
- ✅ Custom `InjectionToken` for configuring customizations in one place.

## Installation

Install this package with the package manager of your choice.

```bash
bun add ng-animated-icons
```

```bash
npm i ng-animated-icons
```

```bash
pnpm i ng-animated-icons
```

Yarn has some known issues with installing peer dependencies automatically, and need to be installed explicitly:

```bash
yarn add ng-animated-icons @angular/cdk
```

Or copy just the required icons from the repository.

Use [the docs](https://icons.ajitpanigrahi.com/) to find the files and copy the source code into your project. The only relative import is for the injection token, so consider either adding this file directory beside your icons or you can delete the relevant lines should you choose to skip this.

## Usage

### Import Path

```ts
import { ActivityIcon, StarIcon } from 'ng-animated-icons';
```

- All component names are in PascalCase and have an `Icon` suffix to the respective Lucide icon names. This suffix is added to avoid conflicts with other components, especially since newer Angular components don't have the `Component` suffix by default.
- All icon selectors are in lowercase and have an `i-` prefix to the respective Lucide icon names.

e.g., the `thumbs-up` icon in Lucide is available for import as `ThumbsUpIcon`, and can be used in the template as `i-thumbs-up`

### Props

| Prop          | Type    | Default          | Description                     | InjectionToken? |
| ------------- | ------- | ---------------- | ------------------------------- | --------------- |
| `color`       | string  | `'currentColor'` | Stroke color (CSS color value)  | Yes             |
| `size`        | number  | `24`             | Icon size in pixels             | Yes             |
| `strokeWidth` | number  | `2`              | SVG stroke width                | Yes             |
| `class`       | string  | —                | Optional additional CSS classes | No              |
| `animate`     | boolean | `false`          | Controls icon animation state   | No              |

### Variants

1. **Default usage.** This uses the default values mentions in [Props](#props).

   ```ts
   import { ActivityIcon } from 'ng-animated-icons';
   ```

   ```html
   <i-activity />
   ```

1. **Pass one-off options.** Inline options will be applicable to current icon only.

   ```html
   <!-- HTML-style attributes -->
   <i-activity class="border p-4" color="purple" size="24" strokeWidth="1" />

   <!-- Regular input binding for variables -->
   <i-activity [class]="'border p-4'" [color]="'purple'" [size]="24" [strokeWidth]="1" />
   ```

1. **Global options.** The ideal place to configure standard settings across your app.

   ```ts
   // src/app/app.config.ts
   import { ApplicationConfig } from '@angular/core';
   import { provideAnimatedIcons } from 'ng-auto-animate';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideAnimatedIcons({ color: 'blue', size: 30, strokeWidth: 1 }),
     ],
   };

   // main.ts
   import { bootstrapApplication } from '@angular/platform-browser';
   import { appConfig } from './app/app.config';
   import { App } from './app/app';

   bootstrapApplication(App, appConfig).catch(err => console.error(err));
   ```

   ```html
   <!-- Will be blue, with stroke-width 1 and size 30 -->
   <i-activity />

   <!-- Will still be blue, with stroke-width 1 but with size 36 -->
   <i-activity size="36" />

   <!-- Will still be blue, with size 30 but with stroke-width 3 -->
   <i-activity strokeWidth="3" />

   <!-- Disregards providers since everything is overridden -->
   <i-activity color="#f91377" size="36" strokeWidth="3" />
   ```

<!-- TODO(docs): Add variant for hovering on parent -->

## Missing support for something?

Go through existing issues if your problem is tracked; if not, please [raise a new issue!](https://github.com/ajitzero/animated-icons/issues/new/choose)

## License

[MIT](https://github.com/ajitzero/animated-icons/blob/main/LICENSE).

Built by [Ajit Panigrahi](https://github.com/ajitzero).

---

This library was generated with [Nx](https://nx.dev).
