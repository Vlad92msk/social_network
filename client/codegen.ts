// eslint-disable-next-line import/no-import-module-exports
import fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' })

const folder = 'src/modules/'

/**
 * Получаем пути только до тех модулей где есть папка 'graphql'
 * И создаем массив путей до них
 */
const gqlFolders = fs.readdirSync(folder).map((moduleName) => {
  const isExist = fs.readdirSync(folder + moduleName).includes('graphql')
  return isExist && (`${folder + moduleName}/graphql`)
}).filter(Boolean)



module.exports = {
  /* Путь к схеме */
  schema: `http://${process.env.API_HOST}:${process.env.API_PORT}/graphql`,
  generates: {
    'src/apollo/generate.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  /* Путь к файлам где будут схемы запросов */
  documents: gqlFolders,
}
