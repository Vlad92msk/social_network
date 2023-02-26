import { DB_MAP, DB_TABLES } from '@db/db.map'

/**
 * Принимает название искомой таблицы и вовзращает Базу данных и схему где лежит данная таблица
 */
export const entity = (table: DB_TABLES) =>
  DB_MAP.reduce((acc, item) => {
    // @ts-ignore
    const findSchema = item.schemas.find(({ tables }) => tables.includes(table))?.name
    return findSchema ? { schema: findSchema, name: table } : acc
  }, {})
