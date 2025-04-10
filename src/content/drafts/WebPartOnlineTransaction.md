---
published: false
tags:
  - frontend
  - work
title: Web POT Release Config
description: ''
publishedAt: 2024-12-02
---
## Containerization

**Build the image locally**
```sh
docker build --build-arg BASE_URL --build-arg APPINSIGHTS_INSTRUMENTATIONKEY --build-arg REACT_APP_API_URL=https://apigateway-dev.unitedtractors.com --build-arg REACT_APP_CLEVERTAP_ID=46W-R9Z-596Z --build-arg REACT_APP_CLIENT_ID_UT_CONNECT=utc_EbVnX6PzQa2uuyadFoW7yBGkefdnKQKk --build-arg REACT_APP_DOMAIN=utconnect.unitedtractors.com --build-arg REACT_APP_GOOGLE_CLIENT=623700117994-fmardpr6d8f5ov7vlg064pel1avf7hlj.apps.googleusercontent.com --build-arg REACT_APP_LOGIN_TIMER=30 --build-arg REACT_APP_OCP_APIM_KEY=586ea8173ae5497f8e3d2e912c875463 --build-arg REACT_APP_PARSE_APIM_KEY=586ea8173ae5497f8e3d2e912c875463 --build-arg REACT_APP_X_PARSE_APPLICATION_ID=1704a0e5-9c2f-46ab-bf92-fa4b411e2825 --build-arg PORT --build-arg REACT_APP_BUILD_ID .
```

**Attach to a tag**
```sh
docker tag <image_id> ucp/webpot:latest
```

**Run the container**
```sh
docker container run -p 8080:8080 localhost/ucp/webpot
```
