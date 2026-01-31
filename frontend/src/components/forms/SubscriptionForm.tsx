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
    <div className="w-full sm:w-auto">
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center sm:items-end">
        <div className="flex rounded-[6px] overflow-hidden border-2 border-white bg-white p-1">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('footer.emailPlaceholder')}
            className="bg-white text-gray-900 placeholder:text-gray-500 px-4 py-1.5 text-sm text-left outline-none w-44 sm:w-52 min-w-0"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[8px] bg-brand-brown-500 text-white px-5 py-1.5 text-sm font-medium hover:bg-brand-brown-400 transition disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isSubmitting ? '...' : t('footer.subscribeBtn')}
          </button>
        </div>
        {/* Reserved height prevents layout shift when error/success appears */}
        <div className="min-h-5 w-full flex flex-col items-center justify-end">
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-400 text-xs text-center w-full">{formik.errors.email}</p>
          ) : isSuccess ? (
            <p className="text-green-300 text-xs text-center w-full">{t('footer.subscribeSuccess')}</p>
          ) : error ? (
            <p className="text-red-400 text-xs text-center w-full">{error}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
