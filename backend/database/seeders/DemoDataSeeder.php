<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Product;
use App\Models\Formation;
use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Services
        $services = [
            [
                'title' => 'Sécurité Physique',
                'description' => 'Solutions de surveillance et de protection pour vos locaux. Nos agents qualifiés assurent une présence dissuasive et une réponse rapide à tout incident.',
                'icon' => 'shield',
                'features' => ['Gardiennage 24/7', 'Rondes de surveillance', 'Contrôle d\'accès', 'Gestion des alarmes'],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Sécurité Électronique',
                'description' => 'Systèmes de vidéosurveillance, contrôle d\'accès et alarmes intrusion de dernière génération pour une protection optimale.',
                'icon' => 'camera',
                'features' => ['Vidéosurveillance HD', 'Contrôle d\'accès biométrique', 'Détection d\'intrusion', 'Télésurveillance'],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Conseil & Audit',
                'description' => 'Analyse de vos risques et recommandations personnalisées pour renforcer votre dispositif de sécurité.',
                'icon' => 'clipboard',
                'features' => ['Audit de sécurité', 'Analyse des risques', 'Plan de sécurité', 'Conformité réglementaire'],
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Protection Rapprochée',
                'description' => 'Services de protection rapprochée pour VIP, dirigeants et personnalités. Discrétion et efficacité garanties.',
                'icon' => 'user-shield',
                'features' => ['Protection VIP', 'Escorte sécurisée', 'Analyse des menaces', 'Planification de trajets'],
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::create([
                ...$service,
                'slug' => Str::slug($service['title']),
            ]);
        }

        // Products
        $products = [
            [
                'name' => 'Pack Surveillance PME',
                'description' => 'Solution complète de vidéosurveillance pour les petites et moyennes entreprises. Inclut 4 caméras HD, enregistreur et installation.',
                'price' => 2500.00,
                'category' => 'Vidéosurveillance',
                'features' => ['4 caméras HD 1080p', 'Enregistreur 1To', 'Installation incluse', 'Application mobile'],
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Contrôle d\'Accès Entreprise',
                'description' => 'Système de contrôle d\'accès par badge et biométrie pour sécuriser les zones sensibles de votre entreprise.',
                'price' => 3500.00,
                'category' => 'Contrôle d\'accès',
                'features' => ['Lecteur biométrique', 'Badges RFID', 'Logiciel de gestion', 'Historique des accès'],
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Alarme Intrusion Pro',
                'description' => 'Système d\'alarme anti-intrusion avec détection périmétrique et télésurveillance 24/7.',
                'price' => 1800.00,
                'category' => 'Alarme',
                'features' => ['Centrale d\'alarme', 'Détecteurs de mouvement', 'Sirène extérieure', 'Télésurveillance'],
                'is_active' => true,
                'is_featured' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                ...$product,
                'slug' => Str::slug($product['name']),
            ]);
        }

        // Formations
        $formations = [
            [
                'title' => 'Agent de Prévention et de Sécurité (APS)',
                'description' => 'Formation initiale pour devenir agent de sécurité privée. Obtenez votre carte professionnelle CNAPS.',
                'level' => 'Débutant',
                'category' => 'Sécurité privée',
                'duration_weeks' => 6,
                'modules' => [
                    'Cadre juridique de la sécurité privée',
                    'Surveillance et gardiennage',
                    'Gestion des conflits',
                    'Secourisme (SST)',
                    'Incendie (SSIAP 1)',
                ],
                'has_final_exam' => true,
                'price' => 1500.00,
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'SSIAP 1 - Agent de Service de Sécurité Incendie',
                'description' => 'Formation obligatoire pour exercer en établissement recevant du public (ERP) et immeubles de grande hauteur (IGH).',
                'level' => 'Débutant',
                'category' => 'Incendie',
                'duration_weeks' => 2,
                'modules' => [
                    'Le feu et ses conséquences',
                    'Sécurité incendie',
                    'Installations techniques',
                    'Rôles et missions',
                    'Concrétisation des acquis',
                ],
                'has_final_exam' => true,
                'price' => 800.00,
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Recyclage Carte Professionnelle (MAC)',
                'description' => 'Maintien et Actualisation des Compétences pour le renouvellement de votre carte professionnelle.',
                'level' => 'Intermédiaire',
                'category' => 'Sécurité privée',
                'duration_weeks' => 1,
                'modules' => [
                    'Actualisation juridique',
                    'Compétences opérationnelles',
                    'Gestion des situations conflictuelles',
                    'Premiers secours',
                ],
                'has_final_exam' => false,
                'price' => 350.00,
                'is_active' => true,
                'is_featured' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($formations as $formation) {
            Formation::create([
                ...$formation,
                'slug' => Str::slug($formation['title']),
            ]);
        }

        // Articles
        $articles = [
            [
                'title' => 'Les nouvelles réglementations de la sécurité privée en 2026',
                'content' => '<p>Le secteur de la sécurité privée évolue constamment avec de nouvelles réglementations visant à renforcer la professionnalisation du métier.</p><p>En 2026, plusieurs changements majeurs entrent en vigueur, notamment concernant la formation continue obligatoire et les exigences de certification.</p><p>Les entreprises de sécurité doivent désormais s\'adapter à ces nouvelles normes pour maintenir leur agrément et garantir la qualité de leurs prestations.</p>',
                'excerpt' => 'Découvrez les nouvelles réglementations qui impactent le secteur de la sécurité privée en 2026.',
                'category' => 'Réglementation',
                'tags' => ['réglementation', 'CNAPS', 'sécurité privée'],
                'is_published' => true,
                'is_featured' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Comment choisir son système de vidéosurveillance ?',
                'content' => '<p>Le choix d\'un système de vidéosurveillance dépend de nombreux facteurs : la taille de vos locaux, le niveau de sécurité souhaité, et votre budget.</p><p>Dans cet article, nous vous guidons à travers les différentes options disponibles sur le marché et les critères essentiels à prendre en compte.</p><p>De la résolution des caméras à la capacité de stockage, en passant par les fonctionnalités d\'analyse vidéo, découvrez comment faire le bon choix pour votre entreprise.</p>',
                'excerpt' => 'Guide complet pour sélectionner le système de vidéosurveillance adapté à vos besoins.',
                'category' => 'Conseils',
                'tags' => ['vidéosurveillance', 'équipement', 'guide'],
                'is_published' => true,
                'is_featured' => false,
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'AISSIA obtient la certification ISO 9001',
                'content' => '<p>Nous sommes fiers d\'annoncer l\'obtention de la certification ISO 9001 pour notre système de management de la qualité.</p><p>Cette certification témoigne de notre engagement continu envers l\'excellence et la satisfaction de nos clients.</p><p>Elle garantit que nos processus sont optimisés et que nous fournissons des services de sécurité de la plus haute qualité.</p>',
                'excerpt' => 'AISSIA franchit une nouvelle étape dans son engagement qualité avec la certification ISO 9001.',
                'category' => 'Actualité',
                'tags' => ['certification', 'qualité', 'ISO 9001'],
                'is_published' => true,
                'is_featured' => true,
                'published_at' => now()->subDays(20),
            ],
        ];

        foreach ($articles as $article) {
            Article::create([
                ...$article,
                'slug' => Str::slug($article['title']) . '-' . Str::random(6),
            ]);
        }

        $this->command->info('Données de démonstration créées avec succès !');
    }
}
