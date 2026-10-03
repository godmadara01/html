# Nexora Bot Website

## Render par deploy (Free Web Service)
1. Is folder ko GitHub repo me upload karo.
2. Render -> New -> Web Service -> repo select karo.
3. Runtime: Node | Build Command: `npm install` | Start Command: `npm start` | Plan: Free
4. Deploy ke baad site chalu. Render khud `RENDER_EXTERNAL_URL` set karta hai,
   isliye server har 2 minute me apne `/health` ko ping karega.
   (Na mile to Environment me `SELF_URL` = apna onrender.com URL daal do.)

## Backup (recommended)
UptimeRobot (free) me `https://YOUR-APP.onrender.com/health` ka monitor 5 min par laga do,
taaki agar kabhi server so jaye to wo wapas jaag jaye.
