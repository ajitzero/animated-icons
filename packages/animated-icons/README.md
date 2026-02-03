# ng-animated-icons

Beautifully crafted animated icons for Angular.

> an open-source collection of smooth, animated icons for your projects. feel free to use them, share your feedback, and let's make this library awesome together!

Heavily based on [Moving Icons](https://www.movingicons.dev/), inspired by [lucide-animated](https://lucide-animated.com/).

**Demo** → [https://icons.ajitpanigrahi.com](https://icons.ajitpanigrahi.com)

<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"/></a>
<a href="https://www.npmjs.com/package/ng-animated-icons" title="View this project on NPM"><img src="https://img.shields.io/npm/v/ng-animated-icons" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/ng-animated-icons" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/ng-animated-icons" alt="NPM downloads" /></a>

## Highlights

- ✅ Standalone Components, for Angular v19 and above.
- ✅ Zoneless & signals-first. RxJS is not required.
- ✅ Custom `InjectionToken` for configuring customizations in one place.

## Installation

Install this package with the package manager of your choice.

```bash
npm i ng-animated-icons
```

```bash
pnpm i ng-animated-icons
```

```bash
bun add ng-animated-icons
```

```bash
yarn add ng-animated-icons
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

1. **Default usage.** This uses the default values mentioned in [Props](#props).

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
   import { provideAnimatedIcons } from 'ng-animated-icons';

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

## Advanced Usage

Control icon animations from parent elements by binding the `animate` input to your own hover & focus states:

```ts
import { BellIcon } from 'ng-animated-icons';

@Component({ ... })
class Example {
	shouldAnimate = signal(false);
}
```

```html
<button
	(focusin)="shouldAnimate.set(true)"
	(focusout)="shouldAnimate.set(false)"
	(mouseenter)="shouldAnimate.set(true)"
	(mouseleave)="shouldAnimate.set(false)"
>
	<i-bell size="16" [animate]="shouldAnimate()" />
	<span>Notifications</span>
</button>
```

When building navigation or sidebar components, it might come in handy to create a reusable wrapper component. With snippets, you can pass the hover/focus state to the children, allowing icons to animate on hover/focus:

```ts
@Component({
	selector: 'group-animation-item',
	template: `<ng-content />`,
	host: {
		'(focusin)': 'shouldAnimate.set(true)',
		'(focusout)': 'shouldAnimate.set(false)',
		'(mouseenter)': 'shouldAnimate.set(true)',
		'(mouseleave)': 'shouldAnimate.set(false)',
	},
})
class GroupAnimationItem {
	readonly shouldAnimate = signal(false);
}
```

Use the wrapper component in your navigation:

```ts
import { GroupAnimationItem } from '@/components/group-animation-item';
import { Home, Settings } from 'ng-animated-icons';
```

```html
<nav class="flex flex-col gap-2">
	<group-animation-item class="flex items-center gap-2 rounded p-2" #homeItem>
		<i-home size="16" [animate]="homeItem.shouldAnimate()" />
		<span>Home</span>
	</group-animation-item>
	<group-animation-item class="flex items-center gap-2 rounded p-2" #settingsItem>
		<i-settings size="16" [animate]="settingsItem.shouldAnimate()" />
		<span>Settings</span>
	</group-animation-item>
</nav>
```

## Missing support for something?

Go through existing issues if your problem is tracked; if not, please [raise a new issue!](https://github.com/ajitzero/animated-icons/issues/new/choose)

## Commands for development

Run demo locally:

```sh
bunx nx serve docs
```

Format affected code only:

```sh
bunx nx format
```

Format everything:

```sh
bun run format
```

Build docs for deployment:

```sh
bunx nx build docs
```

Build package for deployment:

```sh
bunx nx build ng-animated-icons
```

## License

[MIT](https://github.com/ajitzero/animated-icons/blob/main/LICENSE).
Built by [Ajit Panigrahi](https://github.com/ajitzero).
