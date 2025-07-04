import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const name = process.argv[2];

if (!name) {
  console.error('❌ Please provide a module name!');
  process.exit(1);
}

const folder = join(__dirname, `../modules/${name}`);
if (existsSync(folder)) {
  console.error('❌ Module already exists!');
  process.exit(1);
}

mkdirSync(folder, { recursive: true });

const toPascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pascalName = toPascal(name);

const templates: Record<string, string> = {
  [`${name}.controller.ts`]: `import { Controller } from '@nestjs/common';

@Controller('${name}')
export class ${pascalName}Controller {}`,
  [`${name}.service.ts`]: `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${pascalName}Service {}`,
  [`${name}.schema.ts`]: `import { Schema, model } from 'mongoose';

const ${pascalName}Schema = new Schema({}, { timestamps: true });

export const ${pascalName}Model = model('${pascalName}', ${pascalName}Schema);`,
  [`${name}.dto.ts`]: `export class Create${pascalName}Dto {}`,
  [`${name}.validator.ts`]: `// import z from 'zod'`,
  [`${name}.types.ts`]: `export type ${pascalName}Type = {};`,
  [`${name}.interface.ts`]: `export interface I${pascalName} {}`,
  [`${name}.route.ts`]: `import { ${pascalName}Controller } from './${name}.controller';

export default [${pascalName}Controller];`,
  [`index.ts`]: `export * from './${name}.controller';
export * from './${name}.service';`,
};

Object.entries(templates).forEach(([filename, content]) => {
  writeFileSync(join(folder, filename), content.trim());
});

console.log(`✅ Module "${name}" generated successfully.`);
