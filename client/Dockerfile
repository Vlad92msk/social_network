# Install dependencies only when needed
FROM node:16.13.0-alpine AS dependencies
WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16.13.0-alpine AS builder
WORKDIR /client
COPY . .
COPY --from=dependencies /client/node_modules ./node_modules
RUN yarn build

FROM node:16.13.0-alpine AS runner
WORKDIR /client
ENV NODE_ENV production

COPY --from=builder /client/public ./public
COPY --from=builder /client/package.json ./package.json
COPY --from=builder /client/.next ./.next
COPY --from=builder /client/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]
