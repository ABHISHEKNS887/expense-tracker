import YAML from 'yamljs';
const swaggerDocument = YAML.load('/opt/expense-tracker/backend/src/swagger.yaml');

export { swaggerDocument };