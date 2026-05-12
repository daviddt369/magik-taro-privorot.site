# Раиса

Статический mobile-first лендинг для Раисы. Сайт собран как отдельный проект с собственной тёмной визуальной системой, 3D-галереей, видео-блоком, сертификатами и popup-блоком «Карта дня».

## Где менять контакты

- Телефон: заменить `RAISA_PHONE` в [index.html](/mnt/e/codex/www/raisa/index.html)
- WhatsApp: заменить `RAISA_WHATSAPP` в [index.html](/mnt/e/codex/www/raisa/index.html)
- Telegram: заменить `RAISA_TELEGRAM` в [index.html](/mnt/e/codex/www/raisa/index.html)

## Где менять домен

- Текущий домен хранится в [domain.txt](/mnt/e/codex/www/raisa/domain.txt)
- SEO-поля `title`, `meta description`, `canonical`, `Open Graph url` заданы в [index.html](/mnt/e/codex/www/raisa/index.html)

## Куда класть фото

- Основные фотографии лежат в [media](/mnt/e/codex/www/raisa/media)
- Для замены фото в блоках и галерее править пути в [index.html](/mnt/e/codex/www/raisa/index.html)

## Куда класть видео

- Видео лежит в [media](/mnt/e/codex/www/raisa/media)
- Блок видео настроен в [index.html](/mnt/e/codex/www/raisa/index.html)

## Куда класть сертификаты

- Сейчас используются временные заглушки в [assets/certificates](/mnt/e/codex/www/raisa/assets/certificates)
- Для замены положите реальные файлы в эту папку и обновите пути в [index.html](/mnt/e/codex/www/raisa/index.html)

## Где вставлять аналитику

- Плейсхолдер Яндекс.Метрики: низ [index.html](/mnt/e/codex/www/raisa/index.html)
- Плейсхолдер Google Analytics: низ [index.html](/mnt/e/codex/www/raisa/index.html)

## Какие файлы отвечают за стили и скрипты

- Разметка: [index.html](/mnt/e/codex/www/raisa/index.html)
- Стили: [styles.css](/mnt/e/codex/www/raisa/styles.css)
- Скрипты: [script.js](/mnt/e/codex/www/raisa/script.js)
- Иконка сайта: [favicon.svg](/mnt/e/codex/www/raisa/favicon.svg)

## Как устроена 3D-галерея

- Галерея собрана на секции `.orbit-gallery` в [index.html](/mnt/e/codex/www/raisa/index.html)
- Позиционирование карточек и адаптивный радиус задаются в [script.js](/mnt/e/codex/www/raisa/script.js)
- Анимация запускается только когда галерея попадает в viewport, и отключается при `prefers-reduced-motion`

## Как устроен popup «Карта дня»

- Разметка модального окна находится в [index.html](/mnt/e/codex/www/raisa/index.html)
- Логика показа, закрытия, sessionStorage и копирования текста находится в [script.js](/mnt/e/codex/www/raisa/script.js)
- Изображения карт лежат в [assets/cards](/mnt/e/codex/www/raisa/assets/cards)

## Как локально открыть сайт

1. Откройте папку [raisa](/mnt/e/codex/www/raisa) в браузере через локальный сервер.
2. Пример команды из `E:\codex\www`:

```bash
cd /mnt/e/codex/www
python3 -m http.server 8080
```

3. После запуска откройте `http://localhost:8080/raisa/`
