<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard — Admin</title>
    <style>
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
            background: #fff;
            color: #1f1f1f;
        }

        .nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e5e5e5;
            padding: 12px 18px;
        }

        .brand {
            color: #0A2540;
            font-weight: 600;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 18px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }

        .card {
            border: 1px solid #e5e5e5;
            border-radius: 10px;
            padding: 14px;
        }

        .muted {
            color: #666;
            font-size: 14px;
        }

        button,
        a.btn {
            display: inline-block;
            background: #0A2540;
            color: #fff;
            border-radius: 8px;
            padding: 8px 12px;
            text-decoration: none;
        }

        .logout {
            background: #b00020;
        }
    </style>
</head>

<body>
    <div class="nav">
        <div class="brand">AISSIA SÉCURITÉ — Admin</div>
        <form method="post" action="{{ route('admin.logout') }}">@csrf <button class="logout">Se déconnecter</button>
        </form>
    </div>
    <div class="container">
        <h1>Tableau de bord</h1>
        <p class="muted">Interface simple et intuitive — gestion du contenu.</p>
        <div class="grid" style="margin-top:12px">
            <div class="card"><strong>Services</strong>
                <div class="muted">CRUD via API</div>
            </div>
            <div class="card"><strong>Produits</strong>
                <div class="muted">CRUD via API</div>
            </div>
            <div class="card"><strong>Formations</strong>
                <div class="muted">CRUD via API</div>
            </div>
            <div class="card"><strong>Actualités</strong>
                <div class="muted">CRUD via API</div>
            </div>
            <div class="card"><strong>Messages de contact</strong>
                <div class="muted">Consultation et suppression</div>
            </div>
        </div>
        <div style="margin-top:18px">
            <a href="#" class="btn">Ouvrir le module Services</a>
        </div>
    </div>
</body>

</html>