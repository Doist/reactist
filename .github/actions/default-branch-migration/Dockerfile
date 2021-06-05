FROM alpine:3.12

RUN apk add --update jq curl git

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
