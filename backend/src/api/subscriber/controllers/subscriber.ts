import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

export default factories.createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  async create(ctx) {
    const { email } = ctx.request.body?.data || {};

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    const existing = await strapi.documents('api::subscriber.subscriber').findMany({
      filters: { email: { $eqi: email } },
    });

    if (existing && existing.length > 0) {
      return ctx.badRequest('This email is already subscribed');
    }

    const result = await super.create(ctx);
    return result;
  },
}));
