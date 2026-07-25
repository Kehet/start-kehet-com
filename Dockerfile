############################################
# Base Image
############################################

# Non-root nginx image, fronted by Traefik (which terminates TLS).
# https://github.com/nginx/docker-nginx-unprivileged
FROM nginxinc/nginx-unprivileged:1.31-alpine@sha256:18d67281256ded39ff65e010ae4f831be18f19356f83c60bc546492c7eb6dd23 AS base

############################################
# Production Image
############################################
FROM base AS prod

COPY --chown=nginx:nginx dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
