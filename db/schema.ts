import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const groupsTable = sqliteTable('groups', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

export const groupsRelation = relations(groupsTable, ({ many }) => ({
  items: many(itemsTable),
}));

export const itemsTable = sqliteTable('items', {
  id: int().primaryKey({ autoIncrement: true }),
  groupId: int('group_id').notNull(),
  name: text().notNull().unique(),
});

export const itemsRelation = relations(itemsTable, ({ one }) => ({
  group: one(groupsTable, {
    fields: [itemsTable.groupId],
    references: [groupsTable.id],
  }),
}));
