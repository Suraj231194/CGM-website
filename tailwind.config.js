import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/*
 * Brand palette.
 *
 * `brand` is the petrol teal taken from the device renders themselves, so the product
 * photography and the interface read as one system. `ink` is the deep near-black used
 * for text and dark sections, and `canvas`/`sand` are the warm neutrals behind them.
 *
 * `teal` is aliased to `brand` on purpose: the checkout, account and admin screens use
 * `teal-*` utilities directly, and the alias moves all of them onto the new brand colour
 * without touching each call site. New code should use `brand-*`.
 */
const brand = {
    50: '#eef7f6',
    100: '#d6ecea',
    200: '#afd9d6',
    300: '#7fbfbb',
    400: '#4fa19d',
    500: '#2f8683',
    600: '#236d6c',
    700: '#1d5859',
    800: '#1a4849',
    900: '#173c3d',
    950: '#0a2425',
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                brand,
                teal: brand,
                ink: {
                    50: '#f3f6f6',
                    100: '#e3e9ea',
                    200: '#c7d2d4',
                    300: '#9fb0b3',
                    400: '#728689',
                    500: '#56696c',
                    600: '#435457',
                    700: '#344447',
                    800: '#1f3033',
                    900: '#122326',
                    950: '#071619',
                },
                canvas: '#f7f6f2',
                sand: {
                    50: '#fbfaf7',
                    100: '#f3f1ea',
                    200: '#e7e3d8',
                    300: '#d6d0c0',
                },
                glow: '#7de3d3',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Fraunces', 'Georgia', ...defaultTheme.fontFamily.serif],
            },
            fontSize: {
                'display-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-md': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
                'display-lg': ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
                'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                soft: '0 1px 2px rgba(7, 22, 25, 0.04), 0 8px 24px -12px rgba(7, 22, 25, 0.12)',
                lift: '0 2px 4px rgba(7, 22, 25, 0.04), 0 24px 48px -20px rgba(7, 22, 25, 0.22)',
                glow: '0 0 0 1px rgba(125, 227, 211, 0.25), 0 20px 60px -20px rgba(125, 227, 211, 0.45)',
                inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            },
            maxWidth: {
                page: '80rem',
            },
            transitionTimingFunction: {
                premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                draw: {
                    from: { strokeDashoffset: 'var(--path-length, 1200)' },
                    to: { strokeDashoffset: '0' },
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(0.8)', opacity: '0.7' },
                    '100%': { transform: 'scale(2.2)', opacity: '0' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                float: 'float 7s ease-in-out infinite',
                'float-slow': 'float 9s ease-in-out infinite',
                draw: 'draw 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
            },
        },
    },

    plugins: [forms],
};
