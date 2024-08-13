FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install git -y

WORKDIR /home/app
COPY main.sh main.sh
COPY package.json package.json
COPY package-lock.json package-lock.json 
COPY tsconfig.json tsconfig.json
COPY .env .env
COPY src/ src/

RUN npm install
RUN npm install -g typescript
RUN chmod +x main.sh

ENTRYPOINT ["/home/app/main.sh"]