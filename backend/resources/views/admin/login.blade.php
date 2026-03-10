<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Connexion — Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial;
            background: #f7f7f7;
            color: #1f1f1f;
        }

        .card {
            max-width: 420px;
            margin: 10vh auto;
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 24px;
        }

        .brand {
            color: #0A2540;
            font-weight: 600;
            font-size: 20px;
        }

        label {
            font-size: 12px;
            color: #555;
        }

        input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-top: 6px;
        }

        button {
            width: 100%;
            background: #0A2540;
            color: #fff;
            border: 0;
            border-radius: 8px;
            padding: 10px;
            margin-top: 12px;
            cursor: pointer;
        }

        .error {
            color: #b00020;
            font-size: 12px;
            margin-top: 8px;
        }
    </style>
</head>

<body>
    <div class="card">
        <div class="brand">AISSIA SÉCURITÉ — Admin</div>
        <form method="post" action="{{ route('admin.login') }}" style="margin-top:16px">
            @csrf
            <div>
                <label>Email</label>
                <input type="email" name="email" required />
            </div>
            <div style="margin-top:12px">
                <label>Mot de passe</label>
                <input type="password" name="password" required />
            </div>
            @if($errors->any())
                <div class="error">{{ $errors->first() }}</div>
            @endif
            <button type="submit">Se connecter</button>
        </form>
    </div>
</body>

</html>