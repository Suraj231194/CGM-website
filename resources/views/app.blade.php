<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#f7f6f2">
        <meta name="description" content="Connected continuous glucose monitoring, tubeless insulin delivery and smart pen technology, designed to work together for clearer, calmer diabetes care.">
        <meta property="og:site_name" content="{{ config('app.name', 'biogenixCGM') }}">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ url('/images/og-cover.png') }}">
        <link rel="canonical" href="{{ url()->current() }}">

        <title inertia>{{ config('app.name', 'biogenixCGM') }}</title>

        <!-- Fonts: Fraunces for display, Inter for interface text. Served by a privacy-friendly CDN. -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=fraunces:300,400,500,400i|inter:400,500,600,700&display=swap" rel="stylesheet" />

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
