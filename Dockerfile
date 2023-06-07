FROM alpine:latest

ARG PB_VERSION=0.16.4

RUN apk add --no-cache \
    unzip \
    ca-certificates

# Create a directory to store the existing data if it doesn't exist
RUN mkdir -p /pb/pb_data

# download and unzip PocketBase into a temporary directory
WORKDIR /tmp
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /tmp/pb_extracted

# Move necessary files to appropriate locations, excluding pb_data
RUN find /tmp/pb_extracted -mindepth 1 -maxdepth 1 -not -name "pb_data" -exec mv -t /pb {} +

# Expose the necessary ports
EXPOSE 8080

# Start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
