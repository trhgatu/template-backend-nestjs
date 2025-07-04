import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const name = process.argv[2];
const schemaArg = process.argv.find((arg) => arg.startsWith('--schema='));

if (!name) {
  console.error('❌ Please provide a module name!');
  process.exit(1);
}

const toPascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pascalName = toPascal(name);

// Parse schema string to fields
const schemaFields = schemaArg
  ? schemaArg
      .replace('--schema=', '')
      .split(',')
      .map((pair) => {
        const [key, type] = pair.split(':');
        return { key, type };
      })
  : [];

const folder = join(__dirname, `../modules/${name}`);
if (existsSync(folder)) {
  console.error('❌ Module already exists!');
  process.exit(1);
}

// Create folders
mkdirSync(folder, { recursive: true });
mkdirSync(join(folder, 'dtos'));
mkdirSync(join(folder, 'validators'));

// === Template === //
const modelFields = schemaFields
  .map((f) => `  @Prop()\n  ${f.key}: ${f.type};`)
  .join('\n');

const modelContent = `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ${pascalName} extends Document {
${modelFields || '  // TODO: define schema fields here'}
}

export const ${pascalName}Schema = SchemaFactory.createForClass(${pascalName});
`;

const controllerContent = `import { Controller } from '@nestjs/common';

@Controller('${name}')
export class ${pascalName}Controller {}
`;

const serviceContent = `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${pascalName}Service {}
`;

const moduleContent = `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ${pascalName}Controller } from './${name}.controller';
import { ${pascalName}Service } from './${name}.service';
import { ${pascalName}, ${pascalName}Schema } from './${name}.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ${pascalName}.name, schema: ${pascalName}Schema },
    ]),
  ],
  controllers: [${pascalName}Controller],
  providers: [${pascalName}Service],
})
export class ${pascalName}Module {}
`;

const dtoContent = `export class Create${pascalName}Dto {
  // TODO: define DTO fields
}
`;

const validatorContent = `// import z from 'zod'

// export const Create${pascalName}Validator = z.object({})`;

const indexContent = `export * from './${name}.controller';
export * from './${name}.service';
export * from './${name}.model';
export * from './${name}.module';
`;

// === Write files === //
writeFileSync(join(folder, `${name}.model.ts`), modelContent);
writeFileSync(join(folder, `${name}.controller.ts`), controllerContent);
writeFileSync(join(folder, `${name}.service.ts`), serviceContent);
writeFileSync(join(folder, `${name}.module.ts`), moduleContent);
writeFileSync(join(folder, `index.ts`), indexContent);
writeFileSync(join(folder, `dtos/create-${name}.dto.ts`), dtoContent);
writeFileSync(
  join(folder, `validators/${name}.validator.ts`),
  validatorContent,
);

console.log(`✅ Module "${name}" generated successfully.`);
