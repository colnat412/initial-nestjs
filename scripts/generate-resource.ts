import * as fs from "fs";
import * as path from "path";
import { generateController } from "./templates/controller";
import { generateService } from "./templates/service";
import { generateModule } from "./templates/module";
import { generateRequestDto } from "./templates/dto/request";
import { generateResponseDto } from "./templates/dto/response";

// === UTILS ===
const moduleName = process.argv[2];

if (!moduleName) {
  console.error(
    "❌ Vui lòng truyền tên module! VD: ts-node create-nest-module.ts to-do",
  );
  process.exit(1);
}

const capitalize = (str: string): string =>
  str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const className = capitalize(moduleName); // ToDo, UserProfile...
const folderPath = path.join(__dirname, "..", "src", "app", moduleName);
const dtoFolderPath = path.join(folderPath, "dto");

// === CHECK + CREATE FOLDERS ===
if (fs.existsSync(folderPath)) {
  console.error("❌ Module đã tồn tại!");
  process.exit(1);
}
fs.mkdirSync(folderPath, { recursive: true });
fs.mkdirSync(dtoFolderPath, { recursive: true });

fs.writeFileSync(
  path.join(folderPath, `${moduleName}.controller.ts`),
  generateController(moduleName, className),
);
fs.writeFileSync(
  path.join(folderPath, `${moduleName}.service.ts`),
  generateService(moduleName, className),
);
fs.writeFileSync(
  path.join(folderPath, `${moduleName}.module.ts`),
  generateModule(moduleName, className),
);

fs.writeFileSync(
  path.join(dtoFolderPath, "request.dto.ts"),
  generateRequestDto(className),
);
fs.writeFileSync(
  path.join(dtoFolderPath, "response.dto.ts"),
  generateResponseDto(className),
);

console.log(`✅ Đã tạo module "${moduleName}" tại ${folderPath}`);
