'use strict';
const {sanitizeEntity} = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async clear_completed(ctx){
        let entries = await strapi.query('todos').delete({active: false});
        return entries.map(entry => sanitizeEntity(entry, {model : strapi.models.todos}));
    },

    
    async toggle_completed(ctx){
        const {active} = ctx.request.body; 
        const todos = await strapi.query('todos').find({});
        const entries = await Promise.all(todos.map(async entry => {
            return await strapi.query('todos').update({id: entry.id}, {active: active});
        }));
        return entries.map(entry => sanitizeEntity(entry, {model : strapi.models.todos}));
    }
};
