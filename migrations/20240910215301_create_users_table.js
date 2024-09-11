/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // 自增主键
      table.string('username', 45).notNullable(); // 用户名，长度为 45，非空
      table.string('password', 225).notNullable(); // 密码，长度为 225，非空
      table.string('email', 255).notNullable(); // 邮箱，长度为 255，非空
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // 回滚时删除 'users' 表
  };
  