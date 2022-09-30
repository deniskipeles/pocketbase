# FROM alpine:3 as downloader

# ARG TARGETOS
# ARG TARGETARCH
# ARG VERSION=0.2.8

# ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}"

# # Install the dependencies
# RUN apk add --no-cache \
#     ca-certificates \
#     unzip \
#     wget \
#     zip \
#     zlib-dev

# RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
#     && unzip pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
#     && chmod +x /pocketbase

# FROM scratch

# EXPOSE 8090

# COPY --from=downloader /pocketbase /usr/local/bin/pocketbase
# CMD ["/usr/local/bin/pocketbase", "serve","--https=bnet.onrender.com:8080"]


FROM alpine:3 as downloader

ARG TARGETOS
ARG TARGETARCH
ARG TARGETVARIANT
ARG VERSION

ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}${TARGETVARIANT}"

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && unzip pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && chmod +x /pocketbase

FROM alpine:3
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

EXPOSE 8090

COPY --from=downloader /pocketbase /usr/local/bin/pocketbase
ENTRYPOINT ["/usr/local/bin/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]
