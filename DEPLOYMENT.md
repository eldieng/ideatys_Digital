# Guide de Déploiement - IDEATYS Digital

## Prérequis VPS Hostinger

- **Node.js** : v18.17+ (recommandé v20 LTS)
- **npm** : v9+
- **PM2** : Process manager pour Node.js
- **Nginx** : Reverse proxy (optionnel mais recommandé)

---

## Étape 1 : Connexion au VPS

```bash
ssh root@votre-ip-vps
```

---

## Étape 2 : Installation de Node.js

```bash
# Installer Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node -v
npm -v
```

---

## Étape 3 : Installation de PM2

```bash
sudo npm install -g pm2
```

---

## Étape 4 : Cloner le projet

```bash
cd /var/www
git clone https://github.com/eldieng/ideatys_Digital.git
cd ideatys_Digital
```

---

## Étape 5 : Installation des dépendances et build

```bash
npm install
npm run build
```

---

## Étape 6 : Lancer avec PM2

```bash
# Démarrer l'application
pm2 start npm --name "ideatys-digital" -- start

# Sauvegarder la configuration PM2
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

---

## Étape 7 : Configuration Nginx (Reverse Proxy)

Créer le fichier de configuration :

```bash
sudo nano /etc/nginx/sites-available/ideatys.digital
```

Contenu :

```nginx
server {
    listen 80;
    server_name ideatys.digital www.ideatys.digital;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site :

```bash
sudo ln -s /etc/nginx/sites-available/ideatys.digital /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Étape 8 : SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ideatys.digital -d www.ideatys.digital
```

---

## Commandes utiles PM2

```bash
# Voir les logs
pm2 logs ideatys-digital

# Redémarrer l'application
pm2 restart ideatys-digital

# Voir le statut
pm2 status

# Arrêter l'application
pm2 stop ideatys-digital
```

---

## Mise à jour du site

```bash
cd /var/www/ideatys_Digital
git pull origin main
npm install
npm run build
pm2 restart ideatys-digital
```

---

## Variables d'environnement (optionnel)

Si tu as besoin de variables d'environnement, crée un fichier `.env.local` :

```bash
nano .env.local
```

Exemple :
```
NEXT_PUBLIC_SITE_URL=https://ideatys.digital
```

---

## Checklist finale

- [ ] Node.js installé
- [ ] PM2 installé et configuré
- [ ] Projet cloné et buildé
- [ ] Nginx configuré comme reverse proxy
- [ ] SSL activé avec Let's Encrypt
- [ ] DNS pointant vers l'IP du VPS
- [ ] Firewall configuré (ports 80, 443, 22)

---

## Support

En cas de problème, vérifier :
1. Les logs PM2 : `pm2 logs`
2. Les logs Nginx : `sudo tail -f /var/log/nginx/error.log`
3. Le statut des services : `systemctl status nginx`
