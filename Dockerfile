# syntax=docker/dockerfile:1

FROM node:20-alpine AS frontend
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 600000
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true
RUN yarn build

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY backend/pyproject.toml ./
RUN pip install --no-cache-dir . && rm pyproject.toml
COPY backend/app.py backend/calculatorsfuncs.py ./
COPY --from=frontend /src/build ./build
EXPOSE 5000
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "--access-logfile", "-", "app:app"]
