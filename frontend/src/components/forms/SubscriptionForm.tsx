'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { Locale } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { submitSubscription, resetSubscription } from '@/store/slices/subscriptionSlice';
import { useEffect } from 'react';

interface SubscriptionFormProps {
  lng: Locale;
}

export default function SubscriptionForm({ lng }: SubscriptionFormProps) {
  const { t } = useTranslation(lng);
  const dispatch = useAppDispatch();
  const { isSubmitting, isSuccess, error } = useAppSelector((state) => state.subscription);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('footer.invalidEmail'))
        .required(t('footer.invalidEmail')),
    }),
    onSubmit: async (values) => {
      dispatch(submitSubscription(values.email));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      const timer = setTimeout(() => dispatch(resetSubscription()), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex items-center">
        <div className="flex border border-white/50">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('footer.emailPlaceholder')}
            className="bg-transparent text-white placeholder-white/60 px-4 py-2 text-sm outline-none w-48"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-brand-brown-500 px-4 py-2 text-sm font-medium hover:bg-brand-brown-50 transition disabled:opacity-50"
          >
            {isSubmitting ? '...' : t('footer.subscribeBtn')}
          </button>
        </div>
      </form>
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-300 text-xs mt-1">{formik.errors.email}</p>
      )}
      {isSuccess && (
        <p className="text-green-300 text-xs mt-1">{t('footer.subscribeSuccess')}</p>
      )}
      {error && (
        <p className="text-red-300 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
