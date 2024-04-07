# rehype-pre-language

[Rehype](https://github.com/rehypejs/rehype) plugin to inject language type into the pre element.

## Installation

```sh
npm install @lnkkerst/rehype-pre-language

# or use yarn
yarn add @lnkkerst/rehype-pre-language

# or use pnpm
pnpm install @lnkkerst/rehype-pre-language
```

## Usage

```typescript
import rehypePreLanguage from "@lnkkerst/rehype-pre-language";
import { readFileSync } from "node:fs";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

const doc = readFileSync("./example.html");

const file = await unified()
  .use(rehypeParse)
  .use(rehypePreLanguage)
  .use(rehypeStringify)
  .process(doc);

console.log(String(file));
```

### Input

```html
<html>
  <head></head>
  <body>
    <pre> 
      <code class="language-javascript">console.log("hello world")</code>
    </pre>
  </body>
</html>
```

### Output

```html
<html>
  <head></head>
  <body>
    <pre data-language="javascript"> 
      <code class="language-javascript">console.log("hello world")</code>
    </pre>
  </body>
</html>
```
