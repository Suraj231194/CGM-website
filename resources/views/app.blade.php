<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#f7f6f2">
        <meta name="description" content="Connected continuous glucose monitoring, tubeless insulin delivery and smart pen technology, designed to work together for clearer, calmer diabetes care.">
        <meta property="og:site_name" content="{{ config('app.name', 'biogenixCGM') }}">
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ config('app.name', 'biogenixCGM') }}">
        <meta property="og:description" content="Connected continuous glucose monitoring, tubeless insulin delivery and smart pen technology, designed to work together for clearer, calmer diabetes care.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ url('/images/og-cover.png') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="biogenixCGM sensor beside the headline Advanced diabetes management, beautifully simplified">
        <meta name="twitter:card" content="summary_large_image">
        <link rel="canonical" href="{{ url()->current() }}">
        <link rel="icon" href="/favicon.ico" sizes="48x48">
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">

        <title inertia>{{ config('app.name', 'biogenixCGM') }}</title>

        <!-- Fonts: Fraunces is self-hosted; Inter is served by a privacy-friendly CDN. -->
        <link rel="preload" href="/fonts/fraunces-var-latin.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
