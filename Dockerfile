FROM oven/bun:1

# Install cron
RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install dependencies
COPY package.json bun.lock ./
RUN bun install --production

# Copy source code
COPY . .

# Add bun to cron's path (mostly redundant with oven/bun, but safe)
RUN echo 'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' > /etc/cron.d/env

# Create cron job (assumes dotenv will load /app/.env)
RUN echo '* * * * * cd /app && /usr/local/bin/bun scrape:games 1 >> /var/log/cron.log 2>&1' > /etc/cron.d/scrape-job
RUN echo '0 22 * * 0 cd /app && /usr/local/bin/bun scrape:totw >> /var/log/cron.log 2>&1' >> /etc/cron.d/scrape-job
RUN echo '0 22 * * 0 cd /app && /usr/local/bin/bun scrape:fotw >> /var/log/cron.log 2>&1' >> /etc/cron.d/scrape-job

# Set proper permissions and install the crontab
RUN chmod 0644 /etc/cron.d/scrape-job && \
    crontab /etc/cron.d/scrape-job

# Create start script that writes env vars to `.env` and runs cron
RUN echo '#!/bin/sh\n'\
    'echo "DATABASE_URL=$DATABASE_URL" > /app/.env\n'\
    'echo "STEAM_KEY=$STEAM_KEY" >> /app/.env\n'\
    'cron -f' > /start.sh && chmod +x /start.sh

CMD ["/start.sh"]
